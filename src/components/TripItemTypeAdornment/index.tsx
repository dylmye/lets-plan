import React from "react";
import { IconButton, InputAdornment } from "@mui/material";

import { TripItemType } from "../../types/TripItemType";
import { getTripItemIcon } from "../../helpers/tripItems";

interface TripItemTypeAdornmentProps {
  type: TripItemType;
  position?: "start" | "end";
}

/** An Input Adornment which illustrates the trip item type */
const TripItemTypeAdornment = ({
  type,
  position = "start",
}: TripItemTypeAdornmentProps) =>
  !!type && (
    <InputAdornment position={position}>
      <IconButton aria-label={type} edge="end">
        {getTripItemIcon(type)}
      </IconButton>
    </InputAdornment>
  );

export default TripItemTypeAdornment;
