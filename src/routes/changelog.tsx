import type { ReactNode } from "react";
import { CalendarCheck2 } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import viktorSlackAvatar from "@/assets/images/viktor-slack-avatar (1).svg";

type ChangelogItem = {
  label: string;
  description: ReactNode;
};

type Entry = {
  date: string;
  title: string;
  intro?: string;
  items: ChangelogItem[];
};

const entries: Entry[] = [
  {
    date: "June 3, 2026",
    title: "Workspace personalization settings",
    intro:
      "Set a personality and custom instructions that shape how Viktor responds across your entire workspace.",
    items: [
      {
        label: "Workspace personalization",
        description:
          'A new section in Settings lets you pick a personality preset and write custom instructions that apply to every Viktor conversation in your workspace. Use it to adjust tone, set standing context ("we\'re a B2B SaaS company", "always reply in Spanish"), or reduce sycophancy — the instructions are injected into Viktor\'s system prompt so they take effect immediately, no restart needed.',
      },
    ],
  },
  {
    date: "May 30, 2026",
    title: "Claude Opus 4.8",
    intro:
      "Anthropic's latest frontier model is now available in Viktor's model picker.",
    items: [
      {
        label: "Claude Opus 4.8",
        description:
          "Anthropic's newest flagship model is now available in the model picker for all workspaces. Select it when you need maximum reasoning depth — it uses adaptive thinking that scales compute to match problem complexity.",
      },
    ],
  },
  {
    date: "May 23, 2026",
    title: "Read-only GitHub integration",
    intro:
      "Connect GitHub in read-only mode so Viktor can browse repos, issues, and PRs without write permissions.",
    items: [
      {
        label: "Read-only GitHub integration",
        description:
          "A separate read-only GitHub connection is now available alongside the existing read-write one. Connect it when you want Viktor to browse your repos, review code, and read issues or PRs without granting write access — useful for security-conscious teams or when full repo access isn't needed.",
      },
    ],
  },
  {
    date: "May 21, 2026",
    title: "Redesigned Spaces page",
    intro:
      "Spaces are now displayed as thumbnail cards with direct app-launch buttons and a grid / list view toggle.",
    items: [
      {
        label: "Redesigned Spaces page",
        description: (
          <>
            The <code>/viktor-spaces</code> page now shows each space as a thumbnail
            card instead of a flat list. You can launch production or preview apps
            directly from the card without entering the management page first. A grid /
            list toggle in the header lets you pick your preferred layout — the choice
            persists across sessions.
          </>
        ),
      },
    ],
  },
  {
    date: "May 19, 2026",
    title: "Media generation chart on the Usage page",
    intro:
      "A new chart on the Usage Overview shows all your image, audio, and video generation usage in one place — click to drill down by media type.",
    items: [
      {
        label: "Media generation chart",
        description:
          "The Usage Overview now rolls image, audio, and video generation into a single Media generation segment alongside Threads and Scheduled tasks. Click the legend chip to drill down into per-kind breakdowns — Image, Audio, and Video — then click back to return to the main view.",
      },
    ],
  },
  {
    date: "April 29, 2026",
    title: "GPT-5.5, Bigger Claude Outputs & a Refreshed Usage Page",
    intro:
      "GPT-5.5 joins the model picker, Claude Opus and Sonnet can now produce much longer outputs, the signup page tells you exactly what you're about to install, and the Usage page gets a Scheduled Tasks tab and per-user usage stats.",
    items: [
      {
        label: "GPT-5.5 in the model picker",
        description:
          "OpenAI's newest model is now available for selection across coworker tasks. Kimi K2.6 and Gemini Flash 3 have been retired from the default-model picker.",
      },
      {
        label: "Longer Claude outputs",
        description:
          "Output caps for Claude Opus 4.6 / 4.7 and the Sonnet 4 family were raised significantly, so Viktor can now return much longer reports, drafts, and analyses in a single response without truncation.",
      },
      {
        label: "\"You're installing X\" on signup",
        description:
          "When a logged-out user clicks Install on a skill or bundle, the signup page now shows exactly what's being installed, so the install intent survives the sign-in handoff and lands you straight into the right setup.",
      },
      {
        label: "Refreshed Usage page",
        description:
          "The Usage settings now include a Scheduled Tasks tab listing every running scheduled task in one place, plus per-user usage stats so workspace admins can see exactly which teammates are spending credits and where.",
      },
    ],
  },
  {
    date: "April 28, 2026",
    title: "Google Ads Negative Keywords & Smarter Slack Replies",
    intro:
      "Manage Google Ads negative keywords from Viktor, and get DM replies that stay in thread with quick status acks.",
    items: [
      {
        label: "Google Ads negative keywords",
        description:
          "New tools to list, add, and remove negative keywords at the campaign or ad-group level, with batch updates and match-type support, so you can prune wasted spend without leaving Viktor.",
      },
      {
        label: "Slack DM replies stay in thread",
        description:
          "When you DM Viktor about a specific channel thread, replies now land back in that same thread instead of bouncing to the channel root.",
      },
      {
        label: "Quick acks on status checks",
        description:
          "If you ping Viktor mid-task to ask where things stand, you'll get a short Slack status update first before it resumes the work.",
      },
    ],
  },
  {
    date: "April 27, 2026",
    title: "Pause & Resume Scheduled Tasks",
    intro:
      "Pause any scheduled task and resume it later — without losing the schedule or rebuilding the cron.",
    items: [
      {
        label: "Pause & resume controls for scheduled tasks",
        description:
          "You can now pause any scheduled task from settings and resume it later. Paused tasks persist across runs and skip their scheduled execution until you turn them back on, so you can quiet a noisy cron without deleting and rebuilding it. The same controls are available to agents, the SDK, and flow APIs.",
      },
    ],
  },
  {
    date: "April 23, 2026",
    title: "Per-Model Reasoning Controls & GPT-Image-2",
    intro:
      "Pick reasoning effort per model, choose defaults from a redesigned grid, and generate sharper images with OpenAI's newest model.",
    items: [
      {
        label: "Per-model reasoning controls",
        description:
          "The Default AI model settings page is now a redesigned card grid where you can pick a reasoning effort (Minimal, Low, Medium, or High) for each model, so you can tune depth vs. speed for how you actually work.",
      },
      {
        label: "GPT-Image-2 as the default image model",
        description: (
          <>
            Image generation now uses OpenAI&apos;s newest <code>gpt-image-2</code> by
            default, with better fidelity and more accurate token-based cost accounting.
          </>
        ),
      },
    ],
  },
  {
    date: "April 22, 2026",
    title: "Reconnect Integrations, Smarter Approvals & Kimi K2.6",
    intro:
      "One-click reconnect for broken integrations, always-approve for trusted tools, a softer past-due experience, and a new Moonshot model.",
    items: [
      {
        label: "One-click reconnect for broken integrations",
        description:
          "The integrations page now flags broken OAuth connections with a clear status and lets you reconnect in place. Your row-scoped settings are preserved, so you don't have to reconfigure Meta Ads, Google Ads, Stripe, Linear, Granola and others from scratch.",
      },
      {
        label: "\"Always approve this tool\" in Slack",
        description:
          "When Viktor asks for permission to use a tool in Slack, you can now choose to always approve future uses of the same tool. The preference is saved to your MCP settings so you stop getting re-prompted for tools you trust.",
      },
      {
        label: "Atlassian pre-connect setup guide",
        description:
          "Connecting Jira or Confluence now walks you through the steps your workspace admin needs to take first (whitelisting the Rovo MCP domain) before the OAuth flow kicks in, so the connection works on the first try.",
      },
      {
        label: "Moonshot Kimi K2.6 available",
        description:
          'Moonshot\'s newest Kimi K2.6 model is now selectable in the model picker (marked "in testing") alongside the existing frontier models.',
      },
      {
        label: "Clearer account deletion for admins",
        description:
          "When you're the last admin deleting a workspace, Viktor now shows exactly which teammates will lose access and how many scheduled tasks each person has, so you know the impact before you confirm.",
      },
      {
        label: "Softer past-due experience",
        description:
          "If a payment fails, you'll now see a banner at the top of the app instead of a full lockout. You can keep browsing your usage and settings while the payment recovers.",
      },
    ],
  },
  {
    date: "April 21, 2026",
    title: "Claude Opus 4.7 & Instant Integrations Page",
    intro:
      "Anthropic's newest frontier model is live for everyone, and the integrations page now loads instantly.",
    items: [
      {
        label: "Claude Opus 4.7 available",
        description:
          "Anthropic's newest frontier model is now available in Viktor for everyone, with a 1M context window, adaptive thinking, and summarized reasoning output.",
      },
      {
        label: "Instant integrations page",
        description:
          "Your integrations list now renders immediately when you open or reload the page, then refreshes in the background — no more waiting for it to load each time.",
      },
    ],
  },
  {
    date: "April 8, 2026",
    title: "Curated Skill Bundles",
    intro: "Discover curated groups of prebuilt skills in the Skills Directory.",
    items: [
      {
        label: "Skill bundles",
        description:
          "Browse curated groups of related prebuilt skills in the Skills Directory, with bundle detail pages that make it easier to understand what's included and find the right skills faster.",
      },
    ],
  },
  {
    date: "March 30, 2026",
    title: "Multi-Account Integrations",
    intro:
      "Connect multiple accounts for the same service — like two Gmail inboxes or two YouTube channels — each with its own dedicated tools.",
    items: [
      {
        label: "Multi-account integrations",
        description:
          'You can now connect multiple accounts for the same service. For example, link two Gmail inboxes or two YouTube channels and Viktor gives each connection its own dedicated tools. Manage them individually from the integrations dashboard with per-account disconnect and a simple "Connect another" button.',
      },
    ],
  },
  {
    date: "March 20, 2026",
    title: "Speech & Video Generation",
    intro:
      "Viktor can now generate spoken audio, transcribe media files, and create AI-powered videos.",
    items: [
      {
        label: "Text-to-speech & audio transcription",
        description:
          "Generate spoken audio from text and transcribe audio or video files directly in the chat. No API keys or setup needed.",
      },
      {
        label: "Text-to-video generation",
        description:
          "Create videos from text prompts, powered by xAI Grok, Gemini Veo 3.1, and OpenAI Sora 2 Pro.",
      },
    ],
  },
  {
    date: "March 19, 2026",
    title: "Model Presets & Payment Failure Alerts",
    intro:
      "New model presets for quick quality/speed switching, plus proactive Slack alerts when a payment fails.",
    items: [
      {
        label: "Model selection presets",
        description:
          "New presets in settings let you quickly choose between quality and speed tiers for your default model, without manually picking from the full model list.",
      },
      {
        label: "Failed payment alerts",
        description:
          "Workspace admins now get a Slack DM when a payment fails, with a direct link to the billing portal so nothing slips through the cracks.",
      },
    ],
  },
  {
    date: "March 18, 2026",
    title: "Privacy-First Slack Connect Support",
    intro:
      "Viktor now handles external shared channels with a private DM handoff and approval before replying.",
    items: [
      {
        label: "External shared channel → DM handoff",
        description:
          "When Viktor is @mentioned in a Slack Connect channel, it now moves the conversation into a private DM instead of replying publicly. You'll be asked to approve before any response is posted back to the shared thread — keeping cross-org conversations secure by default.",
      },
    ],
  },
  {
    date: "March 13, 2026",
    title: "Meta Ads GA & Slack Issue Reporting",
    intro:
      "Meta Ads integration is now generally available, and you can report issues directly from Slack.",
    items: [
      {
        label: "Meta Ads now generally available",
        description:
          "The Meta Ads integration is out of preview and fully ready to use. Connect your account and start managing campaigns, audiences, and catalogs right away.",
      },
      {
        label: "Issue reporting from Slack",
        description:
          "You can now ask Viktor to submit an issue report directly from your Slack conversation. Viktor will draft the report and ask for your approval before sending — no need to leave the chat.",
      },
    ],
  },
  {
    date: "March 11, 2026",
    title: "Yearly Billing & Expanded Google Drive Tools",
    intro:
      "Teams can now switch to annual billing, and Viktor gains new Google Drive and Sheets management tools.",
    items: [
      {
        label: "Yearly billing",
        description:
          "Teams can now switch between monthly and annual billing directly from the billing page. Annual plans include automatic credit resets for each billing cycle.",
      },
      {
        label: "Google Drive & Sheets tools",
        description:
          "Viktor can now copy and move files in Google Drive, and manage Google Sheets tabs — create, rename, and delete sheets within a spreadsheet.",
      },
      {
        label: "Meta Ads product catalogs",
        description:
          "Viktor can now create, update, and delete items in your Meta Ads product catalogs, making it easier to manage your ad inventory.",
      },
    ],
  },
  {
    date: "March 8, 2026",
    title: "GPT-5.4 Now Available",
    intro: "GPT-5.4 is now available as a model option in Viktor.",
    items: [
      {
        label: "GPT-5.4 model",
        description:
          "OpenAI's latest GPT-5.4 is now available as a model option. Select it from your model settings to start using it across all your conversations and tasks.",
      },
    ],
  },
  {
    date: "March 7, 2026",
    title: "Granola Meeting Notes Integration",
    intro:
      "Viktor can now connect to Granola to access and work with your meeting notes.",
    items: [
      {
        label: "Granola integration",
        description:
          "Viktor can now connect to Granola, giving it access to your meeting notes. Summarize discussions, pull out action items, or reference past meetings — all directly through Viktor.",
      },
    ],
  },
  {
    date: "March 5, 2026",
    title: "Auto-Resume After Integration Connect",
    intro:
      "Viktor automatically picks up where it left off after you connect an integration — no manual confirmation needed.",
    items: [
      {
        label: "Auto-resume after integration connect",
        description:
          'When Viktor asks you to connect an integration and you complete the OAuth flow, it now automatically picks up where it left off. No more having to manually say "I\'ve connected it" — the conversation continues seamlessly.',
      },
    ],
  },
  {
    date: "March 3, 2026",
    title: "Channel Selection & Personalized Skills",
    intro:
      "Pick which Slack channels Viktor joins during setup, and each team member now gets their own personalized skills.",
    items: [
      {
        label: "Channel selection during setup",
        description:
          "When onboarding through the web, you now pick exactly which Slack channels Viktor joins before the agent starts. No more guessing — you're in control from the first step.",
      },
      {
        label: "Personal skills per team member",
        description:
          "Each person on your team can now have their own personalized Viktor skills. Different team members see different skills based on their role and access, making Viktor more relevant to each individual.",
      },
    ],
  },
  {
    date: "February 21, 2026",
    title: "Slack Channel Privacy",
    intro:
      "Viktor now enforces per-user channel privacy — each team member only sees their own channels.",
    items: [
      {
        label: "Slack channel privacy",
        description:
          "When multiple people share a Viktor workspace, each user's agent now only sees the Slack channels they're actually a member of. Private channels, DMs, and group DMs stay private — matching the access rules you already have in Slack. Access updates automatically when someone joins or leaves a channel.",
      },
      {
        label: "Create group DMs",
        description:
          "You can now ask Viktor to start a group DM with specific people directly — no approval step needed.",
      },
    ],
  },
  {
    date: "February 20, 2026",
    title: "Group DMs, Custom Sender Names & Channel Controls",
    intro:
      "Viktor now works in group DMs, scheduled tasks can post under custom names, and you can ask Viktor to leave channels.",
    items: [
      {
        label: "Group DM support",
        description:
          "Viktor can now join and participate in group direct messages (multi-person DMs), not just channels and 1:1 conversations. Mention him in any group DM to get started.",
      },
      {
        label: "Custom sender names for scheduled tasks",
        description:
          'Scheduled tasks can now post messages under a custom display name instead of always appearing as "Viktor."',
      },
      {
        label: "Leave channel on request",
        description:
          "You can now ask Viktor to leave a Slack channel. Both joining and leaving channels go through a confirmation step so nothing happens by accident.",
      },
    ],
  },
  {
    date: "February 19, 2026",
    title: "Model Selection & Scheduled Task Costs",
    intro:
      "Choose your AI model and see exactly what each scheduled task costs.",
    items: [
      {
        label: "Model selection for teams",
        description:
          "Your team can now choose which AI model Viktor uses. Viktor can also pick the optimal model per scheduled task. Cost comparison badges show how much you save with each option.",
      },
      {
        label: "Detailed scheduled tasks usage",
        description:
          "See exactly how much each scheduled task costs with a full per-task breakdown, so you know where your credits go.",
      },
    ],
  },
  {
    date: "February 18, 2026",
    title: "Account Insights, Claude Sonnet 4-6 & Live Spaces",
    intro:
      "Ask Viktor about your plan and usage, try the new Claude Sonnet 4-6 model, and get real-time Spaces updates.",
    items: [
      {
        label: "Ask Viktor about your account & billing",
        description:
          "You can now ask Viktor directly about your subscription, usage, active threads, and integration settings. Just ask about your plan or credits and he'll pull the data for you.",
      },
      {
        label: "Claude Sonnet 4-6 now available",
        description: "New model option added to Viktor.",
      },
      {
        label: "Live Spaces updates",
        description:
          "Spaces now poll for real-time updates, so you see changes as they happen.",
      },
    ],
  },
  {
    date: "February 17, 2026",
    title: "Usage Insights & Visual Refresh",
    intro:
      "See per-thread credit costs on the usage page, plus a cleaner UI across the dashboard.",
    items: [
      {
        label: "Thread-level usage breakdown",
        description:
          "The usage page now shows credit consumption per thread, with type classification (thread vs scheduled task), sorting, and filtering. See exactly where your credits are going.",
      },
      {
        label: "Unified credits display",
        description:
          "The sidebar and billing page now show consistent credits data with richer progress bar visualizations.",
      },
      {
        label: "Team member avatars",
        description:
          "Team members now show their actual profile pictures instead of empty placeholders.",
      },
    ],
  },
];

const proseClasses =
  "flex max-w-none flex-col gap-4 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_blockquote]:border-l [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_code]:rounded [&_code]:bg-primitive-purple-50 [&_code]:px-1 [&_code]:py-0.5 dark:[&_code]:bg-primitive-purple-800 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-primitive-purple-50 [&_pre]:p-4 dark:[&_pre]:bg-primitive-purple-800 [&_table]:w-full [&_td]:border [&_td]:p-2";

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-primitive-main-beige">
      <PageMeta
        title="Changelog — Viktor"
        description="What's new across the Viktor platform — releases, improvements, and fixes."
        ogTitle="Changelog — Viktor"
        ogDescription="What's new across the Viktor platform."
      />
      {/* Hero */}
      <section className="border-0 py-0! pt-0 pb-12 sm:pb-[5rem]">
        <div className="relative w-full overflow-hidden rounded-b-[24px] bg-integrations-hero-surface sm:rounded-b-[32px]">
          <Nav heroTone="light" />
          <div className="px-4 sm:px-6 md:px-12 lg:px-20">
            <div className="hero-page-stack-pt mx-auto w-full max-w-[1440px] pb-12 sm:pb-16 lg:pb-20">
              <div className="grid gap-8 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-5 mt-16">
                <div className="flex flex-col items-center gap-3 lg:items-start ">
                  <img
                    src={viktorSlackAvatar}
                    alt=""
                    width={68}
                    height={68}
                    className="size-[4.25rem] shrink-0 rounded-xl"
                    aria-hidden
                  />
                  <div
                    className="hidden h-12 w-px bg-linear-to-b from-accent-1/40 via-accent-1/20 to-transparent lg:block"
                    aria-hidden
                  />
                </div>
                <div className="flex flex-col gap-8">
                  <h1 className="font-heading h1 text-primary">Changelog</h1>
                  <p className="max-w-[34.1875rem] body-medium text-primary">
                    New features, improvements, and fixes shipped to Viktor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="pt-0 pb-14 sm:pb-[7rem]">
        <div className="px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col">
            {entries.map((entry, index) => {
              const isLast = index === entries.length - 1;

              return (
                <article
                  key={`${entry.date}-${entry.title}`}
                  className={`grid gap-5 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-5${isLast ? "" : " pb-28"}`}
                >
                  <div className="flex flex-col lg:items-start">
                    <div className="lg:sticky lg:top-4 lg:z-[1]">
                      <div className="inline-flex px-6 h-12 items-center gap-4 rounded-full font-medium text-accent-1  whitespace-nowrap">
                        <CalendarCheck2
                          className="size-5 shrink-0"
                          strokeWidth={2}
                          aria-hidden
                        />
                        {entry.date}
                      </div>
                    </div>
                    {!isLast && (
                      <div
                        className="mt-0 hidden min-h-8 w-[4.25rem] flex-1 lg:block"
                        aria-hidden
                      >
                        <div className="mx-auto h-full w-px bg-linear-to-b from-accent-1/40 via-accent-1/20 to-transparent" />
                      </div>
                    )}
                  </div>

                  <div className="flex min-w-0 flex-col gap-8">
                    <header className="flex flex-col gap-4">
                      <h2 className="font-heading h4 text-primary">{entry.title}</h2>
                      {entry.intro && (
                        <p className="font-medium text-secondary">{entry.intro}</p>
                      )}
                    </header>

                    {entry.items.length > 0 && (
                      <div className={proseClasses}>
                        <ul className="m-0 flex list-none flex-col gap-4 p-0">
                          {entry.items.map((item) => (
                            <li
                              key={item.label}
                              className="flex items-start gap-5 pr-5"
                            >
                              <span
                                className="mt-[0.4375rem] size-2 shrink-0 rounded-sm bg-primitive-main-grey/50 dark:bg-primitive-purple-200/50"
                                aria-hidden
                              />
                              <span className="min-w-0 flex-1 body-main text-primary font-medium">
                                {item.label} — {item.description}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      

      <Footer />
    </div>
  );
}
