import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import StyledLink from "../../StyledLink";
import { useExportTrips } from "../../../store/features/trips";
import styles from "./styles.module.css";

interface ManageDataDialogProps {
  visible: boolean;
  onClose: () => void;
  authenticated?: boolean;
}

/** Options for downloading/deleting trip data */
const ManageDataDialog = ({
  visible,
  onClose,
  authenticated = false,
}: ManageDataDialogProps) => {
  const exportTrips = useExportTrips();
  console.log({ exportTrips });
  return (
    <Dialog
      open={visible}
      onClose={onClose}
      aria-labelledby="manage-dialog-title"
      aria-describedby="manage-dialog-description">
      <DialogTitle id="manage-dialog-title">Manage Your Data</DialogTitle>
      <DialogContent>
        <DialogContentText id="manage-dialog-description">
          You're in change of your data on Let's Plan. Your trip data is stored{" "}
          <strong>
            {authenticated
              ? "in Firestore, a Google product"
              : "exclusively on your device"}
          </strong>
          .
          <br />
          Your trip photos (if you have uploaded any) are stored on{" "}
          <strong>Cloud Storage for Firebase, a Google product</strong>. Read
          the{" "}
          <StyledLink onClick={() => onClose()} to="/legal">
            Privacy Policy
          </StyledLink>{" "}
          for a better understanding of how your data is used.
          <br />
          <br />
          Click the button below to download a copy of your data.
          <br />
          <Button variant="contained" className={styles.actionButton}>
            Download my data
          </Button>
          <br />
          Click the button below to delete the trip data from{" "}
          {authenticated ? "Firestore" : "your device"}, as well as any trip
          images you have uploaded.{" "}
          <strong>This action is irreversible.</strong>
          <br />
          <Button
            variant="contained"
            color="error"
            className={styles.actionButton}>
            Delete my data
          </Button>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default ManageDataDialog;
