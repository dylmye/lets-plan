import { Link } from "react-router-dom";
import dayjs from "dayjs";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { Place } from "@mui/icons-material";

import TripDetailsAction from "../TripDetailsAction";
import Trip from "../../types/Trip";
import { formatDate, formatDaysUntil } from "../../helpers/dates";
import styles from "./styles.module.css";

export interface TripListItemCardProps {
  trip: Trip;
}

const now = dayjs().startOf("day").format();

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
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      component={Link}
      to={`/trip/${trip.id}`}>
      <Box
        className={`${styles.tripListTextContent} ${
          trip.image ? styles.tripListTextOverImage : ""
        }`}>
        <CardHeader
          title={trip.title}
          titleTypographyProps={{
            variant: "h5",
            textAlign: "left",
            className: styles.tripListTitle,
            fontWeight: "bold",
          }}
          action={<TripDetailsAction trip={trip} />}
        />
        <CardContent
          sx={{
            display: "flex",
            flex: "1 0 auto",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          classes={{
            root: styles.cardContentPaddingOverride,
          }}>
          <Box className={styles.tripListDetails}>
            {trip.location && (
              <Typography
                variant="body2"
                textAlign="left"
                className={styles.tripListLocationText}>
                <Place fontSize="small" className={styles.tripListTextIcon} />
                {trip.location}
              </Typography>
            )}
            {trip.startsAt && (
              <Box>
                <Typography
                  variant="body2"
                  textAlign="left"
                  sx={{ display: { xs: "none", sm: "block" } }}>
                  {formatDate(trip.startsAt, "long")} -{" "}
                  {trip.endsAt ? formatDate(trip.endsAt, "long") : ""}
                </Typography>
                <Typography
                  variant="body2"
                  textAlign="left"
                  sx={{ display: { xs: "block", sm: "none" } }}>
                  {formatDate(trip.startsAt, "short")} -{" "}
                  {trip.endsAt ? formatDate(trip.endsAt, "short") : ""}
                </Typography>
                <Typography
                  variant="body2"
                  textAlign={trip.location ? "right" : "left"}>
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
