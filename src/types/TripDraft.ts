import { ActionMeta } from "react-select";

export default interface TripDraft {
  tripSchemaRevision: 1;
  /** assigned on creation. GUID format for local trips, alphanumeric 20-char format for sync'd trips. */
  id: string;
  title: string;
  /** Result from Google Search (or free text when in offline mode) */
  location?: string;
  /** Object returned from GMaps API, converted to location property */
  locationData?: {
    label: string;
    value: ActionMeta<any>;
  };
  /** date in ISO8601, without fraction seconds */
  startsAt: string | null;
  /** date in ISO8601, without fraction seconds */
  endsAt: string | null;
  coverImageBlob?: File | null;
  image?: string | null;
}
