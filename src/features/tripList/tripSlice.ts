import {
  createDraftSafeSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { RootState } from "../../app/store";
import { tripIsInState } from "../../helpers/dates";
import SliceNames from "../../enums/SliceNames";
import { Trip } from "../../types/Trip";
import { TripDraft } from "../../types/TripDraft";
import { TripItemType } from "../../types/TripItemType";
import { CarItem } from "../../types/tripItineraryTypes";
import TripItineraryActivityItem from "../../types/TripItineraryActivityItem";
import TripItineraryItemBase from "../../types/TripItineraryItemBase";

const name = SliceNames.TRIPS;

export interface TripState {
  list: Trip[];
}

const exampleStartDate = dayjs().local().startOf("day");

const exampleTrip: Trip = {
  id: "example",
  title: "Your First Trip",
  details: "Meeting up with Hanna and Janelle for a beach vacay!!",
  location: "Whitby, Yorkshire, UK",
  startsAt: exampleStartDate.format(),
  endsAt: exampleStartDate.endOf("day").add(1, "day").format(),
  createdAtUtc: dayjs.utc().format(),
  updatedAtUtc: dayjs.utc().format(),
  image:
    "https://firebasestorage.googleapis.com/v0/b/lets-plan-firebase.appspot.com/o/default-trip-thumbs%2Fdefault-yorkshire-1555795622.webp?alt=media",
  items: [
    {
      type: TripItemType.Car,
      title: "Taking mum's campervan to Whitby",
      details: "Mum's okay with us borrowing the Transporter for the week",
      originLocation: "Walthamstow, London, UK",
      destinationLocation: "Whitby, Yorkshire, UK",
      startsAt: exampleStartDate.add(7, "hour").format(),
      startsAtTimezone: "Europe/London",
      endsAt: exampleStartDate.add(11, "hour").add(49, "minute").format(),
      endsAtTimezone: "Europe/London",
    } as CarItem,
    {
      type: TripItemType["Eating Out"],
      location:
        "Hadleys Fish Restaurant & Accommodation, 11 Bridge St, Whitby YO22 4BG, England",
      details: "Fish and chips by the bridge!",
      startsAt: exampleStartDate.add(12, "hour").format(),
      startsAtTimezone: "Europe/London",
      endsAt: exampleStartDate.add(13, "hour").format(),
      endsAtTimezone: "Europe/London",
    } as TripItineraryActivityItem,
    {
      type: TripItemType.Museum,
      location:
        "Captain Cook Memorial Museum, Grape Ln, Whitby YO22 4BA, England",
      startsAt: exampleStartDate.add(15, "hour").format(),
      startsAtTimezone: "Europe/London",
      endsAt: exampleStartDate.add(16, "hour").format(),
      endsAtTimezone: "Europe/London",
      urls: {
        Website: "https://www.cookmuseumwhitby.co.uk/",
      },
      reference: "CK0094410",
      price: 15,
      priceCurrency: "GBP",
    } as TripItineraryActivityItem,
    {
      type: TripItemType["Meet-up"],
      location: "Upgang Beach, Whitby, England",
      details: "Let's meet Janelle and Hanna by the rocks.",
      startsAt: exampleStartDate.add(16, "hour").add(30, "minute").format(),
      startsAtTimezone: "Europe/London",
      endsAt: exampleStartDate.add(19, "hour").format(),
      endsAtTimezone: "Europe/London",
    } as TripItineraryActivityItem,
    {
      type: TripItemType.Car,
      title: "Driving back home",
      originLocation: "Whitby, Yorkshire, UK",
      destinationLocation: "Walthamstow, London, UK",
      startsAt: exampleStartDate.add(1, "day").add(12, "hour").format(),
      startsAtTimezone: "Europe/London",
      endsAt: exampleStartDate
        .add(1, "day")
        .add(16, "hour")
        .add(49, "minute")
        .format(),
      endsAtTimezone: "Europe/London",
    } as CarItem,
  ],
};

const initialState: TripState = {
  list: [exampleTrip],
};

export const tripSlice = createSlice({
  name,
  initialState,
  reducers: {
    addTrip: (state, { payload }: PayloadAction<TripDraft>) => {
      console.log("yesss");
      let trip: Trip = {
        id: payload.id,
        title: payload.title,
        location: payload.locationData?.label,
        startsAt: payload.startsAt,
        endsAt: payload.endsAt,
        createdAtUtc: dayjs().format(),
        updatedAtUtc: dayjs().format(),
        image: payload.image,
        items: [],
      };

      return {
        ...state,
        list: [...state.list, trip],
      };
    },
    deleteTrip: (state, { payload: idToDelete }: PayloadAction<string>) => {
      const ids = state.list.map(({ id }) => id);
      // @TODO: API request to delete linked image?
      if (ids.includes(idToDelete)) {
        const newList = [...state.list].filter(({ id }) => id !== idToDelete);
        return {
          ...state,
          list: newList,
        };
      }
      return state;
    },
  },
});

export const { addTrip, deleteTrip } = tripSlice.actions;

export const rootTripSelector = (state: RootState) => state.trips;

export const selectTrips = createDraftSafeSelector(
  rootTripSelector,
  (state) => state.list
);

export const selectTripIds = createDraftSafeSelector(selectTrips, (state) =>
  state.map((x) => x.id)
);

export const selectTripById = (id: string) => (store: RootState) => {
  return store.trips.list.find((x) => x.id === id);
};

export const selectTripItemsByDay = (id: string) => (store: RootState) => {
  const trip = store.trips.list.find((x) => x.id === id);

  if (trip === undefined || !trip.items?.length) {
    return {};
  }

  return trip?.items.reduce((r, a) => {
    const date = dayjs(a.startsAt).format("YYYY-MM-DD");
    r[date] = [...(r[date] ?? []), a];
    return r;
  }, {} as Record<string, TripItineraryItemBase[]>);
};

export const selectCurrentTrips = createDraftSafeSelector(
  selectTrips,
  (state) => state.filter((trip) => tripIsInState(trip, "future"))
);

export const selectPastTrips = createDraftSafeSelector(selectTrips, (state) =>
  state.filter((trip) => tripIsInState(trip, "past"))
);

export default tripSlice.reducer;
