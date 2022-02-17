import React, { useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Container,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import dayjs from "dayjs";

import styles from "./TripList.module.css";
import { Trip } from "../../types/Trip";
import AddTripModal from "../addTripModal";
import TripListItem from "../../components/TripListItem";
import TripListAction, {
  TripListActions,
} from "../../components/TripListAction";

const TripList = () => {
  const loading = false;

  const [addModalVisible, toggleModalVisibility] = useState(false);

  const Placeholder = () => (
    <Skeleton variant="rectangular" height={150} sx={{ borderRadius: 1 }} />
  );

  const trips: Trip[] = [
    {
      id: "placeholder-1",
      title: "[[TRIP_TITLE]]",
      location: "[[TRIP_LOCATION]]",
      image: "https://placebeard.it/600x400?1",
      startsAt: dayjs("2022-01-01").toISOString(),
      endsAt: dayjs("2022-01-01").toISOString(),
      createdAtUtc: dayjs("2022-01-01").toISOString(),
      updatedAtUtc: dayjs("2022-01-01").toISOString(),
    },
    {
      id: "placeholder-2",
      title: "Bury Tour, Very Long Title, Wow It's So Long!! Incredible!!!",
      location: "Bury St Edmunds, UK",
      image: "https://placebeard.it/600x400?2",
      startsAt: dayjs("2022-01-01").toISOString(),
      endsAt: dayjs("2022-01-01").toISOString(),
      createdAtUtc: dayjs("2022-01-01").toISOString(),
      updatedAtUtc: dayjs("2022-01-01").toISOString(),
    },
  ];

  return (
    <Container maxWidth="md" className={styles.tripListContainer}>
      <Stack spacing={2}>
        {loading ? (
          <>
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
          </>
        ) : (
          <>
            {trips.map((trip) => (
              <TripListItem trip={trip} key={`trip-${trip.id}`} />
            ))}
          </>
        )}
        <TripListAction
          key="trip-action-add"
          onPress={() => toggleModalVisibility(true)}
          actionType={TripListActions.ACTION_ADD}
        />
      </Stack>
      <AddTripModal
        open={addModalVisible}
        onClose={() => toggleModalVisibility(false)}
      />
    </Container>
  );
};

export default TripList;
