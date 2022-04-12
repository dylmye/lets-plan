import { TripItemType } from "./TripItemType";
import { TripItineraryItemBase } from "./TripItineraryItemBase";

export interface TripItineraryTravelItem extends TripItineraryItemBase {
  travelType: TripItemType;
  details?: string;
  /** Booking ref or confirmation ref */
  reference?: string;
  /** The city/country of origin */
  originLocation: string;
  /** The city/country of destination */
  destinationLocation: string;
  /** The UTC time the trip starts at */
  startsAt: string;
  /** The timezone to display the start time in */
  startsAtTimezone: string;
  /** The UTC time the trip ends at */
  endsAt: string;
  /** The timezone to display the end time in */
  endsAtTimezone: string;
  price?: string;
  priceCurrency?: string;
}
