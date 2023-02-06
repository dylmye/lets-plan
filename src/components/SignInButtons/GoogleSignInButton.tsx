import React from "react";
import { Button, SxProps, Theme } from "@mui/material";
import { Google } from "@mui/icons-material";

import styles from "./styles.module.css";
import SignInButtonProps from "../../types/SignInButtonProps";

const buttonStyle: SxProps<Theme> = {
  color: "#3c4043",
  backgroundColor: "#fff",
  border: "1px solid #dadce0",
  borderRadius: "4px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#fff",
  },
};

/** Styled button: Google */
const GoogleSignInButton = ({ onClick }: SignInButtonProps) => (
  <Button variant="contained" sx={buttonStyle} onClick={onClick}>
    <Google fontSize="inherit" className={styles.signInButtonIcon} />
    <strong>Sign in with Google</strong>
  </Button>
);

export default GoogleSignInButton;
