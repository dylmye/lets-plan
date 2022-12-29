import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import { deleteTripById } from "../../features/tripList/tripSlice";

interface DeleteTripDialogProps {
  visible: boolean;
  onClose: () => void;
  id: string;
  title: string;
}

const DeleteTripDialog = ({
  visible,
  onClose,
  id,
  title,
}: DeleteTripDialogProps) => {
  const dispatch = useAppDispatch();
  
  const onAccepted = () => {
    dispatch(deleteTripById(id));
    onClose();
  };

  return (
    <Dialog
      open={visible}
      onClose={onClose}
      aria-labelledby="delete-trip-dialog-title"
      aria-describedby="delete-trip-dialog-description"
    >
      <DialogTitle id="delete-trip-dialog-title">Delete This Trip?</DialogTitle>
      <DialogContent>
        <DialogContentText id="reset-dialog-description">
          Are you sure you want to delete the trip <em>{title}</em>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          Cancel
        </Button>
        <Button onClick={onAccepted}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTripDialog;
