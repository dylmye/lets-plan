import { useNavigate } from "react-router-dom";
import React from "react";
import { useSnackbar } from "notistack";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { useDeleteTrip } from "../../store/features/trips";

interface DeleteTripDialogProps {
  visible: boolean;
  onClose: () => void;
  id: string;
  title: string;
}

/** Confirmation dialog made visible globally when a trip delete action is called */
const DeleteTripDialog = ({
  visible,
  onClose,
  id,
  title,
}: DeleteTripDialogProps) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const deleteTrip = useDeleteTrip();

  const onAccepted = () => {
    deleteTrip(id);
    onClose();
    navigate("/");
    window.location.reload();
    enqueueSnackbar("Trip deleted!");
  };

  return (
    <Dialog
      open={visible}
      onClose={onClose}
      aria-labelledby="delete-trip-dialog-title"
      aria-describedby="delete-trip-dialog-description">
      <DialogTitle id="delete-trip-dialog-title">Delete This Trip?</DialogTitle>
      <DialogContent>
        <DialogContentText id="reset-dialog-description">
          Are you sure you want to delete the trip <em>{title}</em>? You can't
          undo this!
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

export default DeleteTripDialog;
