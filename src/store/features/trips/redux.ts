import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import {
  Dictionary,
  EntityId,
  EntityState,
  PayloadAction,
  createAction,
  createDraftSafeSelector,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

import TripItemDraft from "../../../types/TripItemDraft";
import TripItem from "../../../types/Tripitem";
import TripDraft from "../../../types/TripDraft";
import TripDetails from "../../../types/TripDetails";
import Trip from "../../../types/Trip";
import { getTripItemTypeLabel } from "../../../helpers/tripItems";
import { dateCompare, tripIsInState } from "../../../helpers/dates";
import SliceNames from "../../../enums/SliceNames";
import exampleTrip from "../../../data/exampleTrip";
import { RootState } from "../../../app/store";
import { TripActions, TripSelectors } from "./interface";

const name = SliceNames.TRIPS;

export interface TripState extends EntityState<Trip> {}

const tripsAdapter = createEntityAdapter<Trip>({
  selectId: (trip) => trip.id,
  sortComparer: (a, b) => dateCompare(a.startsAt, b.startsAt),
});

/** Extra Reducer Actions belong here */
export const addTripItemByTripId = createAction<
  { tripId: string } & TripItemDraft
>("trips/addTripItemByTripId");

export const deleteTripItemById = createAction<{
  tripId: string;
  itemId: string;
}>("trips/deleteTripItemByTripId");

export const updateTripItemById = createAction<{
  tripId: string;
  data: TripItemDraft;
}>("trips/updateTripItemByTripId");

const tripSlice = createSlice({
  name,
  initialState: tripsAdapter.getInitialState({
    entities: { [exampleTrip.id]: exampleTrip } as Dictionary<Trip>,
    ids: [exampleTrip.id] as EntityId[],
  }),
  reducers: {
    addTrip: (state, { payload }: PayloadAction<TripDraft>) => {
      let trip: Trip = {
        tripSchemaRevision: 1,
        id: payload.id,
        title: payload.title,
        location: payload.location,
        startsAt: dayjs(payload.startsAt).utc(true).format(),
        endsAt: payload.endsAt && dayjs(payload.endsAt).utc(true).format(),
        createdAtUtc: dayjs.utc().format(),
        updatedAtUtc: dayjs.utc().format(),
        image: payload.image,
        items: [],
        userId: undefined,
        public: false,
      };

      tripsAdapter.addOne(state, trip);
    },
    deleteTripById: tripsAdapter.removeOne,
    updateTripById: (state, { payload }: PayloadAction<TripDetails>) => {
      if (!payload?.id) return;

      const changes: Partial<Trip> = {
        ...payload,
        // enforce local properties: these can only
        // be set otherwise on cloud storage trips
        userId: undefined,
        public: false,
        startsAt: dayjs(payload.startsAt).utc(true).format(),
        endsAt: payload.endsAt && dayjs(payload.endsAt).utc(true).format(),
        updatedAtUtc: dayjs.utc().format(),
      };

      tripsAdapter.updateOne(state, { id: payload.id, changes });
    },
    batchDeleteTripsByIds: tripsAdapter.removeMany,
  },
  extraReducers: (builder) => {
    /**
     * Trip Item Actions
     */

    /** Add Trip Item */
    builder.addCase(addTripItemByTripId, (state, { payload }) => {
      if (!payload?.tripId) {
        throw new Error("No Trip ID provided to add a trip item to");
      }

      const trip = state.entities[payload.tripId];

      const { category, tripId, ...filteredPayload } = payload;

      let newTripItem: TripItem = {
        ...filteredPayload,
        id: `trip-item-${uuidv4()}`,
        title: filteredPayload?.title?.length
          ? filteredPayload.title
          : getTripItemTypeLabel(filteredPayload.type),
        startsAt: dayjs(filteredPayload.startsAt).utc(true).format(),
        endsAt:
          filteredPayload.endsAt &&
          dayjs(filteredPayload.endsAt).utc(true).format(),
      };

      const items: TripItem[] = [...(trip?.items || []), newTripItem];

      tripsAdapter.updateOne(state, { id: payload.tripId, changes: { items } });
    });

    /** Delete Trip Item */
    builder.addCase(deleteTripItemById, (state, { payload }) => {
      const trip = state.entities[payload.tripId];

      if (!trip) return;

      const items = trip.items?.filter((x) => x.id !== payload.itemId);

      tripsAdapter.updateOne(state, {
        id: payload.tripId,
        changes: { items },
      });
    });

    /** Update Trip Item */
    builder.addCase(updateTripItemById, (state, { payload }) => {
      const trip = state.entities[payload.tripId];

      if (!trip) return;

      const allOtherItems =
        trip.items?.filter((x) => x.id !== (payload.data.id as string)) || [];

      const { category, ...newData } = payload.data;

      const newDataFormatted: TripItem = {
        ...newData,
        id: newData.id!,
        startsAt: dayjs(newData.startsAt).utc(true).format(),
        endsAt: newData.endsAt && dayjs(newData.endsAt).utc(true).format(),
      };

      const items: TripItem[] = [...allOtherItems, newDataFormatted];

      tripsAdapter.updateOne(state, {
        id: payload.tripId,
        changes: { items },
      });
    });
  },
});

const entitySelectors = tripsAdapter.getSelectors<RootState>(
  (state) => state.trips
);

/** custom selectors */
const getTripsByDateSplit = createDraftSafeSelector(
  entitySelectors.selectAll,
  (state) => {
    const past = state
      .filter((trip) => tripIsInState(trip, "past"))
      .sort((a, b) =>
        dateCompare(a.endsAt ?? a.startsAt, b.endsAt ?? b.startsAt, true)
      );

    const futureCurrent = state
      .filter((trip) => tripIsInState(trip, "future"))
      .sort((a, b) =>
        dateCompare(a.endsAt ?? a.startsAt, b.endsAt ?? b.startsAt)
      );

    return {
      past,
      futureCurrent,
    };
  }
);

const exportTrips = createDraftSafeSelector(
  entitySelectors.selectAll,
  (state) => {
    return {
      data: JSON.stringify(state),
    };
  }
);

export const actions: TripActions = {
  ...tripSlice.actions,
  addTripItemByTripId,
  deleteTripItemById,
  updateTripItemById,
};

export const selectors: TripSelectors = {
  getTrips: entitySelectors.selectAll,
  getTripById: entitySelectors.selectById,
  getTripsByDateSplit,
  exportTrips,
};

export default tripSlice.reducer;
