import React from "react";
import { Field, Form, Formik } from "formik";
import {
  Box,
  Button,
  CardActions,
  Divider,
  Grid,
  ToggleButton,
  TextFieldProps,
} from "@mui/material";
import { TextField, ToggleButtonGroup } from "formik-mui";
import { DateTimePicker } from "formik-mui-x-date-pickers";
import dayjs from "dayjs";
import { GooglePlacesAutocompleteField } from "@dylmye/mui-google-places-autocomplete";

import { AddTripItemCardProps } from ".";
import styles from "./styles.module.css";
import TripItemDraft from "../../types/TripItemDraft";
import {
  ActivityTypes,
  TravelTypes,
  TripItemType,
} from "../../types/TripItemType";
import AutocompleteField from "../fields/AutocompleteField";
import {
  getTripItemIcon,
  getTripItemTypeLabel,
  customFieldSettings,
  renderExtraField,
  tripItemExtraFields,
} from "../../helpers/tripItems";
import poweredByGoogleLightMode from "../../assets/images/powered_by_google_light_mode.png";
import poweredByGoogleDarkMode from "../../assets/images/powered_by_google_dark_mode.png";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectThemeMode } from "../../features/theme/themeSlice";
import { addTripItemByTripId } from "../../features/tripList/tripSlice";

const AddTripItemCardContents = ({
  initialValues,
  tripDetails,
  showCancel = false,
  onCancel,
}: AddTripItemCardProps) => {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector(selectThemeMode);

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
    <Formik<TripItemDraft>
      initialValues={{
        category: TravelTypes.includes(initialValues.type as TripItemType)
          ? "travel"
          : "activity",
        type: (initialValues.type as TripItemType) ?? null,
        title: "",
        startsAt: initialValues.date as string,
        endsAt: null,
      }}
      onSubmit={(values) => {
        if (!tripDetails?.id) {
          console.error("Couldn't add trip item, no trip id specified");
          return;
        }

        dispatch(
          addTripItemByTripId({
            ...values,
            id: tripDetails.id,
            startsAt: dayjs(values.startsAt).format(),
            endsAt: values.endsAt && dayjs(values.endsAt).format(),
          })
        );

        onCancel && onCancel();
      }}
      // validationSchema={validationSchema} We can't use validation here because the type is a dictionary (to allow extra fields)
    >
      {({ values, setFieldValue, isSubmitting }) => {
        const currentFieldSettings = customFieldSettings(values.type);

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
                  onChange={(
                    _event: any,
                    newValue: "travel" | "activity" | null
                  ) => {
                    if (newValue !== null) {
                      setFieldValue("category", newValue);
                      setFieldValue("type", null);
                    }
                  }}
                  disabled={isSubmitting}
                >
                  <ToggleButton value="travel">Travel</ToggleButton>
                  <ToggleButton value="activity">Activity</ToggleButton>
                </Field>
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  component={AutocompleteField}
                  options={
                    values.category === "travel" ? TravelTypes : ActivityTypes
                  }
                  renderOption={(
                    props: React.HTMLAttributes<HTMLLIElement>,
                    option: TripItemType
                  ) => (
                    <Box
                      component="li"
                      sx={{ "& > svg": { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
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
                      validate={fieldIsRequired}
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
                            values.category === "activity" && "Optional",
                          fullWidth: true,
                        }}
                        defaultCalendarMonth={dayjs(values.startsAt)}
                        minDate={values.startsAt && dayjs(values.startsAt)}
                        maxDate={dayjs(tripDetails?.endsAt)}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Divider flexItem />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      component={GooglePlacesAutocompleteField}
                      name={
                        values.category === "travel"
                          ? "originLocation"
                          : "location"
                      }
                      label={
                        currentFieldSettings.originLocationLabel ?? "Location"
                      }
                      inputProps={googleAttributionHelperText}
                      autocompletionRequest={
                        values.type === TripItemType.Plane && {
                          types: ["airport"],
                        }
                      }
                    />
                  </Grid>
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
                  <Grid
                    item
                    xs={12}
                    md={6}
                    key={`extra-field-griditem-${field}`}
                  >
                    {renderExtraField(
                      field,
                      tripItemExtraFields[values.type][field]
                    )}
                  </Grid>
                ))}
            </Grid>
            <CardActions sx={{ justifyContent: "right" }}>
              {showCancel && onCancel && (
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={isSubmitting}
                  onClick={() => onCancel()}
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                color="primary"
              >
                Add to trip
              </Button>
            </CardActions>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddTripItemCardContents;
