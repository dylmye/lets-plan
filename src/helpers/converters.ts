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
import { forceDateInUserTimezone, formatFirebaseDateTime } from "./dates";

/**
 * Storing dates in Firebase:
 * - all date-times should be stored in UTC without conversion:
 * for ex., user in UTC-4 entering 18:30 should store as 18:30 UTC
 * - all dates without times should be stored at 00:00 UTC
 */

/**
 * Convert a dayjs-compat date string to Firebase's Timestamp object.
 * Accurate to seconds.
 * @param date The date to convert
 * @returns The Firebase Timestamp representation of the date provided
 */
export const convertDateStringToTimestamp = (date: string): Timestamp =>
  new Timestamp(dayjs(date).unix(), 0);

/**
 * Translate timestamps on trips.
 */
export const convertTripDocument: FirestoreDataConverter<Trip> = {
  toFirestore(trip: Trip): TripSnapshot {
    const startsAt =
      trip.startsAt && dayjs(trip.startsAt).utc(true).startOf("day").format();
    const endsAt =
      trip.endsAt && dayjs(trip.endsAt).utc(true).endOf("day").format();

    return {
      ...trip,
      startsAt: convertDateStringToTimestamp(startsAt!),
      endsAt: convertDateStringToTimestamp(endsAt!),
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
      startsAt:
        data.startsAt &&
        forceDateInUserTimezone(formatFirebaseDateTime(data.startsAt)).format(),
      endsAt:
        data.endsAt &&
        forceDateInUserTimezone(formatFirebaseDateTime(data.endsAt)).format(),
      createdAtUtc:
        data.createdAtUtc &&
        forceDateInUserTimezone(
          formatFirebaseDateTime(data.createdAtUtc)
        ).format(),
      updatedAtUtc:
        data.updatedAtUtc &&
        forceDateInUserTimezone(
          formatFirebaseDateTime(data.updatedAtUtc)
        ).format(),
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
    // convert any timestamps
    Object.keys(tripItem)
      .filter((k) => tripItemTimestampKeys.includes(k as keyof TripItem))
      .forEach((k) => {
        // @ts-ignore typescript is stupid i promise this works
        tripItem[k] =
          !!tripItem[k as keyof TripItem] &&
          convertDateStringToTimestamp(
            dayjs(tripItem[k as keyof TripItem] as string)
              .utc(true)
              .format()
          );
      });

    const startsAt = dayjs(tripItem.startsAt).utc(true).format();

    return {
      ...tripItem,
      startsAt: convertDateStringToTimestamp(startsAt),
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
        data[k] = forceDateInUserTimezone(
          formatFirebaseDateTime(data[k])
        ).format();
      });

    return {
      ...data,
      id,
      startsAt: forceDateInUserTimezone(
        formatFirebaseDateTime(data.startsAt)
      ).format(),
    };
  },
};

/** Take an (assumed) JSON stringify output and make it a data URL */
export const convertJsonStringToBase64Download = (json: string): string => {
  const b64Encoded = Buffer.from(json).toString("base64");
  return `data:application/json;base64,${b64Encoded}`;
};

export const convertReduxTripItem = (tripItem: TripItem): TripItem => {
  const formattedTripItem: TripItem = { ...tripItem };

  Object.keys(tripItem)
    .filter<keyof TripItem>((k: string): k is keyof TripItem =>
      tripItemTimestampKeys.includes(k as keyof TripItem)
    )
    .forEach((k) => {
      // value is either unset, an ISO date string, or a Firestore Timestamp object
      if (
        !formattedTripItem[k] ||
        !dayjs(formattedTripItem[k] as string).isValid()
      ) {
        return;
      }
      console.log("converting", formattedTripItem);
      // @ts-ignore this works stfu typescript
      formattedTripItem[k] = forceDateInUserTimezone(
        formattedTripItem[k] as string
      ).format();
    });

  return {
    ...tripItem,
    startsAt: forceDateInUserTimezone(tripItem.startsAt).format(),
  };
};

/**
 * Conversion for trips from redux datastore
 * @param trip The raw trip
 */
export const convertReduxTrip = (trip: Trip): Trip => {
  return {
    ...trip,
    startsAt: forceDateInUserTimezone(trip.startsAt!).format(),
    endsAt: trip.endsAt && forceDateInUserTimezone(trip.endsAt).format(),
    createdAtUtc: forceDateInUserTimezone(trip.createdAtUtc).format(),
    updatedAtUtc: forceDateInUserTimezone(trip.updatedAtUtc).format(),
    items: (trip.items ?? []).map(convertReduxTripItem),
  };
};
