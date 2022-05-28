import React, { useEffect, useMemo } from "react";
import { AccountCircle } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Container,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Checkbox,
  Switch,
} from "@mui/material";
import { Box } from "@mui/system";
import { User } from "firebase/auth";
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
}) => (
  <>
    <Tooltip title="Your account">
      <IconButton size="large">
        <Avatar src="https://via.placeholder.com/250" />
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
      <MenuItem key="menu-user-item_login">Log out</MenuItem>
      {Object.keys(extraMenuItems ?? {}).map((k) => {
        return <MenuItem key={k}>{extraMenuItems?.[k]}</MenuItem>;
      })}
    </Menu>
  </>
);

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
}) => (
  <>
    <Tooltip title="Login or sign up">
      <IconButton size="large" sx={{ p: 0 }} onClick={onToggle}>
        <AccountCircle fontSize="inherit" />
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
      <MenuItem key="menu-user-item_login">Login</MenuItem>
      <MenuItem key="menu-user-item_signup">Sign Up</MenuItem>
      {Object.keys(extraMenuItems ?? {}).map((k) => {
        return <MenuItem key={k}>{extraMenuItems?.[k]}</MenuItem>;
      })}
    </Menu>
  </>
);

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
    // <header className="header">

    //   <Box>

    //   </Box>
    // </header>
  );
};

export default Navbar;
