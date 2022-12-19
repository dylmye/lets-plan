import React, { useEffect, useMemo } from "react";
import {
  AppBar,
  Container,
  FormControlLabel,
  Toolbar,
  Checkbox,
  Switch,
} from "@mui/material";
import { Box } from "@mui/system";
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
import UserNavbarItem from "./UserNavbarItem";

const Navbar = () => {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, _, error] = useAuthState(auth);
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
            <UserNavbarItem
              user={user}
              anchor={anchorElUser}
              onToggle={onUserItemPress}
              extraMenuItems={themeMenuItems}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
