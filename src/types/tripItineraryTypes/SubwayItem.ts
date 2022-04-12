import { TripItineraryTravelItem } from "../TripItineraryTravelItem";

export interface SubwayItem extends TripItineraryTravelItem {
  /** The name of the business operating the journey */
  trainOperator?: string;
  /** The name of the service within the subway that is being used */
  line?: string;
}
