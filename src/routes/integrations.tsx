import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { PageMeta } from "@/components/PageMeta";
import { Footer } from "@/components/site/Footer";
import { StartFreeSection } from "@/components/site/StartFreeSection";
import { ConicPriceCardShell } from "@/components/site/ConicPriceCardShell";
import { IntegrationsCapabilitiesSection } from "@/components/integrations/IntegrationsCapabilitiesSection";
import { IntegrationsHero } from "@/components/integrations/IntegrationsHero";
import { IntegrationsUseCasesSection } from "@/components/integrations/IntegrationsUseCasesSection";
import { IntegrationsControlSection } from "@/components/integrations/IntegrationsControlSection";
import comparisonTabActiveBg from "@/assets/images/download (1).svg";
import integrationsTab1 from "@/assets/images/integrations-tab1.avif";
import gomerAvatar from "@/assets/images/gomer-marketplace-avatar.svg";
import { Search, X } from "lucide-react";
import { SlackReactions } from "@/components/site/SlackReactions";
import {
  integrationDirectoryItems,
  type IntegrationDirectoryItem,
} from "@/data/integrationDirectory";

/** Grid card is 5rem tall (p-4 + size-12); gap-4 between rows. */
const DIRECTORY_VISIBLE_ROWS = 5;
const DIRECTORY_EXPANDED_ROWS = 8;

function directoryGridMaxHeight(rows: number) {
  return `calc(${rows} * 5rem + ${rows - 1} * 1rem)`;
}

const mayaAvatar =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=2&w=96&h=96&q=80";

const directoryTabs = [
  "All",
  "AI & Machine Learning",
  "Analytics",
  "Cloud & Data",
  "Communication",
  "Content & Media",
  "Customer Support",
  "Developer Tools",
  "E-Commerce",
  "Finance & Payments",
  "HR & Recruiting",
  "Marketing",
  "Other",
  "Productivity",
  "Sales & CRM",
];

type DirectoryCategory = (typeof directoryTabs)[number];

type DirectoryItem = IntegrationDirectoryItem;

function ComparisonTabActiveBackground({ className }: { className?: string }) {
  return <img aria-hidden alt="" src={comparisonTabActiveBg} className={className} />;
}

function IntegrationDirectoryFilters({
  activeTab,
  onTabChange,
}: {
  activeTab: DirectoryCategory;
  onTabChange: (tab: DirectoryCategory) => void;
}) {
  return (
    <div
      className="-mx-4 flex flex-wrap gap-2 px-4 pb-1 max-md:flex-nowrap max-md:overflow-x-auto max-md:overscroll-x-contain sm:-mx-6 sm:px-6 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0"
      aria-label="Integration categories"
    >
      {directoryTabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            type="button"
            aria-pressed={isActive}
            onClick={() => onTabChange(tab)}
            className={`relative inline-flex h-10 min-w-16 shrink-0 items-center justify-center rounded-full px-5 body-main transition-[border-color,color] duration-300 ${
              isActive
                ? "text-white"
                : "border border-[rgb(27_24_42/0.08)] bg-white text-primary hover:bg-primitive-main-dark/[0.04]"
            }`}
          >
            {isActive && (
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                <ComparisonTabActiveBackground className="block h-full w-full object-fill" />
              </span>
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        );
      })}
    </div>
  );
}

function IntegrationDetailModal({ item, onClose }: { item: DirectoryItem; onClose: () => void }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Close integration details"
        className="absolute inset-0 bg-primitive-main-beige/70 backdrop-blur-md"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="integration-modal-title"
        className="relative z-10 w-full max-w-[32rem]"
      >
        <ConicPriceCardShell contentClassName="rounded-section bg-white p-8">
          <div className="flex items-start gap-4">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-primitive-main-beige p-2">
              <IntegrationDirectoryIcon item={item} />
            </span>
            <div className="min-w-0 flex-1 pt-1">
              <h3 id="integration-modal-title" className="font-heading h4 text-balance text-primary">
                {item.name}
              </h3>
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-secondary transition-colors hover:bg-primitive-main-dark/[0.06] hover:text-primary"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>
          <p className="mt-6 body-main text-secondary">{item.description}</p>
        </ConicPriceCardShell>
      </div>
    </div>,
    document.body,
  );
}

function useDirectoryGridColumns() {
  const [columns, setColumns] = useState(4);

  useEffect(() => {
    function updateColumns() {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setColumns(4);
      } else if (window.matchMedia("(min-width: 640px)").matches) {
        setColumns(2);
      } else {
        setColumns(1);
      }
    }

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  return columns;
}

function IntegrationDirectory() {
  const [activeTab, setActiveTab] = useState<DirectoryCategory>(directoryTabs[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<DirectoryItem | null>(null);
  const [showAll, setShowAll] = useState(false);
  const gridColumns = useDirectoryGridColumns();

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredItems = integrationDirectoryItems.filter((item) => {
    const matchesCategory = activeTab === "All" || item.category === activeTab;
    const matchesSearch = !normalizedQuery || item.name.toLowerCase().includes(normalizedQuery);
    return matchesCategory && matchesSearch;
  });

  const initialVisibleCount = gridColumns * DIRECTORY_VISIBLE_ROWS;
  const hasMoreItems = filteredItems.length > initialVisibleCount;
  const visibleItems = showAll ? filteredItems : filteredItems.slice(0, initialVisibleCount);

  useEffect(() => {
    setShowAll(false);
  }, [activeTab, searchQuery]);

  return (
    <>
      <div className="flex w-full flex-col gap-4">
        <label className="flex w-full items-center gap-8 rounded-2xl border border-[rgb(27_24_42/0.08)] bg-white px-8 py-6">
          <Search className="size-6 shrink-0 text-secondary opacity-40" aria-hidden />
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search 3,200+ integrations..."
            aria-label="Search integrations"
            className="integrations-directory-search min-w-0 flex-1 cursor-text bg-transparent body-main text-primary outline-none placeholder:text-secondary"
          />
        </label>

        <IntegrationDirectoryFilters activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <div
        className={`integrations-directory-grid-wrap relative ${
          showAll ? "integrations-directory-scroll overflow-y-auto overscroll-y-contain pr-1" : ""
        }`}
        style={showAll ? { maxHeight: directoryGridMaxHeight(DIRECTORY_EXPANDED_ROWS) } : undefined}
      >
        <div
          className="integrations-directory-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          aria-live="polite"
        >
          {visibleItems.length > 0 ? (
            visibleItems.map((item) => (
              <button
                key={item.name}
                type="button"
                className="w-full text-left cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <div className="integrations-directory-card flex items-center gap-4 overflow-hidden rounded-4xl bg-white p-4 transition-colors hover:bg-white/90">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primitive-main-beige p-2">
                    <IntegrationDirectoryIcon item={item} />
                  </span>
                  <p className="min-w-0 flex-1 truncate body-main font-medium text-primary">
                    {item.name}
                  </p>
                </div>
              </button>
            ))
          ) : (
            <p className="col-span-full py-8 text-center body-main text-secondary">
              No integrations match your search. Try another category or keyword.
            </p>
          )}
        </div>
      </div>

      {(hasMoreItems || showAll) && (
        <div className="flex flex-col items-center gap-6 text-center">
          {hasMoreItems && (
            <button
              type="button"
              onClick={() => setShowAll((current) => !current)}
              className="cursor-pointer inline-flex h-10 min-h-10 shrink-0 items-center justify-center rounded-full border border-[rgb(27_24_42/0.08)] bg-white px-6 text-sm font-medium tracking-[-0.01em] text-primary hover:bg-primitive-main-dark/[0.06]"
            >
              {showAll ? "Show less" : "Show more"}
            </button>
          )}
          <p className="w-full body-small text-secondary font-medium">
            Don&apos;t see your tool? Gomer connects to 3,200+ tools via managed connectors. If
            it&apos;s not here, Gomer can build a custom integration. Just ask.
          </p>
        </div>
      )}

      {selectedItem && (
        <IntegrationDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </>
  );
}

function IntegrationDirectoryIcon({ item }: { item: DirectoryItem }) {
  const [iconFailed, setIconFailed] = useState(false);
  const initials = (
    <span className="text-xs font-bold text-primitive-main-dark" aria-hidden>
      {item.name.slice(0, 2)}
    </span>
  );

  if (!item.iconSlug || iconFailed) {
    return initials;
  }

  const colorParam = item.iconColor ? `/${item.iconColor}` : "";

  return (
    <img
      alt=""
      loading="lazy"
      decoding="async"
      className="max-h-full max-w-full object-contain"
      src={`https://cdn.simpleicons.org/${item.iconSlug}${colorParam}`}
      onError={() => setIconFailed(true)}
    />
  );
}

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-primitive-main-beige">
      <PageMeta
        title="Integrations — Gomer"
        description="Gomer connects to 3,200+ tools and uses them the way you do. One AI employee for your entire tool stack."
        ogTitle="Integrations — Gomer"
        ogDescription="One AI employee. Your entire tool stack."
      />
      <IntegrationsHero />

      {/* HOW INTEGRATIONS WORK */}
      <section
        className="relative z-10 bg-primitive-main-beige pt-12 pb-14 sm:pt-[5rem] sm:pb-[7rem]"
        aria-label="How integrations work"
      >
        <div className="px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <IntegrationStepCard
                number="01"
                title="Connect your stack"
                body="27 native integrations. 3,200+ tools via managed connectors. Most are one-click OAuth, some use API keys - Gomer handles auth and starts working. No webhooks, no Zapier zaps."
                stepBadge="overlay"
                visual={
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-hero">
                    <img
                      alt=""
                      loading="lazy"
                      width={826}
                      height={680}
                      decoding="async"
                      className="h-full max-h-full w-auto max-w-full object-contain"
                      src={integrationsTab1}
                    />
                  </div>
                }
              />
              <IntegrationStepCard
                number="02"
                title="Tell Gomer what you need"
                body={'Message Gomer in Slack like you\'d message a teammate. "Pull this week\'s MRR from Stripe." "Triage new Linear bugs." "Pause Meta campaigns above $40 CPA." Plain English, any tool.'}
                stepBadge="inline"
                visual={
                  <div className="flex min-h-0 w-full flex-col items-end justify-end gap-2 px-3 pb-3 sm:px-4 sm:pb-4">
                    <SlackUserMessage
                      name="Maya Patel"
                      time="11:32 AM"
                      avatar={mayaAvatar}
                      reactions={[{ emoji: "⏳", count: 1 }]}
                      body={
                        <>
                          <SlackMention>@Gomer</SlackMention>
                          pull this week&apos;s MRR from Stripe and post it to private channel.
                        </>
                      }
                    />
                    <SlackGomerMessage
                      time="11:33 AM"
                      reactions={[
                        { emoji: "✅", count: 2 },
                        { emoji: "🚀", count: 1 },
                      ]}
                      body="On it. Pulling Stripe MRR, checking week-over-week movement, and preparing a private channel snapshot."
                    />
                  </div>
                }
              />
              <IntegrationStepCard
                number="03"
                title="Gomer operates, you review"
                body="Gomer opens the tools, runs the work, and posts back what changed. Sensitive actions wait for your approval. Everything is logged. You stop doing the work and start reviewing it."
                stepBadge="inline"
                visual={
                  <div className="flex min-h-0 w-full flex-col items-end justify-end gap-2 px-3 pb-3 sm:px-4 sm:pb-4">
                    <SlackGomerMessage
                      time="9:12 AM"
                      reactions={[{ emoji: "👀", count: 2 }]}
                      body={
                        <>
                          <span>📊 MRR this week:</span>
                          <br />
                          <strong className="font-bold">$84,210 (+6.4% WoW).</strong>
                          <br />
                          <span>
                            Posted snapshot to private channel.
                            <br />
                            2 anomalies flagged for review.
                          </span>
                        </>
                      }
                      attachment={
                        <div className="flex w-full items-center gap-1.5 py-1" role="group" aria-label="Approve or reject">
                          <button
                            type="button"
                            className="inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[6px] bg-[#007a5a] px-1.5 py-1 text-xs font-medium whitespace-nowrap text-white"
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            className="inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[6px] bg-[#e01e5a] px-1.5 py-1 text-xs font-medium whitespace-nowrap text-white"
                          >
                            Reject
                          </button>
                        </div>
                      }
                    />
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </section>

      <IntegrationsCapabilitiesSection />

      <IntegrationsUseCasesSection />

      {/* MULTIPLE ACCOUNTS */}
      <section className="bg-primitive-main-beige py-14 sm:py-[7rem]" aria-label="Multiple accounts">
        <div className="px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="mx-auto w-full max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-32">
              <div className="order-1 flex max-w-[32.625rem] flex-col gap-8 lg:order-2">
                <h2 className="font-heading h3 text-balance text-primary">
                  Multiple accounts? Connect them all.
                </h2>
                <p className="body-main max-w-[25.875rem] text-secondary font-medium">
                  Got two Stripe accounts? Three Gmail inboxes? A staging and production GitHub? Connect
                  them all. Gomer keeps them separate with dedicated tools per connection. No confusion,
                  no crossed wires.
                </p>
              </div>
              <div className="order-2 min-w-0 lg:order-1">
                <ConnectedAccountsPanel />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTEGRATION DIRECTORY */}
      <section className="bg-primitive-main-beige py-14 sm:py-[7rem]" id="integrations-directory">
        <div className="px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
            <h2 className="w-full text-center font-heading h3 text-balance text-primary">
              Integration Directory
            </h2>

            <IntegrationDirectory />
          </div>
        </div>
      </section>

      <IntegrationsControlSection />

      <StartFreeSection />

      <Footer />
    </div>
  );
}

function StepBadge({ number, className = "" }: { number: string; className?: string }) {
  return (
    <span
      className={`inline-flex h-8 items-center justify-center rounded-full bg-[#5c28d7]/16 px-5 backdrop-blur-[5px] font-sans text-sm leading-[1.3] font-medium tracking-[0.01em] text-[#5c28d7] ${className}`}
    >
      {number}
    </span>
  );
}

function ConicGradientCardShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[inherit]">
      <div aria-hidden="true" className="bg-conic-gradient-bg pointer-events-none absolute inset-0 z-0" style={{ borderRadius: "inherit" }} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[20px] z-0"
        style={{ borderRadius: "inherit", background: "#ffffff", filter: "blur(20px)", WebkitFilter: "blur(20px)" }}
      />
      <div className="relative z-[1] h-full w-full rounded-[inherit]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
          style={{ background: "radial-gradient(100% 100% at center, rgba(255,255,255,0) 0%, rgba(255,255,255,0.20) 100%)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
          style={{
            background: "linear-gradient(-56deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.6) 100%)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1px",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]"
          style={{ filter: "blur(5px)", WebkitFilter: "blur(5px)" }}
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              background: "linear-gradient(-56deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,1) 100%)",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              padding: "4px",
            }}
          />
        </div>
        {children}
      </div>
    </div>
  );
}

function IntegrationStepCard({
  number,
  title,
  body,
  visual,
  stepBadge,
}: {
  number: string;
  title: string;
  body: string;
  visual: ReactNode;
  stepBadge: "overlay" | "inline";
}) {
  return (
    <article className="relative min-h-[34.6875rem] min-w-0 overflow-hidden rounded-section">
      <div className="h-full min-h-[34.6875rem] w-full overflow-hidden rounded-[inherit] backdrop-blur-[20px]">
        <ConicGradientCardShell>
          <div className="relative z-[2] flex h-full w-full flex-col justify-between">
            <div className="relative flex h-full min-h-0 flex-col rounded-[inherit]">
              {stepBadge === "overlay" ? (
                <div className="relative flex min-h-[21.25rem] flex-1 flex-col overflow-hidden p-0">
                  <div className="relative flex min-h-[21.25rem] w-full flex-1 items-center justify-center overflow-hidden">
                    {visual}
                    <StepBadge number={number} className="absolute top-8 left-8 z-20" />
                  </div>
                </div>
              ) : (
                <div className="relative flex min-h-[21.25rem] flex-1 flex-col gap-8 p-0">
                  <div className="shrink-0 px-8 pt-8">
                    <StepBadge number={number} />
                  </div>
                  <div className="relative min-h-0 flex-1">{visual}</div>
                </div>
              )}
              <div className="flex min-h-[12.5rem] shrink-0 flex-col justify-start p-8">
                <div className="flex flex-col items-start gap-3">
                  <h3 className="font-heading h5 text-primary">{title}</h3>
                  <p className="body-main max-w-[21.875rem] text-secondary">{body}</p>
                </div>
              </div>
            </div>
          </div>
        </ConicGradientCardShell>
      </div>
    </article>
  );
}

function SlackMention({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-sm bg-slack-mention px-1 py-0.5 align-baseline whitespace-nowrap text-sm leading-snug text-slack-mention">
      {children}
    </span>
  );
}

function SlackUserMessage({
  name,
  time,
  avatar,
  body,
  reactions,
}: {
  name: string;
  time: string;
  avatar: string;
  body: ReactNode;
  reactions?: { emoji: string; count: number }[];
}) {
  return (
    <div className="relative isolate flex w-full gap-2 rounded-lg border border-solid border-transparent bg-transparent px-[var(--slack-message-pad-x)] py-0 text-left">
      <div className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-primitive-purple-100">
        <img alt={name} loading="lazy" width={36} height={36} className="size-full rounded-md object-cover" src={avatar} />
      </div>
      <div className="relative z-[1] flex min-w-0 flex-1 flex-col gap-0">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
          <span className="body-small font-medium text-slack">{name}</span>
          <span className="text-xs font-normal text-slack-secondary">{time}</span>
        </div>
        <div className="body-main font-normal text-slack">{body}</div>
        {reactions && reactions.length > 0 && <SlackReactions initial={reactions} />}
      </div>
    </div>
  );
}

function SlackGomerMessage({
  time,
  body,
  attachment,
  reactions,
}: {
  time: string;
  body: ReactNode;
  attachment?: ReactNode;
  reactions?: { emoji: string; count: number }[];
}) {
  return (
    <div
      data-variant="gomer"
      data-highlighted="true"
      className="relative isolate flex w-full gap-2 overflow-hidden px-[var(--slack-message-pad-x)] py-[var(--slack-message-pad-y)] text-left slack-message-gomer"
    >
      <div aria-hidden="true" className="slack-gomer-bg-mount">
        <div className="slack-gomer-layer-glass-stack" />
        <div className="slack-gomer-layer-inner-depth-soft" />
        <div className="slack-gomer-layer-inner-glow-overlay" />
        <div className="slack-gomer-layer-feather-blur" />
        <div className="slack-gomer-layer-white-sheet" />
      </div>
      <div className="relative z-[1] flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-transparent">
        <img alt="Gomer" loading="lazy" width={36} height={36} className="size-full object-cover" src={gomerAvatar} />
      </div>
      <div className="relative z-[1] flex min-w-0 flex-1 flex-col gap-0">
        <div className="mb-0.5 flex flex-wrap items-baseline gap-x-2 gap-y-0">
          <span className="body-small font-medium text-slack">
            <span className="inline-flex items-center gap-1.5">
              <span>Gomer</span>
              <span className="inline-flex items-center rounded-sm bg-slack-app-badge px-1 py-px text-[12px] leading-tight font-normal tracking-wide text-slack-app-badge uppercase">
                APP
              </span>
            </span>
          </span>
          <span className="text-xs font-normal text-slack-secondary">{time}</span>
        </div>
        <div className="body-main font-normal text-slack">{body}</div>
        {attachment}
        {reactions && reactions.length > 0 && <SlackReactions initial={reactions} />}
      </div>
    </div>
  );
}

const CONNECTED_ACCOUNTS = [
  { id: "stripe-production", service: "Stripe", account: "Production", icon: "stripe" as const, fullWidth: false },
  { id: "stripe-staging", service: "Stripe", account: "Staging", icon: "stripe" as const, fullWidth: false },
  { id: "gmail-founders", service: "Gmail", account: "founders@acme.co", icon: "gmail" as const, fullWidth: false },
  { id: "gmail-support", service: "Gmail", account: "support@acme.co", icon: "gmail" as const, fullWidth: false },
  { id: "gmail-hiring", service: "Gmail", account: "hiring@acme.co", icon: "gmail" as const, fullWidth: true },
  { id: "github-production", service: "GitHub", account: "Production", icon: "github" as const, fullWidth: false },
  { id: "github-staging", service: "GitHub", account: "Staging", icon: "github" as const, fullWidth: false },
];

function ConnectedAccountIcon({ icon }: { icon: "stripe" | "gmail" | "github" }) {
  if (icon === "stripe") {
    return (
      <svg viewBox="0 0 60 25" className="h-auto max-w-14 object-contain" aria-hidden>
        <path
          fill="#635BFF"
          d="M59.5 12.8c0-6.9-3.3-12-10.2-12-3.5 0-6.5 1.2-8.5 3.2L37.8 7.5c1.5-1.4 3.6-2.2 5.8-2.2 4.1 0 6.6 2.5 6.6 6.7v.8H43.2c-7.6 0-11.8 3.6-11.8 9.2 0 5.5 3.4 8.8 9.1 8.8 3.6 0 6.4-1.6 8.1-4.3v3.7h7.9V12.8zm-7.9 6.5c-.3 3.5-2.6 5.8-6.2 5.8-2.5 0-4.1-1.5-4.1-3.9 0-2.6 2-4.1 5.7-4.1h4.6v2.2zM28.1 1.5h-7.9v23h7.9V1.5zM14.5 1.5H6.6L0 12.8 6.6 24.5h7.9L8.2 12.8 14.5 1.5z"
        />
      </svg>
    );
  }

  if (icon === "gmail") {
    return (
      <svg viewBox="0 0 24 18" className="h-auto max-w-3/4 object-contain" aria-hidden>
        <path fill="#4285F4" d="M22 4.5v9H2V4.5l10 6.75L22 4.5z" />
        <path fill="#EA4335" d="M22 4.5 12 11.25 2 4.5 12 0l10 4.5z" />
        <path fill="#FBBC04" d="M2 4.5v9l6.5-4.5L2 4.5z" />
        <path fill="#34A853" d="M22 4.5v9l-6.5-4.5L22 4.5z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-auto max-w-3/4 object-contain" fill="#111" aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.06.78 2.14 0 1.54-.01 2.78-.01 3.16 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function ConnectedAccountGlassCard({
  service,
  account,
  icon,
  fullWidth = false,
}: {
  service: string;
  account: string;
  icon: "stripe" | "gmail" | "github";
  fullWidth?: boolean;
}) {
  return (
    <div className={fullWidth ? "h-[7.6875rem] w-full" : "h-[7.6875rem] w-[calc(50%-0.25rem)]"}>
      <div className="relative size-full rounded-2xl bg-white/20 p-[1.0625rem] backdrop-blur-sm">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
          style={{ background: "radial-gradient(100% 100%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 100%)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
          style={{
            background: "linear-gradient(-56deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 75%, rgba(255, 255, 255, 0.6) 100%)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1px",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]"
          style={{ filter: "blur(5px)" }}
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              background: "linear-gradient(-56deg, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 75%, rgb(255, 255, 255) 100%)",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              padding: "4px",
            }}
          />
        </div>
        <div className="relative z-[2] flex h-full w-full flex-col justify-between">
          <div className="flex items-start justify-between gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white">
              <ConnectedAccountIcon icon={icon} />
            </span>
            <span className="flex items-center gap-2">
              <span
                className="size-2 shrink-0 rounded-full bg-[#43d08b] shadow-[inset_1.8px_1.8px_3.6px_0_#f5f1ed]"
                aria-hidden="true"
              />
              <span className="text-xs leading-[1.3] font-medium text-white">Active</span>
            </span>
          </div>
          <p className="body-small text-white">
            <span className="font-medium">{service}</span>
            <span className="opacity-30"> — </span>
            <span className="opacity-60">{account}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function ConnectedAccountsPanel() {
  return (
    <div className="bg-hero relative mx-auto flex min-h-0 w-full max-w-[39.375rem] flex-col gap-8 overflow-hidden rounded-[2rem] p-6 text-white lg:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="body-small font-medium">Connected accounts</p>
        <p className="body-small opacity-70">Settings / Integrations</p>
      </div>
      <div className="flex flex-1 flex-wrap content-start gap-2">
        {CONNECTED_ACCOUNTS.map((account) => (
          <ConnectedAccountGlassCard key={account.id} {...account} />
        ))}
      </div>
    </div>
  );
}