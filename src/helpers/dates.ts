import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import localeData from "dayjs/plugin/localeData";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import "dayjs/locale/en-gb";
import "dayjs/locale/en";

import { Trip } from "../types/Trip";

dayjs.extend(utc);
dayjs.extend(localeData);
dayjs.extend(localizedFormat);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);

export const userLanguage: string =
  navigator.language?.toLowerCase() ??
  // @ts-ignore
  navigator?.userLanguage?.toLowerCase() ??
  "en";

export const formatDate = (
  date: string | dayjs.Dayjs,
  format: "short" | "long" = "short",
  isUtc = true
) => {
  if (isUtc) {
    return dayjs
      .utc(date)
      .locale(userLanguage)
      .format(format === "short" ? "l" : "LL");
  }
  return dayjs(date)
    .locale(userLanguage)
    .format(format === "short" ? "l" : "LL");
};

export const formatTime = (
  date: string | dayjs.Dayjs,
  compact = true,
  isUtc = true,
  displayTimezone: string | null = null
) => {
  if (isUtc) {
    let value: dayjs.Dayjs | string = dayjs.utc(date).locale(userLanguage);
    if (displayTimezone) {
      value.tz(displayTimezone);
    }
    value = value.format("LT");
    if (compact) {
      return value.toLocaleLowerCase().replace(" ", "");
    }
    return value;
  }
  if (displayTimezone) {
    const value = dayjs(date)
      .tz(displayTimezone)
      .locale(userLanguage)
      .format("LT");

    if (compact) {
      return value.toLocaleLowerCase().replace(" ", "");
    }
    return value;
  }
  const value = dayjs(date).locale(userLanguage).format("LT");

  if (compact) {
    return value.toLocaleLowerCase().replace(" ", "");
  }
  return value;
};

export const formatDateTime = (
  date: string | dayjs.Dayjs,
  format: "short" | "long" = "short",
  isUtc = true
) => {
  if (isUtc) {
    return dayjs
      .utc(date)
      .locale(userLanguage)
      .format(format === "short" ? "l LT" : "LLL");
  }
  return dayjs(date)
    .locale(userLanguage)
    .format(format === "short" ? "l LT" : "LLL");
};

export const tripIsInState = (
  { endsAt, startsAt }: Trip,
  state: "past" | "future"
) => {
  if (state === "past") {
    return dayjs(endsAt ?? startsAt).isBefore(dayjs().endOf("day"), "day");
  }

  return dayjs(endsAt ?? startsAt).isSameOrAfter(dayjs().endOf("day"), "day");
};