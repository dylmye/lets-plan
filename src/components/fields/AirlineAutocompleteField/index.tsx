import React, { useCallback, useEffect, useState } from "react";
import { FieldProps } from "formik";
import axios, { AxiosResponse, AxiosResponseTransformer } from "axios";
import {
  Autocomplete,
  AutocompleteProps,
  AutocompleteRenderInputParams,
  Box,
  TextField,
  debounce,
} from "@mui/material";
import AirlineSearchResponse from "../../../types/apiResponses/AirlineSearchResponse";

interface AirlineAutocompleteFieldProps
  extends AutocompleteProps<string, false, false, true>,
    FieldProps<string> {
  label?: string;
}

/** MUI Field for the Airline API */
const AirlineAutocompleteField = ({
  field,
  form: { setFieldValue, isSubmitting },
  label,
  ...props
}: AirlineAutocompleteFieldProps) => {
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<string | null>(field.value ?? "");

  const fetchResultsInner = debounce((query: string) => {
    if (!process.env.REACT_APP_RAPIDAPI_KEY || !query || query.length < 3) {
      return;
    }
    setOptions([]);
    setLoading(true);
    axios
      .request<never, AxiosResponse<string[]>>({
        url: "https://aviation-reference-data.p.rapidapi.com/airline/search",
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
          "X-RapidAPI-Host": "aviation-reference-data.p.rapidapi.com",
        },
        params: {
          name: query,
        },
        transformResponse: [
          ...(axios.defaults.transformResponse as AxiosResponseTransformer[]),
          (
            res:
              | AxiosResponse<AirlineSearchResponse[]>
              | AirlineSearchResponse[]
          ): AxiosResponse | string[] => {
            if (Array.isArray(res)) {
              return res.map((x) => x.name);
            }
            return res;
          },
        ],
      })
      .then((results) => {
        const { data } = results;
        if (data) {
          setOptions(data);
        }
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      });
  }, 300);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchResults = useCallback(fetchResultsInner, []);

  useEffect(() => {
    fetchResults(field.value);
  }, [field.value, fetchResults]);

  const renderInputField = (
    props: AutocompleteRenderInputParams
  ): JSX.Element => <TextField {...props} label={label} fullWidth />;

  const renderOption = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: string
  ): JSX.Element => (
    <Box component="li" {...props}>
      {option}
    </Box>
  );

  return (
    <Autocomplete<string, false, false, true>
      autoComplete
      freeSolo
      inputValue={field.value ?? ""}
      onInputChange={(_, newValue) => setFieldValue(field.name, newValue ?? "")}
      value={value}
      onChange={(_, newValue) => setValue(newValue ?? "")}
      renderOption={renderOption}
      noOptionsText="Nothing found"
      loading={loading}
      disabled={isSubmitting}
      {...props}
      options={options}
      renderInput={renderInputField}
    />
  );
};

export default AirlineAutocompleteField;
