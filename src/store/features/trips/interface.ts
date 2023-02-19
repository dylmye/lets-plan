import TripItemDraft from "../../../types/TripItemDraft";
import TripItem from "../../../types/Tripitem";
import TripDraft from "../../../types/TripDraft";
import TripDetails from "../../../types/TripDetails";
import Trip from "../../../types/Trip";
import DataInterface from "../../../types/store/DataInterface";
import { HookResponse, OptionallyPromised } from "../../../types/store";

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
  deleteTripById: (tripId: string) => any;
  updateTripById: (data: TripDetails) => any;

  addTripItemByTripId: (data: { tripId: string } & TripItemDraft) => any;
  deleteTripItemById: ({
    tripId,
    itemId,
  }: {
    tripId: string;
    itemId: string;
  }) => any;
  updateTripItemById: ({
    tripId,
    data,
  }: {
    tripId: string;
    data: { id: string } & TripItemDraft;
  }) => any;
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
  /** Add an itinerary item to a trip */
  useAddTripItem: () => (data: { tripId: string } & TripItemDraft) => void;
  /** Remove an itinerary item from a trip */
  useDeleteTripItem: () => (tripId: string, itemId: string) => void;
  /** Update an itinerary item on a trip */
  useUpdateTripItem: () => (
    tripId: string,
    data: { id: string } & TripItemDraft
  ) => void;
  /** Get all trips, in date order */
  useGetTrips: () => HookResponse<{ trips: Trip[] }>;
  /** Get past and current/future trips, in date order */
  useGetTripsByDateSplit: () => HookResponse<GetTripsByDateSplitResponse>;
  /** Get a trip by its ID */
  useGetTripById: (id: string) => HookResponse<GetTripByIdResponse>;
}
