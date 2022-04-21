import TripItineraryTravelItem from "../TripItineraryTravelItem";

export default interface TrainItem extends TripItineraryTravelItem {
  /** The name of the business operating the journey */
  trainOperator?: string;
  /** Station designator for origin */
  originStationCode?: string;
  /** Station designator for destination */
  destinationStationCode?: string;
  /** Purchased seat fare, generic classes */
  class?: 'Business' | 'First' | 'Standard' | 'Third';
  /** The type of ticket bought, eg saver, off-peak */
  fare?: string;
}
