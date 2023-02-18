import React from "react";
import { TextField } from "formik-mui";
import { Field } from "formik";
import { TextFieldProps } from "@mui/material";
import { GooglePlacesAutocompleteField } from "@dylmye/mui-google-places-autocomplete";

import { selectThemeMode } from "../../features/theme/themeSlice";
import poweredByGoogleLightMode from "../../assets/images/powered_by_google_light_mode.png";
import poweredByGoogleDarkMode from "../../assets/images/powered_by_google_dark_mode.png";
import { useAppSelector } from "../../app/hooks";
import styles from "./styles.module.css";

const FormStepOne = () => {
  const currentTheme = useAppSelector(selectThemeMode);

  const googleAttributionHelperText: TextFieldProps = {
    helperText: (
      <img
        src={
          currentTheme === "light"
            ? poweredByGoogleLightMode
            : poweredByGoogleDarkMode
        }
        alt="This location search field uses Google APIs."
        className={styles.googleAttribution}
      />
    ),
  };

  return (
    <div className={styles.formFieldsContainer}>
      <Field
        component={TextField}
        fullWidth
        name="title"
        label="Name of your trip"
      />
      <Field
        component={GooglePlacesAutocompleteField}
        name="location"
        label="Where are you going?"
        inputProps={googleAttributionHelperText}
      />
    </div>
  );
};

export default FormStepOne;
