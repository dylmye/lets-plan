import React from "react";
import { Public } from "@mui/icons-material";
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

import { Trip } from "../../types/Trip";
import styles from "./TripListItem.module.css";

export interface TripListItemProps {
  trip: Trip;
}

const TripListItem = ({ trip }: TripListItemProps) => (
  <Card>
    <CardActionArea sx={{ display: "flex", justifyContent: "flex-start" }}>
      <CardMedia
        component="img"
        sx={{ width: 200 }}
        image={trip.image || "http://placehold.it/600x400"}
        alt={trip.title}
      />
      <Box className={styles.tripListTextContent}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography
            variant="h5"
            textAlign="left"
            className={styles.tripListTitle}
          >
            <strong>{trip.title}</strong>
          </Typography>
          {trip.location && (
            <Typography
              variant="body2"
              textAlign="left"
              sx={{ display: "flex", marginTop: 0.25 }}
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
