import React, { useState } from "react";
import { Delete, MoreVert } from "@mui/icons-material";
import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  MenuList,
  Tooltip,
} from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { selectLocalTripById } from "../../features/tripList/tripSlice";

export interface TripItemDetailsActionProps {
  /** Trip Item ID */
  id: string;
  /** Parent ID */
  tripId: string;
  /** Action to trigger delete modal */
  onDelete: (tripItemId: string) => void;
}

const TripItemDetailsAction = ({
  id,
  tripId,
  onDelete,
}: TripItemDetailsActionProps) => {
  const trip = useAppSelector((state) => selectLocalTripById(state, tripId));
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

  if (trip?.id === "example") {
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
          {/* <MenuItem
            key={`menu-trip-${id}-editdetails`}
            dense
            onClick={() => onEditTrip()}>
            <ListItemIcon>
              <Edit fontSize="inherit" />
            </ListItemIcon>
            Edit Details
          </MenuItem> */}
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
