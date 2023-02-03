import React from "react";
import { Form, Field, useFormikContext } from "formik";
import {
  Box,
  Grid,
  ToggleButton,
  CardActions,
  Divider,
  Button,
  TextFieldProps,
} from "@mui/material";
import dayjs from "dayjs";
import { ToggleButtonGroup, TextField } from "formik-mui";
import { DateTimePicker } from "formik-mui-x-date-pickers";
import { GooglePlacesAutocompleteField } from "@dylmye/mui-google-places-autocomplete";

import TripItemDraft from "../../types/TripItemDraft";
import {
  ActivityTypes,
  TravelTypes,
  TripItemType,
} from "../../types/TripItemType";
import TripDetails from "../../types/TripDetails";
import AutocompleteField from "../fields/AutocompleteField";
import {
  getTripItemIcon,
  getTripItemTypeLabel,
  customFieldSettings,
  renderExtraField,
  tripItemExtraFields,
} from "../../helpers/tripItems";
import { useAppSelector } from "../../app/hooks";
import { selectThemeMode } from "../../features/theme/themeSlice";
import poweredByGoogleLightMode from "../../assets/images/powered_by_google_light_mode.png";
import poweredByGoogleDarkMode from "../../assets/images/powered_by_google_dark_mode.png";
import styles from "./styles.module.css";

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
  const { isSubmitting, setFieldValue, values } =
    useFormikContext<TripItemDraft>();
  const currentTheme = useAppSelector(selectThemeMode);
  const currentFieldSettings = customFieldSettings(values.type);

  const googleAttributionHelperText: TextFieldProps = {
    helperText: (
      <img
        src={
          currentTheme === "light"
            ? poweredByGoogleLightMode
            : poweredByGoogleDarkMode
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
            <ToggleButton value="travel">Travel</ToggleButton>
            <ToggleButton value="activity">Activity</ToggleButton>
          </Field>
        </Grid>
        <Grid item xs={12} md={6}>
          <Field
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
            getOptionLabel={getTripItemTypeLabel}
            name="type"
            label={`Type of ${values.category}`}
            validate={fieldIsRequired}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Field
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
                minDate={dayjs(tripDetails?.startsAt)}
                maxDate={dayjs(tripDetails?.endsAt)}
                validate={(value: string) => {
                  const requireCheck = fieldIsRequired(value);
                  const startsAtAfterTripStart = dayjs(value).isSameOrAfter(
                    tripDetails?.startsAt
                  );
                  const startsAtBeforeTripEnd = dayjs(value).isSameOrBefore(
                    tripDetails?.endsAt
                  );

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
                    helperText: values.category === "activity" && "Optional",
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

                    const endsAtAfterStartsAt = dayjs(value).isAfter(
                      values.startsAt
                    );
                    const endsAtBeforeTripEnd = dayjs(value).isSameOrBefore(
                      tripDetails?.endsAt as string
                    );

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
                <Field
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
                <Field
                  component={GooglePlacesAutocompleteField}
                  name="destinationLocation"
                  label={currentFieldSettings.destinationLocationLabel}
                  inputProps={googleAttributionHelperText}
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
