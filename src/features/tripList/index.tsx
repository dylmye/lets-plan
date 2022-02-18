import React, { useState } from "react";
import {
  Container,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";

import styles from "./TripList.module.css";
import { Trip } from "../../types/Trip";
import AddTripModal from "../../components/AddTripModal";
import TripListItem from "../../components/TripListItem";
import TripListAction, {
  TripListActions,
} from "../../components/TripListAction";
import { useAppSelector } from "../../app/hooks";
import { rootTripSelector, selectTrips } from "./tripSlice";

const TripList = () => {
  const loading = false;
  const trips = useAppSelector(selectTrips);

  const [addModalVisible, toggleModalVisibility] = useState(false);

  const Placeholder = () => (
    <Skeleton variant="rectangular" height={150} sx={{ borderRadius: 1 }} />
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
          <>
            {trips?.length ? trips.map((trip) => (
              <TripListItem trip={trip} key={`trip-${trip.id}`} />
            )) : <Typography variant="h4">Add a trip to get started :)</Typography>}
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
