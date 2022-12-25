import React from "react";
import { Autocomplete, Box, TextField } from "@mui/material";
import { FieldProps } from "formik";
import { AutocompleteProps } from "formik-mui";

interface AutocompleteFieldProps<T = string>
  extends FieldProps,
    AutocompleteProps<T, false, true, false> {
  label: string;
}

/** A MUI Autocomplete Form Field, which takes any number of `options` to set a given field. For Formik. */
const AutocompleteField = <T = string>({
  field,
  form: { setFieldValue, touched, errors },
  options,
  label,
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
    autoHighlight
    disableClearable
    value={field.value}
    onChange={(_, newValue) => {
      setFieldValue(field.name, newValue);
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        label={label}
        error={touched[field.name] && !!errors[field.name]}
        helperText={errors[field.name]}
        inputProps={{
          ...params.inputProps,
          autoComplete: "false", // this doesn't work on chrome, that's google's fault tho idc https://bugs.chromium.org/p/chromium/issues/detail?id=587466
        }}
      />
    )}
  />
);

export default AutocompleteField;
