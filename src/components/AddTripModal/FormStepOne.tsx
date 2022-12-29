import React from "react";
import { Field } from "formik";
import { TextField } from "formik-mui";

import styles from "./styles.module.css";
import { GooglePlacesAutocompleteField } from "@dylmye/mui-google-places-autocomplete";

const FormStepOne = () => (
  <div className={styles.formFieldsContainer}>
    <Field
      component={TextField}
      fullWidth
      name="title"
      label="Name of your trip"
    />
    <Field
      component={GooglePlacesAutocompleteField}
      name="location"
      label="Where is your trip?"
    />
  </div>
);

export default FormStepOne;
