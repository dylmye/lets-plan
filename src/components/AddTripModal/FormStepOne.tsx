import React, { useCallback } from "react";
import { useTheme } from "@mui/material";
import { Field, FieldProps, useFormikContext } from "formik";
import { TextField as FormikTextField, TextFieldProps } from "formik-mui";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { ActionMeta } from "react-select";

import styles from "./styles.module.css";
import { TripDraft } from "../../types/TripDraft";

const FormStepOne = () => {
  const { palette } = useTheme();
  const { setFieldValue } = useFormikContext<TripDraft>();

  const onMapFieldChange = useCallback(
    (newValue: { label: string; value: ActionMeta<any> }) => {
      setFieldValue("locationData", newValue);
    },
    [setFieldValue]
  );

  const TextField = useCallback(
    (props: TextFieldProps) => <FormikTextField {...props} fullWidth />,
    []
  );
  const GoogleMapsField = useCallback(
    ({ field, ...props }: FieldProps<string>) => (
      <GooglePlacesAutocomplete
        {...props}
        selectProps={{
          value: field.value,
          onChange: onMapFieldChange,
          placeholder: "Where is this trip?",
          styles: {
            control: (provided) => ({
              ...provided,
              backgroundColor: palette.background.paper,
              padding: "6.5px 4px",
            }),
            input: (provided) => ({
              ...provided,
              color: palette.text.primary,
            }),
            menu: (provided) => ({
              ...provided,
              backgroundColor: palette.mode === "dark" ? "#080808" : palette.background.paper,
              color: palette.text.primary,
            }),
          },
        }}
      />
    ),
    [onMapFieldChange, palette]
  );

  return (
    <div className={styles.formFieldsContainer}>
      <Field component={TextField} name="title" label="Name of your trip" />
      <Field
        component={GoogleMapsField}
        name="locationData"
        label="Where is your trip?"
      />
    </div>
  );
};

export default FormStepOne;
