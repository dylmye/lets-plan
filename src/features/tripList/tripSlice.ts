import dayjs from "dayjs";
import SliceNames from "../../enums/SliceNames";
import Trip from "../../types/Trip";
import { TripItemType } from "../../types/TripItemType";
import { CarItem } from "../../types/tripItineraryTypes";
import TripItineraryActivityItem from "../../types/TripItineraryActivityItem";
import {
  createDraftSafeSelector,
  createEntityAdapter,
  createSlice,
  Dictionary,
  EntityId,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";
import { dateCompare, tripIsInState } from "../../helpers/dates";
import TripDraft from "../../types/TripDraft";
import TripItineraryItemBase from "../../types/TripItineraryItemBase";
import { RootState } from "../../app/store";

const name = SliceNames.TRIPS;

export interface TripState extends EntityState<Trip> {}

const exampleStartDate = dayjs().local().startOf("day");

const exampleTrip: Trip = {
  id: "example",
  source: "offline",
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

const tripsAdapter = createEntityAdapter<Trip>({
  selectId: (trip) => trip.id,
  sortComparer: (a, b) => dateCompare(a.startsAt, b.startsAt),
});

const tripSlice = createSlice({
  name,
  initialState: tripsAdapter.getInitialState({
    entities: { [exampleTrip.id]: exampleTrip } as Dictionary<Trip>,
    ids: [exampleTrip.id] as EntityId[],
  }),
  reducers: {
    addTrip: (state, { payload }: PayloadAction<TripDraft>) => {
      let trip: Trip = {
        id: payload.id,
        title: payload.title,
        location: payload.locationData?.label,
        startsAt: payload.startsAt,
        endsAt: payload.endsAt,
        source: "offline",
        createdAtUtc: dayjs().format(),
        updatedAtUtc: dayjs().format(),
        image: payload.image,
        items: [],
      };

      tripsAdapter.addOne(state, trip);
    },
    deleteTripById: tripsAdapter.removeOne,
    updateTripById: tripsAdapter.updateOne,
  },
});

export const { addTrip, deleteTripById, updateTripById } = tripSlice.actions;

export const {
  selectAll: selectTrips,
  selectIds: selectTripIds,
  selectById: selectTripById,
} = tripsAdapter.getSelectors<RootState>((state) => state.trips);

export const selectTripItemsByDay = (id: string) => (store: RootState) => {
  const trip = selectTripById(store, id);

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
  state
    .filter((trip) => tripIsInState(trip, "past"))
    .sort((a, b) =>
      dateCompare(a.endsAt ?? a.startsAt, b.endsAt ?? b.startsAt, true)
    )
);

export default tripSlice.reducer;
