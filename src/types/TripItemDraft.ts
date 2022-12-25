import { TripItemType } from "./TripItemType";

export default interface TripItemDraft {
  /** General category of itemTypes */
  category: 'travel' | 'activity';
  type: TripItemType;
  title?: string;
  details?: string;
  urls?: Record<string, string>;
  startsAt: string | null;
  endsAt?: string | null;
  /** Fields from derived types */
  [x: string]: unknown;
}
