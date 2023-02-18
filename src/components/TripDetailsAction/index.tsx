import { useAuthState } from "react-firebase-hooks/auth";
import React, { useState } from "react";
import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  MenuList,
  Tooltip,
} from "@mui/material";
import { Delete, Edit, MoreVert } from "@mui/icons-material";

import Trip from "../../types/Trip";
import { tripIsExample, tripIsOwnedByUser } from "../../helpers/trips";
import { auth } from "../../firebase";
import { useGlobalModalVisibility } from "../../contexts/GlobalModalVisibility";

export interface TripDetailsActionProps {
  trip: Trip;
}

/** Context menu for trips */
const TripDetailsAction = ({ trip }: TripDetailsActionProps) => {
  const [user] = useAuthState(auth);
  const isOwned = !!trip && tripIsOwnedByUser(trip, user?.uid);
  const isExample = !trip || tripIsExample(trip.id);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { setTrip, setDeleteTrip } = useGlobalModalVisibility();

  if (!isOwned) {
    return null;
  }

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
    setTrip(trip);
  };

  const onDeleteTrip = () => {
    setDeleteTrip({
      id: trip?.id as string,
      title: trip?.title as string,
    });
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
        id={`menu-trip-${trip.id}`}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={!!anchorEl}
        onClose={() => onButtonPress()}>
        <MenuList disablePadding>
          <MenuItem
            key={`menu-trip-${trip.id}-editdetails`}
            dense
            onClick={() => onEditTrip()}
            disabled={isExample}>
            <ListItemIcon>
              <Edit fontSize="inherit" />
            </ListItemIcon>
            Edit Details
          </MenuItem>
          <MenuItem
            key={`menu-trip-${trip.id}-delete`}
            dense
            onClick={() => onDeleteTrip()}>
            <ListItemIcon>
              <Delete fontSize="inherit" />
            </ListItemIcon>
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default TripDetailsAction;
