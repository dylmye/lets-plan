import { ActionMeta } from "react-select";

export interface TripDraft {
  title: string;
  location?: string;
  locationData?: {
    label: string;
    value: ActionMeta<any>;
  };
  startsAt: string | null;
  endsAt: string | null;
  coverImageBlob?: File | null;
}
