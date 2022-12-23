import dayjs from "dayjs";
import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  Timestamp,
} from "firebase/firestore";
import TripItemSnapshot from "../types/firebase/TripItemSnapshot";
import TripSnapshot from "../types/firebase/TripSnapshot";
import Trip from "../types/Trip";
import TripItineraryItemBase from "../types/TripItineraryItemBase";

/**
 * Translate timestamps on trips.
 */
export const convertTripDocument: FirestoreDataConverter<Trip> = {
  toFirestore(trip: Trip): TripSnapshot {
    return {
      ...trip,
      startsAt: new Timestamp(dayjs(trip.startsAt).unix(), 0),
      endsAt: new Timestamp(dayjs(trip.endsAt).unix(), 0),
      createdAtUtc: new Timestamp(dayjs(trip.createdAtUtc).unix(), 0),
      updatedAtUtc: new Timestamp(dayjs(trip.updatedAtUtc).unix(), 0),
    };
  },
  fromFirestore(
    tripSnapshot: QueryDocumentSnapshot<TripSnapshot>,
    options
  ): Trip {
    const data = tripSnapshot.data(options);
    return {
      ...data,
      startsAt: data.startsAt && dayjs.unix(data.startsAt.seconds).format(),
      endsAt: data.endsAt && dayjs.unix(data.endsAt.seconds).format(),
      createdAtUtc:
        data.createdAtUtc && dayjs.unix(data.createdAtUtc.seconds).format(),
      updatedAtUtc:
        data.updatedAtUtc && dayjs.unix(data.updatedAtUtc.seconds).format(),
    };
  },
};

/** A list of keys to convert to/from timestamps on classes based on TripItineraryItemBase */
const tripItemTimestampKeys = [
  // 'startsAt', Don't include this so types still work. startsAt is on the base model
  "endsAt",
];

/**
 * Translate timestamps on trip items.
 */
export const convertTripItemDocuments: FirestoreDataConverter<TripItineraryItemBase> =
  {
    toFirestore(tripItem: TripItineraryItemBase): TripItemSnapshot {
      Object.keys(tripItem)
        .filter((k) => tripItemTimestampKeys.includes(k))
        .forEach((k) => {
          (tripItem as any)[k] =
            (tripItem as any)[k] &&
            new Timestamp(dayjs((tripItem as any)[k]).unix(), 0);
        });

      return {
        ...tripItem,
        startsAt: new Timestamp(dayjs(tripItem.startsAt).unix(), 0),
      };
    },
    fromFirestore(
      tripItemSnapshot: QueryDocumentSnapshot<TripItemSnapshot>,
      options
    ): TripItineraryItemBase {
      const data = tripItemSnapshot.data(options);
      Object.keys(data)
        .filter((k) => tripItemTimestampKeys.includes(k))
        .forEach((k) => {
          (data as any)[k] =
            (data as any)[k] &&
            dayjs.unix(((data as any)[k] as Timestamp).seconds).format();
        });

      return {
        ...data,
        startsAt: data.startsAt && dayjs.unix(data.startsAt.seconds).format(),
      };
    },
  };
