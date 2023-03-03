import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  Timestamp,
} from "firebase/firestore";
import dayjs from "dayjs";
import TripItem from "../types/Tripitem";
import Trip from "../types/Trip";
import TripSnapshot from "../types/firebase/TripSnapshot";
import TripItemSnapshot from "../types/firebase/TripItemSnapshot";
import { formatFirebaseDateTime } from "./dates";

export const convertDateStringToTimestamp = (date: string): Timestamp =>
  new Timestamp(dayjs(date).unix(), 0);

/**
 * Translate timestamps on trips.
 */
export const convertTripDocument: FirestoreDataConverter<Trip> = {
  toFirestore(trip: Trip): TripSnapshot {
    return {
      ...trip,
      startsAt: convertDateStringToTimestamp(trip.startsAt as string),
      endsAt: convertDateStringToTimestamp(trip.endsAt as string),
      createdAtUtc: convertDateStringToTimestamp(trip.createdAtUtc),
      updatedAtUtc: convertDateStringToTimestamp(trip.updatedAtUtc),
    };
  },
  fromFirestore(
    tripSnapshot: QueryDocumentSnapshot<TripSnapshot>,
    options
  ): Trip {
    const data = tripSnapshot.data(options);
    const id = tripSnapshot.id;
    return {
      ...data,
      id,
      startsAt: data.startsAt && dayjs.unix(data.startsAt.seconds).format(),
      endsAt: data.endsAt && dayjs.unix(data.endsAt.seconds).format(),
      createdAtUtc:
        data.createdAtUtc && dayjs.unix(data.createdAtUtc.seconds).format(),
      updatedAtUtc:
        data.updatedAtUtc && dayjs.unix(data.updatedAtUtc.seconds).format(),
    };
  },
};

/** A list of keys to convert to/from timestamps on classes based on Tripitem type */
const tripItemTimestampKeys: (keyof TripItem)[] = [
  // 'startsAt', Don't include this so types still work. startsAt is on the base model
  "endsAt",
];

/**
 * Translate timestamps on trip items.
 */
export const convertTripItemDocuments: FirestoreDataConverter<TripItem> = {
  toFirestore(tripItem: TripItem): TripItemSnapshot {
    // convert any
    Object.keys(tripItem)
      .filter((k) => tripItemTimestampKeys.includes(k as keyof TripItem))
      .forEach((k) => {
        // @ts-ignore
        console.log(tripItem[k]);
        // @ts-ignore typescript is stupid i promise this works
        tripItem[k] =
          !!tripItem[k as keyof TripItem] &&
          new Timestamp(
            dayjs(tripItem[k as keyof TripItem] as string).unix(),
            0
          );
      });

    return {
      ...tripItem,
      startsAt: new Timestamp(dayjs(tripItem.startsAt).unix(), 0),
    };
  },
  fromFirestore(
    tripItemSnapshot: QueryDocumentSnapshot<TripItemSnapshot>,
    options
  ): TripItem {
    const data = tripItemSnapshot.data(options);
    const id = tripItemSnapshot.id;
    Object.keys(data)
      .filter((k) => tripItemTimestampKeys.includes(k as keyof TripItem))
      .forEach((k) => {
        // value is either unset, an ISO date string, or a Firestore Timestamp object
        if (!data[k]) {
          return;
        }
        data[k] = formatFirebaseDateTime(data[k]);
      });

    return {
      ...data,
      id,
      startsAt: formatFirebaseDateTime(data.startsAt),
    };
  },
};

/** Take an (assumed) JSON stringify output and make it a data URL */
export const convertJsonStringToBase64Download = (json: string): string => {
  const b64Encoded = Buffer.from(json).toString("base64");
  return `data:application/json;base64,${b64Encoded}`;
};
