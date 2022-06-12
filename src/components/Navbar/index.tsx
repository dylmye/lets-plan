import React, { useEffect, useMemo } from "react";
import { AccountCircle, Login } from "@mui/icons-material";
import {
  AppBar,
  Container,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Checkbox,
  Switch,
  Divider,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { signOut, User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

import { auth } from "../../firebase";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  isUsingSystemThemeMode,
  selectThemeMode,
  setSystemModeOverride,
  setThemeMode,
} from "../../features/theme/themeSlice";
import { useAuthModalVisible } from "../../contexts/AuthModalVisible";
import { uninstallWorker } from "../../helpers/worker";

const AuthenticatedUserNavbarItem = ({
  user,
  anchor,
  onToggle,
  extraMenuItems,
}: {
  user: User;
  anchor: HTMLElement | null;
  onToggle: (event?: React.MouseEvent<HTMLElement>) => void;
  extraMenuItems?: Record<string, JSX.Element | string>;
}) => {
  const onClickLogOut = () => {
    signOut(auth);
    onToggle();
  };
  return (
    <>
      <Tooltip title="Your Settings">
        <IconButton size="large" onClick={onToggle}>
          <AccountCircle fontSize="inherit" htmlColor="#fff" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-user-logged-in"
        anchorEl={anchor}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={!!anchor}
        onClose={() => onToggle()}
      >
        {user?.displayName && (
          <Typography
            variant="overline"
            fontWeight="bold"
            key="menu-user-item_displayname"
            sx={{ marginLeft: 2 }}
          >
            {user.displayName}
          </Typography>
        )}
        <MenuItem key="menu-user-item_login" onClick={onClickLogOut}>
          Log out
        </MenuItem>
        <Divider />
        {Object.keys(extraMenuItems ?? {}).map((k) => {
          return (
            <MenuItem key={k} dense>
              {extraMenuItems?.[k]}
            </MenuItem>
          );
        })}
        <MenuItem key="menu-reset-app" onClick={uninstallWorker}>
          Reset App
        </MenuItem>
        <Divider />
        <MenuItem key="version-text" dense>
          <Box
            sx={{ display: "flex", flexDirection: "column" }}
            onClick={() =>
              window?.open("https://dylmye.me/?ref=lp", "_blank")?.focus()
            }
          >
            <small>
              {process.env.REACT_APP_RELEASE_VERSION ?? "unknown"} -{" "}
              {process.env.NODE_ENV ?? "unknown"}
            </small>
            <small>let's plan is a dylanmye creation</small>
          </Box>
        </MenuItem>
      </Menu>
    </>
  );
};

const UnauthenticatedUserNavbarItem = ({
  loading,
  anchor,
  onToggle,
  extraMenuItems,
}: {
  loading: boolean;
  anchor: HTMLElement | null;
  onToggle: (event?: React.MouseEvent<HTMLElement>) => void;
  extraMenuItems?: Record<string, JSX.Element | string>;
}) => {
  const { toggleVisible, setAuthType } = useAuthModalVisible();

  const showAuthModal = () => toggleVisible(true);

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

  return (
    <>
      <Tooltip title="Login or Sign Up">
        <IconButton size="large" onClick={onToggle}>
          <Login fontSize="inherit" htmlColor="#fff" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-user-logged-out"
        anchorEl={anchor}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={!!anchor}
        onClose={() => onToggle()}
      >
        <MenuItem key="menu-user-item_login" onClick={onClickLogin}>
          Login
        </MenuItem>
        <MenuItem key="menu-user-item_signup" onClick={onClickSignup}>
          Sign Up
        </MenuItem>
        <Divider />
        {Object.keys(extraMenuItems ?? {}).map((k) => {
          return (
            <MenuItem key={k} dense>
              {extraMenuItems?.[k]}
            </MenuItem>
          );
        })}
        <MenuItem key="menu-reset-app" onClick={uninstallWorker}>
          Reset App
        </MenuItem>
        <Divider />
        <MenuItem key="version-text" dense>
          <Box
            sx={{ display: "flex", flexDirection: "column" }}
            onClick={() =>
              window?.open("https://dylmye.me/?ref=lp", "_blank")?.focus()
            }
          >
            <small>
              {process.env.REACT_APP_RELEASE_VERSION ?? "unknown"} -{" "}
              {process.env.NODE_ENV ?? "unknown"}
            </small>
            <small>let's plan is a dylanmye creation</small>
          </Box>
        </MenuItem>
      </Menu>
    </>
  );
};

const Navbar = () => {
  const dispatch = useAppDispatch();
  const [user, loading, error] = useAuthState(auth);
  const [anchorElUser, setAnchorElUser] = React.useState<HTMLElement | null>(
    null
  );
  const useSystemThemeMode = useAppSelector(isUsingSystemThemeMode);
  const currentMode = useAppSelector(selectThemeMode);

  const onUserItemPress = (
    event?: React.MouseEvent<HTMLElement> | null
  ): void => {
    if (!!anchorElUser || !event) {
      return setAnchorElUser(null);
    }
    return setAnchorElUser(event.currentTarget);
  };

  const themeMenuItems = useMemo<Record<string, JSX.Element>>(() => {
    const useSystemThemeToggle = (
      <FormControlLabel
        label="Use system theme"
        control={
          <Checkbox
            checked={useSystemThemeMode}
            onChange={(_, checked) => dispatch(setSystemModeOverride(checked))}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
      />
    );

    const themeModeToggle = (
      <FormControlLabel
        label="Dark Mode"
        disabled={useSystemThemeMode}
        control={
          <Switch
            checked={currentMode === "dark"}
            onChange={(_, checked) =>
              dispatch(setThemeMode(checked ? "dark" : "light"))
            }
            inputProps={{ "aria-label": "controlled" }}
          />
        }
      />
    );

    return {
      "menu-user-item_usesystem": useSystemThemeToggle,
      "menu-user-item_theme": themeModeToggle,
    };
  }, [currentMode, dispatch, useSystemThemeMode]);

  useEffect(() => {
    if (error) {
      console.error("[user-auth]", error);
    }
  }, [error]);

  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <Link to="/trips">
              <span className="logo">Let's Plan</span>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <AuthenticatedUserNavbarItem
                user={user}
                anchor={anchorElUser}
                onToggle={onUserItemPress}
                extraMenuItems={themeMenuItems}
              />
            ) : (
              <UnauthenticatedUserNavbarItem
                loading={loading}
                anchor={anchorElUser}
                onToggle={onUserItemPress}
                extraMenuItems={themeMenuItems}
              />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
