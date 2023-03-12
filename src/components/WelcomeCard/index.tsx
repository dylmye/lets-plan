import React from "react";
import { Card, Typography } from "@mui/material";

import styles from "./styles.module.css";

const WelcomeCard = () => (
  <Card className={styles.welcomeCard}>
    <Typography variant="h4" className={styles.welcomeCardHeader}>
      Welcome to <em>Let's Plan</em>!
    </Typography>
    <Typography variant="body1" className={styles.welcomeCardBody}>
      The trip planner that's free, easy to use, works offline and lets you
      share with friends.
    </Typography>
  </Card>
);

export default WelcomeCard;
