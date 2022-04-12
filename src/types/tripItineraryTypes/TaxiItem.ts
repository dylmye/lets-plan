import { TripItineraryTravelItem } from "../TripItineraryTravelItem";

export interface TaxiItem extends TripItineraryTravelItem {
  /** The name of the taxi's operating company */
  taxiOperator?: string;
  /** If the operator provides different services, enter it here */
  serviceName?: string;
  /** If the service has been booked in advance, or if it'll be ordered on demand */
  prebooked?: boolean;
}
