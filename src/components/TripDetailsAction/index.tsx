import React, { useState } from "react";
import { Delete, Edit, MoreVert } from "@mui/icons-material";
import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  MenuList,
  Tooltip,
} from "@mui/material";
import { useGlobalModalVisibility } from "../../contexts/GlobalModalVisibility";
import { useAppSelector } from "../../app/hooks";
import { selectLocalTripById } from "../../features/tripList/tripSlice";
import Trip from "../../types/Trip";

export interface TripDetailsActionProps {
  id: string;
}

const TripDetailsAction = ({ id }: TripDetailsActionProps) => {
  const trip = useAppSelector((state) => selectLocalTripById(state, id));
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { setTrip, setDeleteTrip } = useGlobalModalVisibility();

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
        id={`menu-trip-${id}`}
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
            onClick={() => onEditTrip()}>
            <ListItemIcon>
              <Edit fontSize="inherit" />
            </ListItemIcon>
            Edit Details
          </MenuItem>
          <MenuItem
            key={`menu-trip-${id}-delete`}
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
