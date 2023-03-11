export enum TripItemType {
  // Travel
  "Plane" = "travel_plane",
  "Ferry" = "travel_ferry",
  "Bus" = "travel_bus",
  "Train" = "travel_train",
  "Subway" = "travel_subway",
  "Shuttle" = "travel_shuttle",
  "Taxi" = "travel_taxi",
  "Car Rental" = "travel_car_rental",
  "Car" = "travel_car",
  "By Foot" = "travel_by_foot",
  "Cycle" = "travel_bike",
  "Other Mode of Transport" = "travel_misc",
  // Activity
  "Check-in" = "activity_lodging_in",
  "Check-out" = "activity_lodging_out",
  "Museum" = "activity_museum",
  "Eating Out" = "activity_eatingout",
  "Meet-up" = "activity_meetup",
  "Tour" = "activity_tour",
  "Theatre" = "activity_theatre",
  "Cinema" = "activity_cinema",
  "Concert" = "activity_concert",
  "Shopping" = "activity_shopping",
  "Sports" = "activity_sports",
  "Reservation" = "activity_reservation",
  "Other Activity" = "activity_misc",
  "Note" = "activity_note",
}

export const TravelTypes: TripItemType[] = [
  TripItemType.Plane,
  TripItemType.Ferry,
  TripItemType.Bus,
  TripItemType.Train,
  TripItemType.Subway,
  TripItemType.Shuttle,
  TripItemType.Taxi,
  TripItemType["Car Rental"],
  TripItemType.Car,
  TripItemType["By Foot"],
  TripItemType.Cycle,
  TripItemType["Other Mode of Transport"],
];

export const ActivityTypes: TripItemType[] = [
  TripItemType["Check-in"],
  TripItemType["Check-out"],
  TripItemType.Museum,
  TripItemType["Eating Out"],
  TripItemType["Meet-up"],
  TripItemType.Tour,
  TripItemType.Theatre,
  TripItemType.Cinema,
  TripItemType.Concert,
  TripItemType.Shopping,
  TripItemType.Sports,
  TripItemType.Reservation,
  TripItemType.Note,
  TripItemType["Other Activity"],
];
