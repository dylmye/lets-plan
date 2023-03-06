import React from "react";
import { Button, SxProps, Theme } from "@mui/material";
import { Google } from "@mui/icons-material";

import SignInButtonProps from "../../types/SignInButtonProps";
import styles from "./styles.module.css";

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
const GoogleSignInButton = ({
  alreadyHasAccount,
  onClick,
  ...props
}: SignInButtonProps) => (
  <Button variant="contained" sx={buttonStyle} onClick={onClick} {...props}>
    <Google fontSize="inherit" className={styles.signInButtonIcon} />
    <strong>Sign {alreadyHasAccount ? "in" : "up"} with Google</strong>
  </Button>
);

export default GoogleSignInButton;
