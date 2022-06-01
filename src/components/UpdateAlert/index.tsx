import React from "react";
import { Alert, Button } from "@mui/material";
import {
  ServiceWorkerUpdaterProps,
  withServiceWorkerUpdater,
} from "@3m1/service-worker-updater";

interface UpdateAlertProps {
  isOnline: boolean;
}

/** Display a message + action when there's a new version of LP */
const UpdateAlert = ({
  newServiceWorkerDetected,
  onLoadNewServiceWorkerAccept,
  isOnline,
}: ServiceWorkerUpdaterProps & UpdateAlertProps) =>
  isOnline && newServiceWorkerDetected ? (
    <Alert
      severity="info"
      action={
        <Button
          color="inherit"
          size="small"
          onClick={onLoadNewServiceWorkerAccept}
        >
          Reload
        </Button>
      }
    >
      Reload now to get the latest version of <em>Let's Plan</em>.
    </Alert>
  ) : null;

export default withServiceWorkerUpdater(UpdateAlert);
