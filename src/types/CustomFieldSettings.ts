export default interface CustomFieldSettings {
  /** if the form should have a origin location */
  hasOrigin: boolean;
  /** if the form should have a destination location */
  hasDestination: boolean;
  /** if the form should have a booking/confirmation optional reference. default: true */
  hasReference?: boolean;
  /** if the form should have a price field (+ currency field) default: true */
  hasPrice?: boolean;
  /** Custom label to use for "location"/"originLocation" field  */
  originLocationLabel?: string;
  /** Custom label to use for "destinationLocation" field */
  destinationLocationLabel?: string;
  /** Limit the location autocomplete searches for. Up to 5 types from Tables 1 and 2 here: https://developers.google.com/maps/documentation/places/web-service/supported_types */
  autoCompleteTypes?: string[];
}
