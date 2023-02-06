import React, { memo } from "react";
import { Alert } from "@mui/material";

interface OfflineAlertProps {
  isOnline: boolean;
}

/** Warn users when network can't be reached. Controlled component */
const OfflineAlert = ({ isOnline }: OfflineAlertProps) =>
  !isOnline ? (
    <Alert severity="info">
      You're offline - your trips are still accessible and you can still make
      changes, but images and links might not load.
    </Alert>
  ) : null;

export default memo(OfflineAlert);
