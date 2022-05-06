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
import storage from "redux-persist/lib/storage";
import suggestionsReducer, { SuggestionsState } from "../features/suggestions/suggestionsSlice";
import tripsReducer, { TripState } from "../features/tripList/tripSlice";

interface State {
  trips: TripState;
  suggestions: SuggestionsState;
}

const persistConfig: PersistConfig<any> = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = persistReducer<State>(
  persistConfig,
  combineReducers({
    trips: tripsReducer,
    suggestions: suggestionsReducer,
  })
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    let middleware = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });

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
