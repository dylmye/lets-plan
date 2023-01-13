import React, { useState } from "react";
import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";

import {
  ActivityTypes,
  TravelTypes,
  TripItemType,
} from "../../types/TripItemType";
import TripItemTypeCard from "../TripItemTypeCard";
import styles from "./styles.module.css";
import AddTripItemCardContents from "../AddTripItemCard/AddTripItemCardContents";
import TripDetails from "../../types/TripDetails";

/** Combined display for trips with no items */
const EmptyTripCard = ({ startsAt, ...props }: TripDetails) => {
  const [selected, setSelected] = useState<TripItemType>();
  return (
    <Card>
      <CardContent>
        {!selected ? (
          <>
            <Typography variant="h4">Add your plans</Typography>
            <Grid
              container
              columnSpacing={2}
              className={styles.tripListItemGrid}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" fontWeight="bold">
                  Travelling
                </Typography>
                <Stack spacing={2}>
                  {TravelTypes.map((x) => (
                    <TripItemTypeCard
                      key={x}
                      item={x}
                      type="travel"
                      onClick={setSelected}
                    />
                  ))}
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h5" fontWeight="bold">
                  Activities
                </Typography>
                <Stack spacing={2}>
                  {ActivityTypes.map((x) => (
                    <TripItemTypeCard
                      key={x}
                      item={x}
                      type="activity"
                      onClick={setSelected}
                    />
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </>
        ) : (
          <AddTripItemCardContents
            initialValues={{ type: selected, date: startsAt }}
            tripDetails={{ startsAt, ...props }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default EmptyTripCard;
