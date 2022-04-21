import { TripDraft } from "./TripDraft";
import TripItineraryItemBase from "./TripItineraryItemBase";

export interface Trip extends TripDraft {
  createdAtUtc: string;
  updatedAtUtc: string;
  details?: string;
  items?: TripItineraryItemBase[];
}
