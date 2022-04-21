import React from "react";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

import styles from "./TripDetailsContainer.module.css";

const TripDetailsContainer = () => (
  <Container maxWidth="md" className={styles.tripDetailsContainer}>
    <Outlet />
  </Container>
);

export default TripDetailsContainer;
