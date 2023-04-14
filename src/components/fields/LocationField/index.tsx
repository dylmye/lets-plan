import React from "react";
import { TextField } from "formik-mui";
import { FieldProps } from "formik";
import { TextFieldProps } from "@mui/material";
import { GooglePlacesAutocompleteField } from "@dylmye/mui-google-places-autocomplete";

import { useOnlineStatus } from "../../../contexts/OnlineStatus";
import { useCustomTheme } from "../../../contexts/CustomTheme";
import poweredByGoogleLightMode from "../../../assets/images/powered_by_google_light_mode.png";
import poweredByGoogleDarkMode from "../../../assets/images/powered_by_google_dark_mode.png";
import styles from "./styles.module.css";

interface LocationFieldProps extends FieldProps {
  inputProps?: TextFieldProps;
}

/** A wrapper around GooglePlacesAutocompleteField with an offline fallback */
const LocationField = ({
  inputProps = {},
  ...props
}: LocationFieldProps & any) => {
  const { theme } = useCustomTheme();
  const { online: isOnline } = useOnlineStatus();

  const googleAttributionHelperText: TextFieldProps = {
    helperText: (
      <img
        src={
          theme === "light" ? poweredByGoogleLightMode : poweredByGoogleDarkMode
        }
        alt="This location search field uses Google APIs."
        className={styles.googleAttribution}
      />
    ),
  };

  if (isOnline) {
    return (
      <GooglePlacesAutocompleteField
        inputProps={{ ...googleAttributionHelperText, ...inputProps }}
        {...props}
      />
    );
  }

  return (
    <TextField
      fullWidth
      {...props}
      helperText="Location suggestions aren't available offline"
      {...inputProps}
    />
  );
};

export default LocationField;
