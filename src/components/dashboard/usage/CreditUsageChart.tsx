import {
  chartMaxCredits,
  creditUsageBreakdown,
  dailyCreditUsage,
} from "@/data/usage";

const CHART_HEIGHT = 200;
const BAR_GAP = 2;
const Y_TICKS = [0, 100, 200, 300, 400, 500, 600];

export function CreditUsageChart() {
  const barCount = dailyCreditUsage.length;
  const barWidth = 100 / barCount;

  return (
    <div className="min-w-0 rounded-[7px] border border-border bg-card">
      <div className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <h2 className="font-body text-base font-medium text-foreground">Credit usage</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            See where your workspace spent credits over the last 30 days
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground sm:justify-end">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-violet-300" />
            <span>Threads - {creditUsageBreakdown.threads.percent}%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-highlight" />
            <span>Scheduled tasks - {creditUsageBreakdown.scheduledTasks.percent}%</span>
          </div>
        </div>
      </div>

      <div className="px-5 py-4">
        <div className="flex gap-3">
          <div className="flex w-8 shrink-0 flex-col justify-between py-1 text-right text-[11px] tabular-nums text-muted-foreground">
            {Y_TICKS.slice()
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
              aria-label="Credit usage bar chart for the last 30 days"
            >
              {[0, 100, 200, 300, 400, 500, 600].map((tick) => {
                const y = CHART_HEIGHT - (tick / chartMaxCredits) * CHART_HEIGHT;
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

              {dailyCreditUsage.map((day, index) => {
                const total = day.threads + day.scheduledTasks;
                if (total === 0) return null;

                const x = index * barWidth + BAR_GAP / 2;
                const width = barWidth - BAR_GAP;
                const scheduledHeight = (day.scheduledTasks / chartMaxCredits) * CHART_HEIGHT;
                const threadsHeight = (day.threads / chartMaxCredits) * CHART_HEIGHT;
                const scheduledY = CHART_HEIGHT - scheduledHeight;
                const threadsY = scheduledY - threadsHeight;

                return (
                  <g key={day.day}>
                    <rect
                      x={x}
                      y={scheduledY}
                      width={width}
                      height={scheduledHeight}
                      fill="var(--highlight)"
                      rx="1"
                    />
                    {day.threads > 0 && (
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
              {dailyCreditUsage.map((day) => (
                <span key={day.day} className="min-w-0 flex-1 truncate text-center">
                  {day.day}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
