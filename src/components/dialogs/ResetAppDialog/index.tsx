import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface ResetAppDialogProps {
  visible: boolean;
  onClose: () => void;
  onAccepted: () => void;
  disabled?: boolean;
  authenticated?: boolean;
}

/** Confirmation for destroying everything locally */
const ResetAppDialog = ({
  visible,
  onClose,
  onAccepted,
  disabled = false,
  authenticated = false,
}: ResetAppDialogProps) => (
  <Dialog
    open={visible}
    onClose={onClose}
    aria-labelledby="reset-dialog-title"
    aria-describedby="reset-dialog-description">
    <DialogTitle id="reset-dialog-title">Reset The App?</DialogTitle>
    <DialogContent>
      <DialogContentText id="reset-dialog-description">
        Resetting the app will {authenticated && "log you out and "}
        permanently delete any local trips. Do you wish to continue?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} autoFocus disabled={disabled}>
        Cancel
      </Button>
      <Button onClick={onAccepted} disabled={disabled} color="error">
        Reset App
      </Button>
    </DialogActions>
  </Dialog>
);

export default ResetAppDialog;
