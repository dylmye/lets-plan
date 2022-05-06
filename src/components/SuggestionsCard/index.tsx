import React, { useCallback } from "react";
import {
  Box,
  Card,
  CardContent,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import { ArrowDropDown, ArrowDropUp, AutoAwesome } from "@mui/icons-material";
import { Link } from "react-router-dom";

import trackedLinks from "../../data/trackedLinks";
import TrackedLinkAlert from "../TrackedLinkAlert";
import styles from "./styles.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectCollapsed,
  setCollapsed,
} from "../../features/suggestions/suggestionsSlice";

/** Display unit for tracked links */
const SuggestionsCard = () => {
  const dispatch = useAppDispatch();
  const isCollapsed = useAppSelector(selectCollapsed);

  const onToggleCollapse = useCallback(() => {
    dispatch(setCollapsed(!isCollapsed));
  }, [dispatch, isCollapsed]);

  if (!trackedLinks?.length) {
    return null;
  }

  return (
    <Card className="advert">
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" className={styles.emptyTripSuggestionTitle}>
            <AutoAwesome
              fontSize="inherit"
              className={styles.emptyTripSuggestionTitleIcon}
            />
            Suggestions
          </Typography>
          <IconButton
            aria-label="Collapse the Suggestions section"
            size="medium"
            onClick={onToggleCollapse}
          >
            {isCollapsed ? (
              <ArrowDropDown fontSize="inherit" />
            ) : (
              <ArrowDropUp fontSize="inherit" />
            )}
          </IconButton>
        </Box>
        <Collapse in={!isCollapsed}>
          <Box>
            <Box className={styles.emptyTripSuggestionLinksContainer}>
              {trackedLinks.map(({ key, description, linkText, link }) => (
                <TrackedLinkAlert {...{ key, description, linkText, link }} />
              ))}
            </Box>
            <Typography
              variant="caption"
              className={styles.emptyTripSuggestionSubtitle}
            >
              <em>Let's Plan</em> earns a small commission if you buy anything
              through the above links. <Link to="/legal">Learn more</Link>.
            </Typography>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default SuggestionsCard;
