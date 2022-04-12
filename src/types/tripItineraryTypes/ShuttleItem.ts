import { TripItineraryTravelItem } from "../TripItineraryTravelItem";

export interface ShuttleItem extends TripItineraryTravelItem {
  /** The name of the business operating the shuttle */
  shuttleOperator?: string;
}
