import React, { memo } from "react";
import { Card } from "@mui/material";

import { TripItemType } from "../../types/TripItemType";
import styles from "./styles.module.css";
import { getTripItemIcon } from "../../helpers/tripItems";
import { getEnumKeyByEnumValue } from "../../helpers/enums";

interface Props {
  item: TripItemType;
  type: "activity" | "travel";
}

const TripItemTypeCard = ({ item }: Props) => {
  const Icon = () => getTripItemIcon(item);
  const friendlyName = getEnumKeyByEnumValue(TripItemType, item);

  return (
    <Card variant="outlined" className={styles.tripItemTypeCard}>
      {Icon && <Icon />}
      {friendlyName ?? item}
    </Card>
  );
};

export default memo(TripItemTypeCard);
