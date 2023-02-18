import {
  PayloadAction,
  createDraftSafeSelector,
  createSlice,
} from "@reduxjs/toolkit";
import SliceNames from "../../enums/SliceNames";
import { RootState } from "../../app/store";

const name = SliceNames.AUTH;

export interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name,
  initialState,
  reducers: {
    setLoggedIn: (state, { payload }: PayloadAction<boolean>) => {
      return {
        ...state,
        isLoggedIn: payload,
      };
    },
  },
});

export const { setLoggedIn } = authSlice.actions;

export const rootThemeSelector = (state: RootState) => state.auth;

export const isLoggedIn = createDraftSafeSelector(
  rootThemeSelector,
  (state) => state.isLoggedIn
);

export default authSlice.reducer;
