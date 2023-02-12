import dayjs from "dayjs";
import {
  createAction,
  createEntityAdapter,
  createSlice,
  Dictionary,
  EntityId,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { RootState } from "../../app/store";
import SliceNames from "../../enums/SliceNames";
import { dateCompare } from "../../helpers/dates";
import { getTripItemTypeLabel } from "../../helpers/tripItems";
import Trip from "../../types/Trip";
import TripDraft from "../../types/TripDraft";
import TripItemDraft from "../../types/TripItemDraft";
import exampleTrip from "../../data/exampleTrip";
import TripItem from "../../types/Tripitem";

const name = SliceNames.TRIPS;

export interface TripState extends EntityState<Trip> {}

const tripsAdapter = createEntityAdapter<Trip>({
  selectId: (trip) => trip.id,
  sortComparer: (a, b) => dateCompare(a.startsAt, b.startsAt),
});

/** Extra Reducer Actions belong here */
export const addTripItemByTripId = createAction<
  { id: EntityId } & TripItemDraft
>("trips/addTripItemByTripId");

export const deleteTripItemByTripId = createAction<{
  tripId: EntityId;
  itemId: string;
}>("trips/deleteTripItemByTripId");

export const updateTripItemByTripId = createAction<{
  tripId: EntityId;
  item: TripItemDraft & { id: string };
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
    updateTripById: (state, { payload }: PayloadAction<Partial<Trip>>) => {
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
    builder.addCase(deleteTripItemByTripId, (state, { payload }) => {
      const trip = state.entities[payload.tripId];

      if (!trip) return;

      const items = trip.items?.filter((x) => x.id !== payload.itemId);

      tripsAdapter.updateOne(state, {
        id: payload.tripId,
        changes: { items },
      });
    });

    /** Update Trip Item */
    builder.addCase(updateTripItemByTripId, (state, { payload }) => {
      const trip = state.entities[payload.tripId];

      if (!trip) return;

      const allOtherItems =
        trip.items?.filter((x) => x.id !== (payload.item.id as string)) || [];

      const { category, ...updatedItem } = payload.item;

      const items: TripItem[] = [...allOtherItems, updatedItem];

      tripsAdapter.updateOne(state, {
        id: payload.tripId,
        changes: { items },
      });
    });
  },
});

export const { addTrip, deleteTripById, updateTripById } = tripSlice.actions;

export const {
  selectAll: selectTrips,
  selectIds: selectTripIds,
  selectById: selectLocalTripById,
} = tripsAdapter.getSelectors<RootState>((state) => state.trips);

export default tripSlice.reducer;
