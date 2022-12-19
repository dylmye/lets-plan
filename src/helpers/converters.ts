import dayjs from "dayjs";
import { FirestoreDataConverter, QueryDocumentSnapshot, Timestamp } from "firebase/firestore";
import TripSnapshot from "../types/firebase/TripSnapshot";
import Trip from "../types/Trip";

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
    }
  },
  fromFirestore(tripSnapshot: QueryDocumentSnapshot<TripSnapshot>, options): Trip {
    const data = tripSnapshot.data(options);
    return {
      ...data,
      startsAt: data.startsAt && dayjs.unix(data.startsAt.seconds).format(),
      endsAt: data.endsAt && dayjs.unix(data.endsAt.seconds).format(),
      createdAtUtc: data.createdAtUtc && dayjs.unix(data.createdAtUtc.seconds).format(),
      updatedAtUtc: data.updatedAtUtc && dayjs.unix(data.updatedAtUtc.seconds).format(),
    }
  }
};
