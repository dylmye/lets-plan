import dayjs from "dayjs";
import {
  createAction,
  createDraftSafeSelector,
  createEntityAdapter,
  createSlice,
  Dictionary,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { RootState } from "../../../app/store";
import exampleTrip from "../../../data/exampleTrip";
import SliceNames from "../../../enums/SliceNames";
import { dateCompare, tripIsInState } from "../../../helpers/dates";
import { getTripItemTypeLabel } from "../../../helpers/tripItems";
import { TripActions, TripSelectors } from "./interface";
import TripItem from "../../../types/Tripitem";
import TripItemDraft from "../../../types/TripItemDraft";
import TripDetails from "../../../types/TripDetails";
import Trip from "../../../types/Trip";
import TripDraft from "../../../types/TripDraft";

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
  data: TripItem;
}>("trips/updateTripItemByTripId");

const tripSlice = createSlice({
  name,
  initialState: tripsAdapter.getInitialState({
    entities: { [exampleTrip.id]: exampleTrip } as Dictionary<Trip>,
    ids: [exampleTrip.id] as string[],
  }),
  reducers: {
    addTrip: (state, { payload }: PayloadAction<TripDraft>) => {
      let trip: Trip = {
        tripSchemaRevision: 1,
        id: payload.id,
        title: payload.title,
        location: payload.location,
        startsAt: payload.startsAt,
        endsAt: payload.endsAt,
        createdAtUtc: dayjs().format(),
        updatedAtUtc: dayjs().format(),
        image: payload.image,
        items: [],
        public: false,
      };

      tripsAdapter.addOne(state, trip);
    },
    deleteTripById: tripsAdapter.removeOne,
    updateTripById: (state, { payload }: PayloadAction<TripDetails>) => {
      if (!payload?.id) return;

      tripsAdapter.updateOne(state, { id: payload.id, changes: payload });
    },
  },
  extraReducers: (builder) => {
    /**
     * Trip Item Actions
     */

    /** Add Trip Item */
    builder.addCase(addTripItemByTripId, (state, { payload }) => {
      if (!payload?.id) return;

      const trip = state.entities[payload.id];

      const { category, ...filteredPayload } = payload;

      let newTripItem: TripItem = {
        ...filteredPayload,
        id: uuidv4(),
        title:
          filteredPayload?.title || getTripItemTypeLabel(filteredPayload.type),
      };

      const items: TripItem[] = [...(trip?.items || []), newTripItem];

      tripsAdapter.updateOne(state, { id: payload.id, changes: { items } });
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

      const items: TripItem[] = [...allOtherItems, payload.data];

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
};

export default tripSlice.reducer;
