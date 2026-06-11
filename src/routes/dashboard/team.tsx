import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { ExternalLink, MoreVertical, Pencil, RefreshCw, UserPlus } from "lucide-react";
import type { DashboardOutletContext } from "@/components/dashboard/DashboardLayout";
import { PageMeta } from "@/components/PageMeta";
import { teamData } from "@/data/team";

function TeamAvatar() {
  return (
    <div className="relative inline-flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-[7px]">
      <div className="size-full bg-gradient-to-br from-cyan-200 via-violet-300 to-pink-300" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.6)_0%,transparent_50%)]" />
      <div className="absolute right-1 bottom-1 size-5 rounded-sm bg-violet-500/70" />
      <div className="absolute top-2 left-2 size-4 rounded-full bg-cyan-400/80" />
    </div>
  );
}

function MemberAvatar({ name, avatar }: { name: string; avatar: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (avatar) {
    return (
      <div className="relative inline-flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full">
        <img className="aspect-square h-full w-full object-cover" alt={name} src={avatar} />
      </div>
    );
  }

  return (
    <div className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
      {initials}
    </div>
  );
}

function TeamOptionsMenu({
  onEditTeamInfo,
  onInviteMembers,
}: {
  onEditTeamInfo: () => void;
  onInviteMembers: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label="More options"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
        className="viktor-focus-ring inline-flex size-10 min-h-10 cursor-pointer select-none items-center justify-center gap-2 rounded-md border-0 bg-transparent text-muted-foreground transition-[background-color,border-color,transform] duration-200 hover:bg-accent active:scale-[0.98]"
      >
        <MoreVertical className="size-4" strokeWidth={1.5} />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute top-[calc(100%+4px)] right-0 z-50 min-w-[200px] overflow-hidden rounded-[7px] border border-border bg-white py-1 shadow-[0_4px_16px_rgba(26,24,43,0.08)]"
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              onEditTeamInfo();
              setOpen(false);
            }}
            className="flex w-full cursor-pointer items-center gap-3 px-4 py-2 text-left text-sm text-foreground transition-colors hover:bg-[#F4F4F5]"
          >
            <Pencil className="size-4 shrink-0" strokeWidth={1.5} />
            Edit team info
          </button>
          
        </div>
      ) : null}
    </div>
  );
}

function SettingsCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-md border border-border bg-card">
      <div className="flex flex-col gap-2 p-5">
        <h2 className="font-body text-base font-medium text-foreground">{title}</h2>
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <div className="flex w-full items-center justify-start border-t border-border bg-white/[0.02] p-4">
        {children}
      </div>
    </div>
  );
}

export default function DashboardTeam() {
  const navigate = useNavigate();
  const { openInviteModal } = useOutletContext<DashboardOutletContext>();
  const [slackInviteEnabled, setSlackInviteEnabled] = useState<boolean>(
    teamData.botSettings.slackInviteEnabled,
  );

  return (
    <>
      <PageMeta
        title="Team members — Viktor"
        description="Manage your team members, seats, and permissions."
      />
      <div className="flex h-full min-h-0 flex-1 flex-col font-sans text-foreground">
        <div
          className="flex-1 overflow-y-auto px-4 sm:px-12 py-8"
          style={{ scrollbarGutter: "stable" }}
        >
          <div className="mx-auto w-full max-w-[1000px]">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-4">
                <h1 className="text-3xl font-bold leading-8 text-foreground">Team members</h1>
              </div>
              <TeamOptionsMenu
                onEditTeamInfo={() => navigate("/dashboard/team/edit")}
                onInviteMembers={openInviteModal}
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex w-full flex-col gap-4">
                <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-4">
                    <TeamAvatar />
                    <div className="flex flex-col items-start justify-start">
                      <h2 className="text-xl font-medium leading-normal text-foreground">
                        {teamData.team.name}
                      </h2>
                      <p className="text-xs leading-normal text-muted-foreground">
                        {teamData.team.seatsUsed} seats used
                      </p>
                    </div>
                  </div>

                  <div className="flex w-full flex-col gap-4 lg:w-auto lg:flex-row lg:gap-2">
                    <Link
                      to="/dashboard/billing"
                      className="viktor-focus-ring inline-flex min-h-10 cursor-pointer select-none items-center justify-center gap-2 rounded-[7px] border-0 bg-btn-primary px-4 py-2 text-sm font-medium text-btn-primary transition-[opacity,transform] duration-200 hover:opacity-90 active:scale-[0.98]"
                    >
                      <ExternalLink className="size-4" strokeWidth={1.5} />
                      Manage plan
                    </Link>
                    <button
                      type="button"
                      className="viktor-focus-ring inline-flex min-h-10 cursor-pointer select-none items-center justify-center gap-2 rounded-[7px] border border-border bg-transparent px-4 py-2 text-sm font-medium text-secondary-foreground transition-[background-color,border-color,transform] duration-200 hover:bg-accent active:scale-[0.98]"
                    >
                      <RefreshCw className="size-4" strokeWidth={1.5} />
                      Check Slack members
                    </button>
                    <button
                      type="button"
                      onClick={openInviteModal}
                      className="viktor-focus-ring inline-flex min-h-10 cursor-pointer select-none items-center justify-center gap-2 rounded-[7px] border-0 bg-[#F4F4F5] px-4 py-2 text-sm font-medium text-secondary-foreground transition-[background-color,border-color,transform] duration-200 hover:bg-[#F4F4F5] active:scale-[0.98]"
                    >
                      <UserPlus className="size-4" strokeWidth={1.5} />
                      Invite members
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <p className="mt-2 text-xs leading-tight text-muted-foreground/80">Team members</p>
                <div>
                  {teamData.members.map((member) => (
                    <div
                      key={member.id}
                      className="flex h-16 w-full items-center justify-start gap-3"
                    >
                      <MemberAvatar name={member.name} avatar={member.avatar} />
                      <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-0.5">
                        <p className="w-full truncate text-[15px] font-medium leading-[1.3] text-foreground">
                          {member.name}
                          {member.isCurrentUser ? <span> (You)</span> : null}
                        </p>
                        <p className="w-full truncate text-xs leading-normal text-sidebar-foreground">
                          {member.email}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <SettingsCard title="Bot settings" description={teamData.botSettings.description}>
                <button
                  type="button"
                  role="switch"
                  aria-checked={slackInviteEnabled}
                  onClick={() => setSlackInviteEnabled((value) => !value)}
                  className={[
                    "viktor-focus-ring relative inline-flex w-10.5 cursor-pointer rounded-full border border-border p-1 transition-colors duration-150 outline-none focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
                    slackInviteEnabled ? "border-highlight bg-highlight" : "bg-input",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "size-4 rounded-full bg-muted-foreground transition-all duration-150",
                      slackInviteEnabled ? "translate-x-4 bg-primary-foreground" : "",
                    ].join(" ")}
                  />
                </button>
              </SettingsCard>

              <SettingsCard
                title="Permissions"
                description="Slack Connect, guest access, what teammates can do, and who can use Viktor are managed in the Permissions section."
              >
                <Link
                  to="/dashboard/settings/permissions"
                  className="viktor-focus-ring inline-flex min-h-8 cursor-pointer select-none items-center justify-center gap-2 rounded-md border border-border bg-transparent px-3 py-2 text-xs font-medium text-secondary-foreground transition-[background-color,border-color,transform] duration-200 hover:bg-accent active:scale-[0.98]"
                >
                  Open Permissions
                </Link>
              </SettingsCard>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
