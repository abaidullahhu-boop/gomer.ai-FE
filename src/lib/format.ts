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
