import React, { forwardRef } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { FieldProps } from "formik";
import { Link, Typography } from "@mui/material";

/** Invisible HCaptcha element for verifying forms.
 * Trigger verification in the onSubmit using your ref:
 * ```ts
 * onSubmit = () => {
 *     captchaRef.current.execute();
 *     captchaRef.current.resetCaptcha();
 * }
 * ```
 */
const VerifyField = forwardRef<HCaptcha, FieldProps<string>>(
  ({ field, form: { setFieldValue, setFieldError } }, captchaRef) => {
    const onVerify = (token: string): void => {
      setFieldValue(field.name, token);
    };

    const onError = (event: string): void => {
      console.error("[VerifyField] HCaptcha encountered an error", event);
      setFieldError(field.name, event);
    };

    if (!process.env.REACT_APP_HCAPTCHA_SITE_KEY) {
      console.debug("[VerifyField] HCaptcha not loaded: no key provided");
      return null;
    }

    return (
      <>
        <HCaptcha
          ref={captchaRef}
          size="invisible"
          sitekey={process.env.REACT_APP_HCAPTCHA_SITE_KEY}
          onVerify={onVerify}
          onError={onError}
        />
        <Typography variant="caption">
          This site is protected by hCaptcha and its{" "}
          <Link href="https://www.hcaptcha.com/privacy" target="_blank" rel="noreferrer">Privacy Policy</Link> and{" "}
          <Link href="https://www.hcaptcha.com/terms" target="_blank" rel="noreferrer">Terms of Service</Link> apply.
        </Typography>
      </>
    );
  }
);

export default VerifyField;
