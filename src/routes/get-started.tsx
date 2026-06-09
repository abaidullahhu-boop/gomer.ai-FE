import { useEffect, useState } from "react";
import { PageMeta } from "@/components/PageMeta";
import logo from "@/assets/images/logo.svg";
import { ConicPriceCardShell } from "@/components/site/ConicPriceCardShell";
import { HeroBadgeItem, landingHeroBadges } from "@/components/site/HeroBadges";

const avatar = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`;

const testimonials = [
  { quote: "Nothing short of revolutionary. The best attempt I've ever had as a CEO to turn every employee into an AI-first operator.", name: "Ben Diamond", role: "CEO, True Classic", image: avatar("photo-1560250097-0b93528c311a") },
  { quote: "Viktor is like the most capable all-round colleague you can imagine. He just does the work.", name: "Sam Kopelman", role: "CEO, Givr", image: avatar("photo-1472099645785-5658abf4ff4e") },
  { quote: "Mindblowing all-in-one AI which does everything in a single solution.", name: "Antonín Štětina", role: "CEO, KULINA Group", image: avatar("photo-1560250097-0b93528c311a") },
  { quote: "Viktor is our eyes, ears, and hands. It's made us realize that we might really never have to hire someone.", name: "Jordan Dikoum", role: "Co-Founder, UniTru Inc.", image: avatar("photo-1506794778202-cad84cf45f1d") },
  { quote: "An incredible tool — it was almost instantly adopted by the bulk of my team.", name: "Boris Wexler", role: "CEO, Space Dinosaurs", image: avatar("photo-1500648767791-00dcc994a43e") },
  { quote: "Like a virtual personal assistant who you don't have to manage as their therapist.", name: "Richard Comer", role: "Owner, Flagship Financial", image: avatar("photo-1580489944761-15a19d654956") },
  { quote: "A proactive employee that learns what's important in your company and delivers without hesitation.", name: "Matthias Lis", role: "CEO, CodeYourBrand", image: avatar("photo-1438761681033-6461ffad8d80") },
];

function TestimonialCard({
  quote,
  name,
  role,
  image,
}: {
  quote: string;
  name: string;
  role: string;
  image: string;
}) {
  return (
    <div className="relative w-full max-w-md px-2">
      <ConicPriceCardShell
        className="text-foreground"
        contentClassName="flex min-h-[360px] flex-col justify-between p-8 md:p-10"
      >
        <p className="text-lg font-medium leading-[1.65] tracking-[-0.01em] sm:text-[19px]">
          &ldquo;{quote}&rdquo;
        </p>
        <div className="mt-10 flex items-center gap-3.5">
          <img
            src={image}
            alt={name}
            className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-white/80"
          />
          <div className="leading-tight">
            <div className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">
              {name}
            </div>
            <div className="mt-0.5 text-[13px] text-foreground/55">{role}</div>
          </div>
        </div>
      </ConicPriceCardShell>
    </div>
  );
}

export default function GetStarted() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);
  const t = testimonials[i];

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-primitive-main-beige">
      <PageMeta
        title="Try Viktor for free — $100 credits included"
        description="Sign up for Viktor with Slack or Microsoft Teams. No credit card required. SOC2 Type I compliant."
      />
      {/* LEFT */}
      <div className="hidden lg:grid lg:grid-rows-[auto_1fr_auto] bg-hero relative text-foreground min-h-screen overflow-hidden px-4 pb-8">
        <img src={logo} alt="Viktor" className="w-24 h-24" />

        <div className="relative z-10 flex flex-col items-center justify-center">
          <TestimonialCard key={i} quote={t.quote} name={t.name} role={t.role} image={t.image} />
          <div className="relative z-10 flex justify-center gap-1.5 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-white" : "w-1.5 bg-white/50"}`}
                aria-label={`Testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>



        <div className="relative z-10">
          <p className="text-center text-white text-xs tracking-[0.2em] uppercase mb-5">Built by engineers from:</p>
          <div className="flex items-center justify-around gap-6 text-white font-display text-xl flex-wrap">
            <span>Meta AI</span>
            <span className="text-sm">OXFORD</span>
            <span>Google</span>
            <span className="tracking-[0.3em] text-base">TESLA</span>
            <span>amazon</span>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="bg-white flex flex-col justify-between p-4 md:p-8 lg:p-12 min-h-screen">
        <div />
        <div className="max-w-md w-full mx-auto">
          <h1 className="font-display text-[32px] leading-tight text-center tracking-tight">
            Try Viktor for free.<br />$100 credits included.
          </h1>

          <div className="mt-8 space-y-3">
            <button className="cursor-pointer w-full flex items-center justify-center gap-3 px-5 py-3 rounded-sm border border-border bg-card hover:bg-secondary transition font-medium">
              <SlackIcon />
              Continue with Slack
            </button>
            <button className="cursor-pointer w-full flex items-center justify-center gap-3 px-5 py-3 rounded-lg border border-border hover:bg-secondary/80 transition font-medium">
              <TeamsIcon />
              Continue with Microsoft Teams
            </button>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-muted-foreground">
            {landingHeroBadges.map((badge) => (
              <HeroBadgeItem key={badge.label} icon={badge.icon} label={badge.label} />
            ))}
          </div>
        </div>

        <div className="max-w-md w-full mx-auto">
          <div className="flex items-center justify-center gap-10 text-muted-foreground/70">
            <BadgeMark label="CASA" sub="Tier 3 Certified" icon={<ShieldCheck />} />
            <BadgeMark label="GDPR" sub="Aligned" icon={<GdprRing />} />
            <BadgeMark label="CCPA" sub="Compliant" icon={<LockMark />} />
            <BadgeMark label="SOC 2" sub="Type 1 Audited" icon={<ShieldCheck />} />
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            By signing up, you agree to the Viktor <a className="underline">Privacy Policy</a> and <a className="underline">Terms of Service</a>
          </p>
        </div>
      </div>
    </div>
  );
}

function SlackIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path fill="#E01E5A" d="M5 15a2 2 0 1 1-2-2h2v2zm1 0a2 2 0 1 1 4 0v5a2 2 0 1 1-4 0v-5z" /><path fill="#36C5F0" d="M9 5a2 2 0 1 1 2-2v2H9zm0 1a2 2 0 1 1 0 4H4a2 2 0 1 1 0-4h5z" /><path fill="#2EB67D" d="M19 9a2 2 0 1 1 2 2h-2V9zm-1 0a2 2 0 1 1-4 0V4a2 2 0 1 1 4 0v5z" /><path fill="#ECB22E" d="M15 19a2 2 0 1 1-2 2v-2h2zm0-1a2 2 0 1 1 0-4h5a2 2 0 1 1 0 4h-5z" /></svg>
  );
}
function TeamsIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#5059C9"><path d="M20.5 10h-5A1.5 1.5 0 0 0 14 11.5v7A1.5 1.5 0 0 0 15.5 20h5a1.5 1.5 0 0 0 1.5-1.5v-7a1.5 1.5 0 0 0-1.5-1.5zM12 4a3 3 0 1 1-3 3 3 3 0 0 1 3-3zm-9 8.5A1.5 1.5 0 0 1 4.5 11h7A1.5 1.5 0 0 1 13 12.5v6A1.5 1.5 0 0 1 11.5 20h-7A1.5 1.5 0 0 1 3 18.5v-6z" /></svg>
  );
}

function BadgeMark({ label, sub, icon }: { label: string; sub: string; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="w-9 h-10 flex items-center justify-center text-muted-foreground/80">{icon}</div>
      <div className="text-[11px] font-semibold tracking-wide text-muted-foreground">{label}</div>
      <div className="text-[9px] text-muted-foreground/70 -mt-1">{sub}</div>
    </div>
  );
}

function ShieldCheck() {
  return (
    <svg viewBox="0 0 24 28" fill="none" className="w-7 h-8" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 1l10 3v9c0 7-5 12-10 14C7 25 2 20 2 13V4l10-3z" />
      <path d="M8 13l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function LockMark() {
  return (
    <svg viewBox="0 0 24 28" fill="none" className="w-7 h-8" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="11" width="16" height="13" rx="2" />
      <path d="M8 11V7a4 4 0 018 0v4" />
    </svg>
  );
}
function GdprRing() {
  return (
    <svg viewBox="0 0 28 28" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.2">
      <circle cx="14" cy="14" r="7" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const x1 = 14 + 9 * Math.cos(a);
        const y1 = 14 + 9 * Math.sin(a);
        const x2 = 14 + 12 * Math.cos(a);
        const y2 = 14 + 12 * Math.sin(a);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeLinecap="round" />;
      })}
    </svg>
  );
}