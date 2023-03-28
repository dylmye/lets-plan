import React, { useContext, useMemo } from "react";
import { PaletteMode, ThemeProvider, createTheme } from "@mui/material";

import ThemeMode from "../../types/ThemeMode";
import {
  useSetThemeMode,
  useIsSystemThemeMode,
  useThemeMode,
} from "../../store/features/preferences";

export interface CustomThemeContextInterface {
  setTheme: (mode: ThemeMode) => void;
  theme: PaletteMode;
  isSystemTheme: boolean;
}

export const CustomThemeContext =
  React.createContext<CustomThemeContextInterface>({
    setTheme: (mode: ThemeMode) => {},
    theme: "dark",
    isSystemTheme: true,
  });

export const useCustomTheme = () => {
  const ctx = useContext(CustomThemeContext);
  if (!ctx) {
    throw new Error("Called useCustomTheme outside of a CustomThemeProvider");
  }

  return ctx;
};

/** Use the mode from the redux store to be manipulated within the MUI theme object */
const CustomTheme = ({ children }: { children: React.ReactNode }) => {
  const mode = useThemeMode();
  const setTheme = useSetThemeMode();
  const isSystemTheme = useIsSystemThemeMode();

  const colourMode = useMemo<CustomThemeContextInterface>(
    () => ({
      setTheme,
      theme: mode,
      isSystemTheme,
    }),
    [setTheme, mode, isSystemTheme]
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

  return (
    <CustomThemeContext.Provider value={colourMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
};

export default CustomTheme;
