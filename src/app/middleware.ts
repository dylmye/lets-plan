import {
  addListener,
  createListenerMiddleware,
  isAnyOf,
  TypedAddListener,
  TypedStartListening,
} from "@reduxjs/toolkit";
import SliceNames from "../enums/SliceNames";
import { addTrip } from "../features/tripList/tripSlice";
// import analytics from "../helpers/analytics";
import { AppDispatch, RootState } from "./store";

const eventAnalyticsLogMiddleware = createListenerMiddleware({
  onError: () => console.error,
});

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

export const startAppListening =
  eventAnalyticsLogMiddleware.startListening as AppStartListening;

startAppListening({
  matcher: isAnyOf(addTrip),
  effect: (action, _) => {
    if (action.type === `${SliceNames.TRIPS}/addTrip`) {
      // https://github.com/DavidWells/analytics/issues/276
      // analytics.track('trip_created');
    }
  },
});

export const addAppListener = addListener as TypedAddListener<
  RootState,
  AppDispatch
>;

export { eventAnalyticsLogMiddleware };
