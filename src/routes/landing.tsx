import type { ReactNode } from "react";
import { PageMeta } from "@/components/PageMeta";
import { Nav } from "@/components/site/Nav";
import fullTeamImage from "@/assets/images/full-team.avif";
import {
  AboutChatBubblesIcon,
  AboutHandshakeIcon,
  AboutPeaceHandIcon,
  AboutRotateRightIcon,
  AboutStarIcon,
  AboutStartupIcon,
} from "@/components/landing/AboutValueIcons";
import gomerWordmark from "@/assets/images/gomer.svg";
import { AboutInvestorsSection } from "@/components/landing/AboutInvestorsSection";
import { Footer } from "@/components/site/Footer";

const tokens = `
.gomer-scope {
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
  font-family: Gellix, ui-sans-serif, sans-serif;
  background: var(--vk-beige);
  color: var(--vk-dark);
  -webkit-font-smoothing: antialiased;
  letter-spacing: -0.01em;
}
.gomer-scope * { box-sizing: border-box; }
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

const valueCardShadow =
  "inset 2.702px 2.702px 1.351px -2.702px rgb(255, 255, 255), inset -2.702px -2.702px 1.351px -2.702px rgb(255, 255, 255), inset 0 0 8.106px rgba(255, 255, 255, 0.5), inset 0 0 43.232px rgb(242, 242, 242)";

const values: { icon: ReactNode; title: string; desc: string }[] = [
  {
    icon: <AboutStarIcon />,
    title: "Bet on the upside.",
    desc: 'We make decisions from hope, not fear. "What if this works?" is a better question than "what if this goes wrong?" We\'d rather try something bold and learn than play it safe and wonder.',
  },
  {
    icon: <AboutStartupIcon />,
    title: "Compress the timeline.",
    desc: "We move faster than we think we can. Most of the time, the thing slowing us down is just waiting for permission. So we stopped waiting.",
  },
  {
    icon: <AboutRotateRightIcon />,
    title: "Delete and move on.",
    desc: "If something isn't working, we drop it. No ego, no sunk cost math. The thing we built last month might be the thing we kill this month. That's fine. It means we're learning.",
  },
  {
    icon: <AboutPeaceHandIcon />,
    title: "Say it in the thread.",
    desc: "We're honest with each other. No back-channeling, no tiptoeing. If something's off, say it where everyone can see it. It's faster, it's kinder, and it keeps us sharp.",
  },
  {
    icon: <AboutChatBubblesIcon />,
    title: "Disagree then commit.",
    desc: 'We argue about ideas all the time. But once we decide, everyone rows together. No "I told you so" if it doesn\'t work. We back the call and figure it out.',
  },
  {
    icon: <AboutHandshakeIcon />,
    title: "Take care of each other.",
    desc: "Small team means every person matters. We check in, we help out, we make time for real conversations. The work is intense. The people make it worth it.",
  },
];

function ValueCard({ children }: { children: ReactNode }) {
  return (
    <article className="relative overflow-hidden rounded-section p-8 lg:w-[25.8125rem]">
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit]">
        <div className="absolute inset-0 rounded-[inherit] bg-[#333]/20 mix-blend-luminosity" />
        <div className="absolute inset-0 rounded-[inherit] bg-white/20 mix-blend-plus-lighter" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ boxShadow: valueCardShadow }}
      />
      <div className="relative z-10">{children}</div>
    </article>
  );
}

const behindTheScenesVideos = [
  { id: "3DTEES4KYZ8", title: "Dubai Offsite Ep. #1" },
  { id: "7MeLlDq29os", title: "Dubai Offsite Ep. #2" },
  { id: "Ua6AjJT6Gc4", title: "Dubai Offsite Ep. #3" },
  { id: "ZKasopLHTPw", title: "Dubai Offsite Ep. #4" },
];

function VideoPlayIcon() {
  return (
    <svg viewBox="0 0 12.5714 15.4239" fill="none" aria-hidden className="size-4 text-[#1a182b]">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.72979 0.199871C1.516 -0.399072 0 0.409636 0 1.80591V13.618C0 15.0143 1.516 15.823 2.72979 15.224C4.36178 14.4188 6.76729 13.1659 8.77109 11.8517C9.77086 11.196 10.6918 10.5115 11.3693 9.84724C11.7081 9.51501 12.0006 9.17391 12.2112 8.83046C12.4198 8.49047 12.5714 8.11058 12.5714 7.71196C12.5714 7.31334 12.4198 6.93345 12.2112 6.59346C12.0006 6.25001 11.7081 5.90891 11.3693 5.57668C10.6918 4.91238 9.77086 4.22787 8.77109 3.57221C6.76729 2.25811 4.36178 1.00517 2.72979 0.199871Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function LandingPage() {
  return (
    <div className="gomer-scope">
      <PageMeta
        title="Gomer — The AI employee for everyone else"
        description="A focused AI coworker that connects to your tools and does the work — built for modern teams."
        ogTitle="Gomer — The AI employee"
        ogDescription="Premium AI workforce for modern teams."
      />
      <style>{tokens}</style>

      <section className="border-0 py-0!">
        <div className="bg-integrations-hero-surface relative w-full overflow-hidden rounded-b-[24px] sm:rounded-b-[32px]">
          <Nav heroTone="light" />
          <div className="mt-16 hero-page-stack-pt relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center gap-20 px-5 pb-20 sm:px-8 md:px-12 md:pb-24 lg:px-20 lg:pb-28 xl:pt-[12rem] xl:pb-28">
            <div className="flex max-w-[82rem] flex-col items-center gap-8 text-center">
              <h1 className="flex w-full flex-col gap-0 font-heading h2 sm:h1">
                <span>Building the AI employee</span>
                <span>for everyone else.</span>
              </h1>
              <div className="flex w-full max-w-[34rem] justify-center">
                <p className="body-medium text-secondary font-medium">
                  A focused team with one mission: give every company an AI employee that connects to their tools and does the work.
                </p>
              </div>
            </div>

            <div className="w-full max-w-[55rem]">
              <div className="relative w-full overflow-hidden rounded-[32px] border border-white p-4">
                <div
                  aria-hidden="true"
                  className="about-glass-card-fill pointer-events-none absolute inset-0 rounded-[inherit] opacity-20"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[31.75rem] w-[54.9375rem] max-w-none -translate-x-1/2 -translate-y-1/2 rounded-[32px] border-4 border-solid border-white blur-[4px]"
                />
                <div className="relative z-10">
                  <img
                    alt="Gomer team"
                    loading="eager"
                    width={1920}
                    height={1280}
                    decoding="async"
                    className="aspect-[3/2] h-auto w-full max-w-full rounded-[25px] object-cover"
                    src={fullTeamImage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-[7rem] md:py-20">
        <div className="px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 md:gap-16">
            <h2 className="font-heading h3 text-center sm:h2">What drives us</h2>
            <div className="flex flex-wrap justify-center gap-5">
              {values.map((v) => (
                <ValueCard key={v.title}>
                  <div className="flex flex-col gap-8">
                    <div>{v.icon}</div>
                    <div className="flex flex-col gap-3">
                      <h3 className="body-medium text-primary font-medium">{v.title}</h3>
                      <p className="body-small text-secondary font-medium">{v.desc}</p>
                    </div>
                  </div>
                </ValueCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pt-12 pb-12 sm:pt-[5rem] sm:pb-[5rem]">
        <div className="px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-16">
          <h2 className="font-heading text-5xl text-center text-black">Behind the scenes</h2>
            <div className="mx-auto grid w-full max-w-[66.5rem] grid-cols-1 gap-8 md:grid-cols-2">
              {behindTheScenesVideos.map((video) => (
                <a
                  key={video.id}
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="relative flex flex-col gap-2 overflow-hidden rounded-[32px] border border-white p-2">
                    <div
                      aria-hidden="true"
                      className="about-glass-card-fill pointer-events-none absolute inset-0 rounded-[inherit] opacity-20"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[31.75rem] w-[54.9375rem] max-w-none -translate-x-1/2 -translate-y-1/2 rounded-[32px] border-4 border-solid border-white blur-[4px]"
                    />
                    <div className="relative z-10">
                      <div className="relative aspect-[595/335] w-full overflow-hidden rounded-3xl">
                        <img
                          src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                          alt={video.title}
                          className="size-full object-cover"
                          loading="lazy"
                        />
                        <span
                          className="absolute top-1/2 left-1/2 flex h-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white bg-white px-6"
                          aria-hidden="true"
                        >
                          <VideoPlayIcon />
                        </span>
                      </div>
                      <p className="body-main px-2 py-4 text-left text-primary font-medium">{video.title}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AboutInvestorsSection />

      <section className="bg-primitive-main-beige py-1 sm:py-[7rem]">
        <div className="px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="mx-auto w-full max-w-7xl">
            <div className="dark relative flex min-h-[25.8125rem] w-full flex-col items-center justify-center overflow-hidden rounded-section px-6 py-12 text-center max-sm:-mx-4 max-sm:w-[calc(100%+2rem)] sm:px-10 sm:py-16 lg:px-16 gradient-dark-1">
              <img
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                width={1938}
                height={518}
                src={gomerWordmark}
                className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-auto w-full min-w-[50rem] max-w-none translate-y-1/2 opacity-35 select-none"
              />
              <div className="relative z-10 flex w-full flex-col items-center gap-16">
                <div className="flex w-full flex-col items-center gap-8">
                  <div className="flex w-full flex-col items-center">
                    <div className="pb-4">
                      <p className="body-small text-[#f1edff] font-medium">Let's work together</p>
                    </div>
                    <h2 className="font-heading max-w-full text-balance text-[2.5rem] leading-[1.1] font-bold tracking-[-0.06em] text-white max-sm:text-[2.1875rem] sm:text-[3rem]">
                      Build Gomer with us
                    </h2>
                  </div>
                  <p className="body-main max-w-[35.625rem] text-white font-medium opacity-80">
                    We're hiring. If you just scrolled through this whole page and thought "I want in," trust that instinct.
                  </p>
                </div>
                <a
                  href="https://jobs.ashbyhq.com/gomer"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-14 min-h-14 shrink-0 items-center justify-center rounded-full border-transparent bg-white px-10 text-base font-medium tracking-[0.01em] text-[#292737] transition-all hover:bg-white/95 active:translate-y-px"
                >
                  See the open roles
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
