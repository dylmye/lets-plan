import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";

import { CarItem } from "../types/tripItineraryTypes";
import TripItineraryActivityItem from "../types/TripItineraryActivityItem";
import { TripItemType } from "../types/TripItemType";
import Trip from "../types/Trip";

dayjs.extend(utc);

export const exampleStartDate = dayjs().local().startOf("day");

const exampleTrip: Trip = {
  tripSchemaRevision: 1,
  id: "example",
  title: "Your First Trip",
  details: "Meeting up with Hanna and Janelle for a beach vacay!!",
  location: "Whitby, Yorkshire, UK",
  startsAt: exampleStartDate.format(),
  endsAt: exampleStartDate.endOf("day").add(1, "day").format(),
  createdAtUtc: dayjs.utc().format(),
  updatedAtUtc: dayjs.utc().format(),
  image:
    "https://firebasestorage.googleapis.com/v0/b/lets-plan-firebase.appspot.com/o/default-trip-thumbs%2Fdefault-yorkshire-1555795622.webp?alt=media",
  items: [
    {
      id: "example_item_0",
      type: TripItemType.Car,
      title: "Taking mum's campervan to Whitby",
      details: "Mum's okay with us borrowing the Transporter for the week",
      originLocation: "Walthamstow, London, UK",
      destinationLocation: "Whitby, Yorkshire, UK",
      startsAt: exampleStartDate.add(7, "hour").format(),
      startsAtTimezone: "Europe/London",
      endsAt: exampleStartDate.add(11, "hour").add(49, "minute").format(),
      endsAtTimezone: "Europe/London",
    } as CarItem,
    {
      id: "example_item_1",
      type: TripItemType["Eating Out"],
      location:
        "Hadleys Fish Restaurant & Accommodation, 11 Bridge St, Whitby YO22 4BG, England",
      details: "Fish and chips by the bridge!",
      startsAt: exampleStartDate.add(12, "hour").format(),
      startsAtTimezone: "Europe/London",
      endsAt: exampleStartDate.add(13, "hour").format(),
      endsAtTimezone: "Europe/London",
    } as TripItineraryActivityItem,
    {
      id: "example_item_2",
      type: TripItemType.Museum,
      location:
        "Captain Cook Memorial Museum, Grape Ln, Whitby YO22 4BA, England",
      startsAt: exampleStartDate.add(15, "hour").format(),
      startsAtTimezone: "Europe/London",
      endsAt: exampleStartDate.add(16, "hour").format(),
      endsAtTimezone: "Europe/London",
      urls: {
        Website: "https://www.cookmuseumwhitby.co.uk/",
      },
      reference: "CK0094410",
      price: 15,
      priceCurrency: "GBP",
    } as TripItineraryActivityItem,
    {
      id: "example_item_3",
      type: TripItemType["Meet-up"],
      title: "Beach Time!",
      location: "Upgang Beach, Whitby, England",
      details: "Let's meet Janelle and Hanna by the rocks.",
      startsAt: exampleStartDate.add(16, "hour").add(30, "minute").format(),
      startsAtTimezone: "Europe/London",
      endsAt: exampleStartDate.add(19, "hour").format(),
      endsAtTimezone: "Europe/London",
    } as TripItineraryActivityItem,
    {
      id: "example_item_4",
      type: TripItemType.Car,
      title: "Driving back home",
      originLocation: "Whitby, Yorkshire, UK",
      destinationLocation: "Walthamstow, London, UK",
      startsAt: exampleStartDate.add(1, "day").add(12, "hour").format(),
      startsAtTimezone: "Europe/London",
      endsAt: exampleStartDate
        .add(1, "day")
        .add(16, "hour")
        .add(49, "minute")
        .format(),
      endsAtTimezone: "Europe/London",
    } as CarItem,
  ],
  public: false,
};

export default exampleTrip;
