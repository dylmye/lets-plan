import React, { useCallback } from "react";
import { Field } from "formik";
import { TextField as FormikTextField, TextFieldProps } from "formik-mui";

import styles from "./AddTripModal.module.css";

const FormStepTwo = () => {
  const DateField = useCallback(
    (props: TextFieldProps) => (
      <FormikTextField
        {...props}
        fullWidth
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
      />
    ),
    []
  );

  return (
    <div className={styles.formFieldsContainer}>
      <Field
        component={DateField}
        name="startsAt"
        label="When does your trip start?"
      />
      <Field
        component={DateField}
        name="endsAt"
        label="And when does it end?"
      />
    </div>
  );
};

export default FormStepTwo;
