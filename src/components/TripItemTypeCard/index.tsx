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

const TripItemTypeCard = ({ item, onClick }: Props) => {
  const Icon = () => getTripItemIcon(item);
  const friendlyName = getEnumKeyByEnumValue(TripItemType, item);

  return (
    <Button
      variant="outlined"
      startIcon={<Icon />}
      className={styles.tripItemTypeCard}
      onClick={() => onClick(item)}
    >
      {friendlyName ?? item}
    </Button>
  );
};

export default memo(TripItemTypeCard);
