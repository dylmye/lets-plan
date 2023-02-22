import {
  PayloadAction,
  createDraftSafeSelector,
  createSlice,
} from "@reduxjs/toolkit";

import SliceNames from "../../../enums/SliceNames";
import { RootState } from "../../../app/store";
import { AuthActions, AuthSelectors } from "./interface";

const name = SliceNames.AUTH;

export interface AuthState {
  isLoggedIn: boolean;
  userId: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  userId: null,
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
    setUserId: (state, { payload }: PayloadAction<string | null>) => {
      return {
        ...state,
        userId: payload,
      };
    },
  },
});

const rootAuthSelector = (state: RootState) => state.auth;

export const actions: AuthActions = authSlice.actions;

/** Selectors */
const isLoggedIn = createDraftSafeSelector(
  rootAuthSelector,
  (state) => state.isLoggedIn
);

const getUserId = createDraftSafeSelector(
  rootAuthSelector,
  (state) => state.userId
);

export const selectors: AuthSelectors = {
  isLoggedIn,
  getUserId,
};

export default authSlice.reducer;
