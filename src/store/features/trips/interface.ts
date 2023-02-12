import Trip from "../../../types/Trip";
import TripDraft from "../../../types/TripDraft";
import TripDetails from "../../../types/TripDetails";
import { HookResponse, OptionallyPromised } from "../../../types/store";
import DataInterface from "../../../types/store/DataInterface";

interface GetTripsByDateSplitResponse {
  past: Trip[];
  futureCurrent: Trip[];
}

interface GetTripByIdResponse {
  trip?: Trip;
}

/** Interface for provider actions */
export interface TripActions {
  addTrip: (data: TripDraft) => any;
  deleteTripById: (id: string) => any;
  updateTripById: (data: TripDetails) => any;
}

/** Interface from provider selectors */
export interface TripSelectors {
  getTrips: (...args: any[]) => OptionallyPromised<Trip[]>;
  getTripsByDateSplit: (
    ...args: any[]
  ) => OptionallyPromised<GetTripsByDateSplitResponse>;
  getTripById: (...args: any[]) => OptionallyPromised<Trip | undefined>;
}

export interface TripImports
  extends DataInterface<TripActions, TripSelectors> {}

/** Interface for hook exports */
export interface TripHooks {
  /** Create a new trip */
  useAddTrip: () => (data: TripDraft) => void;
  /** Delete a trip by its ID */
  useDeleteTrip: () => (id: string) => void;
  /** Update trip details by its ID */
  useUpdateTrip: () => (data: TripDetails) => void;
  useGetTrips: () => HookResponse<{ trips: Trip[] }>;
  useGetTripsByDateSplit: () => HookResponse<GetTripsByDateSplitResponse>;
  useGetTripById: (id: string) => HookResponse<GetTripByIdResponse>;
}
