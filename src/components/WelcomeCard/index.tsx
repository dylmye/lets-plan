import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";

import {
  useSetWelcomeCardDismissed,
  useWelcomeCardDismissed,
} from "../../store/features/preferences";
import styles from "./styles.module.css";

const WelcomeCard = () => {
  const setDismissed = useSetWelcomeCardDismissed();
  const isDismissed = useWelcomeCardDismissed();

  if (isDismissed) {
    return <></>;
  }

  return (
    <Card className={styles.welcomeCard}>
      <CardHeader
        title={
          <>
            Welcome to <em>Let's Plan</em>
          </>
        }
        titleTypographyProps={{
          variant: "h4",
          className: styles.welcomeCardHeader,
        }}
        sx={{ p: 0 }}
        action={
          <Tooltip title="Hide this welcome message">
            <IconButton
              aria-label="Hide this welcome message"
              onClick={() => setDismissed(true)}>
              <Close fontSize="inherit" />
            </IconButton>
          </Tooltip>
        }
      />
      <CardContent className={styles.welcomeCardContentContainer}>
        <Typography variant="body1" className={styles.welcomeCardBody}>
          The trip planner that's free, easy to use, works offline and lets you
          share with friends.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
