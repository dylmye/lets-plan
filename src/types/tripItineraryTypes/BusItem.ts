import { TripItineraryTravelItem } from "../TripItineraryTravelItem";

export interface BusItem extends TripItineraryTravelItem {
  /** The name of the business operating the journey */
  busOperator?: string;
}
