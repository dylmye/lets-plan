import React from "react";
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

import styles from "./TripList.module.css";
import { Trip } from "../../types/Trip";

const TripList = () => {
  const loading = false;

  const Placeholder = () => (
    <Skeleton variant="rectangular" height={150} sx={{ borderRadius: 1 }} />
  );

  const trips: Trip[] = [
    {
      id: "placeholder-1",
      title: "[[TRIP_TITLE]]",
      location: "[[TRIP_LOCATION]]",
      image: "https://placebeard.it/600x400?1",
    },
    {
      id: "placeholder-2",
      title: "Bury Tour",
      location: "Bury St Edmunds, UK",
      image: "https://placebeard.it/600x400?2",
    },
  ];

  const renderTrip = (trip: Trip) => (
    <Card key={trip.id}>
      <CardActionArea sx={{ display: "flex", justifyContent: "flex-start" }}>
        <CardMedia
          component="img"
          sx={{ width: 200 }}
          image={trip.image}
          alt={trip.title}
        />
        <Box className={styles.tripListTextContent}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography variant="h5" textAlign="left">{trip.title}</Typography>
            <Typography variant="body2" textAlign="left">{trip.location}</Typography>
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
        <Card key="card-add">
          <CardActionArea>
            <CardContent>
            <Typography variant="h3">Add Trip</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Stack>
    </Container>
  );
};

export default TripList;
