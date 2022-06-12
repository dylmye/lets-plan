import Trip from "./Trip";

export default interface TripDetails
  extends Pick<Trip, "title" | "location" | "locationData" | "startsAt" | "endsAt"> {}
