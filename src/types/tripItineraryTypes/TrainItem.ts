import TripItineraryTravelItem from "../TripItineraryTravelItem";

export default interface TrainItem extends TripItineraryTravelItem {
  /** The name of the business operating the journey */
  trainOperator?: string;
  /** Purchased seat fare, generic classes */
  class?: "Business" | "First" | "Standard" | "Third" | "Other";
  /** The type of ticket bought, eg saver, off-peak */
  fare?: string;
}
