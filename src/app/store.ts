import storage from "redux-persist-indexeddb-storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  PersistConfig,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";

import tripsReducer, { TripState } from "../store/features/trips/redux";
import authReducer, { AuthState } from "../store/features/auth/redux";
import themeReducer from "../features/theme/themeSlice";
import type { ThemeState } from "../features/theme/themeSlice";
import suggestionsReducer, {
  SuggestionsState,
} from "../features/suggestions/suggestionsSlice";
import { eventAnalyticsLogMiddleware } from "./middleware";

interface State {
  trips: TripState;
  suggestions: SuggestionsState;
  theme: ThemeState;
  auth: AuthState;
}

export const reduxStorage = storage("letsPlan");

const persistConfig: PersistConfig<any> = {
  key: "root",
  version: 2,
  storage: reduxStorage,
};

const rootReducer = persistReducer<State>(
  persistConfig,
  combineReducers({
    trips: tripsReducer,
    suggestions: suggestionsReducer,
    theme: themeReducer,
    auth: authReducer,
  })
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    let middleware = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(eventAnalyticsLogMiddleware.middleware);

    return middleware;
  },
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
