import React, { useEffect, useState } from "react";
import { Container, Skeleton, Stack, Typography } from "@mui/material";

import styles from "./styles.module.css";
import AddTripModal from "../../components/AddTripModal";
import TripListItem from "../../components/TripListItem";
import TripListAction, {
  TripListActions,
} from "../../components/TripListAction";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentTrips, selectPastTrips } from "./tripSlice";

const TripList = () => {
  const loading = false;
  const currentTrips = useAppSelector(selectCurrentTrips);
  const pastTrips = useAppSelector(selectPastTrips);

  const [addModalVisible, toggleModalVisibility] = useState(false);

  const Placeholder = () => (
    <Skeleton
      variant="rectangular"
      height={150}
      className={styles.tripListItemPlaceholder}
    />
  );

  useEffect(() => {
    document.title = "Let's Plan!"
  }, []);

  return (
    <Container maxWidth="md" className={styles.tripListContainer}>
      <Stack spacing={2}>
        {loading ? (
          <>
            <Placeholder key="placeholder-1" />
            <Placeholder key="placeholder-2" />
          </>
        ) : (
          <>
            {currentTrips?.length ? (
              currentTrips.map((trip) => (
                <TripListItem trip={trip} key={`trip-${trip.id}`} />
              ))
            ) : !pastTrips?.length ? (
              <Typography
                key="header-no-current-items"
                variant="h4"
                sx={{ marginY: 4 }}
              >
                Add a trip to get started :&#41;
              </Typography>
            ) : null}
          </>
        )}
        <TripListAction
          key="trip-action-add"
          onPress={() => toggleModalVisibility(true)}
          actionType={TripListActions.ACTION_ADD}
        />
      </Stack>
      {!loading && pastTrips?.length ? (
        <>
          <Typography
            key="header-past-trips"
            variant="h4"
            sx={{ fontWeight: "bold", marginTop: 6, marginBottom: 2 }}
          >
            Past Trips
          </Typography>
          <Stack spacing={2}>
            {pastTrips.map((trip) => (
              <TripListItem trip={trip} key={`trip-${trip.id}`} />
            ))}
          </Stack>
        </>
      ) : null}
      <AddTripModal
        open={addModalVisible}
        onClose={() => toggleModalVisibility(false)}
      />
    </Container>
  );
};

export default TripList;
