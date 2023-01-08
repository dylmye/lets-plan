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
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const onAccepted = () => {
    dispatch(deleteTripById(id));
    onClose();
    navigate("/");
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
          Are you sure you want to delete the trip <em>{title}</em>?
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
