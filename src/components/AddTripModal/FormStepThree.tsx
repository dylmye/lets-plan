import React from "react";
import { Alert, Typography } from "@mui/material";
import { Field } from "formik";

import styles from "./styles.module.css";
import UploadImageField from "../UploadImageField";

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
      <Typography variant="body2"><strong>Recommended size:</strong> 600x400px / 3:2 ratio<br /><strong>Max size:</strong> 1MB</Typography>
    </div>
  );
};

export default FormStepThree;
