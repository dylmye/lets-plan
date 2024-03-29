import React from "react";
import { AutocompleteProps } from "formik-mui";
import { FieldProps } from "formik";
import { Autocomplete, Box, TextField, TextFieldProps } from "@mui/material";

export interface AutocompleteFieldProps<T = string>
  extends FieldProps,
    AutocompleteProps<T, false, true, false> {
  label: string;
  textFieldProps?: TextFieldProps;
}

/** A MUI Autocomplete Form Field, which takes any number of `options` to set a given field. For Formik. */
const AutocompleteField = <T extends React.ReactNode = string>({
  field,
  form: { setFieldValue, touched, errors, isSubmitting },
  options,
  label,
  textFieldProps,
  ...props
}: AutocompleteFieldProps<T>) => (
  <Autocomplete<T, false, true, false>
    options={options}
    renderOption={(props, option) => (
      <Box component="li" {...props}>
        {option}
      </Box>
    )}
    {...props}
    disabled={isSubmitting}
    autoHighlight
    disableClearable
    value={field.value}
    onChange={(_, newValue) => {
      setFieldValue(field.name, newValue);
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        {...textFieldProps}
        label={label}
        error={touched[field.name] && !!errors[field.name]}
        helperText={errors[field.name] as string}
        inputProps={{
          ...params.inputProps,
          autoComplete: "false", // this doesn't work on chrome, that's google's fault tho idc https://bugs.chromium.org/p/chromium/issues/detail?id=587466
        }}
        InputProps={{
          ...params?.InputProps,
          ...textFieldProps?.InputProps,
        }}
      />
    )}
  />
);

export default AutocompleteField;
