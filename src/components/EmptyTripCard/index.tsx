import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

/** Combined display for trips with no items */
const EmptyTripCard = () => (
  <Card>
    <CardContent>
      <Typography variant="h4">Add your plans</Typography>
    </CardContent>
  </Card>
);

export default EmptyTripCard;
