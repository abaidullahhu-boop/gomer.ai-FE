import { CalendarCheck2 } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SlackLightCard, SlackPurpleCard } from "@/components/site/SlackChangelogCards";

type Entry = {
  date: string;
  title: string;
  intro?: string;
  items: string[];
  illustration?: "slack-light" | "slack-purple";
};

const entries: Entry[] = [
  {
    date: "Jun 05, 2026",
    title: "Claude Opus 4.5",
    intro:
      "Claude Opus 4.5 is now available across Viktor and is selectable in skills, agents, and the planner. Faster, more reliable tool use.",
    items: [],
  },
  {
    date: "Jun 03, 2026",
    title: "Read-only GitHub integration",
    intro:
      "Read GitHub issues, pull requests, and discussions from any thread. Viktor can summarize, link, and reason over repository context without write access.",
    items: [
      "Search issues and PRs by repository, label, or assignee directly inside any conversation.",
      "Mention #123 to expand the issue inline with title, body, and current status.",
    ],
  },
  {
    date: "Jun 01, 2026",
    title: "Redesigned Spaces page",
    intro:
      "Spaces got a refreshed home — a cleaner sidebar, faster switching, and live activity counts so you always know where to jump in next.",
    items: [],
  },
  {
    date: "May 29, 2026",
    title: "Media generation chart on the Usage page",
    intro:
      "The Usage dashboard now breaks out media generation activity (images, video) from text and tool usage with per-day totals and per-model cost.",
    items: [
      "Filter by skill, agent, or workspace to attribute usage cleanly.",
      "Export the underlying CSV for finance reporting.",
    ],
  },
  {
    date: "May 24, 2026",
    title: "GPT 5.5, Bigger Claude Outputs & a Refreshed Usage Page",
    intro:
      "GPT 5.5 is live, Claude responses can now run longer for deep work, and the Usage page has a refreshed layout.",
    items: [
      "GPT 5.5 selectable in any skill or agent — faster than 5, with better instruction following.",
      "Claude long-form outputs are now supported on Sonnet and Opus tiers — up to 4× the previous max.",
      "Usage page redesigned to show model mix, top skills, and per-user spend at a glance.",
    ],
  },
  {
    date: "May 19, 2026",
    title: "Google Ads Negative Keywords & Smarter Slack Replies",
    intro:
      "Marketing teams can now manage negative keyword lists from Viktor, and the Slack integration replies smarter to threaded conversations.",
    items: [
      "Add, remove, and audit negative keywords across campaigns directly from a Viktor skill.",
      "Slack replies now include thread context up to 50 messages back so Viktor's answer is on-topic.",
    ],
    illustration: "slack-light",
  },
  {
    date: "May 16, 2026",
    title: "Pause & Resume Scheduled Tasks",
    intro:
      "Scheduled tasks can now be paused without losing their schedule or history. Resume in one click and the next run picks up where you left off.",
    items: [],
  },
  {
    date: "May 14, 2026",
    title: "Per-Model Reasoning Controls & GPT-Image-2",
    intro:
      "Tune reasoning depth per model, and use GPT-Image-2 across image-generation skills.",
    items: [
      "Per-model reasoning sliders for OpenAI o-series and Claude — trade latency for depth.",
      "GPT-Image-2 selectable as a default image model in any image skill.",
    ],
  },
  {
    date: "May 10, 2026",
    title: "Reconnect Integrations, Smarter Approvals & Kimi K2.6",
    intro:
      "Quietly reconnect integrations when tokens expire, route high-impact actions to the right approver, and use Kimi K2.6 in any skill.",
    items: [
      "Auto-reconnect prompts users individually instead of breaking the whole workspace.",
      "Approval routing now considers role, channel, and dollar thresholds.",
      "Kimi K2.6 is selectable wherever models can be chosen.",
    ],
  },
  {
    date: "May 06, 2026",
    title: "Claude Opus 4.7 & Instant Integrations Page",
    intro:
      "Opus 4.7 is the new default for Viktor's deep-thinking modes, and Integrations now load instantly on first visit.",
    items: [
      "Opus 4.7 is set as the default reasoning model for Plan and Deep Research.",
      "Integrations page rebuilt with virtualized lists and prefetching — under 200ms on cold load.",
    ],
  },
  {
    date: "May 02, 2026",
    title: "Curated Skill Recipes",
    intro:
      "A new Recipes section gives every workspace a curated starter set of skills tuned to their tooling.",
    items: [
      "10+ recipes covering ops, sales, support, and engineering — install in one click.",
    ],
  },
  {
    date: "Apr 28, 2026",
    title: "Multi-Account Integrations",
    intro:
      "Connect more than one account for the same integration. Route each skill or agent to the right account based on rules or user identity.",
    items: [
      "Supported on Slack, Notion, Linear, GitHub, Google Workspace, and HubSpot at launch.",
    ],
  },
  {
    date: "Apr 24, 2026",
    title: "Speech & Video Generation",
    intro:
      "Generate narration and short video clips from any skill or agent. Native pipelines, no glue code.",
    items: [
      "Voice cloning is opt-in and gated by workspace admins.",
      "Generated assets are stored in the workspace media library with full audit logs.",
    ],
  },
  {
    date: "Apr 19, 2026",
    title: "Model Presets & Payment Failure Alerts",
    intro:
      "Save common model + reasoning configurations as presets, and get notified the moment a billing run fails.",
    items: [
      "Workspace-shared presets keep every skill on the same model defaults.",
      "Payment failure alerts route to billing-role users in Slack and email.",
    ],
  },
  {
    date: "Apr 15, 2026",
    title: "Privacy-First Slack Connect Support",
    intro:
      "Use Viktor across Slack Connect channels without leaking content to partner workspaces. Per-channel data residency and audit trails.",
    items: [],
  },
  {
    date: "Apr 11, 2026",
    title: "Meta Ads QA & Slack Issue Reporting",
    intro:
      "Catch broken Meta ad creatives before they spend, and report Slack issues directly from the message menu.",
    items: [
      "Automatic QA scans new creatives for broken UTMs, missing pixels, and policy red flags.",
      "Report-an-issue surfaces in every message context menu and ships diagnostics directly to support.",
    ],
  },
  {
    date: "Apr 07, 2026",
    title: "Yearly Billing & Expanded Google Drive Tools",
    intro:
      "Switch any workspace to yearly billing for two months free, and unlock deeper Drive automation.",
    items: [
      "New Drive skills: move, share, OCR, and bulk-rename across thousands of files.",
      "Yearly invoices generated automatically and visible under Billing.",
    ],
  },
  {
    date: "Apr 02, 2026",
    title: "GPT-5A Now Available",
    intro:
      "GPT-5A is live — Anthropic-compatible tool calls, longer context, lower latency. Available across all model pickers.",
    items: [],
  },
  {
    date: "Mar 28, 2026",
    title: "Granola Meeting Notes Integration",
    intro:
      "Pipe Granola meeting notes directly into Viktor and let agents generate follow-ups, action items, and CRM updates.",
    items: [
      "Auto-attach Granola notes to the right project space based on attendees and calendar context.",
    ],
  },
  {
    date: "Mar 24, 2026",
    title: "Auto-Resume After Integration Connect",
    intro:
      "When an integration disconnects mid-task, Viktor pauses the run and automatically resumes once the user reconnects — no replays, no lost state.",
    items: [],
  },
  {
    date: "Mar 19, 2026",
    title: "Channel Selection & Personalized Skills",
    intro:
      "Pick exactly which channels a skill listens on, and personalize behavior per user without forking the skill.",
    items: [
      "Channel allow-lists per skill — perfect for noisy workspaces.",
      "Per-user variables for tone, signature, and approval thresholds.",
    ],
  },
  {
    date: "Feb 21, 2026",
    title: "Slack Channel Privacy",
    intro:
      "Workspace admins can now opt individual private channels out of Viktor entirely, with audit-grade enforcement.",
    items: [
      "Per-channel privacy is honored by every skill, agent, and integration — no carve-outs.",
    ],
  },
  {
    date: "Feb 14, 2026",
    title: "Group DMs, Custom Sender Names & Channel Controls",
    intro:
      "Run Viktor inside group DMs, change the displayed sender per workspace, and tighten channel-level controls.",
    items: [
      "Group DM support: invite Viktor like any other member.",
      "Custom sender names render across Slack, Teams, and email.",
      "Channel controls: per-channel rate limits and skill allow-lists.",
    ],
    illustration: "slack-purple",
  },
  {
    date: "Feb 09, 2026",
    title: "Model Selection & Scheduled Task Costs",
    intro:
      "Pick the model on a per-skill basis, and see the projected cost of any scheduled task before turning it on.",
    items: [
      "Cost projection runs a dry-run against the last 7 days of triggers.",
    ],
  },
  {
    date: "Feb 02, 2026",
    title: "Account Insights, Claude Sonnet 4.6 & Live Spaces",
    intro:
      "A new Account Insights tab, Claude Sonnet 4.6 across all skills, and Live Spaces for real-time collaboration.",
    items: [
      "Account Insights summarizes monthly usage, top users, and at-risk integrations.",
      "Claude Sonnet 4.6 set as the default for fast skills.",
      "Live Spaces show who is in a space right now with cursor-level awareness.",
    ],
  },
  {
    date: "Jan 28, 2026",
    title: "Usage Insights & Visual Refresh",
    intro:
      "A redesigned dashboard makes it easier to spot trends, and a lighter visual system carries through every page.",
    items: [
      "New typography, refined spacing, and subtler shadows across the entire app.",
      "Usage insights surface anomalies automatically — sudden spikes, unused skills, runaway agents.",
    ],
  },
];

const heroBg = {
  background:
    "radial-gradient(70% 44% at 52% 9rem, #ffbd9eb8 0%, #fdbca0a8 6%, #c99ed06b 29%, #947fff2e 51%, #faf5f100 92%), linear-gradient(90deg, #faf5f1, #faf5f1)",
};

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-[#faf5f1]">
      <PageMeta
        title="Changelog — Viktor"
        description="What's new across the Viktor platform — releases, improvements, and fixes."
        ogTitle="Changelog — Viktor"
        ogDescription="What's new across the Viktor platform."
      />
      {/* Hero with gradient */}
      <section style={heroBg} className="relative">
        <div className="pt-6">
          <Nav />
        </div>

        <header className="mx-auto max-w-3xl px-6 pt-24 pb-20 flex items-start gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-400 to-indigo-600 flex items-center justify-center shadow-lg shrink-0">
            <CalendarCheck2 className="w-6 h-6 text-white" strokeWidth={2.2} />
          </div>
          <div>
            <h1 className="font-display text-5xl md:text-6xl tracking-tight leading-none text-foreground">
              Changelog
            </h1>
            <p className="mt-3 text-sm text-muted-foreground max-w-md">
              Releases, improvements, and fixes across the Viktor platform.
            </p>
          </div>
        </header>
      </section>

      {/* Timeline */}
      <main className="mx-auto max-w-3xl px-6 pt-14 pb-28">
        <ul className="space-y-16">
          {entries.map((e) => (
            <li
              key={e.title}
              className="grid md:grid-cols-[150px_1fr] gap-4 md:gap-10"
            >
              {/* Date */}
              <div className="md:pt-2">
                <span className="inline-flex items-center gap-2 text-[13px] font-medium text-violet-600">
                  <CalendarCheck2 className="w-4 h-4" strokeWidth={2} />
                  {e.date}
                </span>
              </div>

              {/* Entry */}
              <div>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold tracking-tight leading-tight text-foreground">
                  {e.title}
                </h2>
                {e.intro && (
                  <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">
                    {e.intro}
                  </p>
                )}
                {e.items.length > 0 && (
                  <ul className="mt-5 space-y-3">
                    {e.items.map((it) => (
                      <li
                        key={it}
                        className="flex gap-3 text-[15px] text-foreground/85 leading-relaxed"
                      >
                        <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-muted-foreground/40 shrink-0" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {e.illustration === "slack-light" && (
                  <div className="mt-6"><SlackLightCard /></div>
                )}
                {e.illustration === "slack-purple" && (
                  <div className="mt-6"><SlackPurpleCard /></div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </main>

      {/* Decorative wordmark */}
      <div
        aria-hidden
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, transparent, #f0e6ff 60%, #e9d9ff)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 pt-10">
          <h2 className="text-center font-display font-extrabold tracking-tighter leading-none bg-gradient-to-b from-violet-500 via-violet-600 to-indigo-700 bg-clip-text text-transparent select-none"
              style={{ fontSize: "clamp(6rem, 28vw, 22rem)" }}>
            viktor
          </h2>
        </div>
      </div>

      <Footer />
    </div>
  );
}
