import { useDropzone } from "react-dropzone";
import { isMobile } from "react-device-detect";
import React, { useCallback, useState } from "react";
import { FieldProps } from "formik";

import styles from "./styles.module.css";

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
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
      "image/heic": [".heif", ".heic"], // this format sucks bc patents but iphones be iphoning
    },
    maxFiles: 1,
  });

  const targetText = isMobile
    ? "Tap to select a picture"
    : "Drag 'n' drop a picture here, or click here to select a picture";

  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <label>Upload a cover picture (optional)</label>
      <input {...getInputProps()} />
      {!previewUri ? (
        <div className={styles.dropzoneLabel}>
          {isDragActive ? (
            <span>Drop the picture here...</span>
          ) : (
            <span>{targetText}</span>
          )}
        </div>
      ) : (
        <img
          src={previewUri}
          alt="Preview of your cover"
          className={styles.dropzonePreview}
        />
      )}
    </div>
  );
};

export default UploadImageField;
