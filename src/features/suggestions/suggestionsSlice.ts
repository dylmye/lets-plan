import {
  PayloadAction,
  createDraftSafeSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import SliceNames from "../../enums/SliceNames";

const name = SliceNames.SUGGESTIONS;

export interface SuggestionsState {
  collapsed: boolean;
}

const initialState: SuggestionsState = {
  collapsed: false,
};

export const suggestionsSlice = createSlice({
  name,
  initialState,
  reducers: {
    setCollapsed: (state, { payload }: PayloadAction<boolean>) => {
      return {
        ...state,
        collapsed: payload,
      };
    },
  },
});

export const { setCollapsed } = suggestionsSlice.actions;

export const rootSuggestionsSelector = (state: RootState) => state.suggestions;

export const selectCollapsed = createDraftSafeSelector(
  rootSuggestionsSelector,
  (state) => state.collapsed
);

export default suggestionsSlice.reducer;
