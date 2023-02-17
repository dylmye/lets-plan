import {
  PayloadAction,
  createDraftSafeSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import SliceNames from "../../enums/SliceNames";

const name = SliceNames.THEME;

export interface ThemeState {
  mode: "dark" | "light";
  useSystemMode: boolean;
}

const initialState: ThemeState = {
  mode: "light",
  useSystemMode: true,
};

export const themeSlice = createSlice({
  name,
  initialState,
  reducers: {
    setThemeMode: (state, { payload }: PayloadAction<ThemeState["mode"]>) => {
      return {
        ...state,
        mode: payload,
      };
    },
    setSystemModeOverride: (state, { payload }: PayloadAction<boolean>) => {
      return {
        ...state,
        useSystemMode: payload,
      };
    },
  },
});

export const { setThemeMode, setSystemModeOverride } = themeSlice.actions;

export const rootThemeSelector = (state: RootState) => state.theme;

export const selectThemeMode = createDraftSafeSelector(
  rootThemeSelector,
  (state) => state.mode
);

export const isUsingSystemThemeMode = createDraftSafeSelector(
  rootThemeSelector,
  (state) => state.useSystemMode
);

export default themeSlice.reducer;
