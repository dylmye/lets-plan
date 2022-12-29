import React from "react";
import { Card, CardContent } from "@mui/material";

import AddTripItemCardContents from "./AddTripItemCardContents";
import { TripItemType } from "../../types/TripItemType";
import TripDetails from '../../types/TripDetails';

export interface AddTripItemCardProps {
  initialValues: {
    type?: TripItemType;
    date?: string | null;
  };
  tripDetails?: TripDetails;
}

const AddTripItemCard = (props: AddTripItemCardProps) => (
  <Card>
    <CardContent>
      <AddTripItemCardContents {...props} />
    </CardContent>
  </Card>
);

export default AddTripItemCard;
