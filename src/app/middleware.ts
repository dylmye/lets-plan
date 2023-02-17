import {
  ActionCreatorWithPayload,
  TypedAddListener,
  TypedStartListening,
  addListener,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";
import SliceNames from "../enums/SliceNames";
import analytics from "../helpers/analytics";
import { AppDispatch, RootState } from "./store";
import { actions } from "../store/features/trips/redux";
import TripDraft from "../types/TripDraft";

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
  matcher: isAnyOf(
    actions.addTrip as ActionCreatorWithPayload<
      TripDraft,
      `${SliceNames.TRIPS}/addTrip`
    >
  ),
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
