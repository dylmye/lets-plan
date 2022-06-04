import React, { memo } from "react";
import { Button } from "@mui/material";

import { TripItemType } from "../../types/TripItemType";
import styles from "./styles.module.css";
import { getTripItemIcon } from "../../helpers/tripItems";
import { getEnumKeyByEnumValue } from "../../helpers/enums";

interface Props {
  item: TripItemType;
  onClick: (item: TripItemType) => void;
  type: "activity" | "travel";
}

/** A button representing a specific itinerary item, for the EmptyTripCard */
const TripItemTypeCard = ({ item, onClick }: Props) => {
  const Icon = () => getTripItemIcon(item);
  const friendlyName = getEnumKeyByEnumValue(TripItemType, item);

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
      }}
    >
      {friendlyName ?? item}
    </Button>
  );
};

export default memo(TripItemTypeCard);
