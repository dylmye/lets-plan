import YupPassword from "yup-password";
import {
  SchemaOf,
  bool as yBool,
  object as yObject,
  string as yString,
  addMethod,
} from "yup";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useSnackbar } from "notistack";
import { CheckboxWithLabel, TextField } from "formik-mui";
import { Field, FieldProps, Form, Formik } from "formik";
import { AuthError } from "firebase/auth";
import {
  Alert,
  Button,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import HCaptcha from "@hcaptcha/react-hcaptcha";

import StyledLink from "../../StyledLink";
import { GoogleSignInButton } from "../../SignInButtons";
import FormikVerifyField from "../../fields/VerifyField";
import { renderFriendlyAuthMessages } from "../../../helpers/auth";
import { auth } from "../../../firebase";
import styles from "./styles.module.css";
import { AuthModalContentProps } from ".";

// @ts-ignore it only applies to string
YupPassword({ string: yString, addMethod });

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

/** Firebase Auth-linked Formik form for creating a new account */
const SignUpContent = ({ onClose }: AuthModalContentProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const [
    createUserWithEmailAndPassword,
    user,
    emailSignupLoading,
    emailErrors,
  ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const captchaRef = useRef<HCaptcha>(null);

  const combinedError = useMemo<AuthError[]>(() => {
    let errs: AuthError[] = [];
    if (gError) {
      errs.push(gError);
    }
    return errs;
  }, [gError]);

  const formLoading = emailSignupLoading && gLoading;

  const validationSchema: SchemaOf<SignupEmailForm> = yObject().shape({
    email: yString().email().required("Email required to sign up"),
    password: yString().password().required("Password required to sign up"),
    checkedPrivacy: yBool()
      .oneOf([true], "You must accept the privacy policy to make an account")
      .required(),
    verify: yString(),
  });

  const VerifyField = useCallback(
    (props: FieldProps) => <FormikVerifyField {...props} ref={captchaRef} />,
    []
  );

  useEffect(() => {
    captchaRef.current?.execute({ async: false });
    if (user || gUser) {
      onClose(true);
      // Only show the email verify message when using email/password login
      enqueueSnackbar(`You're in!${user ? " Check your email inbox." : ""}`);
    }
  }, [user, gUser, onClose, enqueueSnackbar]);

  return (
    <>
      <Typography variant="h5" id="modal-auth-title">
        <strong>Sign Up</strong>
      </Typography>
      <Typography variant="body1">
        Signing up to <em>Let's Plan</em> is entirely optional, but it lets you
        access your trips on any device, share with your friends and family, and
        more in the future. Your data will be stored securely in the cloud,{" "}
        <StyledLink to="/legal" onClick={() => onClose(false)}>
          learn more here.
        </StyledLink>
      </Typography>
      <Stack spacing={2} className={styles.socialLoginsStack}>
        {!!combinedError.length && (
          <Alert severity="error">
            {combinedError.map(renderFriendlyAuthMessages)}
          </Alert>
        )}
        <GoogleSignInButton onClick={() => signInWithGoogle([])} />
      </Stack>
      <Divider>
        <Typography variant="body2">Or</Typography>
      </Divider>
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
        validationSchema={validationSchema}>
        <Form className={styles.formFieldsContainer}>
          {!!emailErrors && (
            <Alert severity="error">
              {renderFriendlyAuthMessages(emailErrors)}
            </Alert>
          )}
          <Field
            component={TextField}
            name="email"
            type="email"
            label="Your email address"
            fullWidth
          />
          <Field
            component={TextField}
            name="password"
            type="password"
            label="Your password"
            fullWidth
          />
          <FormControlLabel
            label={
              <span>
                I've read the{" "}
                <StyledLink to="/legal">
                  terms of use & privacy policy
                </StyledLink>{" "}
                and I accept them in full. <strong>(Required)</strong>
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
          <Button type="submit" variant="contained" disabled={formLoading}>
            Register
          </Button>
          <Field component={VerifyField} name="verify" />
        </Form>
      </Formik>
    </>
  );
};

export default SignUpContent;
