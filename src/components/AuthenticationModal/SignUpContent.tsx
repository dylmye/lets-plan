import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  Alert,
  Button,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { Field, FieldProps, Form, Formik } from "formik";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useSignInWithTwitter,
} from "react-firebase-hooks/auth";
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
import FormikVerifyField from "../fields/VerifyField";
import StyledLink from "../StyledLink";
import { GoogleSignInButton, TwitterSignInButton } from "../SignInButtons";
import { AuthError } from "firebase/auth";
import { renderFriendlyAuthMessages } from "../../helpers/auth";

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [signInWithTwitter, tUser, tLoading, tError] =
    useSignInWithTwitter(auth);
  const captchaRef = useRef<HCaptcha>(null);

  const combinedError = useMemo<AuthError[]>(() => {
    let errs: AuthError[] = [];
    if (gError) {
      errs.push(gError);
    }
    if (tError) {
      errs.push(tError);
    }
    return errs;
  }, [gError, tError]);

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

  const VerifyField = useCallback(
    (props: FieldProps) => <FormikVerifyField {...props} ref={captchaRef} />,
    []
  );

  useEffect(() => {
    captchaRef.current?.execute({ async: false });
    if (user || gUser || tUser) {
      onClose(true);
      // Only show the email verify message when using email/password login
      enqueueSnackbar(`You're in!${user ? " Check your email inbox." : ""}`);
    }
  }, [user, gUser, tUser, onClose, enqueueSnackbar]);

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
        <TwitterSignInButton onClick={() => signInWithTwitter([])} />
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
          <Button
            type="submit"
            variant="contained"
            disabled={emailSignupLoading}>
            Register
          </Button>
          <Field component={VerifyField} name="verify" />
        </Form>
      </Formik>
    </>
  );
};

export default SignUpContent;
