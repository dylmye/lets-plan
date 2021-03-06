import React, { useCallback } from "react";
import { Field, useFormikContext } from "formik";
import { TextField } from "formik-mui";
import { ActionMeta } from "react-select";

import styles from "./styles.module.css";
import TripDraft from "../../types/TripDraft";
import GoogleMapsField from "../fields/GoogleMapsField";
import { useSmartFieldName } from "../../helpers/forms";

const FormStepOne = () => {
  const { setFieldValue } = useFormikContext<TripDraft>();
  const locationFieldName = useSmartFieldName('locationData', 'location');

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
        name={locationFieldName}
        label="Where is your trip?"
        onMapFieldChange={onMapFieldChange}
      />
    </div>
  );
};

export default FormStepOne;
