import { TripDraft } from "./TripDraft";

export interface Trip extends TripDraft {
  id: string;
  createdAtUtc: string;
  updatedAtUtc: string;
}
