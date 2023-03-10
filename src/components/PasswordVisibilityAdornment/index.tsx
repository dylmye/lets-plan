import React from "react";
import { IconButton, InputAdornment, Tooltip } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface PasswordVisibilityAdornmentProps {
  /** Whether the field is currently visible */
  visible: boolean;
  /** The method to toggle the visibility of the password */
  onToggleVisibility: (newValue: boolean) => void;
  position?: "start" | "end";
}

/** An Input Adornment to toggle the visibility of a password field parent */
const PasswordVisibilityAdornment = ({
  visible,
  onToggleVisibility,
  position = "end",
}: PasswordVisibilityAdornmentProps) => (
  <InputAdornment position={position}>
    <Tooltip title={`${visible ? "Hide" : "Show"} password`}>
      <IconButton
        aria-label="toggle password visibility"
        onClick={() => onToggleVisibility(!visible)}
        onMouseDown={(e) => e.preventDefault()}
        edge="end">
        {visible ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </Tooltip>
  </InputAdornment>
);

export default PasswordVisibilityAdornment;
