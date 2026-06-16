import { type ReactNode } from "react";
import gomerAvatar from "@/assets/images/gomer-marketplace-avatar.svg";
import { SlackReactions, type SlackReaction } from "@/components/site/SlackReactions";

const lisaAvatar =
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=96&h=96&q=80";

const tomAvatar =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=96&h=96&q=80";

function CompareSlackGradientShell({ children }: { children: ReactNode }) {
  return (
    <div className="dark relative flex w-full overflow-hidden rounded-[32px] gradient-dark-1 min-h-[22rem] flex-col items-center justify-center p-4 lg:min-h-[616px] lg:p-16">
      <div className="flex w-full max-w-[27.5rem] flex-col gap-2">{children}</div>
    </div>
  );
}

/* ---------- Light Slack card (image 1) ---------- */
export function SlackLightCard() {
  return (
    <div className="relative w-full rounded-[28px] p-5 sm:p-7 bg-gradient-to-br from-[#c9b8ff] via-[#a78bfa] to-[#7c6cf0] shadow-[0_30px_60px_-20px_rgba(80,40,160,0.35)]">
      <div className="rounded-[18px] bg-white/95 backdrop-blur-sm p-5 sm:p-6 shadow-[0_10px_30px_-15px_rgba(40,20,80,0.25)]">
        <div className="flex flex-col gap-3.5">
          <SlackRow name="Anna" time="1:23 PM" avatarClass="from-fuchsia-400 to-violet-500">
            <Mention>@Gomer</Mention> we need a competitive analysis for Monday
          </SlackRow>
          <SlackRow name="Lisa" time="1:24 PM" avatarClass="from-pink-400 to-violet-500">
            <Mention>@Gomer</Mention> please make it a PDF
          </SlackRow>
          <SlackRow name="Gomer" time="2:43 PM" avatarClass="from-violet-400 to-fuchsia-500" app>
            <>
              Done — pulled latest from Stripe, HubSpot and three review sites.
              <div className="mt-2.5">
                <FileChip name="competitive-analysis.pdf" />
              </div>
            </>
          </SlackRow>
        </div>
      </div>
    </div>
  );
}

/* ---------- Purple Slack card with Gomer glass reply (compare page) ---------- */
export function SlackPurpleCard() {
  return (
    <CompareSlackGradientShell>
      <CompareSlackUserMessage
        name="Lisa"
        time="9:02 AM"
        avatar={lisaAvatar}
        reactions={[{ emoji: "⏳", count: 1 }]}
        body={
          <>
            <SlackMention>@Gomer</SlackMention> we need a competitive analysis — us vs Notion AI, Glean, and
            Moveworks. Pricing, features, positioning. Make it a PDF I can share with the board
          </>
        }
      />
      <CompareSlackGomerMessage
        time="9:04 AM"
        reactions={[
          { emoji: "❤️", count: 4 },
          { emoji: "🔥", count: 3 },
        ]}
        attachment={<SlackFileAttachment name="competetive-analysis-q1.pdf" />}
        body={
          <>
            <p>✅ Done.</p>
            <p>
              12-page PDF with feature matrix, pricing comparison, and positioning map. Here&apos;s the executive
              summary:
            </p>
          </>
        }
      />
    </CompareSlackGradientShell>
  );
}

/* ---------- Teammate in Slack card (compare page, flipped layout) ---------- */
export function SlackTeammateCard() {
  return (
    <CompareSlackGradientShell>
      <CompareSlackUserMessage
        name="Tom"
        time="9:02 AM"
        avatar={tomAvatar}
        reactions={[{ emoji: "⏳", count: 1 }]}
        body={
          <>
            <SlackMention>@Gomer</SlackMention> audit our Meta Ads and Google Ads spend. Compare vs last month.
          </>
        }
      />
      <CompareSlackGomerMessage
        time="9:02 AM"
        reactions={[
          { emoji: "🎯", count: 4 },
          { emoji: "❤️", count: 2 },
        ]}
        body={
          <span className="whitespace-pre-line">{`✅ Done.
Pulled data from both platforms. Key findings:
Meta Ads: CPA down 12% MoM, ROAS up to 3.4x
Google Ads: Brand campaigns strong, pMax underperforming`}</span>
        }
      />
    </CompareSlackGradientShell>
  );
}

function SlackMention({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-sm px-1 py-0.5 align-baseline whitespace-nowrap bg-slack-mention text-slack-mention text-sm leading-snug">
      {children}
    </span>
  );
}

function CompareSlackUserMessage({
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
    <div className="relative flex w-full text-left isolate gap-2 rounded-lg px-[var(--slack-message-pad-x)] py-0 border border-solid border-transparent bg-transparent">
      <div className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-primitive-purple-100">
        <img alt={name} loading="lazy" width={36} height={36} className="size-full rounded-md object-cover" src={avatar} />
      </div>
      <div className="relative z-[1] flex min-w-0 flex-1 flex-col gap-0">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
          <span className="body-small text-slack font-medium">{name}</span>
          <span className="text-xs text-slack-secondary font-normal">{time}</span>
        </div>
        <div className="body-main text-slack font-normal">{body}</div>
        {reactions && reactions.length > 0 && <SlackReactions initial={reactions} />}
      </div>
    </div>
  );
}

function CompareSlackGomerMessage({
  time,
  body,
  attachment,
  reactions,
}: {
  time: string;
  body: ReactNode;
  attachment?: ReactNode;
  reactions?: SlackReaction[];
}) {
  return (
    <div
      data-variant="gomer"
      data-highlighted="true"
      className="relative flex w-full text-left isolate overflow-hidden slack-message-gomer gap-2 px-[var(--slack-message-pad-x)] py-[var(--slack-message-pad-y)]"
    >
      <div aria-hidden="true" className="slack-gomer-bg-mount">
        <div className="slack-gomer-layer-glass-stack" />
        <div className="slack-gomer-layer-inner-depth-soft" />
        <div className="slack-gomer-layer-inner-glow-overlay" />
        <div className="slack-gomer-layer-feather-blur" />
        <div className="slack-gomer-layer-white-sheet" />
      </div>
      <div className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md z-[1] bg-transparent">
        <img alt="Gomer" loading="lazy" width={36} height={36} className="size-full object-cover" src={gomerAvatar} />
      </div>
      <div className="relative z-[1] flex min-w-0 flex-1 flex-col gap-0">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0 mb-0.5">
          <span className="body-small text-slack font-medium">
            <span className="inline-flex items-center gap-1.5">
              <span>Gomer</span>
              <span className="inline-flex items-center rounded-sm bg-slack-app-badge px-1 py-px text-[12px] leading-tight font-normal tracking-wide text-slack-app-badge uppercase">
                APP
              </span>
            </span>
          </span>
          <span className="text-xs text-slack-secondary font-normal">{time}</span>
        </div>
        <div className="body-main text-slack font-normal">{body}</div>
        {attachment}
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

/* ---------- helpers ---------- */
function SlackRow({
  name,
  time,
  avatarClass,
  app,
  children,
}: {
  name: string;
  time: string;
  avatarClass: string;
  app?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <div
        className={`relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-gradient-to-br ${avatarClass}`}
      >
        <span className="sr-only">{name[0]}</span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className="font-semibold text-[#1d1c1d] text-sm">{name}</span>
          {app && (
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-violet-100 text-violet-700 font-semibold">
              APP
            </span>
          )}
          <span className="text-[11px] text-[#1d1c1d]/60">{time}</span>
        </div>
        <div className="text-[14px] text-[#1d1c1d] leading-snug">{children}</div>
      </div>
    </div>
  );
}

function Mention({ children }: { children: ReactNode }) {
  return (
    <span className="px-1 rounded bg-violet-100 text-violet-700 font-medium">
      {children}
    </span>
  );
}

function FileChip({ name, tint }: { name: string; tint?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-[12px] font-medium ${
        tint ? "bg-violet-100 text-violet-700" : "bg-stone-100 text-stone-700"
      }`}
    >
      <span>📎</span>
      {name}
    </span>
  );
}
