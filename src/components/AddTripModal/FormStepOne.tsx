import React, { useCallback } from "react";
import { Field, useFormikContext } from "formik";
import { TextField } from "formik-mui";
import { ActionMeta } from "react-select";

import styles from "./styles.module.css";
import TripDraft from "../../types/TripDraft";
import GoogleMapsField from "../fields/GoogleMapsField";

const FormStepOne = () => {
  const { setFieldValue } = useFormikContext<TripDraft>();

  const onMapFieldChange = useCallback(
    (newValue: { label: string; value: ActionMeta<any> }) => {
      setFieldValue("locationData", newValue);
    },
    [setFieldValue]
  );

  return (
    <div className={styles.formFieldsContainer}>
      <Field
        component={TextField}
        fullWidth
        name="title"
        label="Name of your trip"
      />
      <Field
        component={GoogleMapsField}
        name="locationData"
        offlineName="location"
        label="Where is your trip?"
        onMapFieldChange={onMapFieldChange}
      />
    </div>
  );
};

export default FormStepOne;
