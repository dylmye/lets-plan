import { useTheme } from "@mui/system";
import { FieldProps } from "formik";
import { TextField } from "formik-mui";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { ActionMeta, OnChangeValue } from "react-select";

import { useOnlineStatus } from "../../../contexts/OnlineStatus";

export type GoogleMapsChangeProps = OnChangeValue<
  { label: string; value: ActionMeta<any> },
  false
>;

interface GoogleMapsFieldProps extends FieldProps<string> {
  onMapFieldChange: (newValue: {
    label: string;
    value: ActionMeta<string>;
  }) => void;
}

/** Google Maps Places API autocomplete, with offline backup */
const GoogleMapsField = ({
  field,
  onMapFieldChange,
  ...props
}: GoogleMapsFieldProps) => {
  const { online } = useOnlineStatus();
  const { palette } = useTheme();

  if (!online) {
    return <TextField {...props} field={field} />;
  }

  return (
    <GooglePlacesAutocomplete
      {...props}
      selectProps={{
        value: field.value,
        onChange: onMapFieldChange,
        placeholder: "Where is this trip?",
        styles: {
          control: (provided) => ({
            ...provided,
            backgroundColor: palette.background.paper,
            padding: "6.5px 4px",
          }),
          input: (provided) => ({
            ...provided,
            color: palette.text.primary,
          }),
          menu: (provided) => ({
            ...provided,
            backgroundColor:
              palette.mode === "dark" ? "#080808" : palette.background.paper,
            color: palette.text.primary,
          }),
        },
      }}
    />
  );
};

export default GoogleMapsField;
