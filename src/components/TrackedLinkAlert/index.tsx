import React from "react";
import { Alert } from "@mui/material";
import { Link } from "react-router-dom";

import styles from "./styles.module.css";

export interface TrackedLinkAlertProps {
  description: string;
  linkText: string;
  link: string;
}

const TrackedLinkAlert = ({
  description,
  link,
  linkText,
}: TrackedLinkAlertProps) => (
  <Alert severity="info" className={styles.trackedLinkAlert} icon={false}>
    <Link to="/legal">
      <strong>AD</strong>
    </Link>
    : {description}{" "}
    <a href={link} target="_blank" rel="noreferrer">
      {linkText}
    </a>
  </Alert>
);

export default TrackedLinkAlert;
