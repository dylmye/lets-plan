import { useNavigate } from "react-router-dom";
import React, { memo } from "react";
import { Alert, Chip, Link } from "@mui/material";

import { selectThemeMode } from "../../features/theme/themeSlice";
import { useAppSelector } from "../../app/hooks";
import styles from "./styles.module.css";

export interface TrackedLinkAlertProps {
  description: string;
  linkText: string;
  link: string;
}

/** Child unit for [`SuggestionsCard`](../SuggestionsCard/index.tsx) - displays a link with helper text */
const TrackedLinkAlert = ({
  description,
  link,
  linkText,
}: TrackedLinkAlertProps) => {
  const themeMode = useAppSelector(selectThemeMode);
  const navigate = useNavigate();
  return (
    <Alert severity="info" className={styles.trackedLinkAlert} icon={false}>
      <Chip
        variant="outlined"
        size="small"
        label="AD"
        onClick={() => navigate("/sponsored-links")}
      />{" "}
      {description}{" "}
      <Link
        href={link}
        target="_blank"
        rel="noreferrer"
        sx={{ color: themeMode === "dark" ? "#fff" : "#000" }}>
        {linkText}
      </Link>
    </Alert>
  );
};

export default memo(TrackedLinkAlert);
