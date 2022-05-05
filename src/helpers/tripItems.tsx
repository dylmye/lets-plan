import { TripItemType } from "../types/TripItemType";
import {
  FlightTakeoff,
  DirectionsBoat,
  DirectionsBus,
  DirectionsTransit,
  DirectionsSubway,
  AirportShuttle,
  Hail,
  CarRental,
  DirectionsCar,
  Museum,
  RestaurantMenu,
  Groups,
  Tour,
  TheaterComedy,
  Theaters,
  MusicNote,
  ShoppingBag,
  SportsSoccer,
  DirectionsWalk,
  DirectionsBike,
} from "@mui/icons-material";
import { COLOURS } from "./colours";
import GoogleMapsTravelMode from "../types/GoogleMapsTravelMode";

/** Convert from TripItemType to a MUI Icon component */
export const getTripItemIcon = (item?: TripItemType): JSX.Element | null => {
  switch (item) {
    case TripItemType.Plane:
      return <FlightTakeoff titleAccess="Flight item" />;
    case TripItemType.Ferry:
      return <DirectionsBoat titleAccess="Ferry item" />;
    case TripItemType.Bus:
      return <DirectionsBus titleAccess="Bus item" />;
    case TripItemType.Train:
      return <DirectionsTransit titleAccess="Train item" />;
    case TripItemType.Subway:
      return <DirectionsSubway titleAccess="Subway item" />;
    case TripItemType.Shuttle:
      return <AirportShuttle titleAccess="Shuttle item" />;
    case TripItemType.Taxi:
      return <Hail titleAccess="Taxi item" />;
    case TripItemType["Car Rental"]:
      return <CarRental titleAccess="Rental Car item" />;
    case TripItemType.Car:
      return <DirectionsCar titleAccess="Car item" />;
    case TripItemType["By Foot"]:
      return <DirectionsWalk titleAccess="By Foot item" />;
    case TripItemType.Cycle:
      return <DirectionsBike titleAccess="Bicycling item" />;
    case TripItemType.Museum:
      return <Museum titleAccess="Museum item" />;
    case TripItemType["Eating Out"]:
      return <RestaurantMenu titleAccess="Eating Out item" />;
    case TripItemType["Meet-up"]:
      return <Groups titleAccess="Meet-up item" />;
    case TripItemType.Tour:
      return <Tour titleAccess="Tour item" />;
    case TripItemType.Theatre:
      return <TheaterComedy titleAccess="Theatre item" />;
    case TripItemType.Cinema:
      return <Theaters titleAccess="Cinema item" />;
    case TripItemType.Concert:
      return <MusicNote titleAccess="Concert item" />;
    case TripItemType.Shopping:
      return <ShoppingBag titleAccess="Shopping item" />;
    case TripItemType.Sports:
      return <SportsSoccer titleAccess="Sports item" />;
  }
  return null;
};

/** Detemine icon colour based on category */
export const getTripItemColour = (item?: TripItemType): string | null => {
  if (!item) {
    return null;
  }
  if (item.includes("activity_")) {
    return COLOURS.quaternary;
  }
  if (item.includes("travel_")) {
    return COLOURS.tertiary;
  }
  return COLOURS.white;
};

/** Determine google maps direction api travel mode from trip item type */
export const convertTripItemTypeToGoogleMapsTravelMode = (
  travelType: TripItemType
): GoogleMapsTravelMode | null => {
  switch (travelType) {
    case TripItemType.Bus:
    case TripItemType.Train:
    case TripItemType.Shuttle:
    case TripItemType.Subway: {
      return "transit";
    }
    case TripItemType["By Foot"]: {
      return "walking";
    }
    case TripItemType.Cycle: {
      return "bicycling";
    }
    case TripItemType.Car:
    case TripItemType["Car Rental"]: {
      return "driving";
    }
  }
  return null;
};
