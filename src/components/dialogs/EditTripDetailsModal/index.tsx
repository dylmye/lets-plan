import React from "react";
import { useSnackbar } from "notistack";
import { DatePicker } from "formik-mui-x-date-pickers";
import { TextField } from "formik-mui";
import { FastField, Field, Form, Formik } from "formik";
import dayjs from "dayjs";
import CardActions from "@mui/material/CardActions";
import { Box, Button, Modal, SxProps, Theme, Typography } from "@mui/material";
import { Check } from "@mui/icons-material";
import { GooglePlacesAutocompleteField } from "@dylmye/mui-google-places-autocomplete";

import BetterSwitchField from "../../fields/BetterSwitchField";
import TripDetails from "../../../types/TripDetails";
import ModalProps from "../../../types/ModalProps";
import { useUpdateTrip } from "../../../store/features/trips";
import { useIsLoggedIn } from "../../../store/features/auth";
import styles from "./styles.module.css";

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

/** Dialog with a form to edit a trip's key details */
const EditTripDetailsModal = ({
  id,
  tripDetails,
  ...props
}: EditTripDetailsModalProps) => {
  const updateTrip = useUpdateTrip();
  const { enqueueSnackbar } = useSnackbar();
  const isLoggedIn = useIsLoggedIn();
  const {
    title,
    location,
    startsAt,
    details,
    endsAt,
    public: isPublic,
  } = tripDetails;

  const onFormSubmit = async (values: TripDetails) => {
    updateTrip({
      ...values,
      id,
    });
    props.onClose();
    enqueueSnackbar("Trip details updated!");
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
            location,
            startsAt,
            endsAt,
            details: details ?? "",
            public: isPublic,
          }}
          onSubmit={onFormSubmit}>
          {({ values }) => (
            <Form className={styles.formFieldsContainer}>
              <FastField
                component={TextField}
                name="title"
                label="Name"
                fullWidth
              />
              <FastField
                component={GooglePlacesAutocompleteField}
                name="location"
                label="Location"
              />
              <FastField
                component={DatePicker}
                label="Start date"
                name="startsAt"
                textField={{
                  fullWidth: true,
                }}
              />
              <Field
                component={DatePicker}
                label="End date"
                name="endsAt"
                textField={{
                  fullWidth: true,
                }}
                defaultCalendarMonth={
                  values?.startsAt && dayjs.utc(values.startsAt)
                }
                minDate={values?.startsAt && dayjs.utc(values.startsAt)}
              />
              <FastField
                component={TextField}
                name="details"
                label="Details"
                fullWidth
                multiline
              />
              <FastField
                component={BetterSwitchField}
                name="public"
                label={`Share this trip with others${
                  !isLoggedIn ? " (requires an account)" : ""
                }`}
                disabled={!isLoggedIn}
              />
              <CardActions sx={{ justifyContent: "right" }}>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => props.onClose()}>
                  Cancel
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  type="submit">
                  <Check />
                  Update Trip
                </Button>
              </CardActions>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default EditTripDetailsModal;
