import TripItineraryTravelItem from "../TripItineraryTravelItem";

export default interface FlightItem extends TripItineraryTravelItem {
  /** eg U25021 */
  flightDesignator?: string;
  /** The name of the business selling the flight */
  airline?: string;
  /** The class: Business, First, Prem. Eco, Economy, or custom names per airline */
  class?: string;
}
