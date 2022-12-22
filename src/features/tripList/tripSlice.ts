import { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  createDraftSafeSelector,
  createEntityAdapter,
  createSlice,
  Dictionary,
  EntityId,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  doc,
  collection,
  getDoc,
  getDocs,
  CollectionReference,
} from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";

import { RootState } from "../../app/store";
import { tripsRef } from "../../firebase";
import SliceNames from "../../enums/SliceNames";
import { dateCompare, tripIsInState } from "../../helpers/dates";
import Trip from "../../types/Trip";
import TripDraft from "../../types/TripDraft";
import TripItineraryItemBase from "../../types/TripItineraryItemBase";
import { TripItemType } from "../../types/TripItemType";
import { CarItem } from "../../types/tripItineraryTypes";
import TripItineraryActivityItem from "../../types/TripItineraryActivityItem";
import { useAppSelector } from "../../app/hooks";
import { convertTripDocument } from "../../helpers/converters";
import TripItemSnapshot from "../../types/firebase/TripItemSnapshot";
import { isLoggedIn } from "../login/authSlice";

const name = SliceNames.TRIPS;

export interface TripState extends EntityState<Trip> {}

const exampleStartDate = dayjs().local().startOf("day");

const exampleTrip: Trip = {
  tripSchemaRevision: 1,
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
      order: 0,
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
      order: 1,
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
      order: 2,
    } as TripItineraryActivityItem,
    {
      type: TripItemType["Meet-up"],
      location: "Upgang Beach, Whitby, England",
      details: "Let's meet Janelle and Hanna by the rocks.",
      startsAt: exampleStartDate.add(16, "hour").add(30, "minute").format(),
      startsAtTimezone: "Europe/London",
      endsAt: exampleStartDate.add(19, "hour").format(),
      endsAtTimezone: "Europe/London",
      order: 3,
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
      order: 4,
    } as CarItem,
  ],
  public: false,
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
        tripSchemaRevision: 1,
        id: payload.id,
        title: payload.title,
        location: payload?.locationData?.label ?? payload.location,
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

      let changes = { ...payload };

      if (payload?.locationData || payload?.location) {
        changes.location = payload?.locationData?.label ?? payload.location;
      }

      tripsAdapter.updateOne(state, { id: payload.id, changes });
    },
  },
});

export const { addTrip, deleteTripById, updateTripById } = tripSlice.actions;

export const {
  selectAll: selectTrips,
  selectIds: selectTripIds,
  selectById: selectLocalTripById,
} = tripsAdapter.getSelectors<RootState>((state) => state.trips);

export const selectTripItemsByDay = (id: string) => (store: RootState) => {
  const trip = selectLocalTripById(store, id);

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

export const useSelectFirebaseTripById = (tripId: string) => {
  return useDocumentData(
    doc(tripsRef, tripId).withConverter<Trip>(convertTripDocument)
  );
};

/**
 * Grab the local trip. If the user is logged in,
 * fetch the trip from Firebase.
 * @param tripId The Trip UID to select with
 * @returns The Trip Data
 */
export const useSelectTripById = (
  tripId: string
): [data: Trip | null | undefined, loading: boolean] => {
  const [state, setState] = useState<{
    data: Trip | null | undefined;
    loading: boolean;
  }>({ data: null, loading: true });
  const loggedIn = useAppSelector(isLoggedIn);
  const localTrip = useAppSelector((state) =>
    selectLocalTripById(state, tripId as string)
  );

  useEffect(() => {
    if (!loggedIn) {
      setState({
        data: localTrip,
        loading: false,
      });
    } else {
      const tripDoc = doc(tripsRef, tripId).withConverter<Trip>(
        convertTripDocument
      );

      // we have to use .then because it's a hook :(
      // sorry I know this code hurts to read.
      getDoc(tripDoc).then((grabbedTripDoc) => {
        if (grabbedTripDoc.exists()) {
          const tripData = grabbedTripDoc.data();

          // fetch the trip items and merge them in with the trip data
          const tripItemsCollection = collection(
            tripsRef,
            tripId,
            "items"
          ) as CollectionReference<TripItemSnapshot>;

          getDocs<TripItemSnapshot>(tripItemsCollection).then(
            (grabbedTripItemDocs) => {
              if (!grabbedTripItemDocs.empty) {
                const combinedTripData = {
                  ...tripData,
                  items: grabbedTripItemDocs.docs.map((x) => x.data()),
                } as Trip;
                setState({
                  data: combinedTripData,
                  loading: false,
                });
              } else {
                setState({
                  data: tripData,
                  loading: false,
                });
              }
            }
          ).catch(e => console.error("Unable to fetch trip list items:", e));
        } else {
          setState({
            data: localTrip,
            loading: false,
          });
        }
      }).catch(e => console.error("Unable to fetch trip:", e));
    }
  }, [tripId, localTrip, loggedIn]);

  return [state.data, state.loading];
};

export default tripSlice.reducer;
