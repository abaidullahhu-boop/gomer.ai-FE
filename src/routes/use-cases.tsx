import { PageMeta } from "@/components/PageMeta";
import { GetStartedButton } from "@/components/site/GetStartedButton";
import { EnterpriseHeroPoints, landingHeroBadges } from "@/components/site/HeroBadges";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { TestimonialsCarousel } from "@/components/site/TestimonialsCarousel";
import { HowItWorksStepsSection } from "@/components/site/HowItWorksStepsSection";
import { UseCaseShowcaseSection } from "@/components/site/UseCaseShowcaseSection";
import { UseCaseStarterSection } from "@/components/site/UseCaseStarterSection";
import { Check } from "lucide-react";
import { StartFreeSection } from "@/components/site/StartFreeSection";

const avatar = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`;

const testimonials = [
  { name: "Maya Chen", role: "CFO, Northwind", saved: "3-5 hrs/week", quote: "Viktor handles the weekly cash recap I used to dread. Now it's just there in Slack on Monday morning.", image: avatar("photo-1573496359142-b8d87734a5a2") },
  { name: "Jacob Aldridge", role: "Founder, Como Coaching", saved: "10+ hrs/week", quote: "Viktor may feel expensive for a monthly subscription, but he's the cheapest hire I've ever made — and the only one who acts on my midnight asks.", image: avatar("photo-1507003211169-0a1dd7228f2d") },
  { name: "Richard Comer", role: "VP Eng, Flagship", saved: "10+ hrs/week", quote: "Viktor takes the morning alerts off my plate. I haven't read a Datadog email in two months and I sleep through the night.", image: avatar("photo-1580489944761-15a19d654956") },
];

export default function UseCasesPage() {
  return (
    <div className="min-h-screen bg-primitive-main-beige">
      <PageMeta
        title="Use Cases — One AI employee. Every function. | Viktor"
        description="Viktor lives in Slack, connects to 3,200+ tools, and does the work. Media buying, finance, ops, engineering — pick your team's biggest time sink."
        ogTitle="Use Cases — Viktor"
        ogDescription="One AI employee for every function on your team."
      />
      {/* HERO */}
      <section className="border-0 py-0">
        <div className="relative w-full overflow-hidden rounded-b-section bg-integrations-hero-surface sm:rounded-b-section">
          <Nav heroTone="light" />
          <div className="hero-page-stack-pt relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center gap-16 px-5 pb-20 text-center sm:px-8 md:gap-20 md:px-12 md:pb-24 lg:px-20 lg:pb-28">
            <div className="flex w-full max-w-4xl flex-col items-center gap-8 mt-16">
              <p className="body-small font-medium text-accent-1">Use Cases</p>
              <h1 className="font-heading h2 text-balance sm:h1">
                One AI employee.
                <br />
                Every function.
              </h1>
              <p className="max-w-[630px] font-medium body-main text-secondary">
                Viktor lives in Slack, connects to 3,200+ tools, and does the work. Media buying,
                finance, ops, engineering. Pick your team&apos;s biggest time sink. Viktor handles it.
              </p>
              <div className="flex w-full flex-col items-stretch justify-center gap-4 sm:w-auto sm:flex-row sm:items-center">
                <GetStartedButton
                  variant="dark"
                  className="inline-flex h-14 min-h-14 w-full items-center justify-center px-10 text-base tracking-[-0.01em] sm:w-auto"
                />
              </div>
            </div>

            <div className="flex w-full max-w-[552px] justify-center">
              <EnterpriseHeroPoints badges={landingHeroBadges} />
            </div>
          </div>
        </div>
      </section>

      <UseCaseStarterSection />

      <HowItWorksStepsSection />

      <UseCaseShowcaseSection />

      {/* TESTIMONIALS */}
      <TestimonialsCarousel items={testimonials} />

     <StartFreeSection />

      <Footer />
    </div>
  );
}
