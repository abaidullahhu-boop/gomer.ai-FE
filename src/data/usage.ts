/**
 * Period options for the Usage page's window selector.
 *
 * Everything else that used to live here — spend totals, the credit chart
 * series, top users, top scheduled tasks — was placeholder data rendered as if
 * it were real. The page now reads /usage/analytics instead, so the fixtures
 * are gone rather than left around to be imported again by accident.
 */
export type UsagePeriod =
  | "today"
  | "last_7_days"
  | "this_month"
  | "last_month"
  | "last_30_days";

export const usagePeriods: { value: UsagePeriod; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "last_7_days", label: "Last 7 days" },
  { value: "this_month", label: "This month" },
  { value: "last_month", label: "Last month" },
  { value: "last_30_days", label: "Last 30 days" },
];
