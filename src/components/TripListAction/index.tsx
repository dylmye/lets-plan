import React from "react";
import { Add } from "@mui/icons-material";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

export enum TripListActions {
  'ACTION_ADD'
}

const actionLabels: Record<TripListActions, string> = {
  [TripListActions.ACTION_ADD]: 'Add Trip',
};

const actionIcons: Record<TripListActions, JSX.Element> = {
  [TripListActions.ACTION_ADD]: <Add fontSize="large" />,
};

export interface TripListActionProps {
  onPress: () => void;
  actionType: TripListActions;
}

const TripListAction = ({ onPress, actionType }: TripListActionProps) => (
  <Card key="card-add" sx={{ boxShadow: 0, border: "2px dashed #000" }}>
    <CardActionArea onClick={onPress}>
      <CardContent>
        <Typography variant="h3">
          {actionIcons[actionType]} {actionLabels[actionType] ?? 'Click Here'}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default TripListAction;