import React, { useCallback, useEffect, useMemo } from "react";
import { Alert, Button, Divider, Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { Field, Form, Formik } from "formik";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
  useSignInWithTwitter,
} from "react-firebase-hooks/auth";
import { SchemaOf, object as yObject, string as yString } from "yup";
import { TextField as FormikTextField, TextFieldProps } from "formik-mui";

import { AuthModalContentProps } from ".";
import styles from "./styles.module.css";
import { auth } from "../../firebase";
import { GoogleSignInButton, TwitterSignInButton } from "../SignInButtons";
import { AuthError } from "firebase/auth";
import { renderFriendlyAuthMessages } from "../../helpers/auth";

type SignInEmailForm = {
  /** user id */
  email: string;
  /** pw */
  password: string;
};

const SignInContent = ({ onClose }: AuthModalContentProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const [signInWithEmailAndPassword, user, emailSignInLoading, emailErrors] =
    useSignInWithEmailAndPassword(auth);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [signInWithTwitter, tUser, tLoading, tError] =
    useSignInWithTwitter(auth);

  const combinedError = useMemo<AuthError[]>(() => {
    let errs: AuthError[] = [];
    if (gError) {
      errs.push(gError);
    }
    if (tError) {
      errs.push(tError);
    }
    if (!!errs.length) {
      console.error(errs);
    }
    return errs;
  }, [gError, tError]);

  const validationSchema: SchemaOf<SignInEmailForm> = yObject().shape({
    email: yString().email().required("Email required to sign up"),
    password: yString().required("Password required to sign up"),
  });

  const TextField = useCallback(
    (props: TextFieldProps) => <FormikTextField {...props} fullWidth />,
    []
  );

  useEffect(() => {
    if (user || gUser || tUser) {
      onClose(true);
      enqueueSnackbar(`You're in!`);
    }
  }, [user, gUser, tUser, onClose, enqueueSnackbar]);

  return (
    <>
      <Typography variant="h5" id="modal-auth-title">
        <strong>Sign In</strong>
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
      <Formik<SignInEmailForm>
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async ({ email, password }) => {
          signInWithEmailAndPassword(email, password);
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
          <Button
            type="submit"
            variant="contained"
            disabled={emailSignInLoading}>
            Login
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default SignInContent;
