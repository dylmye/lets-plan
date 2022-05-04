import React, { useEffect, Fragment } from "react";
import {
  Box,
  Container,
  Stack,
  SxProps,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";

import TripItineraryItem from "../../components/TripItineraryItem";
import {
  selectTripIds,
  selectTripById,
  selectTripItemsByDay,
} from "../tripList/tripSlice";
import { useAppSelector } from "../../app/hooks";
import TripItineraryItemBase from "../../types/TripItineraryItemBase";
import { COLOURS } from "../../helpers/colours";
import { formatDate } from "../../helpers/dates";

const TripDetails = () => {
  const { tripId } = useParams();
  const tripIds = useAppSelector(selectTripIds);
  const trip = useAppSelector(selectTripById(tripId as string));
  const groupedItems = useAppSelector(selectTripItemsByDay(tripId as string));
  const theme = useTheme();
  const deviceIsBiggerThanXs = useMediaQuery(theme.breakpoints.up("sm"));

  const renderItem = (item: TripItineraryItemBase) => (
    <TripItineraryItem item={item} key={item.startsAt} />
  );

  const xsItemHeaderStyles: SxProps<Theme> = {
    position: "sticky",
    top: 0,
    marginX: "-5px",
    paddingY: 2,
    paddingX: 2,
    backgroundColor: "rgba(255, 248, 243, 1)",
  };

  const renderItemDay = (day: string, items: TripItineraryItemBase[]) => (
    <Fragment key={day}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          marginY: 4,
          textAlign: "left",
          ...(!deviceIsBiggerThanXs ? xsItemHeaderStyles : {}),
        }}
      >
        <time dateTime={day}>{formatDate(day, "long")}</time>
      </Typography>
      <Stack spacing={2}>{items.map(renderItem)}</Stack>
    </Fragment>
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
      } as SxProps)
    : undefined;

  useEffect(() => {
    if (!tripId || !tripIds.includes(tripId)) {
      throw Error("Trip not found or has been deleted");
    }
    document.title = trip?.title
      ? `${trip?.title} - Let's Plan!`
      : "Trip Details - Let's Plan!";
  }, [trip?.title, tripId, tripIds]);

  return (
    <Container>
      <Typography variant="body1" textAlign="left">
        <Link to="/trips">&#8604; Back to trips</Link>
      </Typography>
      <Box sx={titleBackgroundImageStyle}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            marginBottom: 2,
            color: titleBackgroundImageStyle && COLOURS.white,
          }}
        >
          {trip?.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            marginBottom: 2,
            color: titleBackgroundImageStyle && COLOURS.white,
          }}
        >
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
      {Object.keys(groupedItems).map((k) => renderItemDay(k, groupedItems[k]))}
    </Container>
  );
};

export default TripDetails;
