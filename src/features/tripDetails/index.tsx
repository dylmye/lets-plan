import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Collapse,
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
import { useParams } from "react-router-dom";
import {
  Add,
  // FilterAlt,
} from "@mui/icons-material";

import styles from "./styles.module.css";
import { selectTripIds, useSelectTripById } from "../tripList/tripSlice";
import { useAppSelector } from "../../app/hooks";
import TripItineraryItemBase from "../../types/TripItineraryItemBase";
import { COLOURS } from "../../helpers/colours";
import { dateCompare, formatDate } from "../../helpers/dates";
import { groupTripItemsByDay } from "../../helpers/tripItems";
import TripItineraryItem from "../../components/TripItineraryItem";
import EmptyTripCard from "../../components/EmptyTripCard";
import SuggestionsCard from "../../components/SuggestionsCard";
import StyledLink from "../../components/StyledLink";
import AddTripItemCard from "../../components/AddTripItemCard";
import TripDetailsAction from "../../components/TripDetailsAction";
import DeleteTripItemDialog from "../../components/DeleteTripItemDialog";

interface TripDetailsProps {
  /** In edit mode? */
  edit?: boolean;
}

const TripDetails = ({ edit = false }: TripDetailsProps) => {
  const { tripId } = useParams();
  const tripIds = useAppSelector(selectTripIds);
  const [trip, loading] = useSelectTripById(tripId as string);
  const [activeAddTripItemCardDay, setActiveTripItemCardDay] = useState<
    string | undefined | null
  >(null);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

  const groupedItems = groupTripItemsByDay(trip?.items ?? []);
  const theme = useTheme();
  const deviceIsBiggerThanXs = useMediaQuery(theme.breakpoints.up("sm"));
  const tripIsExample = tripId === "example";

  const renderTripItem = (item: TripItineraryItemBase): JSX.Element => (
    <TripItineraryItem
      item={item}
      key={`trip-item-${item.startsAt}-${item.type}`}
      tripId={trip?.id as string}
      onDeleteTripItem={(itemId: string) => setDeleteItemId(itemId)}
    />
  );

  const xsItemHeaderStyles: SxProps<Theme> = {
    position: "sticky",
    top: 46,
    marginX: "-5px",
    padding: 1,
    backgroundColor: "background.default",
  };

  const renderItemDay = (
    day: string,
    items: TripItineraryItemBase[]
  ): JSX.Element => (
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
          {!tripIsExample && (
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
  }, [trip?.title, tripId, tripIds]);

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
            {trip?.id && !tripIsExample && <TripDetailsAction id={trip.id} />}
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
        <Typography variant="body1" sx={{ marginTop: 2, whiteSpace: "pre" }}>
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
