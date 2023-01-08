import TripItineraryTravelItem from "../TripItineraryTravelItem";

export default interface CarRentalItem extends TripItineraryTravelItem {
  /** The name of the rental company */
  rentalOperator?: string;
  /** Type of car/van user has selected */
  selectedVehicleType?: string;
}
