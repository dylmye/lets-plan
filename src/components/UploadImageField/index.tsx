import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FieldProps } from "formik";

interface Props extends FieldProps {
  previewUri?: string | null;
}

/** Wrapper for Dropzone, for a single picture */
const UploadImageField = ({
  previewUri,
  field,
  form: { setFieldValue },
}: Props) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFieldValue(field.name, acceptedFiles[0]);
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
      {isDragActive ? (
        <p>Drop the picture here ...</p>
      ) : (
        <p>Drag 'n' drop the picture here, or click to select files</p>
      )}
      <p>{previewUri}</p>
    </div>
  );
};

export default UploadImageField;
