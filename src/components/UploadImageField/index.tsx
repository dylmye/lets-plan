import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FieldProps } from "formik";

import styles from "./UploadImageField.module.css";

interface Props extends FieldProps {}

/** Wrapper for Dropzone, for a single picture */
const UploadImageField = ({ field, form: { setFieldValue } }: Props) => {
  const [previewUri, setPreviewUri] = useState<string | null>(null);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFieldValue(field.name, acceptedFiles[0]);
      setPreviewUri(URL.createObjectURL(acceptedFiles[0]));
    },
    [field.name, setFieldValue]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png, image/webp",
    maxFiles: 1,
  });

  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <label>Upload a cover picture (optional)</label>
      <input {...getInputProps()} />
      {!previewUri ? (
        <div className={styles.dropzoneLabel}>
          {isDragActive ? (
            <span>Drop the picture here...</span>
          ) : (
            <span>
              Drag 'n' drop the picture here, or click to select files
            </span>
          )}
        </div>
      ) : (
        <img src={previewUri} alt="Preview of your cover" className={styles.dropzonePreview} />
      )}
    </div>
  );
};

export default UploadImageField;
