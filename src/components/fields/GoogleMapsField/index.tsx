import { useTheme } from "@mui/system";
import { FieldProps } from "formik";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { ActionMeta } from "react-select";

interface GoogleMapsFieldProps extends FieldProps<string> {
  onMapFieldChange: (newValue: {
    label: string;
    value: ActionMeta<any>;
  }) => void;
}

const GoogleMapsField = ({
  field,
  onMapFieldChange,
  ...props
}: GoogleMapsFieldProps) => {
  const { palette } = useTheme();
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
