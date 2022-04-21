import TripItineraryItemBase from "./TripItineraryItemBase";

export default interface TripItineraryActivityItem extends TripItineraryItemBase {
  /** Booking ref or confirmation ref */
  reference?: string;
  /** The city/country of the location */
  location: string;
  /** The UTC time the trip ends at */
  endsAt?: string;
  /** The timezone to display the end time in */
  endsAtTimezone: string;
  price?: number;
  priceCurrency?: string;
}
