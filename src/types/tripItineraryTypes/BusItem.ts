import TripItineraryTravelItem from "../TripItineraryTravelItem";

export default interface BusItem extends TripItineraryTravelItem {
  /** The name of the business operating the journey */
  busOperator?: string;
}
