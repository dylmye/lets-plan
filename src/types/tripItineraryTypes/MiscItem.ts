import { TripItineraryTravelItem } from "../TripItineraryTravelItem";

export interface MiscItem extends TripItineraryTravelItem {
  /** The name providing the travel */
  operatorName?: string;
  /** Freeform input */
  details?: string;
}
