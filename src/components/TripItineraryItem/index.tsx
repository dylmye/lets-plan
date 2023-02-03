import React from "react";
import {
  Grid,
  Paper,
  Tooltip,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { SxProps, useTheme } from "@mui/system";
import { Assignment } from "@mui/icons-material";
import * as MuiIcons from "@mui/icons-material";
import { CardHeader } from "@mui/material";

import {
  getTripItemColour,
  getTripItemIcon,
  getTripItemTypeLabel,
  renderExtraText,
} from "../../helpers/tripItems";
import styles from "./styles.module.css";
import { TripItemType } from "../../types/TripItemType";
import TripItineraryActivityItem from "../../types/TripItineraryActivityItem";
import TripItineraryTravelItem from "../../types/TripItineraryTravelItem";
import TripItineraryItemBase from "../../types/TripItineraryItemBase";
import { formatTime } from "../../helpers/dates";
import TripItemDetailsAction from "../TripItemDetailsAction";
import AddEditTripItemForm from "../AddTripItemCard/AddEditTripItemForm";
import { Formik } from "formik";
import TripItemDraft from "../../types/TripItemDraft";
import Trip from "../../types/Trip";
import { useAppDispatch } from "../../app/hooks";
import { updateTripItemByTripId } from "../../features/tripList/tripSlice";
import { AllItineraryTypes } from "../../types/tripItineraryTypes";

export interface TripItineraryItemProps {
  /** The item to show */
  item: TripItineraryItemBase;
  /** The parent trip */
  trip: Trip;
  /** The action to call to show the delete item dialog */
  onDeleteTripItem: (tripItemId: string) => void;
  /** Whether to show the edit mode for this item */
  showEditMode: boolean;
  /** The action to call to toggle the edit status */
  onToggleEditTripItem: (tripItemId: string, isEdit: boolean) => void;
}

/** Index item with a preview of the trip */
const TripItineraryItem = ({
  item,
  trip,
  onDeleteTripItem,
  showEditMode,
  onToggleEditTripItem,
}: TripItineraryItemProps) => {
  const { palette } = useTheme();
  const dispatch = useAppDispatch();
  const Icon = () =>
    getTripItemIcon(item.type, { htmlColor: palette.background.paper });
  const iconBackgroundColour = getTripItemColour(item.type);
  const isOtherType = [
    TripItemType["Other Activity"],
    TripItemType["Other Mode of Transport"],
  ].includes(item.type as TripItemType);

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

  const renderItemText = (
    item: TripItineraryItemBase & Partial<AllItineraryTypes>
  ): JSX.Element => {
    return (
      <>
        <Typography variant="h5" className={styles.tripItemTitle}>
          {item.title ?? item.location}
        </Typography>
        {renderExtraText(item).map(({ iconName, iconHint, body }) => {
          const IconWrapper = !!iconHint ? Tooltip : React.Fragment;
          // @ts-ignore
          const Icon = !!iconName ? MuiIcons[iconName] : React.Fragment;

          // @TODO: add logic for hiding fields - ExtraText should keep the key name

          return (
            <Typography variant="body1" className={styles.tripItemText}>
              {iconName && (
                <IconWrapper title={iconHint}>
                  <Icon fontSize="inherit" className={styles.tripItemIcon} />
                </IconWrapper>
              )}
              {body}
            </Typography>
          );
        })}
        {item.details && (
          <Typography variant="body1" className={styles.tripItemText}>
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
    dispatch(
      updateTripItemByTripId({
        tripId: trip.id,
        item: {
          ...values,
          id: item.id,
        },
      })
    );
    onToggleEditTripItem(item.id, false);
  };

  return (
    <Grid container sx={rootContainerStyle}>
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
              <CardHeader
                title={
                  <Typography variant="body2" className={styles.tripItemText}>
                    <time dateTime={item.startsAt}>
                      {formatTime(
                        item.startsAt,
                        true,
                        false,
                        // item.startsAtTimezone
                        // fix temp issues where SAT is hard set
                        undefined
                      )}
                    </time>
                    {(
                      item as
                        | TripItineraryActivityItem
                        | TripItineraryTravelItem
                    )?.endsAt && (
                      <>
                        {` - `}
                        <time dateTime={(item as any)?.endsAt}>
                          {formatTime(
                            (item as any)?.endsAt,
                            true,
                            false,
                            (item as any)?.endsAtTimezone
                          )}
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
                    category: "travel",
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
