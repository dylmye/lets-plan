import React from "react";
import { Card, CardContent } from "@mui/material";

import AddTripItemCardContents from "./AddTripItemCardContents";
import { TripItemType } from "../../types/TripItemType";
import TripDetails from "../../types/TripDetails";

export interface AddTripItemCardProps {
  initialValues: {
    type?: TripItemType;
    date?: string | null;
  };
  tripDetails: TripDetails;
  showCancel?: boolean;
  onCancel?: () => void;
}

/** Style wrapper for [`AddTripItemCardContents`](./AddTripItemCardContents.tsx)
 * with card styling, primarily for [`EmptyTripCard`](../EmptyTripCard/index.tsx)
 */
const AddTripItemCard = (props: AddTripItemCardProps) => (
  <Card>
    <CardContent sx={{ paddingBottom: 16 }}>
      <AddTripItemCardContents {...props} />
    </CardContent>
  </Card>
);

export default AddTripItemCard;
