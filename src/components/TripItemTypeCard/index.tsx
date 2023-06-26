import React, { memo, useMemo } from "react";
import { Button } from "@mui/material";

import { TripItemType } from "../../types/TripItemType";
import { getTripItemIcon, getTripItemTypeLabel } from "../../helpers/tripItems";
import { COLOURS } from "../../helpers/colours";
import { useCustomTheme } from "../../contexts/CustomTheme";
import styles from "./styles.module.css";

interface Props {
  item: TripItemType;
  onClick: (item: TripItemType) => void;
  type: "activity" | "travel";
}

/** A button representing a specific itinerary item, for the EmptyTripCard */
const TripItemTypeCard = ({ item, onClick }: Props) => {
  const { theme } = useCustomTheme();
  const Icon = () => getTripItemIcon(item);
  const friendlyName = getTripItemTypeLabel(item);

  const themeColour = useMemo(
    () => (theme === "dark" ? COLOURS.white : COLOURS.black),
    [theme]
  );

  return (
    <Button
      variant="outlined"
      startIcon={<Icon />}
      className={styles.tripItemTypeCard}
      onClick={() => onClick(item)}
      sx={{
        textTransform: "capitalize",
        color: themeColour,
        borderColor: themeColour,
      }}>
      {friendlyName ?? item}
    </Button>
  );
};

export default memo(TripItemTypeCard);
