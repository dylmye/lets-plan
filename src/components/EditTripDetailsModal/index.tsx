import React from "react";
import { Box, Button, Modal, SxProps, Theme, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { ActionMeta } from "react-select";

import { useAppDispatch } from "../../app/hooks";
import ModalProps from "../../types/ModalProps";
import TripDetails from "../../types/TripDetails";
import GoogleMapsField from "../fields/GoogleMapsField";
import { updateTripById } from "../../features/tripList/tripSlice";
import styles from "./styles.module.css";
import { Check, KeyboardArrowRight } from "@mui/icons-material";

export interface EditTripDetailsModalProps extends ModalProps {
  id: string;
  tripDetails: TripDetails;
}

const dialogStyle: SxProps<Theme> = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EditTripDetailsModal = ({
  id,
  tripDetails,
  ...props
}: EditTripDetailsModalProps) => {
  const dispatch = useAppDispatch();
  const { title, location, startsAt, endsAt } = tripDetails;

  const onFormSubmit = async (values: TripDetails) => {
    dispatch(updateTripById({ id, changes: values }));
    props.onClose();
  };

  return (
    <Modal {...props} aria-labelledby="modal-edittrip-title">
      <Box sx={dialogStyle}>
        <Typography variant="h5">
          <strong id="modal-edittrip-title">Edit Trip Details</strong>
        </Typography>
        <Formik<TripDetails>
          initialValues={{
            title,
            locationData: location
              ? {
                  label: location,
                  value: {} as ActionMeta<any>,
                }
              : undefined,
            startsAt,
            endsAt,
          }}
          onSubmit={onFormSubmit}
        >
          <Form className={styles.formFieldsContainer}>
            <Field
              component={TextField}
              name="title"
              label="Name of your trip"
              fullWidth
            />
            <Field
              component={GoogleMapsField}
              name="locationData"
              offlineName="location"
              label="Where is your trip?"
            />
            <Button size="small" type="submit">
              <Check />
              Update Trip
            </Button>
          </Form>
        </Formik>
      </Box>
    </Modal>
  );
};

export default EditTripDetailsModal;
