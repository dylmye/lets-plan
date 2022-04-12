import { TripItineraryTravelItem } from "../TripItineraryTravelItem";

export interface CarRentalItem extends TripItineraryTravelItem {
  /** The name of the rental company */
  rentalOperator?: string;
  /** The rental shop, blank for on-street car rental e.g. zipcar */
  pickupLocation?: string;
}
