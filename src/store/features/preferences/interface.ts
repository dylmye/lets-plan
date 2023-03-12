import { PaletteMode } from "@mui/material";

import DataInterface from "../../../types/store/DataInterface";
import ThemeMode from "../../../types/ThemeMode";

/** Interface for provider actions */
export interface PreferencesActions {
  setWelcomeCardDismissed: (newState: boolean) => any;
  setTripSuggestionsHidden: (newState: boolean) => any;
  setThemeMode: (newState: ThemeMode) => any;
}

/** Interface from provider selectors */
export interface PreferencesSelectors {
  welcomeCardDismissed: (...args: any[]) => boolean;
  tripSuggestionsHidden: (...args: any[]) => boolean;
  themeMode: (...args: any[]) => ThemeMode;
}

export interface PreferencesImports
  extends DataInterface<PreferencesActions, PreferencesSelectors> {}

/** Interface for hook exports */
export interface PreferencesHooks {
  useSetWelcomeCardDismissed: () => (newState: boolean) => void;
  useSetTripSuggestionsHidden: () => (newState: boolean) => void;
  useSetThemeMode: () => (newState: ThemeMode) => void;
  useWelcomeCardDismissed: () => boolean;
  useTripSuggestionsHidden: () => boolean;
  useThemeMode: () => PaletteMode;
  useIsSystemThemeMode: () => boolean;
}
