import React from "react";
import { Field } from "formik";

import styles from "./AddTripModal.module.css";
import UploadImageField from "../../components/UploadImageField";

const FormStepThree = () => {

  return (
    <div className={styles.formFieldsContainer}>
      <Field
        component={UploadImageField}
        name="coverImageBlob"
        label="Upload a cover picture (optional)"
        onDrop={console.log}
      />
    </div>
  );
};

export default FormStepThree;
