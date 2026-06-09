import { useState } from "react";
import { PageMeta } from "@/components/PageMeta";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { ChevronDown } from "lucide-react";

const HERO_SURFACE =
  "radial-gradient(70% 44% at 52% 9rem, #ffbd9eb8 0%, #fdbca0a8 6%, #c99ed06b 29%, #947fff2e 51%, #faf5f100 92%), linear-gradient(90deg, #faf5f1, #faf5f1)";

export default function DocsPage() {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen bg-primitive-main-beige">
      <PageMeta
        title="Documentation — Viktor"
        description="Learn how to set up and get the most out of Viktor — your AI coworker in Slack and Microsoft Teams."
        ogTitle="Documentation — Viktor"
        ogDescription="Set up Viktor and connect your tools in minutes."
      />
      {/* SECTION 1 — HERO */}
      <section className="pt-0 pb-12 sm:pb-20 border-0">
        <div
          className="relative w-full overflow-hidden rounded-b-[24px] sm:rounded-b-[32px]"
          style={{ background: HERO_SURFACE }}
        >
          <Nav heroTone="light" />
          <div className="px-4 sm:px-6 md:px-12 lg:px-20">
            <div className="mx-auto w-full max-w-[1440px] pt-16 sm:pt-24 pb-12 sm:pb-16 lg:pb-20">
              <div className="grid gap-8 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-5">
                <div className="hidden lg:block" />
                <div className="flex flex-col gap-8 items-center text-center">
                  <h1
                    className="font-display font-medium leading-[1.05] tracking-[-0.04em] text-[#1a182b]"
                    style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}
                  >
                    Documentation
                  </h1>
                  <p className="text-base text-[#1a182b]/80 max-w-xl">
                    Learn how to set up and get the most out of Viktor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — CONTENT */}
      <section className="pt-0 pb-14 sm:pb-28">
        <div className="px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="mx-auto w-full max-w-[1440px] pb-28">
            <div className="grid gap-8 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-5">
              {/* Sidebar */}
              <aside className="flex flex-col gap-2 lg:sticky lg:top-4 lg:pt-4 lg:pr-16 self-start">
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setOpen(o => !o)}
                    className="flex items-center justify-between w-full text-left text-sm font-semibold text-[#1a182b] py-2"
                  >
                    <span>Getting Started</span>
                    <ChevronDown className={`size-4 transition-transform ${open ? "" : "-rotate-90"}`} />
                  </button>
                  {open && (
                    <a
                      href="#getting-started"
                      className="text-sm text-[#6e47ff] font-medium pl-3 py-1.5 border-l-2 border-[#6e47ff]"
                    >
                      Getting Started with Viktor
                    </a>
                  )}
                </div>
              </aside>

              {/* Article */}
              <article className="flex flex-col gap-8 max-w-2xl text-[#1a182b]">
                <header id="getting-started" className="flex flex-col gap-3">
                  <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.04em]">
                    Getting Started with Viktor
                  </h2>
                  <p className="text-[#9693a3]">
                    Add Viktor to your Slack or Microsoft Teams workspace and start automating tasks in minutes.
                  </p>
                </header>

                <p className="leading-relaxed">
                  Viktor is an AI coworker that lives in your Slack or Microsoft Teams workspace. It connects to 3,000+ business
                  tools and does real work — pulling reports, managing campaigns, writing code, and automating workflows.
                </p>

                <section className="flex flex-col gap-4">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em]">Add Viktor to Slack or Microsoft Teams</h3>
                  <ol className="list-decimal pl-6 space-y-2 leading-relaxed">
                    <li>
                      Go to{" "}
                      <a href="#" className="text-[#6e47ff] underline underline-offset-2">
                        app.viktor.com/signup
                      </a>{" "}
                      and create your account.
                    </li>
                    <li>Click We use Slack or We use Teams and authorize Viktor for your workspace.</li>
                    <li>Viktor will appear as a member of your workspace — you can message it directly or invite it to channels.</li>
                  </ol>
                </section>

                <section className="flex flex-col gap-4">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em]">Connect your tools</h3>
                  <p className="leading-relaxed">
                    Viktor works best when it can access the tools your team uses. Head to the Viktor dashboard and connect
                    integrations like:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 leading-relaxed">
                    <li><span className="font-semibold">CRM</span> — HubSpot, Salesforce</li>
                    <li><span className="font-semibold">Analytics</span> — PostHog, Google Analytics</li>
                    <li><span className="font-semibold">Ads</span> — Google Ads, Meta Ads</li>
                    <li><span className="font-semibold">Engineering</span> — GitHub, Linear</li>
                    <li><span className="font-semibold">Productivity</span> — Notion, Google Calendar, Slack</li>
                  </ul>
                  <p className="leading-relaxed">
                    Each integration authenticates via OAuth — one{" "}
                    <a href="#" className="text-[#6e47ff] underline underline-offset-2">click per tool</a>, no API keys to paste.
                  </p>
                </section>

                <section className="flex flex-col gap-4">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em]">Start working</h3>
                  <p className="leading-relaxed">Message Viktor the way you would message a coworker:</p>
                  <div className="flex flex-col gap-3">
                    {[
                      "“Pull last week's revenue from Stripe and compare it to the week before.”",
                      "“Create a GitHub issue for the login bug we discussed in #engineering.”",
                      "“Run a competitive analysis on our top 3 competitors.”",
                    ].map(q => (
                      <div
                        key={q}
                        className="rounded-full bg-white px-5 py-3 text-sm text-[#1a182b] shadow-[0_1px_2px_rgba(26,24,43,0.05)]"
                      >
                        {q}
                      </div>
                    ))}
                  </div>
                  <p className="leading-relaxed">
                    Viktor figures out which tools to use, pulls the data, and delivers the result right in your conversation.
                  </p>
                </section>

                <section className="flex flex-col gap-4">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em]">What's next</h3>
                  <ul className="list-disc pl-6 space-y-2 leading-relaxed">
                    <li><span className="font-semibold">Set up scheduled tasks</span> so Viktor runs recurring workflows automatically.</li>
                    <li><span className="font-semibold">Explore proactive automations</span> — Viktor observes your team's patterns and suggests helpful routines.</li>
                    <li><span className="font-semibold">Invite your team</span> — everyone in the workspace can use Viktor, no technical expertise required.</li>
                  </ul>
                </section>
              </article>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}