import {
  addListener,
  createListenerMiddleware,
  isAnyOf,
  TypedAddListener,
  TypedStartListening,
} from "@reduxjs/toolkit";
import SliceNames from "../enums/SliceNames";
import { addTrip } from "../features/tripList/tripSlice";
import analytics from "../helpers/analytics";
import { AppDispatch, RootState } from "./store";

/**
 * A middleware that automatically links redux events
 * to Simple Analytics custom events. Use for anonymous
 * aggregated tracking of events (e.g. how many trips are being made)
 */
const eventAnalyticsLogMiddleware = createListenerMiddleware({
  onError: () => console.error,
});

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

export const startAppListening =
  eventAnalyticsLogMiddleware.startListening as AppStartListening;

startAppListening({
  matcher: isAnyOf(addTrip),
  effect: (action, _) => {
    // add simple analytics events based on
    // redux actions here
    if (action.type === `${SliceNames.TRIPS}/addTrip`) {
      analytics.track("trip_created");
    }
  },
});

export const addAppListener = addListener as TypedAddListener<
  RootState,
  AppDispatch
>;

export { eventAnalyticsLogMiddleware };
