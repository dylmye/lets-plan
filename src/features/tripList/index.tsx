import React, { useEffect, useState } from "react";
import { Container, Skeleton, Stack, Typography } from "@mui/material";

import { useGetTripsByDateSplit } from "../../store/features/trips";
import { useWelcomeCardDismissed } from "../../store/features/preferences";
import WelcomeCard from "../../components/WelcomeCard";
import TripListItemCard from "../../components/TripListItemCard";
import TripListAction, {
  TripListActions,
} from "../../components/TripListAction";
import AddTripModal from "../../components/AddTripModal";
import styles from "./styles.module.css";

const TripList = () => {
  const { past, futureCurrent, loading } = useGetTripsByDateSplit();
  const welcomeCardHidden = useWelcomeCardDismissed();

  const [addModalVisible, toggleModalVisibility] = useState(false);

  const Placeholder = () => (
    <Skeleton
      variant="rectangular"
      height={150}
      className={styles.tripListItemPlaceholder}
    />
  );

  useEffect(() => {
    document.title = "Let's Plan!";
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
            {!welcomeCardHidden && <WelcomeCard />}
            {futureCurrent?.length ? (
              futureCurrent.map((trip) => (
                <TripListItemCard trip={trip} key={`trip-${trip.id}`} />
              ))
            ) : !past?.length ? (
              <Typography
                key="header-no-current-items"
                variant="h4"
                sx={{ marginY: 4 }}>
                Add a trip to get started :&#41;
              </Typography>
            ) : null}
          </>
        )}
        <TripListAction
          key="trip-action-add"
          onClick={() => toggleModalVisibility(true)}
          actionType={TripListActions.ACTION_ADD}
        />
      </Stack>
      {!loading && past?.length ? (
        <>
          <Typography
            key="header-past-trips"
            variant="h4"
            sx={{ fontWeight: "bold", marginTop: 6, marginBottom: 2 }}>
            Past Trips
          </Typography>
          <Stack spacing={2}>
            {past.map((trip) => (
              <TripListItemCard trip={trip} key={`trip-${trip.id}`} />
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
