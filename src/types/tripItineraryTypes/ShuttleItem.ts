import TripItineraryTravelItem from "../TripItineraryTravelItem";

export default interface ShuttleItem extends TripItineraryTravelItem {
  /** The name of the business operating the shuttle */
  shuttleOperator?: string;
}
