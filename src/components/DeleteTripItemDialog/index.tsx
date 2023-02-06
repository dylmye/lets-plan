import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useSnackbar } from "notistack";

import { useAppDispatch } from "../../app/hooks";
import { deleteTripItemByTripId } from "../../features/tripList/tripSlice";

interface DeleteTripItemDialogProps {
  visible: boolean;
  onClose: () => void;
  id: string;
  tripId: string;
}

/** Confirmation dialog made visible globally when a trip item delete action is called */
const DeleteTripItemDialog = ({
  visible,
  onClose,
  id,
  tripId,
}: DeleteTripItemDialogProps) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const onAccepted = () => {
    dispatch(deleteTripItemByTripId({ tripId, itemId: id }));
    onClose();
    enqueueSnackbar("Successfully deleted trip item!");
  };

  return (
    <Dialog
      open={visible}
      onClose={onClose}
      aria-labelledby="delete-trip-item-dialog-title"
      aria-describedby="delete-trip-item-dialog-description">
      <DialogTitle id="delete-trip-dialog-title">
        Delete This Trip Item?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="reset-dialog-description">
          Are you sure you want to delete this trip item?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          Cancel
        </Button>
        <Button onClick={onAccepted}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTripItemDialog;
