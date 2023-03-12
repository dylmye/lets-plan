import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useEffect, useMemo } from "react";
import { Box } from "@mui/system";
import {
  AppBar,
  Checkbox,
  Container,
  FormControlLabel,
  Switch,
  Toolbar,
} from "@mui/material";

import { auth } from "../../firebase";
import { useCustomTheme } from "../../contexts/CustomTheme";
import UserNavbarItem from "./UserNavbarItem";

/** Top level navigation */
const Navbar = () => {
  const { setTheme, theme, isSystemTheme } = useCustomTheme();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, _, error] = useAuthState(auth);
  const [anchorElUser, setAnchorElUser] = React.useState<HTMLElement | null>(
    null
  );

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
            checked={isSystemTheme}
            onChange={(_, checked) =>
              setTheme(isSystemTheme ? theme : "system")
            }
            inputProps={{ "aria-label": "controlled" }}
          />
        }
      />
    );

    const themeModeToggle = (
      <FormControlLabel
        label="Dark Mode"
        disabled={isSystemTheme}
        control={
          <Switch
            checked={theme === "dark"}
            onChange={(_, checked) =>
              setTheme(theme === "dark" ? "light" : "dark")
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
  }, [theme, isSystemTheme, setTheme]);

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
