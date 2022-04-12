export interface TripItineraryItemBase {
  title: string;
  /** Brand image, if undefined then use the thumb linked to the travelType */
  image?: string;
  /** Subtitle text to show if travelType === travel_misc */
  miscText?: string;
}
