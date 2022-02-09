import React from "react";
import { Alert } from "@mui/material";
import { Field } from "formik";

import styles from "./AddTripModal.module.css";
import UploadImageField from "../../components/UploadImageField";

interface StepThreeProps {
  /** Controls loading status indicator for image upload */
  isImageUploading: boolean;
}

const FormStepThree = ({ isImageUploading }: StepThreeProps) => {

  return (
    <div className={styles.formFieldsContainer}>
      {isImageUploading && (<Alert severity="info">Uploading...</Alert>)}
      <Field
        component={UploadImageField}
        name="coverImageBlob"
        label="Upload a cover picture (optional)"
      />
    </div>
  );
};

export default FormStepThree;
