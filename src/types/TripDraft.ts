import TripSchemaRevisions from "./TripSchemaRevisions";

export default interface TripDraft {
  tripSchemaRevision: TripSchemaRevisions;
  /** assigned on creation. GUID format for local trips, alphanumeric 20-char format for sync'd trips. */
  id: string;
  title: string;
  /** The general location of where the trip is taking place */
  location?: string;
  /** date in ISO8601, without fraction seconds */
  startsAt: string | null;
  /** date in ISO8601, without fraction seconds */
  endsAt: string | null;
  coverImageBlob?: File | null;
  image?: string | null;
}
