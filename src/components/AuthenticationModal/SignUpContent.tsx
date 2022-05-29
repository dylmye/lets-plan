import React, { useCallback, useEffect, useRef } from "react";
import { Alert, Button, FormControlLabel, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Field, FieldProps, Form, Formik } from "formik";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import {
  SchemaOf,
  object as yObject,
  string as yString,
  bool as yBool,
} from "yup";
import {
  TextField as FormikTextField,
  CheckboxWithLabel,
  TextFieldProps,
} from "formik-mui";
import HCaptcha from "@hcaptcha/react-hcaptcha";

import { AuthModalContentProps } from ".";
import styles from "./styles.module.css";
import { auth } from "../../firebase";
import FormikVerifyField from "../VerifyField";

type SignupEmailForm = {
  /** user id */
  email: string;
  /** pw to use */
  password: string;
  /** User confirmed they read t&c and privacy */
  checkedPrivacy: boolean;
  /** hcaptcha token */
  verify?: string;
};

const SignUpContent = ({ onClose }: AuthModalContentProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const [createUserWithEmailAndPassword, user, emailSignupLoading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const captchaRef = useRef<HCaptcha>(null);

  const validationSchema: SchemaOf<SignupEmailForm> = yObject().shape({
    email: yString().email().required("Email required to sign up"),
    password: yString().required("Password required to sign up"),
    checkedPrivacy: yBool()
      .oneOf([true], "You must accept the privacy policy to make an account")
      .required(),
    verify: yString(),
  });

  const TextField = useCallback(
    (props: TextFieldProps) => <FormikTextField {...props} fullWidth />,
    []
  );

  const VerifyField = useCallback((props: FieldProps) => <FormikVerifyField {...props} ref={captchaRef} />, []);

  useEffect(() => {
    if (user) {
      onClose(true);
      enqueueSnackbar("You're in! Check your email inbox.");
    }
  }, [user, onClose, enqueueSnackbar]);

  return (
    <>
      <Typography variant="h5" id="modal-auth-title">
        <strong>Sign Up</strong>
      </Typography>
      <Typography variant="body1">
        Signing up to <em>Let's Plan</em> is entirely optional, but it lets you
        access your trips on any device, share with your friends and family, and
        more in the future. Your data will be stored securely in the cloud,{" "}
        <Link to="/legal" onClick={() => onClose(false)}>
          learn more here.
        </Link>
      </Typography>
      <Formik<SignupEmailForm>
        initialValues={{
          email: "",
          password: "",
          checkedPrivacy: false,
          verify: "",
        }}
        onSubmit={async ({ email, password }) => {
          if (captchaRef?.current) {
            await captchaRef.current.execute({ async: true });
          }
          createUserWithEmailAndPassword(email, password);
          if (captchaRef?.current) {
            captchaRef.current.resetCaptcha();
          }
        }}
        validationSchema={validationSchema}
      >
        <Form className={styles.formFieldsContainer}>
          {error && <Alert severity="error">{error}</Alert>}
          <Field
            component={TextField}
            name="email"
            type="email"
            label="Your email address"
          />
          <Field
            component={TextField}
            name="password"
            type="password"
            label="Your password"
          />
          <FormControlLabel
            label={
              <span>
                I've read the{" "}
                <Link to="/legal">terms of use & privacy policy</Link> and I
                accept them in full.
              </span>
            }
            sx={{ m: 0 }}
            control={
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="checkedPrivacy"
              />
            }
          />
          <Button
            type="submit"
            variant="contained"
            disabled={emailSignupLoading}
          >
            Register
          </Button>
          <Field component={VerifyField} name="verify" />
        </Form>
      </Formik>
    </>
  );
};

export default SignUpContent;
