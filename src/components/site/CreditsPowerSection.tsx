import type { ReactNode } from "react";

type Variant = "organization" | "code";

const variants: Record<Variant, { icon: ReactNode; label: string; cards: CardData[] }> = {
  organization: {
    label: "Organization",
    icon: (
      <span className="inline-block size-7 rounded-full bg-[radial-gradient(circle_at_30%_30%,#5a6470,#0f1722_70%)]" />
    ),
    cards: [
      {
        tag: "Quick Tasks",
        credits: "100–300 credits",
        subtitle: "Quick summary + DM follow-up",
        user: { name: "Sarah", time: "1:15 AM", initial: "S" },
        userMsg: (
          <>
            <span className="text-violet-600">@Gomer</span> summarize yesterday's #sales thread and flag anything I need to follow up on
          </>
        ),
        gomerTime: "1:16 AM",
        gomerMsg:
          "3 deals discussed. Two on track — Acme closes Friday. Bloom signed. One needs you: DataSync went silent after the demo. I drafted a follow-up in HubSpot, want me to send it?",
      },
      {
        tag: "Complex Workflows",
        credits: "500–1,500 credits",
        subtitle: "Multi-step research + analysis",
        user: { name: "Mike", time: "11:30 AM", initial: "M" },
        userMsg: (
          <>
            <span className="text-violet-600">@Gomer</span> the pricing page still says $50/mo. Can the slider fix it, should be $79/mo. Can you update it?
          </>
        ),
        gomerTime: "11:46 AM",
        gomerMsg: "Done ✅ Updated the pricing page — $79/mo for new. Preview is ready for your review.",
      },
    ],
  },
  code: {
    label: "Code",
    icon: (
      <span className="inline-block size-7 rounded-md bg-[linear-gradient(135deg,#2a2a2a,#0a0a0a)] shadow-inner" />
    ),
    cards: [
      {
        tag: "Quick Tasks",
        credits: "100-300 credits",
        subtitle: "Slack summary + CRM follow-up",
        user: { name: "Sarah", time: "9:14 AM", initial: "S" },
        userMsg: (
          <>
            <span className="text-violet-600">@Gomer</span> summarize yesterday's #sales thread and flag anything I need to follow up on
          </>
        ),
        gomerTime: "9:15 AM",
        gomerMsg:
          "3 deals discussed. Two on track — Acme closes Friday, Bloom signed. One needs you: DataSync went silent after the demo. I drafted a follow-up in HubSpot, want me to send it?",
      },
      {
        tag: "Complex Workflows",
        credits: "500-1,500 credits",
        subtitle: "Website change → ready to review",
        user: { name: "Mike", time: "11:32 AM", initial: "M" },
        userMsg: (
          <>
            <span className="text-violet-600">@Gomer</span> the pricing page still says "$99/mo" on the starter tier. It should be "$79/mo". Can you update it?
          </>
        ),
        gomerTime: "11:38 AM",
        gomerMsg: (
          <>
            Done ✅ Updated the pricing page — Starter tier now shows $79/mo. Preview is ready for your review:{" "}
            <a className="text-violet-600 underline">acme.com/pricing-preview</a>
          </>
        ),
      },
    ],
  },
};

type CardData = {
  tag: string;
  credits: string;
  subtitle: string;
  user: { name: string; time: string; initial: string };
  userMsg: ReactNode;
  gomerTime: string;
  gomerMsg: ReactNode;
};

export function CreditsPowerSection({ variant = "organization" }: { variant?: Variant }) {
  const v = variants[variant];
  return (
    <section className="px-6 py-24" style={{ background: "#fbf6ef" }}>
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-center text-5xl md:text-6xl text-foreground leading-[1.05]">
          Credits power everything
          <br />
          Gomer does: <span className="inline-flex items-baseline gap-3 align-middle">{v.icon}{v.label}</span>
        </h2>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {v.cards.map((c, i) => (
            <CreditCard key={i} data={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CreditCard({ data }: { data: CardData }) {
  return (
    // 1
    <div className="relative w-full rounded-[inherit] min-h-112 h-full overflow-hidden rounded-section text-primary">
      {/* 2 - conic gradient */}
      <div className="bg-conic-gradient-bg pointer-events-none absolute inset-0 z-0" />
      {/* 3 - inner blurred white */}
      <div
        className="pointer-events-none absolute inset-[20px] z-0"
        style={{ borderRadius: "inherit", background: "rgb(255,255,255)", filter: "blur(20px)" }}
      />
      {/* 4 */}
      <div className="rounded-[inherit] relative z-[1] h-full w-full">
        {/* 5 - radial overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
          style={{ background: "radial-gradient(100% 100%, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 100%)" }}
        />
        {/* 6 - thin border highlight */}
        <div
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
          style={{
            background:
              "linear-gradient(-56deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.6) 100%)",
            mask: "linear-gradient(#fff,#fff) content-box exclude, linear-gradient(#fff,#fff)",
            WebkitMask: "linear-gradient(#fff,#fff) content-box exclude, linear-gradient(#fff,#fff)",
            padding: "1px",
          }}
        />
        {/* 7 */}
        <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]" style={{ filter: "blur(5px)" }} />
        {/* 8 - thick border highlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            background:
              "linear-gradient(-56deg, rgb(255,255,255) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgb(255,255,255) 100%)",
            mask: "linear-gradient(#fff,#fff) content-box exclude, linear-gradient(#fff,#fff)",
            WebkitMask: "linear-gradient(#fff,#fff) content-box exclude, linear-gradient(#fff,#fff)",
            padding: "4px",
          }}
        />

        {/* 9 - content */}
        <div className="relative z-[2] flex h-full w-full flex-col justify-between">
          {/* 10 - header */}
          <div className="relative z-10 px-6 pt-6 sm:px-8 sm:pt-8">
            {/* 11 */}
            <div className="flex max-w-md flex-col gap-2">
              <p className="text-violet-600 text-sm font-semibold">{data.tag}</p>
              <h3 className="font-display text-3xl text-foreground tracking-tight">{data.credits}</h3>
              <p className="text-muted-foreground text-sm">{data.subtitle}</p>
            </div>
          </div>

          {/* 12 - messages container */}
          <div className="relative z-10 flex w-full min-w-0 items-end overflow-hidden min-h-76 flex-1 justify-center">
            {/* 13 */}
            <div className="w-full min-w-0">
              {/* 14 */}
              <div className="flex w-full min-w-0 flex-col justify-end gap-2 p-3 sm:p-4">
                {/* user message - 15 */}
                <SlackMessage
                  name={data.user.name}
                  time={data.user.time}
                  initial={data.user.initial}
                  body={data.userMsg}
                />
                {/* gomer message wrapper - 22 with gradient bg */}
                <GomerMessage time={data.gomerTime} body={data.gomerMsg} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SlackMessage({
  name,
  time,
  initial,
  body,
}: {
  name: string;
  time: string;
  initial: string;
  body: ReactNode;
}) {
  return (
    <div className="relative flex w-full text-left isolate gap-2 rounded-lg px-[var(--slack-message-pad-x)] py-1 border border-solid border-transparent bg-transparent">
      <div className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500">
        <span className="sr-only">{initial}</span>
      </div>
      <div className="relative z-[1] flex min-w-0 flex-1 flex-col gap-0">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
          <span className="font-semibold text-foreground text-sm">{name}</span>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
        <div className="text-[14px] text-foreground !font-normal leading-snug">{body}</div>
      </div>
    </div>
  );
}

function GomerMessage({ time, body }: { time: string; body: ReactNode }) {
  return (
    <div className="mt-1.5 flex flex-wrap items-stretch gap-1">
      <div className="relative flex self-stretch w-full">
        {/* 22 */}
        <div className="relative flex w-full text-left isolate overflow-hidden slack-message-gomer gap-2 px-[var(--slack-message-pad-x)] py-[var(--slack-message-pad-y)]">
          {/* 23 - bg mount */}
          <div
            style={{
              isolation: "isolate",
              pointerEvents: "none",
              borderRadius: "inherit",
              zIndex: 0,
              position: "absolute",
              inset: 0,
              overflow: "hidden",
            }}
          >
            {/* 24 */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "var(--conic-gradient-bg), linear-gradient(0deg, #fff3 0%, #fff3 100%), #3333",
              }}
            />
            {/* 25 */}
            <div
              style={{
                borderRadius: "inherit",
                mixBlendMode: "plus-darker" as any,
                pointerEvents: "none",
                position: "absolute",
                inset: 0,
                boxShadow: "inset 0 0 43.23px #f2f2f2",
              }}
            />
            {/* 26 */}
            <div
              style={{
                borderRadius: "inherit",
                mixBlendMode: "overlay",
                pointerEvents: "none",
                position: "absolute",
                inset: 0,
                boxShadow: "inset 0 0 8.11px #ffffff80",
              }}
            />
            {/* 27 */}
            <div style={{ background: "#ffffff14", position: "absolute", inset: 0 }} />
          </div>
          {/* 28 - radial highlight */}
          <div
            style={{
              zIndex: 10,
              borderRadius: "inherit",
              background: "radial-gradient(100% 150%, #fff 12%, #fff0 100%)",
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
            }}
          />

          {/* avatar */}
          <div className="relative z-[20] flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500">
            <span className="sr-only">V</span>
          </div>
          {/* body */}
          <div className="relative z-[20] flex min-w-0 flex-1 flex-col gap-0">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
              <span className="font-semibold text-foreground text-sm">Gomer</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-violet-100 text-violet-700 font-semibold">
                APP
              </span>
              <span className="text-xs text-muted-foreground">{time}</span>
            </div>
            <div className="text-[14px] text-foreground !font-normal leading-snug">{body}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
