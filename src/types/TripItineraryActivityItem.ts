import TripItineraryItemBase from "./TripItineraryItemBase";

export default interface TripItineraryActivityItem
  extends TripItineraryItemBase {
  /** Booking ref or confirmation ref */
  reference?: string;
  /** The city/country of the location */
  location: string;
}
