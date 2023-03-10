import CURRENCIES from "../helpers/currency";
import { TripItemType } from "./TripItemType";

export default interface TripItineraryItemBase {
  id: string;
  /** Category of the item, blank for misc items */
  type: TripItemType;
  /** User-provided headline text with category as default */
  title?: string;
  /** Brand image, if undefined then use the thumb linked to the type */
  image?: string;
  /** Subtitle text to show if type === *_misc */
  miscText?: string;
  /** User-provided description for all types */
  details?: string;
  /** User-provided relevant links. key = title (optional), value = URL */
  urls?: Record<string, string> | null;
  /** The UTC time the item starts at */
  startsAt: string;
  /** The timezone to display the start time in */
  startsAtTimezone: string;
  /** The UTC time the trip ends at */
  endsAt?: string | null;
  /** The timezone to display the end time in */
  endsAtTimezone?: string;
  /** The cost (estimated or actual) for the item (tickets etc) */
  price?: number;
  /** The currency this price is in */
  priceCurrency?: keyof typeof CURRENCIES | null;
}
