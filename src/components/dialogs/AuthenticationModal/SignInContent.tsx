import { object as yObject, ObjectSchema, string as yString } from "yup";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSnackbar } from "notistack";
import { TextField as FormikTextField, TextFieldProps } from "formik-mui";
import { Field, Form, Formik } from "formik";
import { AuthError } from "firebase/auth";
import { Alert, Button, Divider, Stack, Typography } from "@mui/material";

import { GoogleSignInButton } from "../../SignInButtons";
import PasswordVisibilityAdornment from "../../PasswordVisibilityAdornment";
import { renderFriendlyAuthMessages } from "../../../helpers/auth";
import { auth } from "../../../firebase";
import styles from "./styles.module.css";
import { AuthModalContentProps } from ".";

type SignInEmailForm = {
  /** user id */
  email: string;
  /** pw */
  password: string;
};

/** Firebase Auth-linked Formik form for authentication */
const SignInContent = ({ onClose }: AuthModalContentProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const [signInWithEmailAndPassword, user, emailSignInLoading, emailErrors] =
    useSignInWithEmailAndPassword(auth);

  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [passwordVisible, setPasswordVisibility] = useState(false);

  const formLoading = gLoading || emailSignInLoading;

  const combinedError = useMemo<AuthError[]>(() => {
    let errs: AuthError[] = [];
    if (gError) {
      errs.push(gError);
    }
    if (!!errs.length) {
      console.error(errs);
    }
    return errs;
  }, [gError]);

  const validationSchema: ObjectSchema<SignInEmailForm> = yObject().shape({
    email: yString().email().required("Email required to sign up"),
    password: yString().required("Password required to sign up"),
  });

  const TextField = useCallback(
    (props: TextFieldProps) => <FormikTextField {...props} fullWidth />,
    []
  );

  useEffect(() => {
    if (user || gUser) {
      onClose(true);
      enqueueSnackbar("You're in!");
    }
  }, [user, gUser, onClose, enqueueSnackbar]);

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
        <GoogleSignInButton
          alreadyHasAccount
          onClick={() => signInWithGoogle([])}
          disabled={formLoading}
        />
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
            type={passwordVisible ? "text" : "password"}
            label="Your password"
            InputProps={{
              endAdornment: (
                <PasswordVisibilityAdornment
                  visible={passwordVisible}
                  onToggleVisibility={setPasswordVisibility}
                />
              ),
            }}
          />
          <Button type="submit" variant="contained" disabled={formLoading}>
            Sign in
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default SignInContent;
