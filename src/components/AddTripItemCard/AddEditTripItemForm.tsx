import React from "react";
import { DateTimePicker } from "formik-mui-x-date-pickers";
import { TextField, ToggleButtonGroup } from "formik-mui";
import { FastField, Field, Form, useFormikContext } from "formik";
import dayjs from "dayjs";
import {
  Box,
  Button,
  CardActions,
  Divider,
  Grid,
  TextFieldProps,
  ToggleButton,
} from "@mui/material";
import { GooglePlacesAutocompleteField } from "@dylmye/mui-google-places-autocomplete";

import TripItemTypeAdornment from "../TripItemTypeAdornment";
import IntlPriceField from "../fields/IntlPriceField";
import AutocompleteField from "../fields/AutocompleteField";
import {
  ActivityTypes,
  TravelTypes,
  TripItemType,
} from "../../types/TripItemType";
import TripItemDraft from "../../types/TripItemDraft";
import TripDetails from "../../types/TripDetails";
import {
  customFieldSettings,
  getTripItemIcon,
  getTripItemTypeLabel,
  renderExtraField,
  tripItemExtraFields,
} from "../../helpers/tripItems";
import { useCustomTheme } from "../../contexts/CustomTheme";
import poweredByGoogleLightMode from "../../assets/images/powered_by_google_light_mode.png";
import poweredByGoogleDarkMode from "../../assets/images/powered_by_google_dark_mode.png";
import styles from "./styles.module.css";
import { butcherDatetimeTimezone } from "../../helpers/dates";

export interface AddEditTripItemFormProps {
  showCancel?: boolean;
  onCancel?: () => void;
  formMode?: "add" | "edit";
  tripDetails: TripDetails;
}

/** The actual form shape, for adding and editing Trip Items. */
const AddEditTripItemForm = ({
  showCancel = false,
  onCancel = () => {},
  formMode = "add",
  tripDetails,
}: AddEditTripItemFormProps) => {
  const { isSubmitting, setFieldValue, values, errors } =
    useFormikContext<TripItemDraft>();
  const { theme } = useCustomTheme();
  const currentFieldSettings = customFieldSettings(values.type);

  const googleAttributionHelperText: TextFieldProps = {
    helperText: (
      <img
        src={
          theme === "light" ? poweredByGoogleLightMode : poweredByGoogleDarkMode
        }
        alt="This location search field uses Google APIs."
        className={styles.googleAttribution}
      />
    ),
  };

  const fieldIsRequired = (value: string): string | null =>
    !value ? "This field is required" : null;

  return (
    <Form className={styles.formFieldsContainer}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Field
            component={ToggleButtonGroup}
            name="category"
            type="checkbox"
            exclusive
            fullWidth
            onChange={(_event: any, newValue: "travel" | "activity" | null) => {
              if (newValue !== null) {
                setFieldValue("category", newValue);
                setFieldValue("type", null);
              }
            }}
            disabled={isSubmitting}>
            <ToggleButton value="travel" autoFocus>
              Travel
            </ToggleButton>
            <ToggleButton value="activity">Activity</ToggleButton>
          </Field>
        </Grid>
        <Grid item xs={12} md={6}>
          <FastField
            component={AutocompleteField}
            options={values.category === "travel" ? TravelTypes : ActivityTypes}
            renderOption={(
              props: React.HTMLAttributes<HTMLLIElement>,
              option: TripItemType
            ) => (
              <Box
                component="li"
                sx={{ "& > svg": { mr: 2, flexShrink: 0 } }}
                {...props}>
                {getTripItemIcon(option)}
                {getTripItemTypeLabel(option)}
              </Box>
            )}
            textFieldProps={{
              InputProps: {
                startAdornment: <TripItemTypeAdornment type={values.type} />,
              },
            }}
            getOptionLabel={getTripItemTypeLabel}
            name="type"
            label={`Type of ${values.category}`}
            validate={fieldIsRequired}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FastField
            component={TextField}
            name="title"
            label="Title"
            fullWidth
            helperText="Optional"
          />
        </Grid>
        {values.type && (
          <>
            <Grid item xs={12}>
              <Divider flexItem />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                component={DateTimePicker}
                label="Starts At"
                name="startsAt"
                textField={{
                  helperText: "'All day' option coming soon",
                  fullWidth: true,
                }}
                minDate={dayjs(butcherDatetimeTimezone(tripDetails?.startsAt))}
                maxDate={dayjs(butcherDatetimeTimezone(tripDetails?.endsAt))}
                validate={(value: string) => {
                  const requireCheck = fieldIsRequired(value);
                  const startsAtAfterTripStart = dayjs
                    .utc(value)
                    .isSameOrAfter(tripDetails?.startsAt);
                  const startsAtBeforeTripEnd = dayjs
                    .utc(value)
                    .isSameOrBefore(tripDetails?.endsAt, "day");

                  return (
                    requireCheck ??
                    (!startsAtAfterTripStart
                      ? "Can't start before the start of the trip"
                      : !startsAtBeforeTripEnd
                      ? "Can't start after the trip ends"
                      : null)
                  );
                }}
              />
            </Grid>
            {currentFieldSettings.hasDestination && (
              <Grid item xs={12} md={6}>
                <Field
                  component={DateTimePicker}
                  label="Finishes At"
                  name="endsAt"
                  textField={{
                    helperText:
                      errors?.endsAt ??
                      (values.category === "activity" && "Optional"),
                    error: !!errors?.endsAt,
                    fullWidth: true,
                  }}
                  defaultCalendarMonth={dayjs(values.startsAt)}
                  minDate={values.startsAt && dayjs(values.startsAt)}
                  maxDate={dayjs(tripDetails?.endsAt)}
                  validate={(value: string) => {
                    // don't show errors when startsAt will be erroring
                    if (!values.startsAt) {
                      return null;
                    }

                    if (!values.endsAt) {
                      return "End date is required";
                    }

                    const endsAtAfterStartsAt = dayjs
                      .utc(value)
                      .isAfter(values.startsAt);
                    const endsAtBeforeTripEnd = dayjs
                      .utc(value)
                      .isSameOrBefore(tripDetails?.endsAt as string, "day");

                    return !endsAtAfterStartsAt
                      ? "Can't finish before starting"
                      : !endsAtBeforeTripEnd
                      ? "Can't finish after the end of the trip"
                      : null;
                  }}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <Divider flexItem />
            </Grid>
            {currentFieldSettings.hasOrigin && (
              <Grid item xs={12} md={6}>
                <FastField
                  component={GooglePlacesAutocompleteField}
                  name={
                    values.category === "travel" ? "originLocation" : "location"
                  }
                  label={currentFieldSettings.originLocationLabel ?? "Location"}
                  inputProps={googleAttributionHelperText}
                  autocompletionRequest={
                    values.type === TripItemType.Plane && {
                      types: ["airport"],
                    }
                  }
                />
              </Grid>
            )}
            {values.category === "travel" && (
              <Grid item xs={12} md={6}>
                <FastField
                  component={GooglePlacesAutocompleteField}
                  name="destinationLocation"
                  label={currentFieldSettings.destinationLocationLabel}
                  disabled={
                    (!values.originLocation && !values.destinationLocation) ||
                    isSubmitting
                  }
                  inputProps={{
                    helperText:
                      errors?.destinationLocation ??
                      googleAttributionHelperText.helperText,
                    error: !!errors?.destinationLocation,
                  }}
                  validate={(value: string) => {
                    if (!!values.originLocation && !value) {
                      return "Destination required";
                    }
                    return null;
                  }}
                />
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <FastField
                component={TextField}
                name="details"
                label="Notes"
                fullWidth
                multiline
                helperText="Optional"
                minRows={2}
                maxRows={7}
              />
            </Grid>
            {currentFieldSettings.hasReference && (
              <Grid item xs={12} md={6}>
                <FastField
                  component={TextField}
                  name="reference"
                  label="Booking / Confirmation Reference"
                  fullWidth
                  helperText="Optional"
                />
              </Grid>
            )}
            {currentFieldSettings.hasPrice && (
              <Grid item xs={12} md={6}>
                <FastField
                  component={IntlPriceField}
                  name="price"
                  label="Price / Budget"
                  fullWidth
                  helperText="Optional"
                  currencySelectorFieldName="priceCurrency"
                />
              </Grid>
            )}
          </>
        )}
        {values.type &&
          Object.keys(tripItemExtraFields[values.type]).map((field) => (
            <Grid item xs={12} md={6} key={`extra-field-griditem-${field}`}>
              {renderExtraField(field, tripItemExtraFields[values.type][field])}
            </Grid>
          ))}
      </Grid>
      <CardActions sx={{ justifyContent: "right" }}>
        {showCancel && onCancel && (
          <Button
            variant="contained"
            color="secondary"
            disabled={isSubmitting}
            onClick={() => onCancel()}>
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          color="primary">
          {formMode === "add" ? "Add to trip" : "Update"}
        </Button>
      </CardActions>
    </Form>
  );
};

export default AddEditTripItemForm;
