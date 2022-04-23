import React from "react";
import { Grid, Paper } from "@mui/material";
import { Box, Card, CardContent, Typography } from "@mui/material";

import TripItineraryItemBase from "../../types/TripItineraryItemBase";
import { getTripItemColour, getTripItemIcon } from "../../helpers/tripItems";

export interface TripItineraryItemProps {
  item: TripItineraryItemBase;
}

/** Index item with a preview of the trip */
const TripItineraryItem = ({ item }: TripItineraryItemProps) => {
  const Icon = () => getTripItemIcon(item.type);
  const iconBackgroundColour = getTripItemColour(item.type);

  return (
    <Grid container>
      <Grid item xs sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
      <Grid item xs={10}>
        <Card sx={{ paddingY: 2 }}>
          <Box>
            <CardContent>
              <Typography
                variant="h5"
                sx={{ textAlign: "left", fontWeight: "bold" }}
              >
                {item.title}
              </Typography>
              <Typography variant="body1" sx={{ textAlign: "left" }}>
                {item.details}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TripItineraryItem;
