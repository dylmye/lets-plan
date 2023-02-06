import { DocumentData, Timestamp } from "firebase/firestore";
import TripItem from "../Tripitem";

interface TripItemWithoutTimestamps extends Omit<TripItem, "startsAt"> {}

/** Firebase stored version of TripItem type. Timestamps are converted to/from ISO8601 timestamps. */
export default interface TripItemSnapshot
  extends DocumentData,
    TripItemWithoutTimestamps {
  startsAt: Timestamp;
}
