import React from "react";
import { TextField } from "formik-mui";
import { Field, FieldProps } from "formik";
import { Box, InputAdornment } from "@mui/material";

import AutocompleteField, {
  AutocompleteFieldProps,
} from "../AutocompleteField";
import CurrencyDetails from "../../../types/CurrencyDetails";
import CURRENCIES from "../../../helpers/currency";
import styles from "./styles.module.css";

export interface IntlPriceFieldProps extends FieldProps<string> {
  /** Optional props to pass on the currency dropdown */
  currencySelectorProps?: AutocompleteFieldProps<CurrencyDetails>;
  /** The field name for the currency selector */
  currencySelectorFieldName: string;
  disabled?: boolean;
  label?: string;
}

const IntlPriceField = ({
  field,
  form,
  meta,
  label,
  disabled = false,
  currencySelectorFieldName,
  currencySelectorProps,
}: IntlPriceFieldProps) => {
  const CurrencyDropdownAdornment = (
    <InputAdornment position="start">
      <Field
        component={AutocompleteField}
        options={Object.keys(CURRENCIES)}
        name={currencySelectorFieldName}
        renderOption={(
          props: React.HTMLAttributes<HTMLLIElement>,
          option: string
        ) => {
          const opts = CURRENCIES[option];
          return (
            <Box
              component="li"
              {...props}
              key={`currency-dropdown-${option}`}
              title={opts.friendly}>
              {opts.symbol}
            </Box>
          );
        }}
        classes={{
          root: styles.currencyAutocomplete,
          input: styles.currencyAutocompleteInput,
        }}
        sx={{
          "& fieldset": { border: "none" },
        }}
        getOptionLabel={(o: string) => CURRENCIES[o].symbol}
        {...currencySelectorProps}
      />
    </InputAdornment>
  );

  return (
    <TextField
      field={field}
      form={form}
      meta={meta}
      label={label}
      disabled={disabled || form.isSubmitting}
      InputProps={{
        startAdornment: CurrencyDropdownAdornment,
      }}
    />
  );
};

export default IntlPriceField;
