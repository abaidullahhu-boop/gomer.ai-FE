import { type ReactNode } from "react";
import gomerAvatar from "@/assets/images/viktor-marketplace-avatar.svg";
import { SlackReactions, type SlackReaction } from "@/components/site/SlackReactions";

const sarahAvatar =
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=facearea&facepad=2&w=96&h=96&q=80";

function EyebrowBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-5 w-fit shrink-0 items-center justify-center rimitive-purple-200 text-xs font-medium text-primitive-purple-700">
      {children}
    </span>
  );
}

function ToolIconTile({ children, alt }: { children: ReactNode; alt: string }) {
  return (
    <span
      aria-label={alt}
      className="integrations-icon-tile integrations-icon-tile--compact relative -mr-1.5 flex shrink-0 items-center justify-center overflow-hidden p-1.5 last:mr-0"
    >
      {children}
    </span>
  );
}

function LiveTaskIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-5 shrink-0" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.53024 0.950303C9.5972 1.53824 9.17486 2.06913 8.58693 2.13607C7.57469 2.25134 6.6932 2.49296 5.93799 2.8417C5.40076 3.08977 4.76414 2.85537 4.51607 2.31816C4.268 1.78093 4.5024 1.14433 5.03961 0.89625C6.02989 0.438973 7.13751 0.144419 8.34447 0.00697795C8.93241 -0.059972 9.4633 0.362369 9.53024 0.950303ZM11.0199 0.975063C11.1143 0.390914 11.6644 -0.00607411 12.2486 0.0883647C14.6734 0.480386 16.6467 1.54777 18.0016 3.284C19.3477 5.00906 20.0003 7.28703 20.0003 9.95814C20.0003 13.0246 19.1387 15.572 17.3667 17.3521C15.594 19.1331 13.0559 20.0001 10.0001 20.0001C6.5172 20.0001 3.71311 18.871 1.95427 16.5749C1.59443 16.1051 1.68353 15.4326 2.15329 15.0727C2.62303 14.7129 3.29554 14.802 3.65539 15.2717C4.89854 16.8947 6.97909 17.8573 10.0001 17.8573C12.6587 17.8573 14.5849 17.1094 15.848 15.8404C17.1119 14.5707 17.8574 12.6329 17.8574 9.95814C17.8574 7.62583 17.2891 5.85423 16.3123 4.60233C15.344 3.36161 13.8916 2.52469 11.9066 2.20376C11.3224 2.10931 10.9254 1.55921 11.0199 0.975063ZM1.07143 8.88676C1.66316 8.88676 2.14286 9.36646 2.14286 9.95819C2.14286 10.9404 2.24397 11.8251 2.43413 12.6128C2.57297 13.188 2.21924 13.7669 1.64403 13.9057C1.06882 14.0446 0.489951 13.6909 0.351099 13.1156C0.115964 12.1416 0 11.0859 0 9.95819C0 9.36646 0.479694 8.88676 1.07143 8.88676ZM3.49116 4.8749C3.85349 4.40706 3.76794 3.73409 3.30011 3.37176C2.83229 3.00943 2.1593 3.09497 1.79697 3.5628C1.20083 4.33254 0.770299 5.23411 0.500896 6.24213C0.34811 6.8138 0.687681 7.40109 1.25935 7.55387C1.83101 7.70666 2.4183 7.36709 2.57109 6.79541C2.7752 6.03171 3.08827 5.3951 3.49116 4.8749ZM6.30319 7.44984C6.46249 6.22547 7.68013 5.4284 8.87133 5.80981C10.7343 6.40633 12.5443 7.33724 13.8399 8.77577C14.4683 9.47344 14.4684 10.5267 13.84 11.2245C12.5444 12.6631 10.7344 13.5939 8.8714 14.1904C7.68026 14.5719 6.46266 13.7748 6.30329 12.5505C6.0788 10.8259 6.07879 9.17447 6.30319 7.44984Z"
        fill="#4D382E"
        fillOpacity="0.5"
        style={{ mixBlendMode: "luminosity" }}
      />
    </svg>
  );
}

function AutoSummaryIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-5 shrink-0" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.4237 0.324941C13.5339 0.199754 13.7613 0 14.1071 0C14.453 0 14.6804 0.199754 14.7907 0.324941C14.9029 0.452421 14.9819 0.599936 15.0369 0.714813C15.1254 0.899626 15.215 1.14079 15.2994 1.36833C15.3193 1.42183 15.339 1.47484 15.3583 1.52591C15.585 2.12824 15.8371 2.70753 16.2139 3.08426C16.5844 3.45489 17.1507 3.68689 17.7553 3.90364L17.8694 3.9443C18.1101 4.02987 18.3756 4.12416 18.5801 4.22491C18.7006 4.28427 18.8547 4.37117 18.9864 4.49891C19.1266 4.63466 19.2857 4.8628 19.2857 5.17857C19.2857 5.49434 19.1266 5.72249 18.9864 5.85823C18.8547 5.98597 18.7006 6.07287 18.5801 6.13223C18.3756 6.23299 18.1101 6.32727 17.8694 6.41284L17.7553 6.4535C17.1507 6.67026 16.5844 6.90226 16.2139 7.27289C15.8371 7.64961 15.585 8.2289 15.3583 8.83123C15.339 8.88227 15.3194 8.93499 15.2996 8.98844C15.2151 9.21597 15.1254 9.45753 15.0369 9.64233C14.9819 9.75721 14.9029 9.90473 14.7907 10.0322C14.6804 10.1574 14.453 10.3571 14.1071 10.3571C13.7613 10.3571 13.5339 10.1574 13.4237 10.0322C13.3115 9.90473 13.2324 9.75721 13.1774 9.64233C13.089 9.45751 12.9994 9.21634 12.9149 8.98881C12.895 8.93526 12.8753 8.88236 12.8561 8.83123C12.6293 8.2289 12.3772 7.64961 12.0005 7.27289C11.6299 6.90226 11.0636 6.67026 10.459 6.4535L10.3449 6.41284C10.1042 6.32727 9.83881 6.23299 9.63426 6.13223C9.51377 6.07287 9.35961 5.98597 9.22784 5.85823C9.08781 5.72249 8.92866 5.49434 8.92866 5.17857C8.92866 4.8628 9.08781 4.63466 9.22784 4.49891C9.35961 4.37117 9.51377 4.28427 9.63426 4.22491C9.83881 4.12416 10.1041 4.02987 10.3449 3.9443L10.459 3.90364C11.0636 3.68689 11.6299 3.45489 12.0005 3.08426C12.3772 2.70753 12.6293 2.12824 12.8561 1.52591C12.8753 1.47476 12.895 1.42191 12.9149 1.36833C12.9994 1.1408 13.089 0.899627 13.1774 0.714813C13.2324 0.599936 13.3115 0.452421 13.4237 0.324941ZM7.2433 4.29339C7.2433 3.70166 6.7636 3.22196 6.17187 3.22196H1.07143C0.479694 3.22196 0 3.70166 0 4.29339C0 4.88511 0.479694 5.36481 1.07143 5.36481H6.17187C6.7636 5.36481 7.2433 4.88511 7.2433 4.29339ZM7.2433 8.9338C7.2433 8.34207 6.7636 7.86237 6.17187 7.86237H1.07143C0.479694 7.86237 0 8.34207 0 8.9338C0 9.52554 0.479694 10.0052 1.07143 10.0052H6.17187C6.7636 10.0052 7.2433 9.52554 7.2433 8.9338ZM18.2143 17.1429C18.806 17.1429 19.2857 17.6226 19.2857 18.2143C19.2857 18.806 18.806 19.2857 18.2143 19.2857H1.14139C0.549659 19.2857 0.0699629 18.806 0.0699629 18.2143C0.0699629 17.6226 0.549659 17.1429 1.14139 17.1429H18.2143ZM19.2857 13.5742C19.2857 12.9825 18.806 12.5028 18.2143 12.5028H1.14139C0.549659 12.5028 0.0699629 12.9825 0.0699629 13.5742C0.0699629 14.166 0.549659 14.6457 1.14139 14.6457H18.2143C18.806 14.6457 19.2857 14.166 19.2857 13.5742Z"
        fill="#4D382E"
        fillOpacity="0.5"
        style={{ mixBlendMode: "luminosity" }}
      />
    </svg>
  );
}

function CardStatusBadge({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="inline-flex h-12 shrink-0 items-center gap-4 rounded-full bg-[#ffbb98] px-6 body-main font-medium text-[#4d382e]">
      {icon}
      {label}
    </span>
  );
}

function SlackMention({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-sm bg-[#ffbd9e29] px-1 py-0.5 align-baseline whitespace-nowrap body-main text-[#ffbb98]">
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
  reactions?: SlackReaction[];
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
  actions,
  reactions,
}: {
  time: string;
  body: ReactNode;
  attachment?: ReactNode;
  actions?: ReactNode;
  reactions?: SlackReaction[];
}) {
  return (
    <div
      data-variant="gomer"
      data-highlighted="true"
      className="relative isolate flex w-full gap-2 overflow-hidden px-[var(--slack-message-pad-x)] py-3 text-left slack-message-gomer"
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
        {actions}
        {reactions && reactions.length > 0 && <SlackReactions initial={reactions} />}
      </div>
    </div>
  );
}

function SlackFileAttachment({ name }: { name: string }) {
  return (
    <div aria-label={`Attachment ${name}`} className="mt-2 flex w-full max-w-full min-w-0 items-center gap-1">
      <span
        aria-hidden="true"
        className="inline-flex shrink-0 items-center justify-center text-[13px] leading-[1.4] text-[var(--slack-add-reaction-icon)] opacity-80"
      >
        📎
      </span>
      <div className="slack-attached-pill">
        <span className="min-w-0 truncate text-[13px] leading-[1.4] tracking-[-0.26px] font-normal">{name}</span>
      </div>
    </div>
  );
}

function ShowcaseCardShell({
  channel,
  title,
  badge,
  children,
}: {
  channel: string;
  title: string;
  badge: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="dark flex min-h-[22rem] w-full flex-col justify-between overflow-hidden rounded-[32px] gradient-dark-1 p-4 lg:min-h-[616px] lg:p-16">
      <div className="flex items-start justify-between gap-4 pb-8">
        <div className="flex flex-col text-white">
          <p className="body-medium text-white">{channel}</p>
          <p className="body-main text-white">{title}</p>
        </div>
        {badge}
      </div>
      <div className="flex w-full flex-col gap-2">{children}</div>
    </div>
  );
}

function UseCaseCopy({
  eyebrow,
  title,
  description,
  tools,
  className = "",
}: {
  eyebrow: string;
  title: string;
  description: string;
  tools: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-5 lg:max-w-md ${className}`}>
      <div className="flex flex-col gap-4">
        <EyebrowBadge>{eyebrow}</EyebrowBadge>
        <h2 className="font-heading h4 text-balance text-primary">{title}</h2>
      </div>
      <div className="flex flex-col gap-3">
        <p className="body-main text-secondary font-medium">{description}</p>
      </div>
      <div className="flex items-center">{tools}</div>
    </div>
  );
}

const LOGO_CLASS = "h-auto max-h-4 w-auto max-w-full object-contain";

function StripeLogo() {
  return (
    <svg viewBox="0 0 24 24" className={LOGO_CLASS} aria-hidden>
      <path
        fill="#635BFF"
        d="M13.3 10.2c0-.8-.7-1.1-1.8-1.1-1.5 0-3.4.5-4.9 1.3V6.4c1.6-.6 3.2-.9 4.9-.9 4 0 6.6 2.1 6.6 5.6 0 5.4-7.4 4.5-7.4 7 0 .9.8 1.2 1.9 1.2 1.6 0 3.6-.6 5.2-1.5v3.2c-1.7.7-3.4 1-5.2 1-4.1 0-6.8-2.1-6.8-5.7 0-5.8 7.4-4.8 7.4-7.1z"
      />
    </svg>
  );
}

function GustoLogo() {
  return (
    <svg viewBox="0 0 24 24" className={`${LOGO_CLASS} brightness-0`} aria-hidden>
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H8v-2h3v2zm0-4H8V7h3v6zm5 4h-3v-2h3v2zm0-4h-3V7h3v6z"
      />
    </svg>
  );
}

function QuickBooksLogo() {
  return (
    <svg viewBox="0 0 24 24" className={LOGO_CLASS} aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#2CA01C" />
      <path fill="#fff" d="M8 8h3.5c1.93 0 3.5 1.57 3.5 3.5S13.43 15 11.5 15H10v3H8V8zm2 2v3h1.5c.83 0 1.5-.67 1.5-1.5S12.33 11 11.5 11H10z" />
    </svg>
  );
}

function LinearLogo() {
  return (
    <svg viewBox="0 0 24 24" className={LOGO_CLASS} aria-hidden>
      <path fill="#5E6AD2" d="M3 17.3 17.3 3l3.7 3.7L6.7 21 3 17.3zm0-6.6L10.7 3l3.7 3.7L6.7 14.4 3 10.7z" />
    </svg>
  );
}

function SentryLogo() {
  return (
    <svg viewBox="0 0 24 24" className={`${LOGO_CLASS} brightness-0`} aria-hidden>
      <path fill="currentColor" d="M13.5 2.5 3 19.5h4.5l1.5-2.5h6l1.5 2.5H21L13.5 2.5zm-1.5 11 2.5-4.5 2.5 4.5h-5z" />
    </svg>
  );
}

function GitHubLogo() {
  return (
    <svg viewBox="0 0 24 24" className={`${LOGO_CLASS} brightness-0`} aria-hidden>
      <path
        fill="currentColor"
        d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.06.78 2.14 0 1.54-.01 2.78-.01 3.16 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z"
      />
    </svg>
  );
}

export function UseCaseShowcaseSection() {
  return (
    <section className="bg-primitive-main-beige py-14 sm:py-[7rem]">
      <div className="px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 sm:gap-20 lg:gap-28">
          {/* Finance & Ops */}
          <div className="grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-32">
            <UseCaseCopy
              className="order-1"
              eyebrow="Finance & Ops"
              title="Cash flow forecast before your Monday meeting"
              description="Gomer pulls actuals from Stripe, invoices from QuickBooks, and payroll from Gusto. You get a board-ready summary in Slack."
              tools={
                <>
                  <ToolIconTile alt="Stripe">
                    <StripeLogo />
                  </ToolIconTile>
                  <ToolIconTile alt="Gusto">
                    <GustoLogo />
                  </ToolIconTile>
                  <ToolIconTile alt="QuickBooks">
                    <QuickBooksLogo />
                  </ToolIconTile>
                </>
              }
            />
            <div className="order-2 min-w-0">
              <ShowcaseCardShell
                channel="#finance-review"
                title="Cash position update"
                badge={<CardStatusBadge icon={<LiveTaskIcon />} label="Live Task" />}
              >
                <SlackUserMessage
                  name="Sarah"
                  time="7:48 AM"
                  avatar={sarahAvatar}
                  reactions={[{ emoji: "⏳", count: 1 }]}
                  body={
                    <>
                      <SlackMention>@Gomer</SlackMention>
                      pull last week&apos;s cash position. Net revenue, outstanding invoices, and payroll due this week. Format it for the leadership meeting.
                    </>
                  }
                />
                <SlackGomerMessage
                  time="7:49 AM"
                  reactions={[
                    { emoji: "❤️", count: 4 },
                    { emoji: "🔥", count: 3 },
                  ]}
                  body={
                    <>
                      <p>✅ Done. Here&apos;s your weekly cash position:</p>
                      <ul className="mt-2 list-disc space-y-1 pl-5">
                        <li>Net revenue (Apr 7–13): $128,400</li>
                        <li>Outstanding invoices: $47,200 (12 invoices, 3 overdue)</li>
                        <li>Payroll due Apr 15: $34,800</li>
                        <li>Net cash position: $91,400</li>
                      </ul>
                    </>
                  }
                  attachment={<SlackFileAttachment name="leadership meeting.pdf" />}
                />
              </ShowcaseCardShell>
            </div>
          </div>

          {/* Engineering */}
          <div className="grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-32">
            <UseCaseCopy
              className="order-1 lg:order-2"
              eyebrow="Engineering"
              title="Triage overnight alerts without context-switching"
              description="Gomer monitors Sentry and Linear, groups related issues, and posts a morning summary with suggested priorities."
              tools={
                <>
                  <ToolIconTile alt="Linear">
                    <LinearLogo />
                  </ToolIconTile>
                  <ToolIconTile alt="Sentry">
                    <SentryLogo />
                  </ToolIconTile>
                  <ToolIconTile alt="GitHub">
                    <GitHubLogo />
                  </ToolIconTile>
                </>
              }
            />
            <div className="order-2 min-w-0 lg:order-1">
              <ShowcaseCardShell
                channel="#eng-alerts"
                title="Morning triage"
                badge={<CardStatusBadge icon={<AutoSummaryIcon />} label="Auto Summary" />}
              >
                <SlackGomerMessage
                  time="8:12 AM"
                  reactions={[
                    { emoji: "❤️", count: 4 },
                    { emoji: "🔥", count: 3 },
                  ]}
                  body={
                    <>
                      <p>Morning triage for #eng-alerts:</p>
                      <p className="mt-1">3 new Sentry errors (2 related to the payments service deploy at 2:14 AM)</p>
                      <p className="mt-1">1 P1 Linear issue opened by on-call: ZET-892 (checkout timeout spike)</p>
                      <p className="mt-1">Suggested priority:</p>
                      <ol className="mt-1 list-decimal space-y-1 pl-5">
                        <li>ZET-892: checkout timeouts correlate with the 2:14 AM deploy. Rollback candidate.</li>
                        <li>Sentry errors are downstream of the same deploy.</li>
                      </ol>
                      <p className="mt-1">Want me to create a rollback PR?</p>
                    </>
                  }
                  actions={
                    <div
                      className="mt-3 flex w-full items-center gap-1.5 py-1"
                      role="group"
                      aria-label="Rollback actions"
                    >
                      <button
                        type="button"
                        className="inline-flex shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-[6px] bg-[#007a5a] px-1.5 py-1 text-xs font-medium whitespace-nowrap text-white transition-opacity hover:opacity-90"
                      >
                        Create rollback PR
                      </button>
                      <button
                        type="button"
                        className="inline-flex shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-[6px] bg-[#e01e5a] px-1.5 py-1 text-xs font-medium whitespace-nowrap text-white transition-opacity hover:opacity-90"
                      >
                        Open Linear issue
                      </button>
                    </div>
                  }
                />
              </ShowcaseCardShell>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
