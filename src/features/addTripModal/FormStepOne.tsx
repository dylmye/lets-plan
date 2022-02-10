import React, { useCallback } from "react";
import { Field, FieldProps, useFormikContext } from "formik";
import { TextField as FormikTextField, TextFieldProps } from "formik-mui";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { ActionMeta } from "react-select";

import styles from "./AddTripModal.module.css";
import { TripDraft } from "../../types/TripDraft";

const FormStepOne = () => {
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
        }}
      />
    ),
    [onMapFieldChange]
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
