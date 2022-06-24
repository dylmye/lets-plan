import React, { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { useGlobalModalVisibility } from "../../contexts/GlobalModalVisibility";
import { useAppSelector } from "../../app/hooks";
import { selectTripById } from "../../features/tripList/tripSlice";
import Trip from "../../types/Trip";

export interface TripDetailsActionProps {
  id: string;
}

const TripDetailsAction = ({ id }: TripDetailsActionProps) => {
  const trip = useAppSelector((state) => selectTripById(state, id));
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { setTrip } = useGlobalModalVisibility();

  const onButtonPress = (
    event?: React.MouseEvent<HTMLElement | null>
  ): false => {
    if (!!anchorEl || !event) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
    return false;
  };

  const onEditTrip = () => {
    setTrip(trip as Trip);
  };

  return (
    <div onClick={(e) => e.preventDefault()}>
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
        <MenuItem
          key={`menu-trip-${id}-editdetails`}
          dense
          onClick={() => onEditTrip()}
        >
          Edit Details
        </MenuItem>
      </Menu>
    </div>
  );
};

export default TripDetailsAction;
