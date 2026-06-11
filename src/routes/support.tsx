import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";

const NOISE_BG =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")";

const checklistItems = [
  "Your Slack workspace name (or workspace ID, if available)",
  "A short description of the issue",
  "Steps to reproduce (if relevant)",
  "Any screenshots or error messages",
];

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 h-5 w-5 shrink-0 text-cobalt"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function SupportPage() {
  return (
    <div className="support-page relative min-h-screen bg-cream text-stone-900 selection:bg-cobalt selection:text-cream">
      <PageMeta
        title="Support — Viktor"
        description="Need help with the Viktor app? Contact our support team at support@getviktor.com."
        ogTitle="Support — Viktor"
        ogDescription="Need help with the Viktor app? We're here to assist."
      />

      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
        style={{ backgroundImage: NOISE_BG }}
        aria-hidden="true"
      />

      <header className="fixed top-0 right-0 left-0 z-40 bg-[#fff6eecc] backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] min-w-0 items-center justify-between gap-3 px-4 py-4 sm:gap-6 sm:px-6 sm:py-6 md:px-12">
          <Link
            to="/"
            className="shrink-0 font-support-serif text-xl font-bold tracking-tight text-stone-900 sm:text-2xl"
          >
            Viktor
          </Link>
          <nav className="flex shrink-0 items-center gap-2 sm:gap-6">
            <Link
              to="/sign-in"
              className="hidden whitespace-nowrap text-sm font-medium tracking-wide text-stone-600 uppercase transition-colors hover:text-stone-900 sm:inline"
            >
              Sign in
            </Link>
            <Link
              to="/get-started"
              className="whitespace-nowrap rounded-full bg-stone-900 px-4 py-2 text-xs font-medium tracking-wide text-cream uppercase transition-colors hover:bg-cobalt sm:px-5 sm:py-2.5 sm:text-sm"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      <main className="px-6 pt-32 pb-24 md:px-12">
        <div className="mx-auto max-w-3xl">
          <div>
            <h1 className="font-support-serif mb-8 text-5xl tracking-tight md:text-7xl">Support</h1>
            <p className="mb-16 text-xl text-stone-500">
              Need help with the Viktor app? We&apos;re here to assist.
            </p>
          </div>

          <div className="space-y-12">
            <section className="rounded-2xl border-2 border-stone-200 bg-white p-8">
              <h2 className="font-support-serif mb-6 text-3xl">Contact Support</h2>
              <p className="mb-6 text-lg text-stone-700">
                Email us at:{" "}
                <a
                  href="mailto:support@getviktor.com"
                  className="font-semibold text-cobalt hover:underline"
                >
                  support@getviktor.com
                </a>
              </p>
              <p className="mb-4 text-stone-600">Please include:</p>
              <ul className="space-y-3">
                {checklistItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-stone-700">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border-2 border-stone-200 bg-white p-8">
              <h2 className="font-support-serif mb-4 text-3xl">Response Time</h2>
              <p className="text-lg text-stone-700">
                We aim to reply to all support requests{" "}
                <span className="font-semibold text-stone-900">within 7–8 hours</span>.
              </p>
            </section>

            <section className="rounded-2xl border-2 border-stone-200 bg-stone-50 p-8">
              <h2 className="font-support-serif mb-4 text-3xl">Accessibility &amp; Availability</h2>
              <p className="text-lg text-stone-700">
                This support page is{" "}
                <span className="font-semibold text-stone-900">publicly accessible</span> and{" "}
                <span className="font-semibold text-stone-900">
                  does not require you to create or sign in to any additional accounts
                </span>{" "}
                to get help.
              </p>
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t-2 border-stone-200 py-12">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <span className="font-support-serif text-xl font-bold">Viktor</span>
              <p className="mt-1 text-sm text-stone-500">© Zeta AI, Inc. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <Link
                to="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-stone-600 transition-colors hover:text-stone-900"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-stone-600 transition-colors hover:text-stone-900"
              >
                Terms of Service
              </Link>
              <Link
                to="/integrations"
                className="text-sm text-stone-500 transition-colors hover:text-stone-900"
              >
                Slack Integration
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
