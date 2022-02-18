import { TripDraft } from "./TripDraft";

export interface Trip extends TripDraft {
  createdAtUtc: string;
  updatedAtUtc: string;
}
