import React, { memo } from "react";
import { Button } from "@mui/material";

import { TripItemType } from "../../types/TripItemType";
import styles from "./styles.module.css";
import { getTripItemIcon, getTripItemTypeLabel } from "../../helpers/tripItems";

interface Props {
  item: TripItemType;
  onClick: (item: TripItemType) => void;
  type: "activity" | "travel";
}

/** A button representing a specific itinerary item, for the EmptyTripCard */
const TripItemTypeCard = ({ item, onClick }: Props) => {
  const Icon = () => getTripItemIcon(item);
  const friendlyName = getTripItemTypeLabel(item);

  return (
    <Button
      variant="outlined"
      startIcon={<Icon />}
      className={styles.tripItemTypeCard}
      onClick={() => onClick(item)}
      sx={{
        textTransform: "capitalize",
        color: "#ffffff",
        borderColor: "#ffffff",
      }}>
      {friendlyName ?? item}
    </Button>
  );
};

export default memo(TripItemTypeCard);
