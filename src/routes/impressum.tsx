import { PageMeta } from "@/components/PageMeta";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

const HERO_SURFACE =
  "radial-gradient(70% 44% at 52% 9rem, #ffbd9eb8 0%, #fdbca0a8 6%, #c99ed06b 29%, #947fff2e 51%, #faf5f100 92%), linear-gradient(90deg, #faf5f1, #faf5f1)";

function Divider() {
  return <div className="border-t border-[#1a182b]/10 my-10" />;
}

export default function ImpressumPage() {
  return (
    <div className="min-h-screen" style={{ background: "#faf5f1" }}>
      <PageMeta
        title="Impressum — Viktor"
        description="Provider information and legal notice for Viktor."
        ogTitle="Impressum — Viktor"
        ogDescription="Provider information and legal notice for Viktor."
      />
      <section className="pt-0 pb-12 sm:pb-20 border-0">
        <div
          className="relative w-full overflow-hidden rounded-b-[24px] sm:rounded-b-[32px]"
          style={{ background: HERO_SURFACE }}
        >
          <Nav />
          <div className="px-4 sm:px-6 md:px-12 lg:px-20">
            <div className="mx-auto w-full max-w-[1100px] pt-12 sm:pt-16 pb-12 sm:pb-16">
              <div className="text-sm font-medium text-[#6e47ff] mb-4">Legal</div>
              <h1
                className="font-display font-medium leading-[1.02] tracking-[-0.04em] text-[#1a182b]"
                style={{ fontSize: "clamp(3rem, 9vw, 6rem)" }}
              >
                Impressum
              </h1>
              <p className="mt-5 text-base text-[#1a182b]/70 max-w-xl">
                Provider information and legal notice for Viktor.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="mx-auto w-full max-w-[1100px] text-[#1a182b]">
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">Service Provider</h2>
            <div className="mt-5 text-[15px] text-[#1a182b]/70 leading-7">
              <div>Zeta AI, Inc.</div>
              <div>2810 N Church Street, PMB 20589</div>
              <div>Wilmington, DE 19802</div>
              <div>United States</div>
              <div>
                Product: Viktor (
                <a href="https://viktor.com" className="underline underline-offset-2">viktor.com</a>
                )
              </div>
            </div>

            <Divider />

            <h2 className="text-2xl font-semibold tracking-[-0.02em]">Authorized representatives</h2>
            <div className="mt-5 text-[15px] text-[#1a182b]/70 leading-7">
              <div>Peter Albert, Co-CEO</div>
              <div>Fryderyk Wiatrowski, Co-CEO</div>
            </div>

            <Divider />

            <h2 className="text-2xl font-semibold tracking-[-0.02em]">Contact</h2>
            <div className="mt-5 text-[15px] text-[#1a182b]/70 leading-7">
              <div>
                Email:{" "}
                <a href="mailto:legal@viktor.com" className="underline underline-offset-2">legal@viktor.com</a>
              </div>
              <div>Phone: +1 929 243 9664</div>
            </div>

            <Divider />

            <h2 className="text-2xl font-semibold tracking-[-0.02em]">Registration</h2>
            <p className="mt-5 text-[15px] text-[#1a182b]/70 leading-7 max-w-3xl">
              Zeta AI, Inc. is a company incorporated and registered under the laws of the State of Delaware, USA, under File Number 7643252.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}