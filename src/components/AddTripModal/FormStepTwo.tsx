import React from "react";
import { Field } from "formik";
import { TextField } from "formik-mui";

import styles from "./styles.module.css";

const FormStepTwo = () => (
  <div className={styles.formFieldsContainer}>
    <Field
      component={TextField}
      name="startsAt"
      label="When does your trip start?"
      fullWidth
      type="date"
      InputLabelProps={{
        shrink: true,
      }}
    />
    <Field
      component={TextField}
      name="endsAt"
      label="And when does it end?"
      fullWidth
      type="date"
      InputLabelProps={{
        shrink: true,
      }}
    />
  </div>
);

export default FormStepTwo;
