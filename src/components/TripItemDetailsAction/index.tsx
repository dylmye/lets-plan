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
import { useAuthState } from "react-firebase-hooks/auth";

import { tripIsExample, tripIsOwnedByUser } from "../../helpers/trips";
import { auth } from "../../firebase";
import Trip from "../../types/Trip";

export interface TripItemDetailsActionProps {
  /** Trip Item ID */
  id: string;
  /** Parent Trip */
  trip: Trip;
  /** Action to trigger delete modal */
  onDelete: (tripItemId: string) => void;
  /** Toggle the edit mode */
  toggleEdit: (tripItemId: string, isEdit: boolean) => void;
}

const TripItemDetailsAction = ({
  id,
  trip,
  onDelete,
  toggleEdit,
}: TripItemDetailsActionProps) => {
  const [user] = useAuthState(auth);
  const isOwned = !!trip && tripIsOwnedByUser(trip, user?.uid);
  const isExample = !trip || tripIsExample(trip.id);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

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

  if (isExample || !isOwned) {
    return null;
  }

  return (
    <div onClick={(e) => e.preventDefault()}>
      <Tooltip title="Trip Item Settings">
        <IconButton aria-label="Settings for this item" onClick={onButtonPress}>
          <MoreVert fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id={`menu-trip-item-${id}`}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={!!anchorEl}
        onClose={() => onButtonPress()}>
        <MenuList disablePadding>
          <MenuItem
            key={`menu-trip-${id}-editdetails`}
            dense
            onClick={() => toggleEdit(id, true)}>
            <ListItemIcon>
              <Edit fontSize="inherit" />
            </ListItemIcon>
            Edit Details
          </MenuItem>
          <MenuItem
            key={`menu-trip-item-${id}-delete`}
            dense
            onClick={() => onDelete(id)}>
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

export default TripItemDetailsAction;
