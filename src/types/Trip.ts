import TripItem from "./Tripitem";
import TripDraft from "./TripDraft";

export default interface Trip extends TripDraft {
  createdAtUtc: string;
  updatedAtUtc: string;
  details?: string | null;
  /** Undefined on sync'd trips as they're a sub-collection */
  items?: TripItem[];
  /** Always false locally. True/false for sync'd trips. */
  public: boolean;
  /** Always undefined locally. Set to owner's userId for sync'd trips, null for globally available (example trip) */
  userId?: string | null;
}
