import { PageMeta } from "@/components/PageMeta";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { ChevronDown } from "lucide-react";

const proseClasses =
  "flex max-w-none flex-col gap-12 [&_p]:font-medium [&_li]:font-medium [&_strong]:font-medium [&_blockquote]:border-l [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_code]:rounded [&_code]:bg-primitive-purple-50 [&_code]:px-1 [&_code]:py-0.5 dark:[&_code]:bg-primitive-purple-800 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-primitive-purple-50 [&_pre]:p-4 dark:[&_pre]:bg-primitive-purple-800 [&_table]:w-full [&_td]:border [&_td]:p-2";

const listClasses =
  "ms-6 list-decimal body-main font-medium text-primary [&_li]:mb-[11px] [&_li:last-child]:mb-0 [&_strong]:font-medium";

const bulletListClasses =
  "ms-6 list-disc body-main font-medium text-primary [&_li]:mb-[11px] [&_li:last-child]:mb-0 [&_strong]:font-medium";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-primitive-main-beige">
      <PageMeta
        title="Documentation — Viktor"
        description="Learn how to set up and get the most out of Viktor — your AI coworker in Slack and Microsoft Teams."
        ogTitle="Documentation — Viktor"
        ogDescription="Set up Viktor and connect your tools in minutes."
      />
      {/* SECTION 1 — HERO */}
      <section className="border-0 py-0! pt-0 pb-12 sm:pb-[5rem]">
        <div className="relative w-full overflow-hidden rounded-b-[24px] bg-integrations-hero-surface sm:rounded-b-[32px]">
          <Nav heroTone="light" />
          <div className="px-4 sm:px-6 md:px-12 lg:px-20">
            <div className="mt-16 hero-page-stack-pt mx-auto w-full max-w-[1440px] pb-12 sm:pb-16 lg:pb-20">
              <div className="grid gap-8 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-5">
                <div className="hidden lg:block" aria-hidden="true" />
                <div className="flex flex-col gap-8">
                  <h1 className="font-heading h1 text-primary">Documentation</h1>
                  <p className="max-w-[34.1875rem] body-medium text-primary font-medium">
                    Learn how to set up and get the most out of Viktor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — CONTENT */}
      <section className="pt-0 pb-14 sm:pb-[7rem]">
        <div className="px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="mx-auto w-full max-w-[1440px] pb-28">
            <div className="grid gap-8 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-5">
              <aside className="flex flex-col gap-2 lg:sticky lg:top-4 lg:pt-4 lg:pr-16">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <p className="body-small text-primary font-medium">Getting Started</p>
                    <ChevronDown className="size-3 shrink-0 text-primary font-medium" aria-hidden />
                  </div>
                  <nav className="flex flex-col gap-2" aria-label="Getting Started documentation">
                    <a
                      href="#getting-started"
                      className="body-small transition-colors text-accent-1 font-medium"
                      aria-current="page"
                    >
                      Getting Started with Viktor
                    </a>
                  </nav>
                </div>
              </aside>

              <article className="flex min-w-0 flex-col gap-12">
                <header id="getting-started" className="flex flex-col gap-4">
                  <h2 className="font-heading h4 text-primary">Getting Started with Viktor</h2>
                  <p className="body-main text-secondary font-medium">
                    Add Viktor to your Slack or Microsoft Teams workspace and start automating tasks in minutes.
                  </p>
                </header>

                <div className={proseClasses}>
                  <p className="body-main text-primary font-medium">
                    Viktor is an AI coworker that lives in your Slack or Microsoft Teams workspace. It connects to 3,000+
                    business tools and does real work — pulling reports, managing campaigns, writing code, and automating
                    workflows.
                  </p>

                  <h2 className="font-heading h5 text-primary">Add Viktor to Slack or Microsoft Teams</h2>
                  <ol className={listClasses}>
                    <li>
                      Go to{" "}
                      <a
                        href="https://app.viktor.com/signup"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-1 underline underline-offset-4"
                      >
                        app.viktor.com/signup
                      </a>{" "}
                      and create your account.
                    </li>
                    <li>
                      Click <strong>We use Slack</strong> or <strong>We use Teams</strong> and authorize Viktor for your
                      workspace.
                    </li>
                    <li>
                      Viktor will appear as a member of your workspace — you can message it directly or invite it to
                      channels.
                    </li>
                  </ol>

                  <h2 className="font-heading h5 text-primary">Connect your tools</h2>
                  <p className="body-main text-primary font-medium">
                    Viktor works best when it can access the tools your team uses. Head to the Viktor dashboard and connect
                    integrations like:
                  </p>
                  <ul className={bulletListClasses}>
                    <li>
                      <strong>CRM</strong> — HubSpot, Salesforce
                    </li>
                    <li>
                      <strong>Analytics</strong> — PostHog, Google Analytics
                    </li>
                    <li>
                      <strong>Ads</strong> — Google Ads, Meta Ads
                    </li>
                    <li>
                      <strong>Engineering</strong> — GitHub, Linear
                    </li>
                    <li>
                      <strong>Productivity</strong> — Notion, Google Calendar, Slack
                    </li>
                  </ul>
                  <p className="body-main text-primary font-medium">
                    Each integration authenticates via OAuth — one click per tool, no API keys to paste.
                  </p>

                  <h2 className="font-heading h5 text-primary">Start working</h2>
                  <p className="body-main text-primary font-medium">Message Viktor the way you would message a coworker:</p>
                  <div className="flex flex-col gap-1">
                    {[
                      '"Pull last week\'s revenue from Stripe and compare it to the week before."',
                      '"Create a GitHub issue for the login bug we discussed in #engineering."',
                      '"Run a competitive analysis on our top 3 competitors."',
                    ].map(q => (
                      <div key={q} className="rounded-[32px] bg-white px-6 py-4 body-main font-medium text-primary">
                        {q}
                      </div>
                    ))}
                  </div>
                  <p className="body-main text-primary font-medium">
                    Viktor figures out which tools to use, pulls the data, and delivers the result right in your
                    conversation.
                  </p>

                  <h2 className="font-heading h5 text-primary">What&apos;s next</h2>
                  <ul className={bulletListClasses}>
                    <li>
                      Set up <strong>scheduled tasks</strong> so Viktor runs recurring workflows automatically.
                    </li>
                    <li>
                      Explore <strong>proactive automations</strong> — Viktor observes your team&apos;s patterns and
                      suggests helpful routines.
                    </li>
                    <li>
                      Invite your team — everyone in the workspace can use Viktor, no technical expertise required.
                    </li>
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}