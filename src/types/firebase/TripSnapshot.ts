import { Timestamp, DocumentData } from "firebase/firestore";
import Trip from "../Trip";

interface TripWithoutTimestamps
  extends Omit<Trip, "startsAt" | "endsAt" | "createdAtUtc" | "updatedAtUtc"> {}

/** Firebase stored version of Trip type. Timestamps are converted to/from ISO8601 timestamps. */
export default interface TripSnapshot
  extends DocumentData,
    TripWithoutTimestamps {
  startsAt: Timestamp;
  endsAt: Timestamp;
  createdAtUtc: Timestamp;
  updatedAtUtc: Timestamp;
  // subcollection of items: TripItineraryItemBase
}
