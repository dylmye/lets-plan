import TripItineraryTravelItem from "../TripItineraryTravelItem";

export default interface FlightItem extends TripItineraryTravelItem {
  /** eg U25021 */
  flightDesignator?: string;
  /** The name of the business selling the flight */
  airline?: string;
  /** The three letter airport designator for origin */
  originAirport?: string;
  /** The three letter airport designator for destination */
  destinationAirport?: string;
}
