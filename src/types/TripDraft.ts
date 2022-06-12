import { ActionMeta } from "react-select";

export default interface TripDraft {
  id: string;
  title: string;
  location?: string;
  locationData?: {
    label: string;
    value: ActionMeta<any>;
  };
  startsAt: string | null;
  endsAt: string | null;
  coverImageBlob?: File | null;
  image?: string | null;
}
