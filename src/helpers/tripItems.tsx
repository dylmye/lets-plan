import { TripItemType } from "../types/TripItemType";
import {
  FlightTakeoff,
  DirectionsBoat,
  DirectionsBus,
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
  DirectionsRailway,
  Notes,
} from "@mui/icons-material";
import { COLOURS } from "./colours";
import GoogleMapsTravelMode from "../types/GoogleMapsTravelMode";
import { SvgIconProps } from "@mui/material";

/** Convert from TripItemType to a MUI Icon component */
export const getTripItemIcon = (item?: TripItemType, otherProps?: SvgIconProps): JSX.Element | null => {
  switch (item) {
    case TripItemType.Plane:
      return <FlightTakeoff titleAccess="Flight item" {...otherProps} />;
    case TripItemType.Ferry:
      return <DirectionsBoat titleAccess="Ferry item" {...otherProps} />;
    case TripItemType.Bus:
      return <DirectionsBus titleAccess="Bus item" {...otherProps} />;
    case TripItemType.Train:
      return <DirectionsRailway titleAccess="Train item" {...otherProps} />;
    case TripItemType.Subway:
      return <DirectionsSubway titleAccess="Subway item" {...otherProps} />;
    case TripItemType.Shuttle:
      return <AirportShuttle titleAccess="Shuttle item" {...otherProps} />;
    case TripItemType.Taxi:
      return <Hail titleAccess="Taxi item" {...otherProps} />;
    case TripItemType["Car Rental"]:
      return <CarRental titleAccess="Rental Car item" {...otherProps} />;
    case TripItemType.Car:
      return <DirectionsCar titleAccess="Car item" {...otherProps} />;
    case TripItemType["By Foot"]:
      return <DirectionsWalk titleAccess="By Foot item" {...otherProps} />;
    case TripItemType.Cycle:
      return <DirectionsBike titleAccess="Bicycling item" {...otherProps} />;
    case TripItemType.Museum:
      return <Museum titleAccess="Museum item" {...otherProps} />;
    case TripItemType["Eating Out"]:
      return <RestaurantMenu titleAccess="Eating Out item" {...otherProps} />;
    case TripItemType["Meet-up"]:
      return <Groups titleAccess="Meet-up item" {...otherProps} />;
    case TripItemType.Tour:
      return <Tour titleAccess="Tour item" {...otherProps} />;
    case TripItemType.Theatre:
      return <TheaterComedy titleAccess="Theatre item" {...otherProps} />;
    case TripItemType.Cinema:
      return <Theaters titleAccess="Cinema item" {...otherProps} />;
    case TripItemType.Concert:
      return <MusicNote titleAccess="Concert item" {...otherProps} />;
    case TripItemType.Shopping:
      return <ShoppingBag titleAccess="Shopping item" {...otherProps} />;
    case TripItemType.Sports:
      return <SportsSoccer titleAccess="Sports item" {...otherProps} />;
    case TripItemType.Note:
      return <Notes titleAccess="Note item" {...otherProps} />;
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
