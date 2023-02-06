import { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import {
  createAction,
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
  query,
  where,
  FieldPath,
  Timestamp,
  deleteDoc,
} from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from "uuid";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { auth, tripsRef } from "../../firebase";
import SliceNames from "../../enums/SliceNames";
import { isLoggedIn } from "../login/authSlice";
import {
  convertTripDocument,
  convertTripItemDocuments,
} from "../../helpers/converters";
import { dateCompare, tripIsInState } from "../../helpers/dates";
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

export const selectCurrentTrips = createDraftSafeSelector(
  selectTrips,
  (state) =>
    state
      .filter((trip) => tripIsInState(trip, "future"))
      .sort((a, b) =>
        dateCompare(a.endsAt ?? a.startsAt, b.endsAt ?? b.startsAt)
      )
);

export const selectPastTrips = createDraftSafeSelector(selectTrips, (state) =>
  state
    .filter((trip) => tripIsInState(trip, "past"))
    .sort((a, b) =>
      dateCompare(a.endsAt ?? a.startsAt, b.endsAt ?? b.startsAt, true)
    )
);

/**
 * Grab all trips, split by current and past. If the user
 * is logged in, fetch trips from Firebase.
 * @returns A tuple: [current trips, past trips, loading state]
 */
export const useSelectTrips = (): [Trip[], Trip[], boolean] => {
  const currentTrips = useAppSelector(selectCurrentTrips);
  const pastTrips = useAppSelector(selectPastTrips);
  const loggedIn = useAppSelector(isLoggedIn);
  const [user, userLoading] = useAuthState(auth);
  const [state, setState] = useState<[Trip[], Trip[], boolean]>([[], [], true]);

  useEffect(() => {
    if (!loggedIn || !user?.uid) {
      // set loading to either loggedIn (so false when there is no user), or userLoading (because user check will be )
      setState([currentTrips, pastTrips, loggedIn || userLoading]);
    } else {
      const userIdMatches = where(
        new FieldPath("userId"),
        "==",
        user?.uid as string
      );
      const tripIsInPast = where(
        new FieldPath("endsAt"),
        "<",
        new Timestamp(dayjs().unix(), 0)
      );
      const tripIsCurrent = where(
        new FieldPath("endsAt"),
        ">=",
        new Timestamp(dayjs().unix(), 0)
      );

      const currentTripsQuery = query(
        tripsRef,
        userIdMatches,
        tripIsCurrent
      ).withConverter<Trip>(convertTripDocument);

      const pastTripsQuery = query(
        tripsRef,
        userIdMatches,
        tripIsInPast
      ).withConverter<Trip>(convertTripDocument);

      Promise.all([getDocs(currentTripsQuery), getDocs(pastTripsQuery)])
        .then(([current, past]) => {
          setState([
            current.docs.map((x) => x.data()),
            past.docs.map((x) => x.data()),
            false,
          ]);
        })
        .catch((e) => {
          console.error("error fetching list of trips:", e);
        });
    }
  }, [currentTrips, loggedIn, pastTrips, user, userLoading]);

  return state;
};

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
    selectLocalTripById(state, tripId)
  );

  const setLocalAsState = useCallback(() => {
    if (!localTrip) {
      console.error("Trip doesn't exist locally");
    }

    setState({
      data: localTrip,
      loading: false,
    });
  }, [localTrip]);

  useEffect(() => {
    if (!loggedIn) {
      setLocalAsState();
    } else {
      const tripDoc = doc(tripsRef, tripId).withConverter<Trip>(
        convertTripDocument
      );

      // we have to use .then because it's a hook :(
      // sorry I know this code hurts to read.
      getDoc(tripDoc)
        .then((grabbedTripDoc) => {
          if (grabbedTripDoc.exists()) {
            const tripData = grabbedTripDoc.data();

            // fetch the trip items and merge them in with the trip data
            const tripItemsCollection = collection(
              tripsRef,
              tripId,
              "items"
            ).withConverter<TripItem>(convertTripItemDocuments);

            getDocs(tripItemsCollection)
              .then((grabbedTripItemDocs) => {
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
              })
              .catch((e) =>
                console.error("Unable to fetch trip list items:", e)
              );
          } else {
            setLocalAsState();
          }
        })
        .catch((e) => {
          console.warn("Unable to fetch trip:", e);
          setLocalAsState();
        });
    }
  }, [tripId, localTrip, loggedIn, setLocalAsState]);

  return [state.data, state.loading];
};

/**
 * Creates a callback to delete a local or remote
 * trip, depending on user logged-in state.
 * @returns The callback to trigger the delete
 */
export const useDeleteTripById = () => {
  const loggedIn = useAppSelector(isLoggedIn);
  const dispatch = useAppDispatch();

  return useCallback(
    (tripId: string) => {
      if (!loggedIn) {
        return dispatch(deleteTripById(tripId));
      }

      // items subcollection is deleted with a cloud
      // function - see api-function `removeRelatedOnTripDelete`

      return deleteDoc(doc(tripsRef, tripId));
    },
    [dispatch, loggedIn]
  );
};

export default tripSlice.reducer;
