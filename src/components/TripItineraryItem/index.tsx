import React, { useMemo } from "react";
import { Formik } from "formik";
import dayjs from "dayjs";
import { SxProps, useTheme } from "@mui/system";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { CardHeader } from "@mui/material";
import { Assignment } from "@mui/icons-material";
import * as MuiIcons from "@mui/icons-material";

import TripItemDetailsAction from "../TripItemDetailsAction";
import AddEditTripItemForm from "../AddTripItemCard/AddEditTripItemForm";
import { TripItemType } from "../../types/TripItemType";
import TripItemDraft from "../../types/TripItemDraft";
import TripItem from "../../types/Tripitem";
import Trip from "../../types/Trip";
import { useUpdateTripItem } from "../../store/features/trips";
import {
  getTripItemCategory,
  getTripItemColour,
  getTripItemIcon,
  getTripItemTypeLabel,
  renderExtraText,
} from "../../helpers/tripItems";
import { forceDateInUserTimezone, formatTime } from "../../helpers/dates";
import styles from "./styles.module.css";

export interface TripItineraryItemProps {
  /** The item to show */
  item: TripItem;
  /** The parent trip */
  trip: Trip;
  /** The action to call to show the delete item dialog */
  onDeleteTripItem: (tripItemId: string) => void;
  /** Whether to show the edit mode for this item */
  showEditMode: boolean;
  /** The action to call to toggle the edit status */
  onToggleEditTripItem: (tripItemId: string, isEdit: boolean) => void;
}

/** Individual trip item rendering within trip details */
const TripItineraryItem = ({
  item,
  trip,
  onDeleteTripItem,
  showEditMode,
  onToggleEditTripItem,
}: TripItineraryItemProps) => {
  const { palette } = useTheme();
  const updateTripItem = useUpdateTripItem();
  const Icon = () =>
    getTripItemIcon(item.type, { htmlColor: palette.background.paper });
  const iconBackgroundColour = getTripItemColour(item.type);
  const isOtherType = [
    TripItemType["Other Activity"],
    TripItemType["Other Mode of Transport"],
  ].includes(item.type as TripItemType);
  const endsAtSeparateDate = useMemo<string>(
    () =>
      item.endsAt && !dayjs(item.startsAt).isSame(dayjs(item.endsAt), "day")
        ? dayjs(item.endsAt).format("D MMM ")
        : "",
    [item.startsAt, item.endsAt]
  );

  const rootContainerStyle: SxProps = {
    flexDirection: { xs: "column", sm: "row" },
  };
  const mainContainerStyle: SxProps = {
    paddingY: 2,
    marginY: {
      xs: 2,
      sm: 0,
    },
  };

  const renderItemHeader = (item: TripItem): JSX.Element => (
    <CardHeader
      title={
        <Typography variant="body2" className={styles.tripItemText}>
          <time dateTime={item.startsAt}>
            {formatTime(item.startsAt, true)}
          </time>
          {item?.endsAt && (
            <>
              {` - `}
              <time dateTime={item.endsAt}>
                {endsAtSeparateDate}
                {formatTime(item.endsAt, true)}
              </time>
            </>
          )}
          {` \u30fb ${
            item.type && !isOtherType
              ? getTripItemTypeLabel(item.type)
              : "Other"
          }`}
        </Typography>
      }
      className={styles.tripItemHeader}
      action={
        <TripItemDetailsAction
          id={item.id}
          trip={trip}
          onDelete={onDeleteTripItem}
          toggleEdit={onToggleEditTripItem}
        />
      }
      sx={{ paddingBottom: 0 }}
    />
  );

  const renderItemText = (item: TripItem): JSX.Element => {
    return (
      <>
        <Typography variant="h5" className={styles.tripItemTitle}>
          {item.title ?? item.location}
        </Typography>
        {renderExtraText(item).map(
          ({ iconName, iconHint, body, parentComponentIsDiv }, i) => {
            const IconWrapper = !!iconHint ? Tooltip : React.Fragment;
            // @ts-ignore
            const Icon = !!iconName ? MuiIcons[iconName] : React.Fragment;

            // @TODO: add logic for hiding fields - ExtraText should keep the key name

            return (
              <Typography
                variant="body1"
                className={styles.tripItemText}
                key={`trip-item-${item.id}-text-row-${i}`}
                component={parentComponentIsDiv ? "div" : "p"}>
                {iconName && (
                  <IconWrapper title={iconHint}>
                    <Icon fontSize="inherit" className={styles.tripItemIcon} />
                  </IconWrapper>
                )}
                {body}
              </Typography>
            );
          }
        )}
        {item.details && (
          <Typography
            variant="body1"
            className={`${styles.tripItemText} ${styles.tripItemDetails}`}>
            <Tooltip title="Notes">
              <Assignment fontSize="inherit" className={styles.tripItemIcon} />
            </Tooltip>
            {item.details}
          </Typography>
        )}
      </>
    );
  };

  const onUpdateTripItem = (values: TripItemDraft): void => {
    updateTripItem(trip.id, {
      ...values,
      id: item.id,
      startsAt: dayjs(values.startsAt).utc(true).toISOString(),
      endsAt: values?.endsAt && dayjs(values.endsAt).utc(true).toISOString(),
    });
    onToggleEditTripItem(item.id, false);
  };

  return (
    <Grid container sx={rootContainerStyle} id={`item-${item.id}`}>
      <Grid item xs className={styles.tripItemIconContainer}>
        <Box className={styles.tripItemIconBox}>
          <Paper
            variant="outlined"
            sx={{
              borderRadius: 1000,
              padding: 2,
              width: 64,
              height: 64,
              backgroundColor: iconBackgroundColour,
            }}>
            <Icon />
          </Paper>
        </Box>
      </Grid>
      <Grid item sm={10}>
        <Card sx={mainContainerStyle}>
          {!showEditMode ? (
            <Box>
              {renderItemHeader(item)}
              <CardContent sx={{ paddingTop: 0 }}>
                {renderItemText(item)}
              </CardContent>
            </Box>
          ) : (
            <Box>
              <CardContent>
                <Formik<TripItemDraft>
                  initialValues={{
                    ...item,
                    category: getTripItemCategory(item),
                    startsAt: forceDateInUserTimezone(item.startsAt).format(),
                    endsAt:
                      item.endsAt &&
                      forceDateInUserTimezone(item.endsAt)?.format(),
                  }}
                  onSubmit={onUpdateTripItem}>
                  <AddEditTripItemForm
                    showCancel
                    onCancel={() => onToggleEditTripItem(item.id, false)}
                    tripDetails={trip}
                    formMode="edit"
                  />
                </Formik>
              </CardContent>
            </Box>
          )}
        </Card>
      </Grid>
    </Grid>
  );
};

export default TripItineraryItem;
