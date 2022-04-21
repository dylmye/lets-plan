import TripItineraryTravelItem from "../TripItineraryTravelItem";

export default interface FerryItem extends TripItineraryTravelItem {
  /** The name of the ferry's operating company */
  ferryOperator?: string;
}
