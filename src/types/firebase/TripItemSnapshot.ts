import { DocumentData, Timestamp } from "firebase/firestore";
import TripItineraryItemBase from "../TripItineraryItemBase";

interface TripItineraryItemBaseWithoutTimestamps
  extends Omit<TripItineraryItemBase, "startsAt"> {}

  /** Firebase stored version of TripItem type. Timestamps are converted to/from ISO8601 timestamps. */
export default interface TripItemSnapshot
  extends DocumentData,
    TripItineraryItemBaseWithoutTimestamps {
  startsAt: Timestamp;
}
