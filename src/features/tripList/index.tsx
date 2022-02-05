import React, { useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { Add, Public } from "@mui/icons-material";
import dayjs from "dayjs";

import styles from "./TripList.module.css";
import { Trip } from "../../types/Trip";
import AddTripModal from "../addTripModal";

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

  const renderTrip = (trip: Trip) => (
    <Card key={trip.id}>
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
          <>{trips.map(renderTrip)}</>
        )}
        <Card key="card-add" sx={{ boxShadow: 0, border: "2px dashed #000" }}>
          <CardActionArea onClick={() => toggleModalVisibility(true)}>
            <CardContent>
              <Typography variant="h3">
                <Add fontSize="large" /> Add Trip
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Stack>
      <AddTripModal
        open={addModalVisible}
        onClose={() => toggleModalVisibility(false)}
      />
    </Container>
  );
};

export default TripList;
