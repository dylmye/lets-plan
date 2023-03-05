import {
  FieldPath,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import dayjs from "dayjs";

import TripItem from "../../../types/Tripitem";
import Trip from "../../../types/Trip";
import TripSnapshot from "../../../types/firebase/TripSnapshot";
import TripItemSnapshot from "../../../types/firebase/TripItemSnapshot";
import { getTripItemTypeLabel } from "../../../helpers/tripItems";
import {
  convertDateStringToTimestamp,
  convertTripDocument,
  convertTripItemDocuments,
} from "../../../helpers/converters";
import { getTripItemsCollection, tripsRef } from "../../../firebase";
import { TripActions, TripSelectors } from "./interface";

/** actions */
const addTrip: TripActions["addTrip"] = async (trip, userId) => {
  if (!userId) {
    console.warn("Action ignored: tried to add a trip while unauthenticated");
    return;
  }

  const { coverImageBlob, ...filteredTrip } = trip;

  const convertibleTrip: Trip = {
    ...filteredTrip,
    public: false,
    userId,
    createdAtUtc: dayjs().format(),
    updatedAtUtc: dayjs().format(),
  };

  const tripDoc = convertTripDocument.toFirestore(
    convertibleTrip
  ) as TripSnapshot;

  try {
    const newTrip = await addDoc(tripsRef, {
      ...tripDoc,
      createdAtUtc: serverTimestamp(),
      updatedAtUtc: serverTimestamp(),
    });
    return newTrip.id;
  } catch (e) {
    throw new Error(`[store/firestore] error creating trip: ${e}`);
  }
};

const deleteTripById: TripActions["deleteTripById"] = async (id) => {
  try {
    await deleteDoc(doc(tripsRef, id as string));
  } catch (e) {
    throw new Error(`[store/firestore] error deleting trip: ${e}`);
  }
};

const updateTripById: TripActions["updateTripById"] = async (data) => {
  try {
    await updateDoc(doc(tripsRef, data.id), {
      ...data,
      startsAt: convertDateStringToTimestamp(data.startsAt as string),
      endsAt: convertDateStringToTimestamp(data.endsAt as string),
      updatedAtUtc: serverTimestamp(),
    });
  } catch (e) {
    throw new Error(`[store/firestore] error updating trip: ${e}`);
  }
};

const addTripItemByTripId: TripActions["addTripItemByTripId"] = async ({
  tripId,
  ...tripItem
}) => {
  const { category, ...filteredTripItem } = tripItem;
  const ref = getTripItemsCollection(tripId);
  try {
    await addDoc(ref, {
      ...filteredTripItem,
      startsAt: convertDateStringToTimestamp(
        filteredTripItem.startsAt as string
      ),
      endsAt:
        filteredTripItem.endsAt &&
        convertDateStringToTimestamp(filteredTripItem.endsAt as string),
      title: filteredTripItem.title?.length
        ? filteredTripItem.title
        : getTripItemTypeLabel(filteredTripItem.type),
    } as TripItemSnapshot);
  } catch (e) {
    throw new Error(`[store/firestore] error adding a trip item: ${e}`);
  }
};

const updateTripItemById: TripActions["updateTripItemById"] = async ({
  tripId,
  data,
}) => {
  const ref = getTripItemsCollection(tripId);
  try {
    const { id, category, ...filteredTripItem } = data;
    await updateDoc(doc(ref, data.id), {
      ...filteredTripItem,
      startsAt: convertDateStringToTimestamp(filteredTripItem.startsAt),
      endsAt:
        filteredTripItem.endsAt &&
        convertDateStringToTimestamp(filteredTripItem.endsAt),
    });
  } catch (e) {
    throw new Error(`[store/firestore] error updating a trip item: ${e}`);
  }
};

const deleteTripItemById: TripActions["deleteTripItemById"] = async ({
  tripId,
  itemId,
}) => {
  const ref = getTripItemsCollection(tripId);
  try {
    await deleteDoc(doc(ref, itemId));
  } catch (e) {
    throw new Error(`[store/firestore] error deleting a trip item: ${e}`);
  }
};

/** selectors */
const getTrips: TripSelectors["getTrips"] = async (userId: string | null) => {
  if (!userId) {
    console.warn("Selector ignored: tried to get trips while unauthenticated");
    return [];
  }

  const userIdMatches = where(new FieldPath("userId"), "==", userId);

  try {
    const res = await getDocs(
      query(tripsRef, userIdMatches).withConverter<Trip>(convertTripDocument)
    );

    return res.docs.map((x) => x.data());
  } catch (e) {
    throw new Error(`[store/firestore] error getting trips: ${e}`);
  }
};

const getTripsByDateSplit: TripSelectors["getTripsByDateSplit"] = async (
  userId: string | null
) => {
  // moved to hook in order to listen to snapshot
  throw new Error(
    "[store/firestore] method not implemented: getTripsByDateSplit"
  );
};

const getTripById: TripSelectors["getTripById"] = async (id: string) => {
  // moved to hook in order to listen to snapshot
  throw new Error("[store/firestore] method not implemented: getTripById");
};

const exportTrips: TripSelectors["exportTrips"] = async (
  userId: string | null
) => {
  if (!userId) {
    console.warn(
      "Selector ignored: tried to export trips while unauthenticated"
    );
    return { data: "" };
  }

  try {
    const allTrips = await getTrips(userId);
    return {
      data: JSON.stringify(allTrips),
    };
  } catch (e) {
    throw new Error(`[store/firestore] error exporting trips: ${e}`);
  }
};

/** Additional */

/**
 * Grab items sub-collection for a trip document
 * @param tripId The Trip to grab items sub-collection for
 * @returns The sub-collection items
 */
const getTripItems = async (tripId: string): Promise<TripItem[]> => {
  const tripItemsCollection = collection(
    tripsRef,
    tripId,
    "items"
  ).withConverter<TripItem>(convertTripItemDocuments);

  try {
    const itemDocs = await getDocs(tripItemsCollection);
    return itemDocs.empty ? [] : itemDocs.docs.map((x) => x.data());
  } catch (e) {
    throw new Error(
      `[store/firestore] error getting trip items for trip id ${tripId}: ${e}`
    );
  }
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
  exportTrips,
};

export const extras = {
  getTripItems,
};
