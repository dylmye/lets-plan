import React, { useEffect, useMemo } from "react";
import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  isUsingSystemThemeMode,
  selectThemeMode,
  setThemeMode,
} from "../../features/theme/themeSlice";

export interface CustomThemeContextInterface {
  toggleColourMode: () => void;
}

const CustomThemeContext = React.createContext<CustomThemeContextInterface>({
  toggleColourMode: () => {},
});

/** Use the mode from the redux store to be manipulated within the MUI theme object */
const CustomTheme: React.FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(selectThemeMode);
  const useSystemThemeMode = useAppSelector(isUsingSystemThemeMode);

  const systemModeIsDark = useMediaQuery("(prefers-color-scheme: dark)");

  const colourMode = useMemo<CustomThemeContextInterface>(
    () => ({
      toggleColourMode: () =>
        dispatch(setThemeMode(mode === "dark" ? "light" : "dark")),
    }),
    [dispatch, mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#8db3e1",
            dark: "#1c6dd0",
          },
          secondary: {
            main: "#fed1ef",
          },
          background: {
            default: mode === "light" ? "#fff8f3" : "#121212",
          },
        },
        typography: {
          fontFamily: [
            "Nunito",
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(","),
        },
      }),
    [mode]
  );

  useEffect(() => {
    if (useSystemThemeMode) {
      dispatch(setThemeMode(systemModeIsDark ? "dark" : "light"));
    }
  }, [dispatch, systemModeIsDark, useSystemThemeMode]);

  return (
    <CustomThemeContext.Provider value={colourMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
};

export default CustomTheme;
