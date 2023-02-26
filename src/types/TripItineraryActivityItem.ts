import CURRENCIES from "../helpers/currency";
import TripItineraryItemBase from "./TripItineraryItemBase";

export default interface TripItineraryActivityItem
  extends TripItineraryItemBase {
  /** Booking ref or confirmation ref */
  reference?: string;
  /** The city/country of the location */
  location: string;
  price?: number;
  priceCurrency?: keyof typeof CURRENCIES | null;
}
