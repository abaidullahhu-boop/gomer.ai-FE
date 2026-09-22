import { PageMeta } from "@/components/PageMeta";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

const linkClassName =
  "underline underline-offset-4 transition-colors hover:text-primary";

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-primitive-main-beige">
      <PageMeta
        title="Impressum — Gaspo"
        description="Provider information and legal notice for Gaspo."
        ogTitle="Impressum — Gaspo"
        ogDescription="Provider information and legal notice for Gaspo."
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
                  Provider information and legal notice for Gaspo.
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
                      Gaspo
                      <br />
                      Website:{" "}
                      <a href="https://gaspo.co" className={linkClassName}>
                        gaspo.co
                      </a>
                    </address>
                  </div>
                </section>

                <section
                  id="contact"
                  aria-labelledby="contact-title"
                  className="border-t border-primitive-main-dark/10 pt-8 md:pt-10"
                >
                  <h2 id="contact-title" className="font-heading h5 text-primary">
                    Contact
                  </h2>
                  <div className="mt-4">
                    <ul className="space-y-1 body-main text-secondary font-medium">
                      <li>
                        Email:{" "}
                        <a href="mailto:legal@gaspo.co" className={linkClassName}>
                          legal@gaspo.co
                        </a>
                      </li>
                    </ul>
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
