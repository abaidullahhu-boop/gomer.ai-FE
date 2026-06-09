import { PageMeta } from "@/components/PageMeta";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { TestimonialsCarousel } from "@/components/site/TestimonialsCarousel";
import { Check, Slack, Github, AlertTriangle, Calendar } from "lucide-react";

const avatar = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`;

const testimonials = [
  { name: "Maya Chen", role: "CFO, Northwind", saved: "3-5 hrs/week", quote: "Viktor handles the weekly cash recap I used to dread. Now it's just there in Slack on Monday morning.", image: avatar("photo-1573496359142-b8d87734a5a2") },
  { name: "Jacob Aldridge", role: "Founder, Como Coaching", saved: "10+ hrs/week", quote: "Viktor may feel expensive for a monthly subscription, but he's the cheapest hire I've ever made — and the only one who acts on my midnight asks.", image: avatar("photo-1507003211169-0a1dd7228f2d") },
  { name: "Richard Comer", role: "VP Eng, Flagship", saved: "10+ hrs/week", quote: "Viktor takes the morning alerts off my plate. I haven't read a Datadog email in two months and I sleep through the night.", image: avatar("photo-1580489944761-15a19d654956") },
];

export default function UseCasesPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Use Cases — One AI coworker. Every function. | Viktor"
        description="See how Viktor takes over the work that eats your week — from forecasts and compliance to overnight alert triage."
        ogTitle="Use Cases — Viktor"
        ogDescription="One AI coworker for every function on your team."
      />
      {/* HERO */}
      <section className="relative pt-6 pb-20 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[620px] -z-10"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 0%, oklch(0.92 0.06 50 / 0.55), transparent 70%), radial-gradient(50% 50% at 80% 10%, oklch(0.85 0.12 320 / 0.45), transparent 70%), radial-gradient(50% 50% at 15% 10%, oklch(0.85 0.10 280 / 0.45), transparent 70%)",
          }}
        />
        <Nav />
        <div className="relative mx-auto max-w-3xl px-6 pt-16 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-violet-600 font-semibold">Use Cases</p>
          <h1 className="font-display mt-5 text-5xl md:text-7xl leading-[1.02] tracking-tight text-foreground">
            One AI coworker.<br />Every function.
          </h1>
          <p className="mt-6 mx-auto max-w-xl text-muted-foreground text-base leading-relaxed">
            Viktor takes over the work that eats your week. Pick the function you want him to own — finance, marketing, ops, engineering — and he ships from day one.
          </p>
          <div className="mt-8 flex justify-center">
            <button className="px-7 py-3.5 rounded-full bg-foreground text-background text-sm font-semibold shadow-lg hover:bg-foreground/90 transition">
              Get started for free
            </button>
          </div>
          <div className="mt-10 flex flex-wrap justify-center items-center gap-7 text-foreground/70 text-[13px]">
            <Pill icon="💰" text="$100 in free credits" />
            <Pill icon="🪪" text="No credit card required" />
            <Pill icon="🛡️" text="SOC 2 compliant" />
          </div>
        </div>
      </section>

      {/* START WITH THE FUNCTION */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-6xl rounded-[36px] relative overflow-hidden p-8 md:p-14 bg-gradient-to-br from-[oklch(0.78_0.12_310)] via-[oklch(0.58_0.18_285)] to-[oklch(0.42_0.20_278)]">
          <div
            aria-hidden
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] rounded-full blur-3xl opacity-70"
            style={{ background: "radial-gradient(closest-side, oklch(0.92 0.10 60 / 0.85), transparent)" }}
          />
          <div className="relative grid md:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-xs text-white/70 uppercase tracking-widest">Choose a function</p>
              <h2 className="font-display mt-3 text-4xl md:text-5xl text-white leading-[1.05]">
                Start with the<br />function that eats<br />the most time.
              </h2>
              <div className="mt-8 space-y-2.5 max-w-sm">
                <SoftRow active>Weekly Reporting <Tag>New</Tag></SoftRow>
                <SoftRow>Outbound + ICP</SoftRow>
                <SoftRow active>Agendas <Tag>Setup</Tag></SoftRow>
                <p className="px-2 pt-2 text-[12px] text-white/70 leading-relaxed">
                  Viktor auto-creates an agenda from your Slack channels every Monday morning.
                </p>
              </div>
              <button className="mt-8 px-7 py-3 rounded-full bg-white text-foreground text-sm font-semibold shadow-md hover:bg-white/95 transition">
                Start Function Now
              </button>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[40px] blur-2xl opacity-60" style={{ background: "radial-gradient(ellipse at center, oklch(0.92 0.05 330 / 0.7), transparent 70%)" }} />
              <div className="relative rounded-[24px] bg-white p-6 shadow-[0_30px_80px_-30px_oklch(0.3_0.15_290/0.6)]">
                <p className="text-[13px] font-semibold text-foreground">Auto-generated brief for tomorrow's sync</p>
                <div className="mt-5 space-y-4">
                  <ChatLine name="Anna Chen" time="9:14 AM" body="Need updated CAC numbers + the Q3 funnel before standup." />
                  <ChatLine
                    name="Viktor"
                    badge
                    time="9:15 AM"
                    body={
                      <div className="text-[12.5px] leading-relaxed text-foreground/90">
                        <p className="font-semibold">Here's your brief:</p>
                        <ul className="mt-1 space-y-0.5">
                          <li>• Revenue: <span className="text-violet-600 font-semibold">$428,210</span> (+12% WoW)</li>
                          <li>• CAC trending down 8% — paid social</li>
                          <li>• 3 deals stalled in negotiation</li>
                        </ul>
                        <p className="mt-2 text-[11px] text-muted-foreground">Full deck synced to Notion 7 min ago.</p>
                      </div>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl md:text-5xl text-center text-foreground">How it works</h2>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <StepCard
              title="Connect your stack"
              body="3,000+ integrations. Slack, Gmail, HubSpot, Stripe, GitHub, Notion, Linear and everything in between."
              visual={<LogoGrid />}
            />
            <StepCard
              title="Tell Viktor what you need"
              body="Message him in Slack like you would a coworker. No prompt engineering required."
              visual={
                <div className="space-y-2.5 w-full">
                  <ChatLine compact name="Maya Wright" time="10:21" body={<><span className="text-violet-600">@Viktor</span> can we look at churn this month?</>} />
                  <ChatLine compact name="Viktor" badge time="10:21" body="Pulling Stripe + product data. One sec." />
                </div>
              }
            />
            <StepCard
              title="Viktor operates, you review"
              body="Viktor executes, posts the result back in the channel, and learns what good looks like for your team."
              visual={
                <div className="space-y-2.5 w-full">
                  <ChatLine compact name="Viktor" badge time="10:24" body={
                    <div className="text-[12px]">
                      <p>Churn = <span className="text-violet-600 font-semibold">2.3%</span> (-0.4 MoM)</p>
                      <p className="text-muted-foreground mt-0.5">Top driver: pricing tier mismatch on 4 accounts.</p>
                    </div>
                  } />
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* TWO COL: FINANCE */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-6 items-center">
          <div className="px-2 md:px-6">
            <p className="text-xs uppercase tracking-widest text-violet-600 font-semibold">Finance</p>
            <h3 className="font-display mt-3 text-3xl md:text-4xl leading-tight">
              Cash flow forecast before<br />your Monday meeting.
            </h3>
            <p className="mt-4 text-muted-foreground max-w-md text-[15px] leading-relaxed">
              Viktor pulls from QuickBooks, Stripe, and your bank. Builds the model. Sends it to Slack before you've poured coffee.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <ToolChip>qb</ToolChip>
              <ToolChip>stripe</ToolChip>
              <ToolChip>+</ToolChip>
            </div>
          </div>
          <div className="rounded-[28px] relative overflow-hidden p-8 bg-gradient-to-br from-[oklch(0.72_0.14_290)] via-[oklch(0.55_0.18_283)] to-[oklch(0.4_0.20_278)]">
            <div className="flex items-center justify-between mb-5">
              <p className="text-white/80 text-[12px]">All your weekly Compliance agent</p>
              <span className="px-3 py-1 rounded-full bg-[oklch(0.85_0.13_60)] text-foreground text-[11px] font-semibold">Live now</span>
            </div>
            <div className="rounded-2xl bg-white p-5 space-y-3">
              <ChatLine compact name="Viktor" badge time="6:42 AM" body={
                <div className="text-[12px]">
                  <p className="font-semibold">Weekly cash position</p>
                  <ul className="mt-1 text-foreground/80 space-y-0.5">
                    <li>• Cash on hand: <span className="text-violet-600 font-semibold">$2.4M</span> ($14K WoW)</li>
                    <li>• Burn rate: <span className="text-violet-600 font-semibold">$182K/mo</span></li>
                    <li>• Runway: <span className="text-violet-600 font-semibold">13.2 months</span></li>
                    <li>• AR aged 60+: <span className="text-violet-600 font-semibold">$48K</span></li>
                  </ul>
                  <p className="mt-2 text-[10.5px] text-muted-foreground">Synced to #finance · 4 min ago</p>
                </div>
              } />
            </div>
          </div>
        </div>
      </section>

      {/* TWO COL: ENGINEERING */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-6 items-center">
          <div className="rounded-[28px] relative overflow-hidden p-8 bg-gradient-to-br from-[oklch(0.78_0.12_310)] via-[oklch(0.6_0.17_285)] to-[oklch(0.42_0.20_278)]">
            <div className="flex items-center justify-between mb-5">
              <p className="text-white/80 text-[12px]">Morning recap</p>
              <span className="px-3 py-1 rounded-full bg-[oklch(0.85_0.13_60)] text-foreground text-[11px] font-semibold">Make this happen</span>
            </div>
            <div className="rounded-2xl bg-white p-5 space-y-3">
              <ChatLine compact name="Viktor" badge time="7:02 AM" body={
                <div className="text-[12px] text-foreground/90 leading-relaxed">
                  <p className="font-semibold">3 incidents overnight</p>
                  <p className="mt-1">• <span className="text-rose-600 font-semibold">P1</span> · checkout-svc 502s · resolved 02:14 by autoscaler</p>
                  <p>• <span className="text-amber-600 font-semibold">P2</span> · webhook lag · root cause: queue depth</p>
                  <p>• <span className="text-emerald-600 font-semibold">P3</span> · stale cache on /pricing · already deployed</p>
                  <p className="mt-2 text-muted-foreground">No action needed from you. Linear tickets created.</p>
                </div>
              } />
              <div className="flex gap-2 pt-1">
                <button className="px-3 py-1.5 rounded-full bg-violet-600 text-white text-[11px] font-semibold">Approve all</button>
                <button className="px-3 py-1.5 rounded-full bg-secondary text-foreground text-[11px] font-semibold">Open thread</button>
              </div>
            </div>
          </div>
          <div className="px-2 md:px-6">
            <p className="text-xs uppercase tracking-widest text-violet-600 font-semibold">Engineering</p>
            <h3 className="font-display mt-3 text-3xl md:text-4xl leading-tight">
              Triage overnight alerts<br />without context-switching.
            </h3>
            <p className="mt-4 text-muted-foreground max-w-md text-[15px] leading-relaxed">
              Viktor reads Datadog, Sentry, and your deploys, correlates the noise, and posts a single human-readable recap.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <IconChip><AlertTriangle className="w-4 h-4" /></IconChip>
              <IconChip><Github className="w-4 h-4" /></IconChip>
              <IconChip><Slack className="w-4 h-4" /></IconChip>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialsCarousel items={testimonials} />

      {/* START FREE CTA */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl rounded-[36px] p-10 md:p-14 bg-gradient-to-br from-[oklch(0.62_0.17_285)] via-[oklch(0.5_0.2_280)] to-[oklch(0.38_0.2_278)] grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display text-4xl md:text-5xl text-white leading-tight">
              Start free.<br />Pay only when you're ready.
            </h2>
            <p className="mt-5 text-white/80 max-w-md text-[15px]">
              Every workspace starts with $100 in free credits. No credit card. Try Viktor on a real workflow this week.
            </p>
            <div className="mt-7 flex items-center gap-3">
              <button className="px-7 py-3 rounded-full bg-white text-foreground text-sm font-semibold shadow-md hover:bg-white/95 transition">Get started for free</button>
              <a className="text-white/85 text-sm underline underline-offset-4">See all plans</a>
            </div>
          </div>
          <ul className="space-y-3 text-white text-[14px]">
            {[
              "$100 in free credits",
              "Unlimited Seats",
              "Access 3,000+ integrations",
              "Custom AI Reviews",
              "SOC 2 compliant",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-white/15 border border-white/30 flex items-center justify-center"><Check className="w-3.5 h-3.5 text-white" /></span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Pill({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-6 h-6 rounded-full bg-foreground/5 flex items-center justify-center text-[11px]">{icon}</span>
      {text}
    </div>
  );
}

function SoftRow({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <div className={"flex items-center justify-between gap-3 px-5 py-3 rounded-full text-white text-sm font-medium " + (active ? "bg-white/15 border border-white/25 backdrop-blur-sm" : "border border-white/15")}>
      <span className="flex items-center gap-3">{children}</span>
      <span className={"w-4 h-4 rounded-full border " + (active ? "border-white bg-white/30" : "border-white/40")} />
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] uppercase tracking-wider">{children}</span>;
}

function ChatLine({ name, time, body, badge, compact }: { name: string; time: string; body: React.ReactNode; badge?: boolean; compact?: boolean }) {
  return (
    <div className="flex gap-2.5 items-start">
      <div className={(compact ? "w-7 h-7" : "w-8 h-8") + " rounded-full bg-gradient-to-br from-pink-300 to-violet-500 shrink-0"} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-[11px]">
          <span className="font-semibold text-foreground">{name}</span>
          {badge && <span className="px-1.5 py-0.5 rounded text-[9px] bg-violet-100 text-violet-700 font-semibold">APP</span>}
          <span className="text-muted-foreground">{time}</span>
        </div>
        <div className="text-[13px] text-foreground/90 mt-0.5">{body}</div>
      </div>
    </div>
  );
}

function StepCard({ title, body, visual }: { title: string; body: string; visual: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-card border border-border shadow-sm overflow-hidden">
      <div className="h-56 bg-gradient-to-br from-[oklch(0.95_0.04_50)] via-[oklch(0.88_0.08_310)] to-[oklch(0.7_0.14_285)] p-5 flex items-center justify-center">
        <div className="w-full max-w-[240px] bg-white/95 rounded-2xl p-4 shadow-lg">{visual}</div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-muted-foreground text-[14px] leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

function LogoGrid() {
  const logos = ["in", "M", "GH", "No", "Li", "St", "Sl", "HS", "Tr"];
  return (
    <div className="grid grid-cols-3 gap-2">
      {logos.map((l, i) => (
        <div key={i} className="aspect-square rounded-xl bg-white shadow-sm border border-border flex items-center justify-center text-[11px] font-bold text-foreground/70">
          {l}
        </div>
      ))}
    </div>
  );
}

function ToolChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-4 py-1.5 rounded-full bg-secondary text-foreground/80 text-[12px] font-semibold border border-border">
      {children}
    </span>
  );
}

function IconChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="w-9 h-9 rounded-full bg-secondary border border-border flex items-center justify-center text-foreground/70">
      {children}
    </span>
  );
}

