/** Placeholder for a figure that has not arrived, so nothing invented shows. */
export const PENDING = "—";

/**
 * Renders a figure, or an honest stand-in when there isn't one yet.
 *
 * Never falls back to an invented number. The credit tile used to show a
 * hardcoded "39.4k", which read as a real balance at the one moment the figure
 * most needs to be true — when the fetch had failed. A missing count renders as
 * "—" rather than "0", because zero reads as "you have none", which is the
 * opposite of "we could not tell".
 */
export function figureLabel(value: number | null | undefined, error?: string | null): string {
  if (value === null || value === undefined) return error ? "Unavailable" : PENDING;
  return value.toLocaleString();
}

/**
 * Credits to the dollar. Kept here rather than inlined as `/ 400` at each call
 * site: the denomination has already changed once, and a stray divisor renders
 * a balance four times wrong without anything failing.
 */
export const CREDITS_PER_DOLLAR = 400;

/** A credit count as the dollars it represents, e.g. "$50" or "$12.50". */
export function creditsAsDollars(credits: number): string {
  const dollars = credits / CREDITS_PER_DOLLAR;
  return Number.isInteger(dollars) ? `$${dollars}` : `$${dollars.toFixed(2)}`;
}

/**
 * How long until a date, in the coarsest unit that is still useful — "today",
 * "in 3 days", "in 2 weeks". Expiry is the one number on the billing page a
 * customer reads to decide whether to act now, so precision matters less than
 * being instantly legible.
 */
export function relativeDeadline(when: Date, now: Date = new Date()): string {
  const days = Math.ceil((when.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));
  if (days <= 0) return "today";
  if (days === 1) return "tomorrow";
  if (days < 14) return `in ${days} days`;
  if (days < 60) return `in ${Math.round(days / 7)} weeks`;
  return `in ${Math.round(days / 30)} months`;
}
