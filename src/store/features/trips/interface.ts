import TripItemDraft from "../../../types/TripItemDraft";
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

interface ExportTripsResponse {
  /** base64 data object of all trips */
  data: string;
}

/** Interface for provider actions */
export interface TripActions {
  addTrip: (data: TripDraft, userId?: string | null) => any;
  deleteTripById: (tripId: string) => any;
  updateTripById: (data: TripDetails, userId?: string | null) => any;
  /** Firestore only */
  batchAddTrips?: (trips: Trip[], userId: string) => Promise<void>;
  /** Redux only */
  batchDeleteTripsByIds?: (tripIds: string[]) => any;

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
  exportTrips: (...args: any[]) => OptionallyPromised<ExportTripsResponse>;
}

export interface TripImports
  extends DataInterface<TripActions, TripSelectors> {}

/** Interface for hook exports */
export interface TripHooks {
  /** Create a new trip */
  useAddTrip: () => (data: TripDraft) => Promise<{ id: string }>;
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
  /** Move all local trips to the users account */
  useMigrateLocalTrips: () => () => void;
  /** Get all trips, in date order */
  useGetTrips: () => HookResponse<{ trips: Trip[] }>;
  /** Get past and current/future trips, in date order */
  useGetTripsByDateSplit: () => HookResponse<GetTripsByDateSplitResponse>;
  /** Get a trip by its ID */
  useGetTripById: (id: string) => HookResponse<GetTripByIdResponse>;
  /** Export trips to a JSON document */
  useExportTrips: () => HookResponse<ExportTripsResponse>;
}
