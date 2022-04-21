import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import TripItineraryItemBase from "../../types/TripItineraryItemBase";

export interface TripItineraryItemProps {
  item: TripItineraryItemBase;
}

/** Index item with a preview of the trip */
const TripItineraryItem = ({ item }: TripItineraryItemProps) => (
  <Box>
    <Card sx={{ paddingY: 2 }}>
      <Box>
        <Typography variant="h4">Yes</Typography>
      </Box>
    </Card>
  </Box>
);

export default TripItineraryItem;
