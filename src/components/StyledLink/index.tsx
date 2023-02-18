import { LinkProps, Link as RouterLink } from "react-router-dom";
import React from "react";
import { Link as MuiLink } from "@mui/material";

/** A wrapper combining MUI's `Link` (with sx support) and React Router DOM's `Link` for style-consistent routing */
const StyledLink = (props: LinkProps) => (
  <MuiLink {...props} component={RouterLink} />
);

export default StyledLink;
