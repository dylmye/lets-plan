import React, { ForwardedRef, forwardRef } from "react";
import { Card, CardContent } from "@mui/material";

import { TripItemType } from "../../types/TripItemType";
import TripDetails from "../../types/TripDetails";
import AddTripItemCardContents from "./AddTripItemCardContents";

export interface AddTripItemCardProps {
  initialValues: {
    type?: TripItemType;
    date?: string | null;
  };
  tripDetails: TripDetails;
  showCancel?: boolean;
  onCancel?: () => void;
}

/** Style + Ref Forwarding wrapper for [`AddTripItemCardContents`](./AddTripItemCardContents.tsx)
 * with card styling, primarily for [`EmptyTripCard`](../EmptyTripCard/index.tsx)
 */
const AddTripItemCard = (
  props: AddTripItemCardProps,
  ref: ForwardedRef<HTMLDivElement>
) => (
  <Card ref={ref}>
    <CardContent sx={{ paddingBottom: 16 }}>
      <AddTripItemCardContents {...props} />
    </CardContent>
  </Card>
);

export default forwardRef<HTMLDivElement, AddTripItemCardProps>(
  AddTripItemCard
);
