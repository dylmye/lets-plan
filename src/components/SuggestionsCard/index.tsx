import React, { useCallback } from "react";
import {
  Box,
  Card,
  CardContent,
  Collapse,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { ArrowDropDown, ArrowDropUp, AutoAwesome } from "@mui/icons-material";

import trackedLinks from "../../data/trackedLinks";
import TrackedLinkAlert from "../TrackedLinkAlert";
import styles from "./styles.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectCollapsed,
  setCollapsed,
} from "../../features/suggestions/suggestionsSlice";
import StyledLink from "../StyledLink";

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
            aria-label={`${
              isCollapsed ? "Open" : "Collapse"
            } the Suggestions section`}
            size="medium"
            onClick={onToggleCollapse}
          >
            {isCollapsed ? (
              <Tooltip title="Open">
                <ArrowDropDown fontSize="inherit" />
              </Tooltip>
            ) : (
              <Tooltip title="Close">
                <ArrowDropUp fontSize="inherit" />
              </Tooltip>
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
              through the above links.{" "}
              <StyledLink to="/sponsored-links">Learn more</StyledLink>.
            </Typography>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default SuggestionsCard;
