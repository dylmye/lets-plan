import React from "react";
import { Field, Form, Formik } from "formik";
import {
  Box,
  Button,
  CardActions,
  Divider,
  Grid,
  ToggleButton,
} from "@mui/material";
import { Switch, TextField, ToggleButtonGroup } from "formik-mui";
import { DateTimePicker } from "formik-mui-x-date-pickers";
import dayjs from "dayjs";

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
  tripItemExtraFields,
} from "../../helpers/tripItems";

const AddTripItemCardContents = ({
  initialValues,
  tripDetails,
}: AddTripItemCardProps) => {
  const fieldNameToLabel = (name: string): string => {
    const result = name.replace(/([A-Z]{1,})/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };
  const renderExtraField = (field: string, fieldType: string): JSX.Element => {
    switch (fieldType) {
      case "toggle": {
        console.log(fieldNameToLabel(field));
        return (
          <Field
            name={field}
            label={fieldNameToLabel(field)}
            component={Switch}
            type="checkbox"
          />
        );
      }
      // @TODO: dropdown, optional-dropdown, connected-dropdown
      default:
        return (
          <Field
            name={field}
            label={fieldNameToLabel(field)}
            component={TextField}
            fullWidth
          />
        );
    }
  };

  return (
    <Formik<TripItemDraft>
      initialValues={{
        category: TravelTypes.includes(initialValues.type as TripItemType)
          ? "travel"
          : "activity",
        type: initialValues.type as TripItemType,
        startsAt: initialValues.date as string,
        title: '',
      }}
      onSubmit={console.log}
    >
      {({ values, setFieldValue }) => (
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
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                component={TextField}
                name="title"
                label="Title"
                fullWidth
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
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    component={DateTimePicker}
                    label="Finishes At"
                    name="endsAt"
                    textField={{
                      helperText: values.category === "activity" && "Optional",
                      fullWidth: true,
                    }}
                    minDate={values.startsAt && dayjs(values.startsAt)}
                    maxDate={dayjs(tripDetails?.endsAt)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider flexItem />
                </Grid>
              </>
            )}
            {values.type &&
              Object.keys(tripItemExtraFields[values.type]).map((field) => (
                <Grid item xs={12} md={6} key={`extra-field-griditem-${field}`}>
                  {renderExtraField(
                    field,
                    tripItemExtraFields[values.type][field]
                  )}
                </Grid>
              ))}
          </Grid>
          <CardActions sx={{ justifyContent: 'right' }}>
            <Button type="submit" variant="contained">
              Add to trip
            </Button>
          </CardActions>
        </Form>
      )}
    </Formik>
  );
};

export default AddTripItemCardContents;
