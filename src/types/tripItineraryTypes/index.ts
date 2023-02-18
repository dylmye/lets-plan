import TrainItem from "./TrainItem";
import TaxiItem from "./TaxiItem";
import SubwayItem from "./SubwayItem";
import ShuttleItem from "./ShuttleItem";
import NoteItem from "./NoteItem";
import MiscItem from "./MiscItem";
import FlightItem from "./FlightItem";
import FerryItem from "./FerryItem";
import CarRentalItem from "./CarRentalItem";
import CarItem from "./CarItem";
import BusItem from "./BusItem";

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
