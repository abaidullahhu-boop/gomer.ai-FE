import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RefreshCw, Upload } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { teamData } from "@/data/team";

function TeamAvatarLarge() {
  return (
    <div className="relative inline-flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-[7px]">
      <div className="size-full bg-gradient-to-br from-cyan-200 via-violet-300 to-pink-300" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.6)_0%,transparent_50%)]" />
      <div className="absolute right-2 bottom-2 size-8 rounded-md bg-violet-500/70" />
      <div className="absolute top-3 left-3 size-6 rounded-full bg-cyan-400/80" />
    </div>
  );
}

export default function DashboardTeamEdit() {
  const [teamName, setTeamName] = useState<string>(teamData.team.name);
  const [savedName, setSavedName] = useState<string>(teamData.team.name);

  const hasChanges = teamName !== savedName;

  function handleSave() {
    setSavedName(teamName);
  }

  return (
    <>
      <PageMeta title="Edit team info — Gomer" description="Edit your team name and avatar." />
      <div className="flex h-full min-h-0 flex-1 flex-col font-sans text-foreground">
        <div
          className="flex-1 overflow-y-auto px-4 sm:px-12 py-8"
          style={{ scrollbarGutter: "stable" }}
        >
          <div className="mx-auto w-full ">
            <div className="mb-8 flex items-center gap-3">
              <Link
                to="/dashboard/team"
                aria-label="Back to team"
                className="gomer-focus-ring inline-flex size-9 cursor-pointer select-none items-center justify-center rounded-md border-0 bg-transparent text-muted-foreground transition-[background-color,transform] duration-200 hover:bg-accent active:scale-[0.98]"
              >
                <ArrowLeft className="size-5" strokeWidth={1.5} />
              </Link>
              <h1 className="text-2xl font-bold leading-8 text-foreground">Edit team info</h1>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex flex-col items-start gap-4">
                <TeamAvatarLarge />
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="gomer-focus-ring inline-flex min-h-10 cursor-pointer select-none items-center justify-center gap-2 rounded-[7px] border border-border bg-transparent px-4 py-2 text-sm font-medium text-secondary-foreground transition-[background-color,border-color,transform] duration-200 hover:bg-accent active:scale-[0.98]"
                  >
                    <Upload className="size-4" strokeWidth={1.5} />
                    Upload avatar
                  </button>
                  <button
                    type="button"
                    className="gomer-focus-ring inline-flex min-h-10 cursor-pointer select-none items-center justify-center gap-2 rounded-[7px] border border-border bg-transparent px-4 py-2 text-sm font-medium text-secondary-foreground transition-[background-color,border-color,transform] duration-200 hover:bg-accent active:scale-[0.98]"
                  >
                    <RefreshCw className="size-4" strokeWidth={1.5} />
                    Sync from Slack
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="team-name" className="text-sm text-muted-foreground">
                  Team Name
                </label>
                <input
                  id="team-name"
                  type="text"
                  value={teamName}
                  onChange={(event) => setTeamName(event.target.value)}
                  className="gomer-focus-ring h-10 w-full rounded-[7px] border border-border bg-background px-4 text-sm text-foreground transition-[border-color,box-shadow] duration-150 outline-none hover:border-border/80"
                />
              </div>

              <button
                type="button"
                disabled={!hasChanges}
                onClick={handleSave}
                className="gomer-focus-ring inline-flex min-h-10 w-full cursor-pointer select-none items-center justify-center gap-2 rounded-[7px] border-0 bg-[linear-gradient(to_right,#d1c2f4,#edc2e7,#ffdc61)] px-4 py-2 text-sm font-medium text-zinc-900 transition-[opacity,transform] duration-200 hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
