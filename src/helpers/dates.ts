import { Timestamp } from "firebase/firestore";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import localeData from "dayjs/plugin/localeData";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import "dayjs/locale/en";

import Trip from "../types/Trip";

dayjs.extend(utc);
dayjs.extend(localeData);
dayjs.extend(localizedFormat);
dayjs.extend(timezone);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const userLanguage: string =
  navigator.language?.toLowerCase() ??
  // @ts-ignore
  navigator?.userLanguage?.toLowerCase() ??
  "en";

export const formatDate = (
  date: string | dayjs.Dayjs,
  format: "short" | "long" = "short",
  isUtc = true,
  withDayName = false
) => {
  const formatCode =
    format === "short"
      ? `${withDayName ? "ddd " : ""}l`
      : `${withDayName ? "dddd " : ""}LL`;
  if (isUtc) {
    return dayjs.utc(date).locale(userLanguage).format(formatCode);
  }
  return dayjs(date).locale(userLanguage).format(formatCode);
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

export const formatFirebaseDateTime = (date: string | Timestamp): string => {
  if (typeof date === "string") {
    return dayjs(date).format();
  }
  return dayjs.unix(date.seconds).format();
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

/**
 * Javascript compatible date ordering
 * @param a First date to compare
 * @param b Second date to compare
 * @param reverse Whether to reverse the result, for desc ordering. (def: false)
 * @return 0 if equal, 1 if a>b, -1 if a<b (reverse for 1 and -1)
 */
export const dateCompare = (
  a: string | dayjs.Dayjs | null,
  b: string | dayjs.Dayjs | null,
  reverse: boolean = false
): number => {
  // one of the dates is invalid, or they're the same
  if (!a || !b || dayjs(a).isSame(b)) {
    return 0;
  }
  // a is further in the future than b
  if (dayjs(a).isAfter(b)) {
    return reverse ? -1 : 1;
  }
  // a is earlier than b
  return reverse ? 1 : -1;
};

/**
 * Determine number of days until `target` from right now
 * @param target The date to count down until
 * @param now The current time
 */
export const formatDaysUntil = (
  target: string | dayjs.Dayjs,
  now: string | dayjs.Dayjs
): string | null => {
  const hasPassed = dayjs(target).isBefore(now);
  if (hasPassed) {
    return null;
  }
  const isUnder24Hours = dayjs(target).diff(now, "hour") < 24;
  if (isUnder24Hours) {
    return "In less than a day";
  }
  const numDaysDiff = dayjs(target).diff(now, "day");
  return `In ${numDaysDiff} day${numDaysDiff === 1 ? "!" : "s"}`;
};
