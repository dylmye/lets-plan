import {
  FieldPath,
  Timestamp,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import dayjs from "dayjs";

import { auth, getTripItemsCollection, tripsRef } from "../../../firebase";
import { TripActions, TripSelectors } from "./interface";
import {
  convertDateStringToTimestamp,
  convertTripDocument,
} from "../../../helpers/converters";
import Trip from "../../../types/Trip";
import TripSnapshot from "../../../types/firebase/TripSnapshot";

/** actions */
const addTrip: TripActions["addTrip"] = async (trip) => {
  const userId = auth.currentUser?.uid;

  const convertibleTrip: Trip = {
    ...trip,
    public: false,
    userId,
    createdAtUtc: dayjs().format(),
    updatedAtUtc: dayjs().format(),
  };

  const tripDoc = convertTripDocument.toFirestore(
    convertibleTrip
  ) as TripSnapshot;

  // @TODO: this doesn't resolve while offline, add validation
  await addDoc(tripsRef, {
    ...tripDoc,
    createdAtUtc: serverTimestamp(),
    updatedAtUtc: serverTimestamp(),
  });
};

const deleteTripById: TripActions["deleteTripById"] = async (id) =>
  await deleteDoc(doc(tripsRef, id as string));

const updateTripById: TripActions["updateTripById"] = async (data) => {
  await updateDoc(doc(tripsRef, data.id), {
    ...data,
    startsAt: convertDateStringToTimestamp(data.startsAt as string),
    endsAt: convertDateStringToTimestamp(data.endsAt as string),
    updated: serverTimestamp(),
  });
};

const addTripItemByTripId: TripActions["addTripItemByTripId"] = async ({
  tripId,
  ...tripItem
}) => {
  const { category, ...filteredTripItem } = tripItem;
  const ref = getTripItemsCollection(tripId);
  await addDoc(ref, {
    ...filteredTripItem,
    startsAt: convertDateStringToTimestamp(filteredTripItem.startsAt as string),
    // endsAt: filteredTripItem.endsAt && convertDateStringToTimestamp(filteredTripItem.endsAt as string),
  });
};

const updateTripItemById: TripActions["updateTripItemById"] = async ({
  tripId,
  data,
}) => {
  const ref = getTripItemsCollection(tripId);
  await updateDoc(doc(ref, data.id), {
    ...data,
  });
};

const deleteTripItemById: TripActions["deleteTripItemById"] = async ({
  tripId,
  itemId,
}) => {
  const ref = getTripItemsCollection(tripId);
  await deleteDoc(doc(ref, itemId));
};

/** selectors */
const getTrips: TripSelectors["getTrips"] = async () => {
  const userId = auth.currentUser?.uid;

  const userIdMatches = where(new FieldPath("userId"), "==", userId as string);

  const res = await getDocs(
    query(tripsRef, userIdMatches).withConverter<Trip>(convertTripDocument)
  );

  return res.docs.map((x) => x.data());
};

const getTripsByDateSplit: TripSelectors["getTripsByDateSplit"] = async () => {
  const userId = auth.currentUser?.uid;

  const userIdMatches = where(new FieldPath("userId"), "==", userId as string);
  const tripIsInPast = where(new FieldPath("endsAt"), "<", Timestamp.now());
  const tripIsCurrent = where(new FieldPath("endsAt"), ">=", Timestamp.now());

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

  const currentQueryResponse = await getDocs(currentTripsQuery);
  const pastQueryResponse = await getDocs(pastTripsQuery);

  return {
    past: pastQueryResponse.docs.map((x) => x.data()),
    futureCurrent: currentQueryResponse.docs.map((x) => x.data()),
  };
};

const getTripById: TripSelectors["getTripById"] = async (id: string) => {
  const docRef = doc(tripsRef, id).withConverter<Trip>(convertTripDocument);
  const res = await getDoc(docRef);
  return res.data();
};

export const actions: TripActions = {
  addTrip,
  deleteTripById,
  updateTripById,
  addTripItemByTripId,
  updateTripItemById,
  deleteTripItemById,
};

export const selectors: TripSelectors = {
  getTrips,
  getTripsByDateSplit,
  getTripById,
};
