import React from "react";
import { Public } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import { Trip } from "../../types/Trip";
import styles from "./TripListItem.module.css";

export interface TripListItemProps {
  trip: Trip;
}

/** Index item with a preview of the trip */
const TripListItem = ({ trip }: TripListItemProps) => (
  <Card>
    <CardActionArea sx={{ display: "flex", justifyContent: "flex-start" }}>
      <Box className={styles.tripListThumbContainer}>
        {!!trip?.image && (
          <CardMedia
            component="img"
            image={trip.image}
            alt={trip.title}
            className={styles.tripListThumb}
          />
        )}
      </Box>
      <Box className={styles.tripListTextContent}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography
            variant="h5"
            textAlign="left"
            className={styles.tripListTitle}
            fontWeight="bold"
          >
            {trip.title}
          </Typography>
          {trip.location && (
            <Typography
              variant="body2"
              textAlign="left"
              sx={{ display: "flex", marginTop: 0.25 }}
              aria-label="Location"
            >
              <Public fontSize="small" sx={{ marginRight: 0.5 }} />
              {trip.location}
            </Typography>
          )}
        </CardContent>
      </Box>
    </CardActionArea>
  </Card>
);

export default TripListItem;
