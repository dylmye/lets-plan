import React from "react";
import { Grid, Paper, Tooltip } from "@mui/material";
import { Box, Card, CardContent, Typography } from "@mui/material";
import {
  Assignment,
  Directions,
  Link as LinkIcon,
  MonetizationOn,
  Tag,
} from "@mui/icons-material";

import { getTripItemColour, getTripItemIcon } from "../../helpers/tripItems";
import styles from "./styles.module.css";
import { ActivityTypes, TravelTypes } from "../../types/TripItemType";
import TripItineraryActivityItem from "../../types/TripItineraryActivityItem";
import TripItineraryTravelItem from "../../types/TripItineraryTravelItem";
import TripItineraryItemBase from "../../types/TripItineraryItemBase";
import { formatTime, userLanguage } from "../../helpers/dates";

export interface TripItineraryItemProps {
  item: TripItineraryItemBase;
}

/** Index item with a preview of the trip */
const TripItineraryItem = ({ item }: TripItineraryItemProps) => {
  const Icon = () => getTripItemIcon(item.type);
  const iconBackgroundColour = getTripItemColour(item.type);

  const renderUrls = (urls: Record<string, string>): JSX.Element => (
    <>
      <Typography variant="body1" className={styles.tripItemText}>
        <Tooltip title="Links">
          <LinkIcon fontSize="inherit" className={styles.tripItemIcon} />
        </Tooltip>
        Related links:
      </Typography>
      <ul style={{ margin: 0 }} className={styles.tripItemText}>
        {Object.keys(urls).map((k) => (
          <li key={k ?? "link"}>
            <span style={{ marginTop: 2, marginBottom: 2 }}>
              <a href={urls[k]} target="_blank" rel="noreferrer">
                {k ?? "link"}
              </a>
            </span>
          </li>
        ))}
      </ul>
    </>
  );

  const renderItemText = (item: TripItineraryItemBase): JSX.Element | null => {
    if (!item.type) {
      return null;
    }

    let formattedPrice: string | null = null;
    if ((item as TripItineraryTravelItem | TripItineraryActivityItem)?.price) {
      formattedPrice = new Intl.NumberFormat([userLanguage, "en-GB"], {
        style: "currency",
        currency: (item as any)?.priceCurrency,
      }).format((item as any).price);
    }

    if (TravelTypes.includes(item.type)) {
      return (
        <>
          <Typography variant="h5" className={styles.tripItemTitle}>
            {(item as TripItineraryTravelItem).title}
          </Typography>
          <Typography variant="body1" className={styles.tripItemText}>
            <Tooltip title="Directions">
              <Directions fontSize="inherit" className={styles.tripItemIcon} />
            </Tooltip>
            {(item as TripItineraryTravelItem).originLocation} to
            {" " + (item as TripItineraryTravelItem).destinationLocation}
          </Typography>
          {item.details && (
            <Typography variant="body1" className={styles.tripItemText}>
              <Tooltip title="Notes">
                <Assignment
                  fontSize="inherit"
                  className={styles.tripItemIcon}
                />
              </Tooltip>
              {(item as TripItineraryTravelItem).details}
            </Typography>
          )}
          {item.urls && renderUrls(item.urls)}
          {(item as TripItineraryTravelItem).price && (
            <Typography variant="body1" className={styles.tripItemText}>
              <Tooltip title="Price">
                <MonetizationOn
                  fontSize="inherit"
                  className={styles.tripItemIcon}
                />
              </Tooltip>
              {formattedPrice}
            </Typography>
          )}
        </>
      );
    }

    if (ActivityTypes.includes(item.type)) {
      return (
        <>
          <Typography variant="h5" className={styles.tripItemTitle}>
            {(item as TripItineraryActivityItem)?.title ??
              (item as TripItineraryActivityItem).location}
          </Typography>
          {/* Show location if a title is provided */}
          {item?.title && (
            <Typography variant="body1" className={styles.tripItemText}>
              <Tooltip title="Directions">
                <Directions
                  fontSize="inherit"
                  className={styles.tripItemIcon}
                />
              </Tooltip>
              {(item as TripItineraryActivityItem)?.location}
            </Typography>
          )}
          {item.details && (
            <Typography variant="body1" className={styles.tripItemText}>
              <Tooltip title="Notes">
                <Assignment
                  fontSize="inherit"
                  className={styles.tripItemIcon}
                />
              </Tooltip>
              {(item as TripItineraryActivityItem).details}
            </Typography>
          )}
          {(item as TripItineraryActivityItem).reference && (
            <Typography variant="body1" className={styles.tripItemReference}>
              <Tooltip title="Reference">
                <Tag fontSize="inherit" className={styles.tripItemIcon} />
              </Tooltip>
              {(item as TripItineraryActivityItem).reference}
            </Typography>
          )}
          {item.urls && renderUrls(item.urls)}
          {(item as TripItineraryActivityItem).price && (
            <Typography variant="body1" className={styles.tripItemText}>
              <Tooltip title="Price">
                <MonetizationOn
                  fontSize="inherit"
                  className={styles.tripItemIcon}
                />
              </Tooltip>
              {formattedPrice}
            </Typography>
          )}
        </>
      );
    }

    return null;
  };

  return (
    <Grid container>
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
            }}
          >
            <Icon />
          </Paper>
        </Box>
      </Grid>
      <Grid item sm={10}>
        <Card
          sx={{
            paddingY: 2,
            marginY: {
              xs: 2,
              sm: 0,
            },
          }}
        >
          <Box>
            <CardContent>
              <Typography variant="body2" className={styles.tripItemText}>
                <time dateTime={item.startsAt}>
                  {formatTime(
                    item.startsAt,
                    true,
                    false,
                    item.startsAtTimezone
                  )}
                </time>
                {(item as TripItineraryActivityItem | TripItineraryTravelItem)
                  ?.endsAt && (
                  <>
                    {` - `}
                    <time dateTime={(item as any)?.endsAt}>
                      {formatTime(
                        (item as any)?.endsAt,
                        true,
                        false,
                        (item as any)?.endsAtTimeZone
                      )}
                    </time>
                  </>
                )}
              </Typography>
              {renderItemText(item)}
            </CardContent>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TripItineraryItem;
