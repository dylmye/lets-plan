import dayjs from "dayjs";
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
import { SvgIconProps } from "@mui/material";
import { Field } from "formik";
import { TextField } from "formik-mui";
import { GooglePlacesAutocompleteField } from "@dylmye/mui-google-places-autocomplete";

import { COLOURS } from "./colours";
import { TravelTypes, TripItemType } from "../types/TripItemType";
import GoogleMapsTravelMode from "../types/GoogleMapsTravelMode";
import TripItineraryItemBase from "../types/TripItineraryItemBase";
import AirlineAutocompleteField from "../components/fields/AirlineAutocompleteField";
import BetterSwitchField from "../components/fields/BetterSwitchField";
import CustomFieldSettings from "../types/CustomFieldSettings";

/** Convert from TripItemType to a MUI Icon component */
export const getTripItemIcon = (
  item?: TripItemType,
  otherProps?: SvgIconProps
): JSX.Element | null => {
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

/** Group an array of trip items to an object of <startsAt>: TripItems[] */
export const groupTripItemsByDay = (
  tripItems: TripItineraryItemBase[]
): Record<string, TripItineraryItemBase[]> => {
  return tripItems?.reduce((r, a) => {
    const date = dayjs(a.startsAt).format("YYYY-MM-DD");
    r[date] = [...(r[date] ?? []), a];
    return r;
  }, {} as Record<string, TripItineraryItemBase[]>);
};

/**
 * Reverse index the TripItemType
 * @param t The trip item type to get the label of
 * @returns The friendly name for the trip item type
 */
export const getTripItemTypeLabel = (t: TripItemType): string =>
  Object.keys(TripItemType)[Object.values(TripItemType).indexOf(t)];

/**
 * An object of types with their extra fields. The field type is either 'text' (TextField), 'textarea' (TextField with multiline), 'toggle' (Switch), or 'dropdown:x,y,z' where x, y and z are dropdown options. There are also some API dropdown options:
 * - connected-dropdown:airline - a list of airliners with english name and ICAO/IATA codes
 * - connected-dropdown:places - google maps places api
 * You can also use 'optional-dropdown:x,y,z' to allow users to select one of your options, or enter their own.
 */
export const tripItemExtraFields: Record<
  TripItemType,
  Record<string, "text" | "toggle" | string>
> = {
  [TripItemType.Plane]: {
    flightDesignator: "text",
    airline: "connected-dropdown:airline",
  },
  [TripItemType.Ferry]: {
    ferryOperator: "text",
  },
  [TripItemType.Bus]: {
    busOperator: "text",
  },
  [TripItemType.Train]: {
    trainOperator: "text",
    class: "optional-dropdown:Business,First,Standard,Third",
    fare: "text",
  },
  [TripItemType.Subway]: {
    subwayOperator: "text",
    line: "text",
  },
  [TripItemType.Shuttle]: {
    shuttleOperator: "text",
  },
  [TripItemType.Taxi]: {
    taxiOperator: "text",
    serviceName: "text",
    prebooked: "toggle",
  },
  [TripItemType["Car Rental"]]: {
    rentalOperator: "text",
    selectedVehicleType: "text",
  },
  [TripItemType.Car]: {},
  [TripItemType["By Foot"]]: {},
  [TripItemType.Cycle]: {},
  [TripItemType["Other Mode of Transport"]]: {
    operatorName: "text",
    details: "text",
  },
  [TripItemType.Museum]: {},
  [TripItemType["Eating Out"]]: {},
  [TripItemType["Meet-up"]]: {},
  [TripItemType.Tour]: {},
  [TripItemType.Theatre]: {},
  [TripItemType.Cinema]: {},
  [TripItemType.Concert]: {},
  [TripItemType.Shopping]: {},
  [TripItemType.Sports]: {},
  [TripItemType.Note]: {
    details: "textarea",
  },
  [TripItemType["Other Activity"]]: {},
};

/** Determine settings for startsAt/endsAt fields for the given type */
export const customFieldSettings = (
  type: TripItemType
): CustomFieldSettings => {
  // for some activities: no ends at
  const hasDestination = ![TripItemType["Meet-up"], TripItemType.Note].includes(
    type
  );
  let originLocationLabel: string;
  let destinationLocationLabel: string;
  let autoCompleteTypes: string[] = [];

  switch (type) {
    case TripItemType.Plane: {
      originLocationLabel = "Origin Airport";
      destinationLocationLabel = "Destination Airport";
      autoCompleteTypes = ["airport"];
      break;
    }
    case TripItemType["Car Rental"]: {
      originLocationLabel = "Pickup Location";
      destinationLocationLabel = "Destination";
      break;
    }
    case TripItemType.Train: {
      originLocationLabel = "Origin Station";
      destinationLocationLabel = "Destination Station";
      autoCompleteTypes = ["train_station"];
      break;
    }
    default:
      originLocationLabel = TravelTypes.includes(type)
        ? "Starting Location"
        : "Location";
      destinationLocationLabel = "Ending Location";
  }

  return {
    hasOrigin: type !== TripItemType.Note,
    hasDestination,
    originLocationLabel,
    destinationLocationLabel,
    autoCompleteTypes,
  };
};

const fieldNameToLabel = (name: string): string => {
  const result = name.replace(/([A-Z]{1,})/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

/**
 * Convert a field-name: field-type pair to a field component
 * @param field The field name to use for formik
 * @param fieldType The value for the field in the extraFields array
 * @returns The component for the field
 */
export const renderExtraField = (
  field: string,
  fieldType: string
): JSX.Element => {
  switch (fieldType) {
    case "toggle": {
      return (
        <Field
          name={field}
          component={BetterSwitchField}
          label={fieldNameToLabel(field)}
        />
      );
    }
    case "textarea": {
      return (
        <Field
          name={field}
          label={fieldNameToLabel(field)}
          component={TextField}
          fullWidth
          multiline
        />
      );
    }
    case "connected-dropdown:places": {
      return (
        <Field
          component={GooglePlacesAutocompleteField}
          name={field}
          label={fieldNameToLabel(field)}
        />
      );
    }
    case "connected-dropdown:airline": {
      return (
        <Field
          component={AirlineAutocompleteField}
          name={field}
          label={fieldNameToLabel(field)}
        />
      );
    }
    // case "connected-dropdown:airport"
    default:
      // starts-with "optional-dropdown"
      // starts-with "dropdown"

      // fieldType === 'text' + backup
      return (
        <Field
          name={field}
          label={fieldNameToLabel(field)}
          component={TextField}
          fullWidth
        />
      );
  }
};
