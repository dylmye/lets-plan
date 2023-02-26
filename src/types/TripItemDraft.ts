import { WithOptional } from "../helpers/types";
import { TripItemType } from "./TripItemType";
import TripItem from "./Tripitem";

export default interface TripItemDraft extends WithOptional<TripItem, "id"> {
  /** General category of itemTypes */
  category: "travel" | "activity";
  type: TripItemType;
  title?: string;
  details?: string;
  urls?: Record<string, string> | null;
  startsAt: string;
  // @TODO: confirm we don't need to union this with null
  endsAt?: string | null;
}
