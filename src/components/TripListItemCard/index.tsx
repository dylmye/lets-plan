import React from "react";
import { Place } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import { Trip } from "../../types/Trip";
import styles from "./styles.module.css";
import { formatDate, formatDaysUntil } from "../../helpers/dates";

export interface TripListItemCardProps {
  trip: Trip;
}

const now = dayjs();

/** Index item with a preview of the trip */
const TripListItemCard = ({ trip }: TripListItemCardProps) => (
  <Card>
    <CardActionArea
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        background:
          trip.image &&
          `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.5)), url(${trip.image})`,
        backgroundPosition: "50%",
      }}
      component={Link}
      to={`/trip/${trip.id}`}
    >
      <Box
        className={`${styles.tripListTextContent} ${
          trip.image ? styles.tripListTextOverImage : ""
        }`}
      >
        <CardContent
          sx={{
            display: "flex",
            flex: "1 0 auto",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "8rem",
            // gap: "3rem",
          }}
          classes={{
            root: styles.cardContentPaddingOverride,
          }}
        >
          <Typography
            variant="h5"
            textAlign="left"
            className={styles.tripListTitle}
            fontWeight="bold"
          >
            {trip.title}
          </Typography>
          <Box className={styles.tripListDetails}>
            {trip.location && (
              <Typography
                variant="body2"
                textAlign="left"
                className={styles.tripListLocationText}
              >
                <Place fontSize="small" className={styles.tripListTextIcon} />
                {trip.location}
              </Typography>
            )}
            {trip.startsAt && (
              <Box>
                <Typography variant="body2" textAlign="left" sx={{ display: { xs: 'none', sm: 'block' } }}>
                  {formatDate(trip.startsAt, "long", false)} -{" "}
                  {trip.endsAt ? formatDate(trip.endsAt, "long", false) : ""}
                </Typography>
                <Typography variant="body2" textAlign="left" sx={{ display: { xs: 'block', sm: 'none' } }}>
                  {formatDate(trip.startsAt, "short", false)} -{" "}
                  {trip.endsAt ? formatDate(trip.endsAt, "short", false) : ""}
                </Typography>
                <Typography
                  variant="body2"
                  textAlign={trip.location ? "right" : "left"}
                >
                  {formatDaysUntil(trip.startsAt, now)}
                </Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </Box>
    </CardActionArea>
  </Card>
);

export default TripListItemCard;
