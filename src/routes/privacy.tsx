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
      <article className="text-base text-stone-600 leading-relaxed [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:pl-6 [&_ul]:list-disc [&_li]:mb-2 [&_a]:text-blue-600 [&_a:hover]:underline">
        {children}
      </article>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-primitive-main-beige">
      <PageMeta
        title="Privacy Policy"
        description="Learn how Gomer collects, uses, and protects your personal information — data practices, your rights, and security."
        ogTitle="Privacy Policy"
        ogDescription="Learn how Gomer collects, uses, and protects your personal information — data practices, your rights, and security."
      />
      <Nav heroTone="light" />
      <main className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto w-full">
          <div className="mb-12">
            <h1
              className="font-serif text-5xl md:text-7xl tracking-tight mb-4"
              style={{ color: "#293045", fontFamily: '"Instrument Serif", serif' }}
            >
              Privacy Policy
            </h1>
            <p style={{ color: "oklch(55.3% 0.013 58.071)" }}>
              Last updated: June 6, 2026
            </p>
          </div>

          <Section number="1" title="Introduction">
            <p>
              Gomer ("we," "us," or "our") is committed to protecting your privacy. This
              Privacy Policy explains how we collect, use, disclose, and safeguard your
              personal information when you use our AI-powered platform and related services
              (the "Service").
            </p>
            <p>
              By using the Service, you agree to the collection and use of information in
              accordance with this Privacy Policy. If you do not agree, please do not use
              the Service.
            </p>
          </Section>

          <Section number="2" title="Information We Collect">
            <p>We collect information in the following categories:</p>
            <ul>
              <li>
                <strong>Account information:</strong> name, email address, password, and
                profile details you provide when registering.
              </li>
              <li>
                <strong>User content:</strong> documents, prompts, messages, files, and
                other content you create, upload, or submit through the Service.
              </li>
              <li>
                <strong>Usage data:</strong> features used, actions taken, timestamps, and
                interaction patterns within the Service.
              </li>
              <li>
                <strong>Device and technical data:</strong> IP address, browser type,
                operating system, device identifiers, and log data.
              </li>
              <li>
                <strong>Payment information:</strong> billing details processed by our
                third-party payment providers. We do not store full payment card numbers.
              </li>
              <li>
                <strong>Integration data:</strong> information from third-party services you
                connect to Gomer, as authorized by you.
              </li>
            </ul>
          </Section>

          <Section number="3" title="How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, operate, and maintain the Service.</li>
              <li>Process your requests and deliver AI-generated outputs.</li>
              <li>Authenticate your account and manage your subscription.</li>
              <li>Improve, personalize, and develop new features.</li>
              <li>Communicate with you about updates, security alerts, and support.</li>
              <li>Detect, prevent, and address fraud, abuse, and security issues.</li>
              <li>Comply with legal obligations and enforce our Terms of Service.</li>
            </ul>
            <p>
              We do not sell your personal information to third parties. We do not use your
              User Content to train general-purpose AI models without your explicit consent.
            </p>
          </Section>

          <Section number="4" title="Legal Bases for Processing">
            <p>
              Where applicable under the General Data Protection Regulation (GDPR), we process
              your personal data based on the following legal grounds:
            </p>
            <ul>
              <li>
                <strong>Contract performance:</strong> to provide the Service you have
                requested.
              </li>
              <li>
                <strong>Legitimate interests:</strong> to improve the Service, ensure
                security, and prevent abuse.
              </li>
              <li>
                <strong>Consent:</strong> where you have given explicit permission, such as
                for optional marketing communications.
              </li>
              <li>
                <strong>Legal obligation:</strong> to comply with applicable laws and
                regulations.
              </li>
            </ul>
          </Section>

          <Section number="5" title="Sharing and Disclosure">
            <p>We may share your information in the following circumstances:</p>
            <ul>
              <li>
                <strong>Service providers:</strong> trusted vendors who assist with hosting,
                analytics, payment processing, and customer support, bound by
                confidentiality obligations.
              </li>
              <li>
                <strong>Integrations:</strong> third-party services you choose to connect,
                subject to their own privacy policies.
              </li>
              <li>
                <strong>Legal requirements:</strong> when required by law, court order, or
                governmental authority.
              </li>
              <li>
                <strong>Business transfers:</strong> in connection with a merger,
                acquisition, or sale of assets, with notice to affected users.
              </li>
              <li>
                <strong>With your consent:</strong> when you direct us to share information
                with specific parties.
              </li>
            </ul>
          </Section>

          <Section number="6" title="Data Retention">
            <p>
              We retain your personal information for as long as your account is active or as
              needed to provide the Service. We may also retain data as necessary to comply
              with legal obligations, resolve disputes, and enforce our agreements.
            </p>
            <ul>
              <li>Account data is retained until you delete your account.</li>
              <li>User Content is retained according to your account settings and preferences.</li>
              <li>Log and usage data may be retained for a limited period for security and analytics.</li>
              <li>You may request deletion of your data at any time from your account settings.</li>
            </ul>
          </Section>

          <Section number="7" title="Your Rights">
            <p>
              Depending on your location, you may have the following rights regarding your
              personal data:
            </p>
            <ul>
              <li>Access and receive a copy of your personal data.</li>
              <li>Correct inaccurate or incomplete information.</li>
              <li>Delete your personal data ("right to be forgotten").</li>
              <li>Restrict or object to certain processing activities.</li>
              <li>Data portability — receive your data in a structured, machine-readable format.</li>
              <li>Withdraw consent at any time, where processing is based on consent.</li>
              <li>Opt out of the sale or sharing of personal information (we do not sell your data).</li>
            </ul>
            <p>
              California residents have additional rights under the California Consumer
              Privacy Act (CCPA), including the right to know what personal information is
              collected and the right to request deletion. To exercise any of these rights,
              contact us using the details below.
            </p>
          </Section>

          <Section number="8" title="Cookies and Tracking Technologies">
            <p>
              We use cookies and similar technologies to maintain your session, remember
              preferences, and analyze how the Service is used.
            </p>
            <ul>
              <li>
                <strong>Essential cookies:</strong> required for the Service to function
                properly.
              </li>
              <li>
                <strong>Analytics cookies:</strong> help us understand usage patterns and
                improve the Service.
              </li>
              <li>
                <strong>Preference cookies:</strong> remember your settings and choices.
              </li>
            </ul>
            <p>
              You can control cookies through your browser settings. Disabling certain cookies
              may affect the functionality of the Service.
            </p>
          </Section>

          <Section number="9" title="International Data Transfers">
            <p>
              Your information may be transferred to and processed in countries other than
              your country of residence. Where we transfer data internationally, we implement
              appropriate safeguards such as Standard Contractual Clauses to ensure your
              data receives adequate protection.
            </p>
          </Section>

          <Section number="10" title="Security">
            <p>
              We implement industry-standard technical and organizational measures to protect
              your personal information, including encryption in transit and at rest, access
              controls, and regular security assessments.
            </p>
            <p>
              No method of transmission over the Internet or electronic storage is 100% secure.
              While we strive to protect your data, we cannot guarantee absolute security.
            </p>
          </Section>

          <Section number="11" title="Children's Privacy">
            <p>
              The Service is not intended for children under 13 years of age (or the age of
              digital consent in your country). We do not knowingly collect personal
              information from children. If we become aware that we have collected data from a
              child, we will take steps to delete it promptly.
            </p>
          </Section>

          <Section number="12" title="Third-Party Services">
            <p>
              The Service may contain links to or integrations with third-party websites and
              services. We are not responsible for the privacy practices of these third
              parties. We encourage you to review their privacy policies before providing any
              personal information.
            </p>
          </Section>

          <Section number="13" title="Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. Material changes will be
              communicated through the Service or by email. Your continued use of the Service
              after changes take effect constitutes acceptance of the revised policy.
            </p>
          </Section>

          <Section number="14" title="Contact Us">
            <p>
              If you have questions about this Privacy Policy or wish to exercise your rights,
              please contact us:
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
                <a href="mailto:privacy@viktor.app">privacy@viktor.app</a>
              </p>
            </div>
          </Section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
