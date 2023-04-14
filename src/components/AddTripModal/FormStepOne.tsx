import React from "react";
import { TextField } from "formik-mui";
import { FastField } from "formik";

import LocationField from "../fields/LocationField";
import styles from "./styles.module.css";

const FormStepOne = () => (
  <div className={styles.formFieldsContainer}>
    <FastField
      component={TextField}
      fullWidth
      name="title"
      label="Name of your trip"
    />
    <FastField
      component={LocationField}
      name="location"
      label="Where are you going?"
    />
  </div>
);

export default FormStepOne;
