import { useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useEffect, useState } from "react";
import {
  Box,
  Collapse,
  Container,
  Divider,
  IconButton,
  Skeleton,
  Stack,
  SxProps,
  Theme,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Add,
  // FilterAlt,
} from "@mui/icons-material";

import TripItem from "../../types/Tripitem";
import Trip from "../../types/Trip";
import { useGetTripById } from "../../store/features/trips";
import { tripIsExample, tripIsOwnedByUser } from "../../helpers/trips";
import { groupTripItemsByDay } from "../../helpers/tripItems";
import { dateCompare, formatDate } from "../../helpers/dates";
import { COLOURS } from "../../helpers/colours";
import { auth } from "../../firebase";
import TripItineraryItem from "../../components/TripItineraryItem";
import TripDetailsAction from "../../components/TripDetailsAction";
import SuggestionsCard from "../../components/SuggestionsCard";
import StyledLink from "../../components/StyledLink";
import EmptyTripCard from "../../components/EmptyTripCard";
import DeleteTripItemDialog from "../../components/dialogs/DeleteTripItemDialog";
import AddTripItemCard from "../../components/AddTripItemCard";
import styles from "./styles.module.css";

const TripDetails = () => {
  const { tripId } = useParams();
  const { trip, loading } = useGetTripById(tripId as string);
  const [user] = useAuthState(auth);
  const [activeAddTripItemCardDay, setActiveTripItemCardDay] = useState<
    string | undefined | null
  >(null);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [itemEditModeState, setEditModeState] = useState<
    Record<string, boolean>
  >({});

  const groupedItems = groupTripItemsByDay(trip?.items ?? []);
  const theme = useTheme();
  const deviceIsBiggerThanXs = useMediaQuery(theme.breakpoints.up("sm"));
  const isExample = !tripId || tripIsExample(tripId);
  const isOwned = !!trip && tripIsOwnedByUser(trip, user?.uid);
  const isEditable = !isExample && isOwned;

  const setEditModeForTripItem = (
    tripItemId: string,
    newValue: boolean
  ): void => {
    setEditModeState({
      ...itemEditModeState,
      [tripItemId]: newValue,
    });
  };

  const renderTripItem = (item: TripItem): JSX.Element => (
    <TripItineraryItem
      item={item}
      key={`trip-item-${item.startsAt}-${item.type}`}
      trip={trip as Trip}
      onDeleteTripItem={(itemId: string) => setDeleteItemId(itemId)}
      showEditMode={itemEditModeState[item.id] ?? false}
      onToggleEditTripItem={setEditModeForTripItem}
    />
  );

  const xsItemHeaderStyles: SxProps<Theme> = {
    position: "sticky",
    top: 46,
    marginX: "-5px",
    padding: 1,
    backgroundColor: "background.default",
  };

  const renderItemDay = (day: string, items: TripItem[]): JSX.Element => (
    <Container key={day} disableGutters>
      <Box
        className={styles.itemDayHeaderContainer}
        sx={!deviceIsBiggerThanXs ? xsItemHeaderStyles : {}}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            textAlign: "left",
          }}>
          <time dateTime={day}>{formatDate(day, "long")}</time>
        </Typography>
        <Stack direction="row" spacing={1}>
          {isEditable && (
            <Tooltip title="Add to day">
              <IconButton
                aria-label="Add an item this day"
                onClick={() =>
                  setActiveTripItemCardDay(
                    activeAddTripItemCardDay !== day ? day : null
                  )
                }>
                <Add fontSize="inherit" />
              </IconButton>
            </Tooltip>
          )}
          {/* <Tooltip title="Filter day">
            <IconButton aria-label="Filter the items in this day">
              <FilterAlt fontSize="inherit" />
            </IconButton>
          </Tooltip> */}
        </Stack>
      </Box>
      <Stack spacing={2}>
        <Collapse
          in={activeAddTripItemCardDay === day}
          key={`add-trip-item-card-${day}`}
          unmountOnExit>
          <AddTripItemCard
            initialValues={{ date: day }}
            tripDetails={{
              id: trip?.id,
              title: trip?.title as string,
              location: trip?.location,
              startsAt: trip?.startsAt as string,
              endsAt: trip?.endsAt as string,
            }}
            showCancel
            onCancel={() => setActiveTripItemCardDay(null)}
          />
        </Collapse>
        {items
          .sort((a, b) => dateCompare(a.startsAt, b.startsAt))
          .map(renderTripItem)}
      </Stack>
    </Container>
  );

  const titleBackgroundImageStyle: SxProps | undefined = !!trip?.image
    ? ({
        background: `linear-gradient( rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25) ), url('${trip.image}') no-repeat scroll 50% 50%`,
        backgroundSize: "cover",
        aspectRatio: "16 / 9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: "4px",
      } as SxProps)
    : undefined;

  useEffect(() => {
    document.title = trip?.title
      ? `${trip?.title} - Let's Plan!`
      : "Trip Details - Let's Plan!";
  }, [trip?.title, tripId]);

  const isEmptyTrip = !loading && Object.keys(groupedItems).length < 1;

  const TripHeaderPlaceholder = () => (
    <Skeleton
      variant="rectangular"
      height={450}
      className={styles.tripItemPlaceholder}
    />
  );

  const TripItemPlaceholder = () => (
    <Container disableGutters>
      <Skeleton variant="text" className={styles.tripDayHeaderPlaceholder} />
      <Skeleton
        variant="rectangular"
        height={172}
        className={styles.tripItemPlaceholder}
      />
    </Container>
  );

  if (!trip && !loading) {
    return (
      <Container>
        <Typography variant="body1" textAlign="left">
          <StyledLink to="/trips">&#8604; Back to trips</StyledLink>
        </Typography>
        <Typography variant="h3">Trip not found</Typography>
        <p>
          If you created this trip, you may have deleted it, or migrated it to
          your account. If the trip was shared by someone else, the owner may
          have made it private or deleted it.
        </p>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="body1" textAlign="left">
        <StyledLink to="/trips">&#8604; Back to trips</StyledLink>
      </Typography>
      {loading ? (
        <TripHeaderPlaceholder />
      ) : (
        <Box sx={titleBackgroundImageStyle}>
          <div className={styles.headerTextContainer}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                marginBottom: 2,
                color: titleBackgroundImageStyle && COLOURS.white,
              }}>
              {trip?.title}
            </Typography>
            {trip && <TripDetailsAction trip={trip} />}
          </div>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              marginBottom: 2,
              color: titleBackgroundImageStyle && COLOURS.white,
            }}>
            {trip?.startsAt ? (
              <time dateTime={trip.startsAt}>
                {formatDate(trip.startsAt, "long", false)}
              </time>
            ) : (
              ""
            )}{" "}
            -{" "}
            {trip?.endsAt ? (
              <time dateTime={trip.endsAt}>
                {formatDate(trip.endsAt, "long", false)}
              </time>
            ) : (
              ""
            )}
            <br />
            {trip?.location}
          </Typography>
        </Box>
      )}
      {trip?.details && (
        <Typography
          variant="body1"
          sx={{ marginTop: 2, whiteSpace: "pre-wrap" }}>
          {trip.details}
        </Typography>
      )}
      <Stack spacing={2}>
        {isEmptyTrip && trip ? (
          <Box sx={{ marginTop: 2 }}>
            <EmptyTripCard
              id={trip.id}
              startsAt={trip.startsAt}
              title={trip.title}
              location={trip.location}
              endsAt={trip.endsAt}
            />
          </Box>
        ) : (
          <Box>
            {loading ? (
              <TripItemPlaceholder key="placeholder-1" />
            ) : (
              Object.keys(groupedItems)
                .sort(dateCompare)
                .map((k) => renderItemDay(k, groupedItems[k]))
            )}
          </Box>
        )}
        <Divider />
        <SuggestionsCard />
      </Stack>
      <DeleteTripItemDialog
        visible={!!deleteItemId}
        onClose={() => setDeleteItemId(null)}
        id={deleteItemId || ""}
        tripId={trip?.id as string}
      />
    </Container>
  );
};

export default TripDetails;
