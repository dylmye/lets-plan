import { DocumentData } from "firebase/firestore";
import TripItineraryItemBase from "../TripItineraryItemBase";

export default interface TripItemSnapshot extends DocumentData, TripItineraryItemBase {};
