import { PartialWithReq } from "../helpers/types";
import { AllItineraryTypes } from "./tripItineraryTypes";

/** This interface combines all the possible fields optionally but requires
 * all the fields that every trip item must have. It's built up of:
 *
 * - [`TripItineraryItemBase`](./TripItineraryItemBase.ts)
 * - [`TripItineraryActivityItem`](./TripItineraryActivityItem.ts)
 * - [`TripItineraryTravelItem`](./TripItineraryTravelItem.ts)
 * - The individual trip travel types in [tripitineraryTypes](./tripItineraryTypes/index.ts) folder
 */
export default interface TripItem
  extends PartialWithReq<AllItineraryTypes, "id" | "type" | "startsAt"> {}
