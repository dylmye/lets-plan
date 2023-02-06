import BusItem from "./BusItem";
import CarItem from "./CarItem";
import CarRentalItem from "./CarRentalItem";
import FerryItem from "./FerryItem";
import FlightItem from "./FlightItem";
import MiscItem from "./MiscItem";
import ShuttleItem from "./ShuttleItem";
import SubwayItem from "./SubwayItem";
import TaxiItem from "./TaxiItem";
import TrainItem from "./TrainItem";
import NoteItem from "./NoteItem";

export type {
  BusItem,
  CarItem,
  CarRentalItem,
  FerryItem,
  FlightItem,
  MiscItem,
  NoteItem,
  ShuttleItem,
  SubwayItem,
  TaxiItem,
  TrainItem,
};

/** All possible fields: from ItemBase, ActivityItem base, TravelItem base and from custom travel item extra fields. */
export type AllItineraryTypes = BusItem &
  CarItem &
  CarRentalItem &
  FerryItem &
  FlightItem &
  MiscItem &
  NoteItem &
  ShuttleItem &
  SubwayItem &
  TaxiItem &
  TrainItem;
