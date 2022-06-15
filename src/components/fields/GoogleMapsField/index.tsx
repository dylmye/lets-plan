import { useTheme } from "@mui/system";
import { FieldProps } from "formik";
import { TextField } from "formik-mui";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { ActionMeta } from "react-select";

import { useOnlineStatus } from "../../../contexts/OnlineStatus";

interface GoogleMapsFieldProps extends FieldProps<string> {
  offlineName?: string;
  onMapFieldChange: (newValue: {
    label: string;
    value: ActionMeta<string>;
  }) => void;
}

/** Google Maps Places API autocomplete, with offline backup */
const GoogleMapsField = ({
  field,
  offlineName,
  onMapFieldChange,
  ...props
}: GoogleMapsFieldProps) => {
  const { online } = useOnlineStatus();
  const { palette } = useTheme();

  if (!online && offlineName) {
    return (
      <TextField {...props} field={{...field, name: offlineName}}  />
    );
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
