import { PageMeta } from "@/components/PageMeta";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2
        className="font-serif text-2xl md:text-3xl mb-4"
        style={{ color: "#293045", fontFamily: '"Instrument Serif", serif' }}
      >
        {number}. {title}
      </h2>
      <article className="text-base text-stone-600 leading-relaxed [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:pl-6 [&_ul]:list-disc [&_li]:mb-2 [&_ol]:mb-4 [&_ol]:pl-6 [&_ol]:list-decimal [&_a]:text-blue-600 [&_a:hover]:underline">
        {children}
      </article>
    </section>
  );
}

export default function DataDeletionPage() {
  return (
    <div className="min-h-screen bg-primitive-main-beige">
      <PageMeta
        title="Data Deletion Instructions"
        description="How to disconnect an account or request deletion of your Gomer data — what is removed, what is retained, and how long it takes."
        ogTitle="Data Deletion Instructions"
        ogDescription="How to disconnect an account or request deletion of your Gomer data — what is removed, what is retained, and how long it takes."
      />
      <Nav heroTone="light" />
      <main className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto w-full">
          <div className="mb-12">
            <h1
              className="font-serif text-5xl md:text-7xl tracking-tight mb-4"
              style={{ color: "#293045", fontFamily: '"Instrument Serif", serif' }}
            >
              Data Deletion Instructions
            </h1>
            <p style={{ color: "oklch(55.3% 0.013 58.071)" }}>
              Last updated: August 7, 2026
            </p>
          </div>

          <Section number="1" title="Overview">
            <p>
              You can remove your data from Gomer at any time. This page explains the three
              ways to do that — disconnecting a single account, removing Gomer from your
              Slack workspace, or requesting deletion of everything — and what each one
              removes.
            </p>
            <p>
              For the full description of what we collect and why, see our{" "}
              <a href="/privacy">Privacy Policy</a>.
            </p>
          </Section>

          <Section number="2" title="Disconnect a single account">
            <p>
              Removing one connected account — Meta Ads, Google Ads, Gmail, or any other
              integration — leaves the rest of your workspace intact.
            </p>
            <ol>
              <li>Open your Gomer dashboard and go to <strong>Integrations</strong>.</li>
              <li>Find the connected account you want to remove.</li>
              <li>
                Choose <strong>Disconnect</strong>.
              </li>
            </ol>
            <p>
              The stored access and refresh tokens for that account are deleted, and Gomer
              immediately loses the ability to read or act on it. Disconnecting does not
              revoke the authorization on the provider's side, so you may also want to remove
              Gomer from that provider's own connected-apps settings — for Meta, under
              Settings &rarr; Business integrations.
            </p>
          </Section>

          <Section number="3" title="Remove Gomer from Slack">
            <p>
              Uninstalling the Gomer app from your Slack workspace stops all further data
              collection from Slack.
            </p>
            <ol>
              <li>
                In Slack, go to <strong>Settings &amp; administration</strong> &rarr;{" "}
                <strong>Manage apps</strong>.
              </li>
              <li>Select <strong>Gomer</strong>.</li>
              <li>
                Choose <strong>Remove app</strong>.
              </li>
            </ol>
            <p>
              This revokes our bot token. Data already stored for the workspace is not erased
              by uninstalling — to remove it as well, follow the next section.
            </p>
          </Section>

          <Section number="4" title="Request deletion of all your data">
            <p>
              To have everything associated with you or your workspace erased, email{" "}
              <a href="mailto:privacy@gomer.com">privacy@gomer.com</a> from the address on
              your Gomer account with the subject line <strong>Data deletion request</strong>,
              and include:
            </p>
            <ul>
              <li>Your Slack workspace name</li>
              <li>Whether you are requesting deletion for yourself or the whole workspace</li>
            </ul>
            <p>
              A workspace-wide deletion can only be requested by a workspace administrator. We
              will confirm your identity before acting on the request.
            </p>
          </Section>

          <Section number="5" title="What gets deleted">
            <p>A full deletion request removes:</p>
            <ul>
              <li>
                Your profile — name, email address, avatar, and Slack user identifier
              </li>
              <li>
                All access and refresh tokens for connected accounts, including Meta Ads and
                accounts connected through Pipedream
              </li>
              <li>Your conversation history with Gomer, in Slack and in the dashboard</li>
              <li>Workspace settings, saved instructions, installed skills, and scheduled tasks</li>
            </ul>
          </Section>

          <Section number="6" title="What we retain, and why">
            <p>
              We keep billing and usage records — the amount charged and the date, with no
              conversation content — for as long as tax and accounting law requires. These
              records cannot identify what you asked Gomer or what it did.
            </p>
            <p>
              We may also retain data where we are legally required to, or where it is needed
              to resolve a dispute or enforce our agreements.
            </p>
          </Section>

          <Section number="7" title="How long it takes">
            <p>
              Disconnecting an account or uninstalling from Slack takes effect immediately.
            </p>
            <p>
              Deletion requests sent by email are completed within <strong>30 days</strong> of
              us verifying your identity. We will email you to confirm once the deletion is
              done.
            </p>
          </Section>

          <Section number="8" title="Contact">
            <p>
              For any question about deleting your data, or to check on a request already
              submitted, contact us:
            </p>
            <div
              className="rounded-lg p-6 mt-4"
              style={{ backgroundColor: "oklch(97% 0.001 106.424)" }}
            >
              <p className="mb-2" style={{ color: "#293045" }}>
                <strong>Gomer</strong>
              </p>
              <p className="mb-2" style={{ color: "#293045" }}>
                Privacy Team
              </p>
              <p>
                <a href="mailto:privacy@gomer.com">privacy@gomer.com</a>
              </p>
            </div>
          </Section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
