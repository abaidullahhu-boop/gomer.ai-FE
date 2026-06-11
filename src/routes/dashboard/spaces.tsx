import { PageMeta } from "@/components/PageMeta";
import spacesEmptyState from "@/assets/images/spaces-empty-state.png";

export default function DashboardSpaces() {
  return (
    <>
      <PageMeta
        title="Spaces — Viktor"
        description="View and manage web applications created by Viktor."
      />
      <div className="flex h-full min-h-0 flex-1 flex-col font-sans text-foreground">
        <div
          className="flex-1 overflow-y-auto px-4 sm:px-12 py-8 "
          style={{ scrollbarGutter: "stable" }}
        >
          <div className="mx-auto w-full max-w-[1000px]">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-4">
                <h1 className="text-3xl font-bold leading-8 text-foreground">Spaces</h1>
              </div>
            </div>

            <div className="flex w-full flex-col gap-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                View and manage web applications created by Viktor. Each space has its own database,
                authentication, and hosting.
              </p>

              <div className="rounded-xl border border-border bg-card p-10 text-center">
                <div className="flex flex-col items-center gap-5">
                  <img
                    src={spacesEmptyState}
                    alt=""
                    aria-hidden
                    className="h-24 w-auto select-none"
                    draggable={false}
                  />
                  <div className="space-y-2">
                    <h3 className="font-medium text-foreground">No Spaces yet</h3>
                    <p className="mx-auto max-w-sm text-sm leading-relaxed text-muted-foreground">
                      Ask Viktor to create a web app for you and it will appear here.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
