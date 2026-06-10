import { Link } from "react-router-dom";

import { IntegrationsLogoLoop } from "@/components/integrations/IntegrationsLogoLoop";
import { GetStartedButton } from "@/components/site/GetStartedButton";
import { Nav } from "@/components/site/Nav";

export function IntegrationsHero() {
  return (
    <section className="border-0 py-0" id="hero">
      <div className="relative w-full overflow-hidden rounded-b-section bg-integrations-hero-surface sm:rounded-b-section">
        <Nav heroTone="light" />
        <div className="hero-page-stack-pt relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center gap-16 px-5 pb-20 text-center sm:px-8 md:gap-20 md:px-12 md:pb-24 lg:px-20 lg:pb-28">
          <div className="flex w-full flex-col items-center gap-8 text-center mt-16">
            <div className="flex w-full flex-col items-center gap-8">
              <h1 className="max-w-5xl font-heading h3 text-balance sm:h2 lg:h1">
                One AI employee.
                <br />
                Your entire tool stack.
              </h1>

              <div className="flex w-full flex-col items-center gap-8">
                <p className="flex max-w-4xl flex-wrap items-center justify-center gap-x-1.5 gap-y-0 font-heading h6 text-balance sm:h5">
                  <span>Viktor connects to</span>
                  <span className="text-primitive-purple-400">3,200+</span>
                  <span>tools and uses them the way you do.</span>
                </p>
                <p className="max-w-[630px] body-main font-medium text-secondary">
                  Pull data from Stripe, update Notion, manage Google Ads, merge PRs in GitHub, triage
                  Linear issues. One Slack message. No tab switching. No CSV exports.
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col items-stretch justify-center gap-4 sm:w-auto sm:flex-row sm:items-center">
              <GetStartedButton
                variant="dark"
                className="inline-flex h-14 min-h-14 w-full items-center justify-center px-10 text-base tracking-[-0.01em] sm:w-auto"
              />
              <Link
                to="#integrations-directory"
                className="inline-flex h-14 min-h-14 w-full shrink-0 items-center justify-center rounded-full border border-[#1a182b1a] px-10 text-base font-medium tracking-[-0.01em] text-primitive-main-dark transition-all hover:bg-[#1a182b]/[0.06] active:translate-y-px sm:w-auto"
              >
                See All Integrations
              </Link>
            </div>
          </div>

          <IntegrationsLogoLoop />
        </div>
      </div>
    </section>
  );
}
