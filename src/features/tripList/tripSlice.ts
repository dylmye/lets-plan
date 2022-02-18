import { createAsyncThunk, createDraftSafeSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { RootState, AppThunk } from "../../app/store";
import SliceNames from "../../types/SliceNames";
import { Trip } from "../../types/Trip";
import { TripDraft } from "../../types/TripDraft";

const name = SliceNames.TRIPS;

export interface TripState {
  list: Trip[];
}

const exampleTrip: Trip = {
  id: "example",
  title: "Your First Trip",
  location: "Whitby, Yorkshire, UK",
  startsAt: dayjs().toISOString(),
  endsAt: dayjs().add(7, "day").toISOString(),
  createdAtUtc: dayjs().toISOString(),
  updatedAtUtc: dayjs().toISOString(),
};

const initialState: TripState = {
  list: [exampleTrip],
};

export const tripSlice = createSlice({
  name,
  initialState,
  reducers: {
    saveTrip: (state, { payload }: PayloadAction<TripDraft>) => {
      let trip: Trip = {
        id: payload.id,
        title: payload.title,
        location: payload.locationData?.label,
        startsAt: payload.startsAt,
        endsAt: payload.endsAt,
        createdAtUtc: dayjs().toISOString(),
        updatedAtUtc: dayjs().toISOString(),
        image: null,
      };

      return {
        ...state,
        list: [...state.list, trip],
      };
    },
  },
});

export const { saveTrip } = tripSlice.actions;

export const rootTripSelector = (state: RootState) => state.trips;

export const selectTrips = createDraftSafeSelector(
  rootTripSelector,
  (state) => state.list,
);

export const selectTripById = createDraftSafeSelector(
  [selectTrips, (state: TripState, id: string) => id],
  (state, id) => state?.find(x => x.id === id),
)

export default tripSlice.reducer;
