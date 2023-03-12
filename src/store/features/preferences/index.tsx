import { useCallback } from "react";
import { useMediaQuery } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import * as providerRedux from "./redux";
import { PreferencesHooks } from "./interface";

export const useSetWelcomeCardDismissed: PreferencesHooks["useSetWelcomeCardDismissed"] =
  () => {
    const dispatch = useAppDispatch();

    return useCallback(
      (newState) => {
        return dispatch(
          providerRedux.actions.setWelcomeCardDismissed(newState)
        );
      },
      [dispatch]
    );
  };

export const useSetTripSuggestionsHidden: PreferencesHooks["useSetTripSuggestionsHidden"] =
  () => {
    const dispatch = useAppDispatch();

    return useCallback(
      (newState) => {
        return dispatch(
          providerRedux.actions.setTripSuggestionsHidden(newState)
        );
      },
      [dispatch]
    );
  };

export const useSetThemeMode: PreferencesHooks["useSetThemeMode"] = () => {
  const dispatch = useAppDispatch();

  return useCallback(
    (newState) => {
      return dispatch(providerRedux.actions.setThemeMode(newState));
    },
    [dispatch]
  );
};

export const useWelcomeCardDismissed: PreferencesHooks["useWelcomeCardDismissed"] =
  () => {
    const isCardDismissed = useAppSelector(
      providerRedux.selectors.welcomeCardDismissed
    );

    return isCardDismissed;
  };

export const useTripSuggestionsHidden: PreferencesHooks["useTripSuggestionsHidden"] =
  () => {
    const isSuggestionsHidden = useAppSelector(
      providerRedux.selectors.tripSuggestionsHidden
    );

    return isSuggestionsHidden;
  };

export const useThemeMode: PreferencesHooks["useThemeMode"] = () => {
  const themeMode = useAppSelector(providerRedux.selectors.themeMode);
  const systemModeIsDark = useMediaQuery("(prefers-color-scheme: dark)");

  return themeMode === "system"
    ? systemModeIsDark
      ? "dark"
      : "light"
    : themeMode;
};

export const useIsSystemThemeMode: PreferencesHooks["useIsSystemThemeMode"] =
  () => {
    const themeMode = useAppSelector(providerRedux.selectors.themeMode);
    return themeMode === "system";
  };
