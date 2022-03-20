import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import localeData from "dayjs/plugin/localeData";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/en-gb";
import "dayjs/locale/en";

import { Trip } from "../types/Trip";

dayjs.extend(utc);
dayjs.extend(localeData);
dayjs.extend(localizedFormat);
dayjs.extend(timezone);

export const userLanguage: string =
  navigator.language?.toLowerCase() ??
  // @ts-ignore
  navigator?.userLanguage?.toLowerCase() ??
  "en";

export const formatDate = (
  date: string | dayjs.Dayjs,
  format: "short" | "long" = "short"
) => {
  return dayjs(date)
    .locale(userLanguage)
    .format(format === "short" ? "l" : "LL");
};

export const formatDateTime = (
  date: string | dayjs.Dayjs,
  format: "short" | "long" = "short"
) => {
  return dayjs(date)
    .locale(userLanguage)
    .format(format === "short" ? "l LT" : "LLL");
};

export const tripIsInState = (
  { endsAt, startsAt }: Trip,
  state: "past" | "future"
) => {
  const todayPlusOne = dayjs().add(1, "day");

  if (state === "past") {
    return dayjs(endsAt ?? startsAt).isBefore(todayPlusOne, "day") || dayjs(endsAt ?? startsAt).isSame(todayPlusOne, "day");
  }

  return dayjs(endsAt ?? startsAt).isAfter(todayPlusOne, "day");
};
