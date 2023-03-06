import { useSignOut } from "react-firebase-hooks/auth";
import React, { useMemo, useState } from "react";
import { User } from "firebase/auth";
import { Box } from "@mui/system";
import {
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { AccountCircle, Logout, Warning } from "@mui/icons-material";

import ResetAppDialog from "../dialogs/ResetAppDialog";
import ManageDataDialog from "../dialogs/ManageDataDialog";
import { uninstallWorker } from "../../helpers/worker";
import { auth } from "../../firebase";
import { useGlobalModalVisibility } from "../../contexts/GlobalModalVisibility";
import { reduxStorage } from "../../app/store";

interface UserNavbarItemProps {
  user?: User | null;
  anchor: HTMLElement | null;
  onToggle: (event?: React.MouseEvent<HTMLElement>) => void;
  extraMenuItems?: Record<string, JSX.Element | string>;
}

/** Login/signup menu icon, with extra menu stuff */
const UserNavbarItem = ({
  user,
  anchor,
  onToggle,
  extraMenuItems = {},
}: UserNavbarItemProps) => {
  const { toggleVisible, setAuthType } = useGlobalModalVisibility();
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [manageDataDialogOpen, setManageDataDialogOpen] = useState(false);
  const [signOut] = useSignOut(auth);
  const authenticated = useMemo<boolean>(() => !!user, [user]);

  const showAuthModal = () => toggleVisible(true);

  const onClickLogOut = async () => {
    await signOut();
    onToggle();
  };

  const onClickLogin = () => {
    onToggle();
    showAuthModal();
    setAuthType("sign-in");
  };

  const onClickSignup = () => {
    onToggle();
    showAuthModal();
    setAuthType("sign-up");
  };

  const onResetApp = async () => {
    if (authenticated) {
      await signOut();
    }
    try {
      await uninstallWorker();
    } catch (e) {
      console.error("Couldn't uninstall sw", e);
    }
    await reduxStorage.db.clear();
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  const onClickManageData = () => {
    onToggle();
    setManageDataDialogOpen(true);
  };

  const onClickResetApp = () => {
    onToggle();
    setResetDialogOpen(true);
  };

  return (
    <>
      <Tooltip title={authenticated ? "Sign out" : "Sign in or Sign Up"}>
        <IconButton
          size="large"
          onClick={onToggle}
          aria-label={
            authenticated
              ? "Access your settings and sign out"
              : "Access settings and sign-in/sign-up options"
          }>
          {authenticated ? (
            <Logout fontSize="inherit" htmlColor="#fff" />
          ) : (
            <AccountCircle fontSize="inherit" htmlColor="#fff" />
          )}
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id={authenticated ? "menu-user-logged-in" : "menu-user-logged-out"}
        anchorEl={anchor}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={!!anchor}
        onClose={() => onToggle()}>
        {user?.displayName && (
          <Typography
            variant="overline"
            fontWeight="bold"
            key="menu-user-item_displayname"
            sx={{ marginLeft: 2 }}>
            {user.displayName}
          </Typography>
        )}
        {authenticated ? (
          <MenuItem key="menu-user-item_login" onClick={onClickLogOut}>
            Log out
          </MenuItem>
        ) : (
          <MenuItem key="menu-user-item_login" onClick={onClickLogin}>
            Sign in
          </MenuItem>
        )}
        {/* This is only separate from Login because of MUI limitations - MenuList doesn't support fragments lol */}
        {!authenticated && (
          <MenuItem key="menu-user-item_signup" onClick={onClickSignup}>
            Sign Up
          </MenuItem>
        )}
        <Divider />
        {Object.keys(extraMenuItems).map((k) => {
          return (
            <MenuItem key={k} dense>
              {extraMenuItems?.[k]}
            </MenuItem>
          );
        })}
        <MenuItem key="menu-export-data" onClick={onClickManageData}>
          Manage Your Data
        </MenuItem>
        <MenuItem key="menu-reset-app" onClick={onClickResetApp}>
          <ListItemIcon>
            <Warning fontSize="inherit" />
          </ListItemIcon>
          Reset App
        </MenuItem>
        <Divider />
        <MenuItem key="version-text" dense>
          <Box
            sx={{ display: "flex", flexDirection: "column" }}
            onClick={() =>
              window?.open("https://dylmye.me/?ref=lp", "_blank")?.focus()
            }>
            <small>
              {process.env.REACT_APP_RELEASE_VERSION ?? "unknown"} -{" "}
              {process.env.NODE_ENV ?? "unknown"}
            </small>
            <small>let's plan is a dylanmye creation</small>
          </Box>
        </MenuItem>
      </Menu>
      <ResetAppDialog
        visible={resetDialogOpen}
        onClose={() => setResetDialogOpen(false)}
        onAccepted={onResetApp}
        authenticated={authenticated}
      />
      <ManageDataDialog
        visible={manageDataDialogOpen}
        onClose={() => setManageDataDialogOpen(false)}
        authenticated={authenticated}
      />
    </>
  );
};

export default UserNavbarItem;
