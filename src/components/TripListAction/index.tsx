import React from "react";
import { Add } from "@mui/icons-material";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

import styles from "./styles.module.css";

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
  onClick: () => void;
  actionType: TripListActions;
}

const TripListAction = ({ onClick, actionType }: TripListActionProps) => (
  <Card key="card-add" className={styles.tripListActionCard} sx={{ borderColor: "palette.text.secondary" }}>
    <CardActionArea onClick={onClick}>
      <CardContent>
        <Typography variant="h4" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          {actionIcons[actionType]} {actionLabels[actionType] ?? 'Click Here'}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default TripListAction;
