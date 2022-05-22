import React, { memo } from "react";
import { Alert, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
}: TrackedLinkAlertProps) => {
  const navigate = useNavigate();
  return (
    <Alert severity="info" className={styles.trackedLinkAlert} icon={false}>
      <Chip variant="outlined" size="small" label="AD" onClick={() => navigate("/legal")} />{" "}
      {description}{" "}
      <a href={link} target="_blank" rel="noreferrer">
        {linkText}
      </a>
    </Alert>
  );
};

export default memo(TrackedLinkAlert);
