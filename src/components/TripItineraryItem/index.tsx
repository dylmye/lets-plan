import React from "react";
import { Grid, Paper } from "@mui/material";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Assignment, Directions, Link as LinkIcon, Tag } from "@mui/icons-material";

import { getTripItemColour, getTripItemIcon } from "../../helpers/tripItems";
import styles from "./styles.module.css";
import { ActivityTypes, TravelTypes } from "../../types/TripItemType";
import TripItineraryActivityItem from "../../types/TripItineraryActivityItem";
import TripItineraryTravelItem from "../../types/TripItineraryTravelItem";
import TripItineraryItemBase from "../../types/TripItineraryItemBase";
import { formatTime } from "../../helpers/dates";

export interface TripItineraryItemProps {
  item: TripItineraryItemBase;
}

/** Index item with a preview of the trip */
const TripItineraryItem = ({ item }: TripItineraryItemProps) => {
  const Icon = () => getTripItemIcon(item.type);
  const iconBackgroundColour = getTripItemColour(item.type);

  const renderUrls = (urls: Record<string, string>): JSX.Element => (
    <Typography variant="body1" className={styles.tripItemText}>
      <LinkIcon fontSize="inherit" className={styles.tripItemIcon} />
      Related links:
      <ul style={{ margin: 0 }}>
        {Object.keys(urls).map((k) => (
          <li>
            <p style={{ marginTop: 2, marginBottom: 2 }}>
              <a href={urls[k]}>{k ?? "link"}</a>
            </p>
          </li>
        ))}
      </ul>
    </Typography>
  );

  const renderItemText = (item: TripItineraryItemBase): JSX.Element | null => {
    if (!item.type) {
      return null;
    }

    if (TravelTypes.includes(item.type)) {
      return (
        <>
          <Typography variant="h5" className={styles.tripItemTitle}>
            {(item as TripItineraryTravelItem).title}
          </Typography>
          <Typography variant="body1" className={styles.tripItemText}>
            <Directions fontSize="inherit" className={styles.tripItemIcon} />
            {(item as TripItineraryTravelItem).originLocation} to
            {" " + (item as TripItineraryTravelItem).destinationLocation}
          </Typography>
          {item.details && (
            <Typography variant="body1" className={styles.tripItemText}>
              <Assignment fontSize="inherit" className={styles.tripItemIcon} />
              {(item as TripItineraryTravelItem).details}
            </Typography>
          )}
          {item.urls && renderUrls(item.urls)}
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
              <Directions fontSize="inherit" className={styles.tripItemIcon} />
              {(item as TripItineraryActivityItem)?.location}
            </Typography>
          )}
          {item.details && (
            <Typography variant="body1" className={styles.tripItemText}>
              <Assignment fontSize="inherit" className={styles.tripItemIcon} />
              {(item as TripItineraryActivityItem).details}
            </Typography>
          )}
          {(item as TripItineraryActivityItem).reference && (
            <Typography variant="body1" className={styles.tripItemText}>
              <Tag fontSize="inherit" className={styles.tripItemIcon} />
              {(item as TripItineraryActivityItem).reference}
            </Typography>
          )}
          {item.urls && renderUrls(item.urls)}
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
              <Typography variant="body2" className={styles.tripItemTitle}>
                {formatTime(item.startsAt, true, false, item.startsAtTimezone)}
                {(item as TripItineraryActivityItem | TripItineraryTravelItem)
                  ?.endsAt &&
                  ` - ${formatTime(
                    (item as any)?.endsAt,
                    true,
                    false,
                    (item as any)?.endsAtTimeZone
                  )}`}
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
