import React from "react";
import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";

import { ActivityTypes, TravelTypes } from "../../types/TripItemType";
import TripItemTypeCard from "../TripItemTypeCard";
import styles from "./styles.module.css";

/** Combined display for trips with no items */
const EmptyTripCard = () => (
  <Card>
    <CardContent>
      <Typography variant="h4">Add your plans</Typography>
      <Grid container columnSpacing={2} className={styles.tripListItemGrid}>
        <Grid item xs={6}>
          <Typography variant="h5" fontWeight="bold">Travelling</Typography>
          <Stack spacing={2}>
            {TravelTypes.map((x) => (
              <TripItemTypeCard key={x} item={x} type="travel" onClick={console.log} />
            ))}
          </Stack>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h5" fontWeight="bold">Activities</Typography>
          <Stack spacing={2}>
            {ActivityTypes.map((x) => (
              <TripItemTypeCard key={x} item={x} type="activity" onClick={console.log} />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default EmptyTripCard;
