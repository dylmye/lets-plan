import React from "react";
import { TextField } from "formik-mui";
import { FastField } from "formik";
import { TextFieldProps } from "@mui/material";
import { GooglePlacesAutocompleteField } from "@dylmye/mui-google-places-autocomplete";

import { useCustomTheme } from "../../contexts/CustomTheme";
import poweredByGoogleLightMode from "../../assets/images/powered_by_google_light_mode.png";
import poweredByGoogleDarkMode from "../../assets/images/powered_by_google_dark_mode.png";
import styles from "./styles.module.css";

const FormStepOne = () => {
  const { theme } = useCustomTheme();

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

  return (
    <div className={styles.formFieldsContainer}>
      <FastField
        component={TextField}
        fullWidth
        name="title"
        label="Name of your trip"
      />
      <FastField
        component={GooglePlacesAutocompleteField}
        name="location"
        label="Where are you going?"
        inputProps={googleAttributionHelperText}
      />
    </div>
  );
};

export default FormStepOne;
