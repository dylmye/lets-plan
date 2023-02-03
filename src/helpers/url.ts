import GoogleMapsTravelMode from "../types/GoogleMapsTravelMode";

/**
 * Turn a TripItineraryItem activity/single-place location to a G Maps link
 * @param location The map place name to search G Maps for
 * @param placeId Unique G Maps ID provided by API, optional
 * @returns The full URL to link to
 *
 * @see https://developers.google.com/maps/documentation/urls/get-started#search-action
 */
export const generateGoogleMapsQueryUrl = (
  location: string,
  placeId?: string
): string => {
  let url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    location
  )}`;
  if (placeId) {
    url += `&query_place_id=${placeId}`;
  }
  return url;
};

/**
 * Turn a TripItineraryItem travel item's start and end point to a G Maps link
 * @param origin The starting point place name to search G Maps for
 * @param destination The end point place name to search G Maps for
 * @param originPlaceId Unique G Maps ID provided by API for origin, optional
 * @param destinationPlaceId Unique G Maps ID provided by API for destination, optional
 * @param modeOfTravel Mode of travel, if supported by G Maps
 * @returns The full URL to link to
 *
 * @see https://developers.google.com/maps/documentation/urls/get-started#directions-action
 */
export const generateGoogleMapsDirectionsUrl = (
  origin: string,
  destination: string,
  modeOfTravel?: GoogleMapsTravelMode | null,
  originPlaceId?: string,
  destinationPlaceId?: string
): string => {
  let url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
    origin
  )}&destination=${encodeURIComponent(destination)}`;
  const optionalParticles: Record<string, string | undefined | null> = {
    origin_place_id: originPlaceId,
    destination_place_id: destinationPlaceId,
    travelmode: modeOfTravel,
  };
  Object.keys(optionalParticles).forEach((k) => {
    if (optionalParticles[k]) {
      url += `&${k}=${optionalParticles[k]}`;
    }
  });
  return url;
};

/**
 * Like `generateGoogleMapsDirectionsUrl`, but the origin is not set, making G Maps
 * use the user's current location. Use when not navigating point A to point B.
 * @param location The location to set as destination
 * @param placeId The G Maps ID provided by API for destination, optional
 * @returns The full URL to link to
 */
export const generateGoogleMapsDirectionFromUserLocationUrl = (location: string, placeId?: string): string => {
  let url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location)}`;
  if (placeId) {
    url += `destination_place_id=${placeId}`
  }
  return url;
};

/**
 * Generates an Uber Universal Deeplink for a journey
 * @param origin The formatted address that acts as the pickup
 * @param destination The formatted address that acts as the destination
 * @returns The Uber Universal Link between the two locations provided
 *
 * @see https://developer.uber.com/products/ride-requests-deeplink
 * @see https://developer.uber.com/docs/riders/ride-requests/tutorials/deep-links/introduction#ride-requests
 */
export const generateUberUniversalLink = (
  origin: string,
  destination: string
): string => {
  let url = `http://m.uber.com/ul/?action=setPickup&pickup[formatted_address]=${encodeURIComponent(
    origin
  )}&dropoff[formatted_address]=${encodeURIComponent(destination)}`;

  if (process.env.REACT_APP_UBER_API_CLIENT_ID) {
    url += `&client_id=${process.env.REACT_APP_UBER_API_CLIENT_ID}`;
  }

  return url;
};
