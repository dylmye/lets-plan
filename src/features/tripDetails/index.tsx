import React, { useEffect, Fragment } from "react";
import { Box, Container, Stack, SxProps, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";

import TripItineraryItem from "../../components/TripItineraryItem";
import {
  selectTripIds,
  selectTripById,
  selectTripItemsByDay,
} from "../tripList/tripSlice";
import { useAppSelector } from "../../app/hooks";
import TripItineraryItemBase from "../../types/TripItineraryItemBase";
import { COLOURS } from "../../helpers/colours";

const TripDetails = () => {
  const { tripId } = useParams();
  const tripIds = useAppSelector(selectTripIds);
  const trip = useAppSelector(selectTripById(tripId as string));
  const groupedItems = useAppSelector(selectTripItemsByDay(tripId as string));

  const renderItem = (item: TripItineraryItemBase) => (
    <TripItineraryItem item={item} key={item.startsAt} />
  );

  const renderItemDay = (day: string, items: TripItineraryItemBase[]) => (
    <Fragment key={day}>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", marginY: 4, textAlign: "left" }}
      >
        {dayjs.utc(day).format("LL")}
      </Typography>
      <Stack spacing={2}>{items.map(renderItem)}</Stack>
    </Fragment>
  );

  const titleBackgroundImageStyle: SxProps | undefined = !!trip?.image
    ? ({
        background: `linear-gradient( rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25) ), url('${trip.image}')`,
        aspectRatio: "16 / 9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      } as SxProps)
    : undefined;

  useEffect(() => {
    if (!tripId || !tripIds.includes(tripId)) {
      throw Error("Trip not found or has been deleted");
    }
  }, [tripId, tripIds]);
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
      </Box>
      {Object.keys(groupedItems).map((k) => renderItemDay(k, groupedItems[k]))}
    </Container>
  );
};

export default TripDetails;
