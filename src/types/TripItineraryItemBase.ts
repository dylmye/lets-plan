import { TripItemType } from "./TripItemType";

export default interface TripItineraryItemBase {
  /** Category of the item, blank for misc items */
  type?: TripItemType;
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
}
