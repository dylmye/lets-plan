import Trip from "./Trip";

export default interface TripDetails
  extends Pick<Trip, "title" | "location" | "startsAt" | "endsAt" | "details"> {
  id?: string;
}
