import { PageMeta } from "@/components/PageMeta";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

const linkClassName =
  "underline underline-offset-4 transition-colors hover:text-primary";

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-primitive-main-beige">
      <PageMeta
        title="Impressum — Gomer"
        description="Provider information and legal notice for Gomer."
        ogTitle="Impressum — Gomer"
        ogDescription="Provider information and legal notice for Gomer."
      />
      <Nav heroTone="light" />
      <section className="pt-12 sm:pt-[5rem] pb-14 sm:pb-[7rem]">
        <div className="px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 md:gap-16">
              <header className="flex flex-col items-start gap-6">
                <div data-slot="eyebrow" className="w-full pb-4">
                  <div className="inline-flex max-w-full items-center">
                    <p className="body-small font-medium text-primitive-purple-700 m-0 max-w-full truncate">
                      Legal
                    </p>
                  </div>
                </div>
                <h1 className="font-heading h2 sm:h1 text-primary ">Impressum</h1>
                <p className="body-medium text-secondary font-medium">
                  Provider information and legal notice for Gomer.
                </p>
              </header>

              <div className="flex flex-col">
                <section
                  id="service-provider"
                  aria-labelledby="service-provider-title"
                  className="pb-8 md:pb-10"
                >
                  <h2 id="service-provider-title" className="font-heading h5 text-primary">
                    Service Provider
                  </h2>
                  <div className="mt-4">
                    <address className="not-italic body-main text-secondary font-medium">
                      Zeta AI, Inc.
                      <br />
                      2810 N Church Street, PMB 20589
                      <br />
                      Wilmington, DE 19802
                      <br />
                      United States
                      <br />
                      Product: Gomer (
                      <a href="https://gomer.com" className={linkClassName}>
                        gomer.com
                      </a>
                      )
                    </address>
                  </div>
                </section>

                <section
                  id="authorized-representatives"
                  aria-labelledby="authorized-representatives-title"
                  className="border-t border-primitive-main-dark/10 py-8 md:py-10"
                >
                  <h2
                    id="authorized-representatives-title"
                    className="font-heading h5 text-primary"
                  >
                    Authorized representatives
                  </h2>
                  <div className="mt-4">
                    <ul className="space-y-1 body-main text-secondary font-medium">
                      <li>Peter Albert, Co-CEO</li>
                      <li>Fryderyk Wiatrowski, Co-CEO</li>
                    </ul>
                  </div>
                </section>

                <section
                  id="contact"
                  aria-labelledby="contact-title"
                  className="border-t border-primitive-main-dark/10 py-8 md:py-10"
                >
                  <h2 id="contact-title" className="font-heading h5 text-primary">
                    Contact
                  </h2>
                  <div className="mt-4">
                    <ul className="space-y-1 body-main text-secondary font-medium">
                      <li>
                        Email:{" "}
                        <a href="mailto:legal@gomer.com" className={linkClassName}>
                          legal@gomer.com
                        </a>
                      </li>
                      <li>Phone: +1 929 243 9664</li>
                    </ul>
                  </div>
                </section>

                <section
                  id="registration"
                  aria-labelledby="registration-title"
                  className="border-t border-primitive-main-dark/10 pt-8 md:pt-10"
                >
                  <h2 id="registration-title" className="font-heading h5 text-primary">
                    Registration
                  </h2>
                  <div className="mt-4">
                    <p className="body-main text-secondary font-medium">
                      Zeta AI, Inc. is a company incorporated and registered under the laws of
                      the State of Delaware, USA, under File Number 7643252.
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
