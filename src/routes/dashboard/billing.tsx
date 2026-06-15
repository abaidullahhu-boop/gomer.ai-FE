import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  CircleHelp,
  Copy,
  ExternalLink,
  Link as LinkIcon,
  Users,
  X,
} from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { billingData } from "@/data/billing";

function PlanFeatureItem({
  label,
  available,
  infoLabel,
}: {
  label: string;
  available: boolean;
  infoLabel?: string;
}) {
  return (
    <li
      className={`flex items-center gap-2 text-sm ${available ? "text-muted-foreground" : "text-muted-foreground/70"}`}
    >
      {available ? (
        <Check className="size-4 shrink-0 text-muted-foreground" strokeWidth={2} />
      ) : (
        <X className="size-4 shrink-0 text-muted-foreground/70" strokeWidth={1.5} />
      )}
      <span className="flex items-center gap-1">
        {label}
        {infoLabel ? (
          <button
            type="button"
            aria-label={infoLabel}
            className="inline-flex p-0 text-muted-foreground transition-colors hover:text-foreground"
          >
            <CircleHelp className="size-3.5" strokeWidth={1.5} />
          </button>
        ) : null}
      </span>
    </li>
  );
}

export default function DashboardBilling() {
  const [copied, setCopied] = useState(false);

  async function copyInviteLink() {
    try {
      await navigator.clipboard.writeText(billingData.inviteLink);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <>
      <PageMeta
        title="Billing & Credits — Gomer"
        description="Manage your plan and see how Gomer is working for your team."
      />
      <div className="flex h-full min-h-0 flex-1 flex-col font-sans text-foreground">
        <div
          className="flex-1 overflow-y-auto px-4 sm:px-12 py-8 "
          style={{ scrollbarGutter: "stable" }}
        >
          <div className="mx-auto w-full max-w-[1000px]">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-4">
                <h1 className="text-3xl font-bold leading-8 text-foreground">Billing & Credits</h1>
              </div>
            </div>

            <div className="flex w-full flex-col gap-6">
              <p className="font-body text-base text-foreground">
                Manage your plan and see how Gomer is working for your team.
              </p>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex h-full flex-col justify-between gap-4 rounded-[7px] border border-border bg-card p-5">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">Current plan</span>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">
                      {billingData.plan.name}
                    </h2>
                    <ul className="mt-1.5 flex flex-col gap-1.5">
                      {billingData.plan.features.map((feature) => (
                        <PlanFeatureItem key={feature.label} {...feature} />
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="gomer-focus-ring inline-flex min-h-10 cursor-pointer select-none items-center justify-center gap-2 rounded-md border-0 bg-btn-primary px-4 py-2 text-sm font-medium text-btn-primary transition-[opacity,transform] duration-200 hover:opacity-90 active:scale-[0.98]"
                    >
                      Upgrade your plan
                    </button>
                  </div>
                </div>

                <div className="h-full rounded-[7px] border border-border bg-card p-5">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-body text-base font-medium text-foreground">
                          Credits available
                        </span>
                        <span className="text-base text-foreground">
                          {billingData.credits.available}
                        </span>
                      </div>
                      <div className="relative">
                        <div className="flex h-2 rounded-full bg-secondary">
                          <div
                            className="h-2 rounded-full bg-[#FFDC61]"
                            style={{ width: `${billingData.credits.progressPercent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 pt-1">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="text-sm font-medium text-foreground">Reward credits</span>
                          <span className="shrink-0 text-sm text-foreground">
                            {billingData.credits.reward}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Reward credits never expire.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="font-body text-lg font-medium text-foreground">Get free credits</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="h-full rounded-[7px] border border-border bg-card">
                    <div className="flex h-full flex-col gap-4 p-5">
                      <div className="flex flex-col gap-1">
                        <h3 className="font-body text-base font-medium text-foreground">Invite friends</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          Get 10k credits for every friend that adds Gomer to their own Slack
                          workspace.
                        </p>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <span className="text-xs font-medium text-muted-foreground">
                          Your invite link
                        </span>
                        <div className="flex gap-2">
                          <div className="flex min-w-0 grow items-center gap-2 rounded-md border border-border pl-2 pr-3">
                            <LinkIcon
                              className="size-4 shrink-0 opacity-30"
                              strokeWidth={1.5}
                            />
                            <span className="truncate py-2 text-sm text-muted-foreground">
                              {billingData.inviteLink}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={copyInviteLink}
                            aria-label={copied ? "Copied" : "Copy invite link"}
                            className="gomer-focus-ring flex size-10 shrink-0 items-center justify-center rounded-md border border-border transition-colors hover:bg-accent"
                          >
                            <Copy className="size-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="h-full rounded-[7px] border border-border bg-card">
                    <div className="flex h-full flex-col gap-4 p-5">
                      <div className="flex flex-col gap-1">
                        <h3 className="font-body text-base font-medium text-foreground">Share a use case</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          Show others on LinkedIn or X how Gomer helps you in your work and get extra
                          credits for it.
                        </p>
                      </div>
                      <div>
                        <Link
                          to="/creators"
                          className="gomer-focus-ring inline-flex min-h-10 cursor-pointer select-none items-center justify-center gap-2 rounded-md border-0 bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-[background-color,border-color,transform] duration-200 hover:bg-secondary/80 active:scale-[0.98]"
                        >
                          <span className="flex items-center gap-1.5">
                            Join Gomer Creator Program
                            <ExternalLink className="size-3.5" strokeWidth={1.5} />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[7px] border border-border">
                <div className="flex items-start gap-3 p-5">
                  <Users className="mt-0.5 size-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
                  <p className="text-sm text-muted-foreground">
                    All plans share credits across your entire Slack or Teams workspace. No per-seat
                    limits — everyone can work with Gomer.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm text-muted-foreground">
                  SOC 2 Type I compliant. · No training on your data.
                </p>
                <Link
                  to="/privacy"
                  target="_blank"
                  rel="noreferrer"
                  className="gomer-focus-ring relative inline-flex min-h-0 cursor-pointer select-none items-center justify-center gap-1 rounded-sm border-0 bg-transparent px-0 py-0 text-sm font-medium text-foreground transition-[background-color,border-color,transform] duration-200 after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:scale-x-0 after:bg-border hover:text-accent-foreground hover:after:scale-x-100 active:scale-[0.98]"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
