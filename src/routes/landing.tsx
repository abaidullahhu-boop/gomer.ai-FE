import { createFileRoute } from "@tanstack/react-router";
import {
  Sparkles,
  Zap,
  Shield,
  BarChart3,
  Workflow,
  Globe,
  Play,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/landing")({
  head: () => ({
    meta: [
      { title: "Viktor — The AI employee for everyone else" },
      {
        name: "description",
        content:
          "A focused AI coworker that connects to your tools and does the work — built for modern teams.",
      },
      { property: "og:title", content: "Viktor — The AI employee" },
      {
        property: "og:description",
        content: "Premium AI workforce for modern teams.",
      },
    ],
  }),
  component: LandingPage,
});

const tokens = `
.viktor-scope {
  --vk-beige: #faf5f1;
  --vk-white: #fff;
  --vk-dark: #1a182b;
  --vk-grey: #9693a3;
  --vk-dblue: #150079;
  --vk-purple-700: #4e32b5;
  --vk-purple-500: #6e47ff;
  --vk-purple-300: #9e84ff;
  --vk-purple-100: #d2c6ff;
  --vk-purple-50: #f1edff;
  --vk-orange-500: #ffbb98;
  --vk-orange-300: #ffd1ba;
  --vk-radius: 0.875rem;
  --vk-radius-lg: 1.225rem;
  --vk-radius-xl: 1.575rem;
  --vk-radius-2xl: 2.275rem;
  --vk-hero-surface: radial-gradient(70% 44% at 52% 9rem, rgba(255,189,158,0.72) 0%, rgba(253,188,160,0.66) 6%, rgba(201,158,208,0.42) 29%, rgba(148,127,255,0.18) 51%, rgba(250,245,241,0) 92%), linear-gradient(90deg, var(--vk-beige), var(--vk-beige));
  --vk-testimonial-surface: radial-gradient(108.79% 100% at 50% 0%, rgba(255,187,152,0.2) 0%, rgba(255,187,152,0) 100%), radial-gradient(210% 117% at 40% 0%, var(--vk-purple-300) 0%, var(--vk-purple-500) 36%, var(--vk-dblue) 100%);
  --vk-cta-surface: radial-gradient(145% 105% at 52% -4%, var(--vk-orange-500) 0%, var(--vk-orange-500) 6%, var(--vk-purple-300) 50%, var(--vk-purple-500) 80%, var(--vk-dblue) 100%);
  font-family: Gellix, ui-sans-serif, sans-serif;
  background: var(--vk-beige);
  color: var(--vk-dark);
  -webkit-font-smoothing: antialiased;
  letter-spacing: -0.01em;
}
.viktor-scope * { box-sizing: border-box; }
.vk-container { max-width: 72rem; margin: 0 auto; padding: 0 1.5rem; }
.vk-hero { background: var(--vk-hero-surface); padding: 7rem 0 5rem; text-align: center; }
.vk-eyebrow {
  display: inline-flex; align-items: center; gap: 0.4rem;
  font-size: 0.8rem; font-weight: 500;
  color: var(--vk-purple-700);
  background: rgba(255,255,255,0.55);
  border: 1px solid rgba(110,71,255,0.18);
  padding: 0.4rem 0.85rem; border-radius: 999rem;
  backdrop-filter: blur(8px);
}
.vk-h1 {
  font-size: clamp(2.5rem, 6vw, 4.25rem);
  line-height: 1.05; letter-spacing: -0.05em; font-weight: 600;
  margin: 1.25rem auto 1rem; max-width: 56rem;
}
.vk-sub { color: var(--vk-grey); font-size: 1.125rem; max-width: 36rem; margin: 0 auto 2rem; line-height: 1.5; }
.vk-cta-row { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; margin-bottom: 3.5rem; }
.vk-btn-primary {
  background: var(--vk-dark); color: var(--vk-white);
  border-radius: 999rem; padding: 0.85rem 1.4rem;
  font-weight: 500; font-size: 0.95rem;
  display: inline-flex; align-items: center; gap: 0.4rem;
  border: 1px solid var(--vk-dark);
  transition: transform 0.15s ease, opacity 0.15s ease;
}
.vk-btn-primary:hover { transform: translateY(-1px); opacity: 0.92; }
.vk-btn-secondary {
  background: rgba(255,255,255,0.7); color: var(--vk-dark);
  border-radius: 999rem; padding: 0.85rem 1.4rem;
  font-weight: 500; font-size: 0.95rem;
  border: 1px solid rgba(26,24,43,0.1);
  backdrop-filter: blur(8px);
}
.vk-hero-img {
  margin: 0 auto; max-width: 60rem; border-radius: var(--vk-radius-2xl);
  overflow: hidden; box-shadow: 0 30px 80px -20px rgba(26,24,41,0.25);
  border: 1px solid rgba(255,255,255,0.6);
  background: linear-gradient(135deg, #f9f5f1, #fffefc);
  aspect-ratio: 16/9;
  display: flex; align-items: center; justify-content: center;
  position: relative;
}
.vk-hero-img-inner {
  position: absolute; inset: 0;
  background:
    radial-gradient(circle at 20% 30%, rgba(110,71,255,0.25), transparent 45%),
    radial-gradient(circle at 80% 70%, rgba(255,187,152,0.35), transparent 50%),
    linear-gradient(135deg, #f9f5f1 0%, #fffefc 100%);
}
.vk-hero-img-card {
  position: relative; z-index: 1;
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(20px);
  border-radius: 1rem; padding: 1.25rem 1.5rem;
  border: 1px solid rgba(255,255,255,0.9);
  box-shadow: 0 12px 32px rgba(26,24,41,0.12);
  font-size: 0.9rem; color: var(--vk-dark);
  display: flex; align-items: center; gap: 0.75rem;
}

.vk-section { padding: 6rem 0; }
.vk-section-head { text-align: center; margin-bottom: 3.5rem; }
.vk-h2 { font-size: clamp(2rem, 4vw, 2.75rem); font-weight: 600; letter-spacing: -0.05em; line-height: 1.1; margin-bottom: 0.75rem; }
.vk-section-sub { color: var(--vk-grey); font-size: 1.0625rem; max-width: 34rem; margin: 0 auto; }

.vk-grid-6 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
@media (max-width: 900px) { .vk-grid-6 { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .vk-grid-6 { grid-template-columns: 1fr; } }

.vk-feature {
  background: var(--vk-white);
  border-radius: var(--vk-radius-lg);
  padding: 1.75rem;
  border: 1px solid rgba(26,24,43,0.06);
  box-shadow: 0 4px 14px rgba(26,24,41,0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.vk-feature:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(26,24,41,0.08); }
.vk-feature-icon {
  width: 2.5rem; height: 2.5rem; border-radius: 0.75rem;
  display: inline-flex; align-items: center; justify-content: center;
  background: var(--vk-purple-50); color: var(--vk-purple-500);
  margin-bottom: 1rem;
}
.vk-feature h3 { font-size: 1.0625rem; font-weight: 600; margin-bottom: 0.4rem; letter-spacing: -0.02em; }
.vk-feature p { font-size: 0.9375rem; color: var(--vk-grey); line-height: 1.5; }

.vk-video-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; max-width: 60rem; margin: 0 auto; }
@media (max-width: 700px) { .vk-video-grid { grid-template-columns: 1fr; } }
.vk-video {
  position: relative; aspect-ratio: 16/10; border-radius: var(--vk-radius-lg);
  overflow: hidden; cursor: pointer;
  background: linear-gradient(135deg, var(--vk-purple-300), var(--vk-orange-500));
  display: flex; align-items: flex-end; padding: 1.25rem;
  color: var(--vk-white); font-weight: 600;
  box-shadow: 0 8px 24px rgba(26,24,41,0.12);
  transition: transform 0.2s ease;
}
.vk-video:hover { transform: scale(1.01); }
.vk-video:nth-child(2) { background: linear-gradient(135deg, var(--vk-purple-500), var(--vk-dblue)); }
.vk-video:nth-child(3) { background: linear-gradient(135deg, var(--vk-orange-500), var(--vk-purple-300)); }
.vk-video:nth-child(4) { background: linear-gradient(135deg, var(--vk-dblue), var(--vk-purple-500)); }
.vk-play {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 3.5rem; height: 3.5rem; border-radius: 999rem;
  background: rgba(255,255,255,0.9); color: var(--vk-dark);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 6px 18px rgba(0,0,0,0.2);
}

.vk-testimonial {
  background: var(--vk-testimonial-surface);
  border-radius: var(--vk-radius-2xl);
  padding: 4.5rem 2rem; text-align: center;
  color: var(--vk-white);
  margin: 0 auto; max-width: 72rem;
}
.vk-testimonial h2 { color: var(--vk-white); font-size: clamp(1.75rem, 3.5vw, 2.5rem); font-weight: 600; letter-spacing: -0.04em; line-height: 1.15; margin-bottom: 2.5rem; }
.vk-avatars { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
.vk-avatar {
  width: 4rem; height: 4rem; border-radius: 999rem;
  background: linear-gradient(135deg, var(--vk-orange-300), var(--vk-purple-300));
  border: 2px solid rgba(255,255,255,0.4);
  display: flex; align-items: center; justify-content: center;
  color: var(--vk-white); font-weight: 600;
}
.vk-quote { font-size: 1.0625rem; max-width: 38rem; margin: 0 auto; opacity: 0.9; line-height: 1.5; }
.vk-quote-name { margin-top: 1rem; font-size: 0.875rem; opacity: 0.7; }

.vk-cta {
  background: var(--vk-cta-surface);
  border-radius: var(--vk-radius-2xl);
  padding: 4rem 2rem; text-align: center;
  color: var(--vk-white);
  margin: 0 auto; max-width: 72rem;
}
.vk-cta h2 { color: var(--vk-white); font-size: clamp(2rem, 4vw, 2.75rem); font-weight: 600; letter-spacing: -0.04em; margin-bottom: 0.75rem; }
.vk-cta p { opacity: 0.85; max-width: 32rem; margin: 0 auto 2rem; }
.vk-cta-btn {
  background: var(--vk-white); color: var(--vk-dark);
  border-radius: 999rem; padding: 0.95rem 1.6rem;
  font-weight: 500; display: inline-flex; align-items: center; gap: 0.4rem;
}

.vk-footer { padding: 4.5rem 0 2.5rem; border-top: 1px solid rgba(26,24,43,0.08); margin-top: 4rem; }
.vk-footer-grid { display: grid; grid-template-columns: 1.5fr repeat(4, 1fr); gap: 2rem; }
@media (max-width: 800px) { .vk-footer-grid { grid-template-columns: 1fr 1fr; } }
.vk-footer h4 { font-size: 0.8125rem; font-weight: 600; margin-bottom: 1rem; color: var(--vk-dark); }
.vk-footer ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.6rem; }
.vk-footer a { color: var(--vk-grey); font-size: 0.9rem; text-decoration: none; transition: color 0.15s; }
.vk-footer a:hover { color: var(--vk-dark); }
.vk-brand { font-size: 1.5rem; font-weight: 600; letter-spacing: -0.04em; margin-bottom: 0.75rem; }
.vk-footer-bottom { margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid rgba(26,24,43,0.06); font-size: 0.8125rem; color: var(--vk-grey); display: flex; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }

.vk-nav { display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 0; }
.vk-nav-links { display: flex; gap: 1.75rem; }
.vk-nav-links a { color: var(--vk-dark); font-size: 0.9rem; opacity: 0.75; text-decoration: none; }
.vk-nav-links a:hover { opacity: 1; }
@media (max-width: 700px) { .vk-nav-links { display: none; } }
`;

const features = [
  { icon: Sparkles, title: "AI that does the work", desc: "Delegate complete workflows, not just prompts. Viktor finishes the job end-to-end." },
  { icon: Workflow, title: "Connects to your stack", desc: "Native integrations with the tools your team already lives in — Slack, Notion, Linear, more." },
  { icon: Zap, title: "Built for speed", desc: "Sub-second responses, parallel execution, and instant handoffs across your team." },
  { icon: Shield, title: "Enterprise security", desc: "SOC 2 Type II, granular permissions, and full audit logs for every action." },
  { icon: BarChart3, title: "Measurable impact", desc: "Track hours saved, tasks completed, and ROI from every workflow Viktor runs." },
  { icon: Globe, title: "Global by default", desc: "Multi-language, multi-timezone, and ready for distributed teams from day one." },
];

const videos = ["Dubai Offsite: Ep. 1", "Dubai Offsite: Ep. 2", "Dubai Offsite: Ep. 3", "Dubai Offsite: Ep. 4"];

const avatars = ["KP", "JD", "MS", "AR", "EB", "CH"];

function LandingPage() {
  return (
    <div className="viktor-scope">
      <style>{tokens}</style>

      <div className="vk-hero">
        <div className="vk-container">
          <nav className="vk-nav">
            <div style={{ fontWeight: 600, fontSize: "1.25rem", letterSpacing: "-0.04em" }}>viktor</div>
            <div className="vk-nav-links">
              <a href="#">Product</a>
              <a href="#">Features</a>
              <a href="#">Resources</a>
              <a href="#">Customers</a>
              <a href="#">Pricing</a>
            </div>
            <button className="vk-btn-primary">Get Viktor for free</button>
          </nav>

          <div style={{ paddingTop: "3rem" }}>
            <span className="vk-eyebrow"><Sparkles size={14} /> Introducing Viktor 2.0</span>
            <h1 className="vk-h1">Building the AI employee<br />for everyone else.</h1>
            <p className="vk-sub">
              A focused team with one mission: give every company an AI coworker that connects to their tools and does the work.
            </p>
            <div className="vk-cta-row">
              <button className="vk-btn-primary">Get started <ArrowRight size={16} /></button>
              <button className="vk-btn-secondary">Book a demo</button>
            </div>

            <div className="vk-hero-img">
              <div className="vk-hero-img-inner" />
              <div className="vk-hero-img-card">
                <Sparkles size={18} style={{ color: "var(--vk-purple-500)" }} />
                Viktor just completed 12 tasks across Slack and Linear.
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="vk-section">
        <div className="vk-container">
          <div className="vk-section-head">
            <h2 className="vk-h2">Everything your team needs</h2>
            <p className="vk-section-sub">Premium primitives, thoughtful defaults, and a workflow engine that scales with your business.</p>
          </div>
          <div className="vk-grid-6">
            {features.map((f) => (
              <div key={f.title} className="vk-feature">
                <div className="vk-feature-icon"><f.icon size={20} /></div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="vk-section" style={{ paddingTop: 0 }}>
        <div className="vk-container">
          <div className="vk-section-head">
            <h2 className="vk-h2">Behind the scenes</h2>
            <p className="vk-section-sub">A peek into how we build, ship, and live with Viktor.</p>
          </div>
          <div className="vk-video-grid">
            {videos.map((v) => (
              <div key={v} className="vk-video">
                <div className="vk-play"><Play size={20} fill="currentColor" /></div>
                <span>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "2rem 1.5rem 4rem" }}>
        <div className="vk-testimonial">
          <h2>Built for the best.<br />Backed by the best.</h2>
          <div className="vk-avatars">
            {avatars.map((a) => (<div key={a} className="vk-avatar">{a}</div>))}
          </div>
          <p className="vk-quote">
            "Viktor is the first AI tool that actually closes the loop. It doesn't just suggest — it ships."
          </p>
          <div className="vk-quote-name">— Karen P., Partner at Forma</div>
        </div>
      </section>

      <section style={{ padding: "1rem 1.5rem 4rem" }}>
        <div className="vk-cta">
          <span className="vk-eyebrow" style={{ background: "rgba(255,255,255,0.18)", color: "var(--vk-white)", borderColor: "rgba(255,255,255,0.25)" }}>
            Let's work together
          </span>
          <h2 style={{ marginTop: "1rem" }}>Build Viktor with us</h2>
          <p>We're hiring. If you just scrolled through the whole page and thought "I want to work here," we want to hear from you.</p>
          <button className="vk-cta-btn">See open roles <ArrowRight size={16} /></button>
        </div>
      </section>

      <footer className="vk-footer">
        <div className="vk-container">
          <div className="vk-footer-grid">
            <div>
              <div className="vk-brand">viktor</div>
              <p style={{ color: "var(--vk-grey)", fontSize: "0.9rem", maxWidth: "18rem" }}>
                The AI employee for everyone else.
              </p>
            </div>
            <div>
              <h4>Product</h4>
              <ul><li><a href="#">Product</a></li><li><a href="#">Pricing</a></li><li><a href="#">FAQ</a></li></ul>
            </div>
            <div>
              <h4>Company</h4>
              <ul><li><a href="/about">About</a></li><li><a href="/brand">Brand</a></li><li><a href="#">Careers</a></li><li><a href="#">Contact</a></li></ul>
            </div>
            <div>
              <h4>Resources</h4>
              <ul><li><a href="#">Blog</a></li><li><a href="#">Case studies</a></li><li><a href="#">Changelog</a></li></ul>
            </div>
            <div>
              <h4>Terms & Docs</h4>
              <ul><li><a href="#">Terms</a></li><li><a href="#">Privacy</a></li><li><a href="#">Imprint</a></li></ul>
            </div>
          </div>
          <div className="vk-footer-bottom">
            <div>© 2026 Viktor. All rights reserved.</div>
            <div>Made with care.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
