import React from "react";
import { Button, SxProps, Theme } from "@mui/material";
import { Twitter } from "@mui/icons-material";

import SignInButtonProps from "../../types/SignInButtonProps";
import styles from "./styles.module.css";

const buttonStyle: SxProps<Theme> = {
  color: "#fff",
  backgroundColor: "#1d9bf0",
  border: "1px solid #42abf2",
  borderRadius: "4px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#1d9bf0",
  },
};

/** Styled button: Twitter */
const TwitterSignInButton = ({ onClick }: SignInButtonProps) => (
  <Button variant="contained" sx={buttonStyle} onClick={onClick}>
    <Twitter fontSize="inherit" className={styles.signInButtonIcon} />
    <strong>Sign in with Twitter</strong>
  </Button>
);

export default TwitterSignInButton;
