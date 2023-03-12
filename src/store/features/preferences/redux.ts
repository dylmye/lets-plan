import {
  PayloadAction,
  createDraftSafeSelector,
  createSlice,
} from "@reduxjs/toolkit";

import ThemeMode from "../../../types/ThemeMode";
import SliceNames from "../../../enums/SliceNames";
import { RootState } from "../../../app/store";
import { PreferencesActions, PreferencesSelectors } from "./interface";

const name = SliceNames.PREFERENCES;

export interface PreferencesState {
  welcomeCardDismissed: boolean;
  tripSuggestionsHidden: boolean;
  themeMode: ThemeMode;
}

const initialState: PreferencesState = {
  welcomeCardDismissed: false,
  tripSuggestionsHidden: false,
  themeMode: "system",
};

export const preferencesSlice = createSlice({
  name,
  initialState,
  reducers: {
    setWelcomeCardDismissed: (state, { payload }: PayloadAction<boolean>) => {
      return {
        ...state,
        welcomeCardDismissed: payload,
      };
    },
    setTripSuggestionsHidden: (state, { payload }: PayloadAction<boolean>) => {
      return {
        ...state,
        tripSuggestionsHidden: payload,
      };
    },
    setThemeMode: (state, { payload }: PayloadAction<ThemeMode>) => {
      return {
        ...state,
        themeMode: payload,
      };
    },
  },
});

const rootAuthSelector = (state: RootState) => state.preferences;

export const actions: PreferencesActions = preferencesSlice.actions;

/** Selectors */
const welcomeCardDismissed = createDraftSafeSelector(
  rootAuthSelector,
  (state) => state.welcomeCardDismissed
);

const tripSuggestionsHidden = createDraftSafeSelector(
  rootAuthSelector,
  (state) => state.tripSuggestionsHidden
);

const themeMode = createDraftSafeSelector(
  rootAuthSelector,
  (state) => state.themeMode
);

export const selectors: PreferencesSelectors = {
  welcomeCardDismissed,
  tripSuggestionsHidden,
  themeMode,
};

export default preferencesSlice.reducer;
