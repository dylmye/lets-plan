import TripItineraryTravelItem from "../TripItineraryTravelItem";

export default interface MiscItem extends TripItineraryTravelItem {
  /** The name providing the travel */
  operatorName?: string;
  /** Freeform input */
  details?: string;
}
