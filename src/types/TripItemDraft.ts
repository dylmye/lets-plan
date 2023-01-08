import { TripItemType } from "./TripItemType";

export default interface TripItemDraft {
  /** General category of itemTypes */
  category: "travel" | "activity";
  type: TripItemType;
  title?: string;
  details?: string;
  urls?: Record<string, string> | null;
  startsAt: string;
  endsAt?: string | null;
  /** Fields from derived types */
  [x: string]: unknown;
}
