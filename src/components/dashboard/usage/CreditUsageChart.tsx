import type { UsageAnalytics } from "@/lib/api";

const CHART_HEIGHT = 200;
const BAR_GAP = 2;
const TICK_COUNT = 6;

type CreditUsageChartProps = {
  analytics: UsageAnalytics | null;
  loading: boolean;
};

/**
 * A round axis ceiling at or above the busiest day, so bars never touch the top
 * and the tick labels stay readable. A workspace with no spend still needs a
 * scale, hence the floor.
 */
function axisMax(peak: number): number {
  if (peak <= 0) return 100;
  const magnitude = 10 ** Math.floor(Math.log10(peak));
  const step = magnitude / 2 || 1;
  return Math.ceil(peak / step) * step;
}

/** Percentage of the window's credits, rounded, guarding division by zero. */
function share(part: number, total: number): number {
  return total > 0 ? Math.round((part / total) * 100) : 0;
}

/** Day-of-month from an ISO date, which is all the axis has room for. */
function dayLabel(iso: string): string {
  const day = Number(iso.slice(8, 10));
  return Number.isFinite(day) ? String(day) : iso;
}

export function CreditUsageChart({ analytics, loading }: CreditUsageChartProps) {
  const daily = analytics?.daily ?? [];
  const total = analytics?.totalCredits ?? 0;
  const peak = daily.reduce((max, day) => Math.max(max, day.credits), 0);
  const max = axisMax(peak);
  const ticks = Array.from({ length: TICK_COUNT + 1 }, (_, i) =>
    Math.round((max / TICK_COUNT) * i),
  );
  const barWidth = daily.length ? 100 / daily.length : 0;
  const windowLabel = analytics ? `the last ${analytics.days} days` : "the selected period";

  return (
    <div className="min-w-0 rounded-[7px] border border-border bg-card">
      <div className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <h2 className="font-body text-base font-medium text-foreground">Credit usage</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            See where your workspace spent credits over {windowLabel}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground sm:justify-end">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-violet-300" />
            <span>Threads - {share(analytics?.byType.thread ?? 0, total)}%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-highlight" />
            <span>Scheduled tasks - {share(analytics?.byType.scheduledTask ?? 0, total)}%</span>
          </div>
        </div>
      </div>

      <div className="px-5 py-4">
        {!loading && daily.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            No credits were spent in this period.
          </p>
        ) : (
          <div className="flex gap-3">
            <div className="flex w-10 shrink-0 flex-col justify-between py-1 text-right text-[11px] tabular-nums text-muted-foreground">
              {ticks
                .slice()
                .reverse()
                .map((tick) => (
                  <span key={tick}>{tick}</span>
                ))}
            </div>

            <div className="min-w-0 flex-1">
              <svg
                viewBox={`0 0 100 ${CHART_HEIGHT}`}
                preserveAspectRatio="none"
                className="h-[200px] w-full"
                role="img"
                aria-label={`Credit usage bar chart for ${windowLabel}`}
              >
                {ticks.map((tick) => {
                  const y = CHART_HEIGHT - (tick / max) * CHART_HEIGHT;
                  return (
                    <line
                      key={tick}
                      x1="0"
                      y1={y}
                      x2="100"
                      y2={y}
                      stroke="currentColor"
                      strokeOpacity="0.08"
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}

                {daily.map((day, index) => {
                  if (day.credits === 0) return null;

                  const x = index * barWidth + BAR_GAP / 2;
                  const width = Math.max(barWidth - BAR_GAP, 0.5);
                  const scheduledHeight = (day.scheduledTask / max) * CHART_HEIGHT;
                  const threadsHeight = (day.thread / max) * CHART_HEIGHT;
                  const scheduledY = CHART_HEIGHT - scheduledHeight;
                  const threadsY = scheduledY - threadsHeight;

                  return (
                    <g key={day.day}>
                      {day.scheduledTask > 0 && (
                        <rect
                          x={x}
                          y={scheduledY}
                          width={width}
                          height={scheduledHeight}
                          fill="var(--highlight)"
                          rx="1"
                        />
                      )}
                      {day.thread > 0 && (
                        <rect
                          x={x}
                          y={threadsY}
                          width={width}
                          height={threadsHeight}
                          fill="var(--primitive-purple-300)"
                          rx="1"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              <div className="mt-2 flex min-w-0 justify-between text-[10px] tabular-nums text-muted-foreground sm:text-[11px]">
                {daily.map((day) => (
                  <span key={day.day} className="min-w-0 flex-1 truncate text-center">
                    {dayLabel(day.day)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
