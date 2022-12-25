import React from "react";
import { Card, CardContent } from "@mui/material";

import { TripItemType } from "../../types/TripItemType";
import AddTripItemCardContents from "./AddTripItemCardContents";

export interface AddTripItemCardProps {
  initialValues: {
    type?: TripItemType;
    date?: string | null;
  };
}

const AddTripItemCard = (props: AddTripItemCardProps) => (
  <Card>
    <CardContent>
      <AddTripItemCardContents {...props} />
    </CardContent>
  </Card>
);

export default AddTripItemCard;
