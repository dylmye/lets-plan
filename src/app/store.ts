import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import {
  PersistConfig,
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist-indexeddb-storage";
import suggestionsReducer, {
  SuggestionsState,
} from "../features/suggestions/suggestionsSlice";
import themeReducer, { ThemeState } from "../features/theme/themeSlice";
import tripsReducer, { TripState } from "../features/tripList/tripSlice";
import { eventAnalyticsLogMiddleware } from "./middleware";

interface State {
  trips: TripState;
  suggestions: SuggestionsState;
  theme: ThemeState;
}

const persistConfig: PersistConfig<any> = {
  key: "root",
  version: 2,
  storage: storage("letsPlan"),
};

const rootReducer = persistReducer<State>(
  persistConfig,
  combineReducers({
    trips: tripsReducer,
    suggestions: suggestionsReducer,
    theme: themeReducer,
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
