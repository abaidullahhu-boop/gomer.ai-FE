/**
 * Period options for the Usage page's window selector.
 *
 * Everything else that used to live here — spend totals, the credit chart
 * series, top users, top scheduled tasks — was placeholder data rendered as if
 * it were real. The page now reads /usage/analytics instead, so the fixtures
 * are gone rather than left around to be imported again by accident.
 */
export type UsagePeriod = "today" | "last_7_days" | "this_month" | "last_month" | "last_30_days";

export const usagePeriods: { value: UsagePeriod; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "last_7_days", label: "Last 7 days" },
  { value: "this_month", label: "This month" },
  { value: "last_month", label: "Last month" },
  { value: "last_30_days", label: "Last 30 days" },
];

/** An explicit window to report over. Sent to the API as two ISO instants. */
export type UsageRange = { from: Date; to: Date };

/**
 * Resolve a dropdown period into real calendar boundaries.
 *
 * This is computed here, in the browser, rather than on the server: the
 * boundaries of "this month" depend on the viewer's timezone, and the server
 * has none to consult — a workspace has no timezone column, so it would be
 * guessing at when the viewer's day starts.
 *
 * "Last month" is the case that forces the issue. Expressed as a trailing day
 * count it could only ever be "the last 30 days", which overlaps the current
 * month and is wrong on every day of the year except the 1st.
 */
export function periodToRange(period: UsagePeriod, now: Date = new Date()): UsageRange {
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  const daysBack = (days: number): UsageRange => {
    const from = new Date(startOfToday);
    from.setDate(from.getDate() - days);
    return { from, to: now };
  };

  switch (period) {
    case "today":
      return { from: startOfToday, to: now };
    case "last_7_days":
      // Inclusive of today, so six days back is a seven-day window.
      return daysBack(6);
    case "this_month":
      return { from: new Date(now.getFullYear(), now.getMonth(), 1), to: now };
    case "last_month": {
      const from = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      // Day 0 of this month is the last day of the previous one, which avoids
      // hardcoding month lengths and handles February and leap years.
      const to = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
      return { from, to };
    }
    case "last_30_days":
    default:
      return daysBack(29);
  }
}
