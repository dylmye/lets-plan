import type Trip from "../types/Trip";

export const tripIsExample = (id: Trip["id"]): boolean => id === "example";

/**
 * Assuming the user has access to the trip being checked,
 * determine if the user is the owner. Either the trip is private
 * (meaning only they should have access to it), or the trip is public
 * and the trip's owner ID matches the auth user ID.
 * @param trip The trip to check
 * @param userId The user ID to check ownership with
 * @returns If the user owns the trip
 */
export const tripIsOwnedByUser = (
  trip: Pick<Trip, "public" | "userId">,
  userId: Trip["userId"]
): boolean => !trip.public || trip?.userId === userId;
