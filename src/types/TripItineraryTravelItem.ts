import CURRENCIES from "../helpers/currency";
import TripItineraryItemBase from "./TripItineraryItemBase";

export default interface TripItineraryTravelItem extends TripItineraryItemBase {
  /** Booking ref or confirmation ref */
  reference?: string;
  /** The city/country of origin */
  originLocation: string;
  /** The city/country of destination */
  destinationLocation: string;
  /** The UTC time the trip ends at */
  endsAt: string;
  /** The timezone to display the end time in */
  endsAtTimezone: string;
  price?: number;
  priceCurrency?: keyof typeof CURRENCIES | null;
}
