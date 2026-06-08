import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/images/logo.svg";

export const Route = createFileRoute("/get-started")({
  head: () => ({
    meta: [
      { title: "Try Viktor for free — $100 credits included" },
      { name: "description", content: "Sign up for Viktor with Slack or Microsoft Teams. No credit card required. SOC2 Type I compliant." },
    ],
  }),
  component: GetStarted,
});

const testimonials = [
  { quote: "Nothing short of revolutionary. The best attempt I've ever had as a CEO to turn every employee into an AI-first operator.", name: "Ben Diamond", role: "CEO, True Classic", company: "TRUE CLASSIC" },
  { quote: "Viktor is like the most capable all-round colleague you can imagine. He just does the work.", name: "Sam Kopelman", role: "CEO, Givr", company: "GIVR" },
  { quote: "Mindblowing all-in-one AI which does everything in a single solution.", name: "Antonín Štětina", role: "CEO, KULINA Group", company: "KULINA" },
  { quote: "Viktor is our eyes, ears, and hands. We might really never have to hire someone again.", name: "Jordan Dikoum", role: "Co-Founder, UniTru Inc.", company: "UNITRU" },
  { quote: "An incredible tool — it was almost instantly adopted by the bulk of my team.", name: "Boris Wexler", role: "CEO, Space Dinosaurs", company: "SPACE DINOSAURS" },
  { quote: "Like a virtual personal assistant who you don't have to manage as their therapist.", name: "Richard Comer", role: "Owner, Flagship Financial", company: "FLAGSHIP" },
  { quote: "A proactive employee that learns what's important in your company and delivers without hesitation.", name: "Matthias Lis", role: "CEO, CodeYourBrand", company: "CODEYOURBRAND" },
];

function GetStarted() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);
  const t = testimonials[i];

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* LEFT */}
      <div
        className="relative flex flex-col justify-between p-4 lg:p-12 text-foreground min-h-screen overflow-hidden"
        style={{
          background:
            "radial-gradient(80% 50% at 50% 0%, #fdbca0 0%, #f3b8c8 18%, #d4a8e8 38%, #9b87f5 62%, #6c5ce7 88%)",
        }}
      >
        <img src={logo} alt="Viktor" className="w-24 h-24" />

        <div className="relative z-10 flex-1 flex items-center justify-center py-12">
          <div
            className="w-full max-w-md rounded-3xl p-8 min-h-[340px] flex flex-col relative overflow-hidden"
            style={{
              WebkitBackdropFilter: "blur(8px)",
              backdropFilter: "blur(8px)",
              backgroundColor: "transparent",
              boxShadow:
                "inset 0 0 0 2px #fffffff2, inset 0 0 8.106px #ffffff80, inset 0 0 43.232px #f2f2f2",
            }}
          >
            <p className="text-foreground text-[17px] leading-relaxed flex-1">{t.quote}</p>
            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-300 to-violet-500" />
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
              <div className="font-display text-sm tracking-widest text-foreground/80">{t.company}</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex justify-center gap-1.5 mb-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-white" : "w-1.5 bg-white/50"}`}
              aria-label={`Testimonial ${idx + 1}`}
            />
          ))}
        </div>

        <div className="relative z-10">
          <p className="text-center text-white/80 text-xs tracking-[0.2em] uppercase mb-5">Built by engineers from:</p>
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
      <div className="bg-white flex flex-col justify-between p-8 lg:p-12 min-h-screen">
        <div />
        <div className="max-w-md w-full mx-auto">
          <h1 className="font-display text-3xl leading-tight text-center tracking-tight">
            Try Viktor for free.<br />$100 credits included.
          </h1>

          <div className="mt-10 space-y-3">
            <button className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-lg border border-border bg-card hover:bg-secondary transition font-medium">
              <SlackIcon />
              Continue with Slack
            </button>
            <button className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-lg border border-border hover:bg-secondary/80 transition font-medium">
              <TeamsIcon />
              Continue with Microsoft Teams
            </button>
          </div>

          <p className="mt-4 text-center text-sm text-black">
            No credit card required &nbsp;•&nbsp; SOC2 Type I compliant
          </p>
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
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path fill="#E01E5A" d="M5 15a2 2 0 1 1-2-2h2v2zm1 0a2 2 0 1 1 4 0v5a2 2 0 1 1-4 0v-5z"/><path fill="#36C5F0" d="M9 5a2 2 0 1 1 2-2v2H9zm0 1a2 2 0 1 1 0 4H4a2 2 0 1 1 0-4h5z"/><path fill="#2EB67D" d="M19 9a2 2 0 1 1 2 2h-2V9zm-1 0a2 2 0 1 1-4 0V4a2 2 0 1 1 4 0v5z"/><path fill="#ECB22E" d="M15 19a2 2 0 1 1-2 2v-2h2zm0-1a2 2 0 1 1 0-4h5a2 2 0 1 1 0 4h-5z"/></svg>
  );
}
function TeamsIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#5059C9"><path d="M20.5 10h-5A1.5 1.5 0 0 0 14 11.5v7A1.5 1.5 0 0 0 15.5 20h5a1.5 1.5 0 0 0 1.5-1.5v-7a1.5 1.5 0 0 0-1.5-1.5zM12 4a3 3 0 1 1-3 3 3 3 0 0 1 3-3zm-9 8.5A1.5 1.5 0 0 1 4.5 11h7A1.5 1.5 0 0 1 13 12.5v6A1.5 1.5 0 0 1 11.5 20h-7A1.5 1.5 0 0 1 3 18.5v-6z"/></svg>
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