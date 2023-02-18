import React from "react";
import { Field } from "formik";
import { Alert, Typography } from "@mui/material";

import UploadImageField from "../fields/UploadImageField";
import styles from "./styles.module.css";

interface StepThreeProps {
  /** Controls loading status indicator for image upload */
  isImageUploading: boolean;
}

const FormStepThree = ({ isImageUploading }: StepThreeProps) => (
  <div className={styles.formFieldsContainer}>
    {isImageUploading && <Alert severity="info">Uploading...</Alert>}
    <Field
      component={UploadImageField}
      name="coverImageBlob"
      label="Upload a cover picture (optional)"
    />
    <Typography variant="body2">
      <strong>Recommended size:</strong> 600x400px / 3:2 ratio
      <br />
      <strong>Max size:</strong> 1MB
    </Typography>
  </div>
);

export default FormStepThree;
