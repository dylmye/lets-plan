import React, { memo } from "react";
import { Alert, Chip, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.css";
import { useAppSelector } from "../../app/hooks";
import { selectThemeMode } from "../../features/theme/themeSlice";

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
