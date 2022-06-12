import React, { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";

export interface TripDetailsActionProps {
  id: string;
}

const TripDetailsAction = ({ id }: TripDetailsActionProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const onButtonPress = (
    event?: React.MouseEvent<HTMLElement | null>
  ): void => {
    if (!!anchorEl || !event) {
      return setAnchorEl(null);
    }
    return setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Tooltip title="Trip Settings">
        <IconButton aria-label="Settings for this trip" onClick={onButtonPress}>
          <MoreVert fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id={`menu-trip-${id}`}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={!!anchorEl}
        onClose={() => onButtonPress()}
      >
        <MenuItem key={`menu-trip-${id}-editdetails`} dense>
          Edit Details
        </MenuItem>
      </Menu>
    </>
  );
};

export default TripDetailsAction;
