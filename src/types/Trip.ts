import TripDraft from "./TripDraft";
import TripItineraryItemBase from "./TripItineraryItemBase";

export default interface Trip extends TripDraft {
  createdAtUtc: string;
  updatedAtUtc: string;
  details?: string;
  items?: TripItineraryItemBase[];
  source: 'offline' | 'sync';
}
