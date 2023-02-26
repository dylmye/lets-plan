import CURRENCIES from "../helpers/currency";
import TripItineraryItemBase from "./TripItineraryItemBase";

export default interface TripItineraryTravelItem extends TripItineraryItemBase {
  /** Booking ref or confirmation ref */
  reference?: string;
  /** The city/country of origin */
  originLocation: string;
  /** The city/country of destination */
  destinationLocation: string;
  price?: number;
  priceCurrency?: keyof typeof CURRENCIES | null;
}
