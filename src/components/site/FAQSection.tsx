import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export type FAQItem = { q: string; a: string };

export const DEFAULT_FAQS: FAQItem[] = [
  { q: "What is Viktor, exactly?", a: "Viktor is an AI employee that lives in Slack. It has its own computer in the cloud where it writes and runs code to complete tasks. It's not a chatbot — it's a colleague that does real work." },
  { q: "How is Viktor different from ChatGPT or other AI assistants?", a: "ChatGPT tells you how to do work. Viktor does it. It connects to your tools, takes action, and ships finished artifacts: PDFs, dashboards, code, campaigns." },
  { q: "What can Viktor actually do?", a: "Pull reports, build dashboards, write code, run ad audits, draft outreach, triage bugs, build internal tools, automate recurring work, and more — anything you'd ask a smart generalist hire." },
  { q: "What tools does Viktor connect to?", a: "3,000+ integrations including Slack, Teams, Notion, Linear, GitHub, Stripe, HubSpot, Salesforce, Meta Ads, Google Ads, Apollo, Airtable, and almost any tool with an API." },
  { q: "How does pricing work?", a: "Flat monthly subscription per workspace. No per-seat fees, no per-task billing. Start free with $100 in credits." },
  { q: "Is my data secure?", a: "Yes. Viktor is SOC 2 Type II compliant. Your data is encrypted in transit and at rest, and never used to train shared models." },
  { q: "Where does Viktor run?", a: "Viktor runs in an isolated cloud sandbox per workspace. It has its own computer, file system, and browser environment." },
  { q: "Can Viktor write and deploy code?", a: "Yes. Viktor can write code in any major language, open pull requests, review code, and deploy to your existing CI/CD pipeline." },
  { q: "Does Viktor work in Microsoft Teams?", a: "Yes. Viktor works natively in both Slack and Microsoft Teams with full feature parity." },
  { q: "How long does setup take?", a: "Less than 5 minutes. Install Viktor in Slack or Teams, connect a few tools, and start delegating." },
  { q: "Can I control what Viktor has access to?", a: "Yes. Admins can scope Viktor's access per tool, per channel, and per user with granular permissions." },
  { q: "Does Viktor learn from my company?", a: "Yes. Viktor builds a private knowledge base of your processes, preferences, and past work — scoped to your workspace only." },
  { q: "What happens if Viktor makes a mistake?", a: "You can roll back any action, review Viktor's full execution log, and refine instructions. Viktor learns from corrections." },
  { q: "Can I try Viktor for free?", a: "Yes. Every workspace starts with $100 in free credits — no credit card required." },
  { q: "Do you offer enterprise plans?", a: "Yes. Enterprise plans include SSO, audit logs, custom data residency, and a dedicated success manager." },
  { q: "How does Viktor handle confidential data?", a: "All data is encrypted, isolated per workspace, and never shared with third parties or used for model training." },
  { q: "Can Viktor handle scheduled or recurring tasks?", a: "Yes. Schedule any task on a cron — daily reports, weekly audits, monthly invoices — Viktor runs them in the background." },
  { q: "What languages does Viktor speak?", a: "Viktor is fluent in 50+ languages and adapts to your team's tone and vocabulary." },
  { q: "Can multiple teammates use Viktor at once?", a: "Yes. Viktor handles parallel conversations and tasks across your entire workspace simultaneously." },
  { q: "How does Viktor compare to hiring a contractor?", a: "Viktor is available 24/7, doesn't require onboarding for each task, and costs a fraction of a contractor — while shipping comparable quality work." },
  { q: "Can I cancel anytime?", a: "Yes. No long-term contracts. Cancel anytime from your workspace settings." },
  { q: "Do you offer a refund policy?", a: "Yes. 30-day money-back guarantee on all plans, no questions asked." },
  { q: "How do I get support?", a: "Email, in-app chat, and a dedicated Slack channel for Pro and Enterprise customers." },
];

type FAQSectionProps = {
  faqs?: FAQItem[];
  title?: ReactNode;
  initialVisibleCount?: number;
  className?: string;
};

export function FAQSection({
  faqs = DEFAULT_FAQS,
  title = "FAQ",
  initialVisibleCount = 4,
  className = "px-2 sm:px-20 py-5 sm:py-32 bg-primitive-main-beige ",
}: FAQSectionProps) {
  const [open, setOpen] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? faqs : faqs.slice(0, initialVisibleCount);

  return (
    <section className={className}>
      <div className=" mx-auto w-full max-w-7xl grid gap-8 lg:grid-cols-[minmax(0,519fr)_minmax(0,630fr)] lg:items-start">
        <h2 className="font-display text-5xl md:text-5xl">{title}</h2>
        <div>
          <div className="space-y-3">
            {visible.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={f.q}
                  className="cursor-pointer overflow-hidden rounded-4xl bg-white transition-[border-radius] duration-300 ease-out"
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="cursor-pointer w-full flex items-center justify-between gap-4 px-7 py-5 text-left"
                  >
                    <span
                      className={`font-medium text-lg transition-colors duration-300 ease-out ${
                        isOpen ? "text-[#6e47ff]" : "text-foreground"
                      }`}
                    >
                      {f.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 text-violet-600 transition-transform duration-300 ease-out ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div
                        className={`px-7 pb-6 text-md text-[#9693a3] leading-relaxed transition-[opacity,transform] duration-300 ease-out ${
                          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
                        }`}
                      >
                        {f.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {faqs.length > initialVisibleCount && (
            <div className="mt-8 flex justify-start">
              <button
                onClick={() => setShowAll((v) => !v)}
                className="rounded-full border border-border px-7 py-3.5 text-md font-medium hover:bg-secondary transition"
              >
                {showAll ? "Show Less" : `Show All ${faqs.length} Questions`}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
