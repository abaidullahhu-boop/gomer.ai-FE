import type { ReactNode } from "react";

/* ---------- Light Slack card (image 1) ---------- */
export function SlackLightCard() {
  return (
    <div className="relative w-full rounded-[28px] p-5 sm:p-7 bg-gradient-to-br from-[#c9b8ff] via-[#a78bfa] to-[#7c6cf0] shadow-[0_30px_60px_-20px_rgba(80,40,160,0.35)]">
      <div className="rounded-[18px] bg-white/95 backdrop-blur-sm p-5 sm:p-6 shadow-[0_10px_30px_-15px_rgba(40,20,80,0.25)]">
        <div className="flex flex-col gap-3.5">
          <SlackRow name="Anna" time="1:23 PM" avatarClass="from-fuchsia-400 to-violet-500">
            <Mention>@Viktor</Mention> we need a competitive analysis for Monday
          </SlackRow>
          <SlackRow name="Lisa" time="1:24 PM" avatarClass="from-pink-400 to-violet-500">
            <Mention>@Viktor</Mention> please make it a PDF
          </SlackRow>
          <SlackRow name="Viktor" time="2:43 PM" avatarClass="from-violet-400 to-fuchsia-500" app>
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

/* ---------- Purple Slack card with Viktor glass reply (image 2) ---------- */
export function SlackPurpleCard() {
  return (
    <div
      className="dark relative flex w-full overflow-hidden rounded-[32px] min-h-[22rem] flex-col items-center justify-center p-5 sm:p-10"
      style={{
        background:
          "radial-gradient(120% 80% at 50% 0%, #a78bfa 0%, #8b6cf0 40%, #6d4fd4 100%)",
      }}
    >
      <div className="flex w-full max-w-[27.5rem] flex-col gap-3">
        {/* Lisa message */}
        <div className="relative flex w-full text-left isolate gap-3 rounded-lg px-3 py-0">
          <div className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-gradient-to-br from-pink-300 to-fuchsia-500">
            <span className="sr-only">L</span>
          </div>
          <div className="relative z-[1] flex min-w-0 flex-1 flex-col gap-0.5">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <span className="font-semibold text-white text-sm">Lisa</span>
              <span className="text-[11px] text-white/60">9:02 AM</span>
            </div>
            <div className="text-[14px] text-white/90 leading-snug">
              <span className="px-1 rounded text-[#ffd9b8]">@Viktor</span> we need
              a competitive analysis — us vs Notion AI, Glean, and Moveworks.
              Pricing, features, positioning. Make it a PDF I can share with the
              board
            </div>
            <div className="mt-2 flex gap-1.5">
              <ReactionPill>🏆 1</ReactionPill>
              <ReactionPill>😊</ReactionPill>
            </div>
          </div>
        </div>

        {/* Viktor glass card */}
        <div className="relative isolate overflow-hidden rounded-[14px] px-3 py-2.5">
          {/* glass bg stack */}
          <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden">
            <div className="absolute inset-0" style={{ background: "rgba(255,255,255,0.9)" }} />
            <div
              className="absolute inset-0"
              style={{ boxShadow: "inset 0 0 40px rgba(255,255,255,0.6)" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 100% at 0% 0%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 60%)",
              }}
            />
          </div>

          <div className="relative z-[1] flex gap-3">
            <div className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-gradient-to-br from-violet-400 to-fuchsia-500">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-semibold text-[#1d1c1d] text-sm">Viktor</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-violet-100 text-violet-700 font-semibold">
                  APP
                </span>
                <span className="text-[11px] text-[#1d1c1d]/60">9:04 AM</span>
              </div>
              <div className="text-[14px] text-[#1d1c1d] leading-snug">
                ✅ Done.
                <div className="mt-1">
                  12-page PDF with feature matrix, pricing comparison, and
                  positioning map. Here's the executive summary:
                </div>
                <div className="mt-2">
                  <FileChip name="competetive-analysis-q1.pdf" tint />
                </div>
              </div>
              <div className="mt-2 flex gap-1.5">
                <ReactionPill light>❤️ 4</ReactionPill>
                <ReactionPill light>🔥 3</ReactionPill>
                <ReactionPill light>＋</ReactionPill>
              </div>
            </div>
          </div>
        </div>
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

function ReactionPill({
  children,
  light,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] border ${
        light
          ? "bg-white/90 border-stone-200 text-stone-700"
          : "bg-white/15 border-white/30 text-white"
      }`}
    >
      {children}
    </span>
  );
}
