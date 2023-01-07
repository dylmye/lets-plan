import React from "react";
import { FieldProps } from "formik";
import { FormControlLabel, Switch, SwitchProps } from "@mui/material";

export interface BetterSwitchFieldProps
  extends FieldProps<boolean>,
    Omit<SwitchProps, "form" | "type"> {
  label?: string;
}

/** Formik-MUI switch annoys me so here's one that works better for us */
const BetterSwitchField = ({
  field,
  form: { setFieldValue, isSubmitting },
  label,
  ...props
}: BetterSwitchFieldProps) => {
  if (label) {
    return (
      <FormControlLabel
        control={
          <Switch
            checked={!!field.value}
            onChange={(_, checked) => setFieldValue(field.name, checked)}
            {...props}
          />
        }
        label={label}
        disabled={isSubmitting}
      />
    );
  }

  return (
    <Switch
      disabled={isSubmitting}
      {...props}
      checked={!!field.value}
      onChange={(_, checked) => setFieldValue(field.name, checked)}
    />
  );
};

export default BetterSwitchField;
