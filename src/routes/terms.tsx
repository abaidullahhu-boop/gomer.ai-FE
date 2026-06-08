import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service" },
      {
        name: "description",
        content:
          "Read the Terms of Service that govern your use of Viktor — acceptance, accounts, data, IP, liability, and more.",
      },
      { property: "og:title", content: "Terms of Service" },
      {
        property: "og:description",
        content:
          "Read the Terms of Service that govern your use of Viktor — acceptance, accounts, data, IP, liability, and more.",
      },
    ],
  }),
  component: TermsPage,
});

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

function TermsPage() {
  return (
    <div style={{ backgroundColor: "#fffefd", minHeight: "100vh" }}>
      <Nav />
      <main className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto w-full">
          <div className="mb-12">
            <h1
              className="font-serif text-5xl md:text-7xl tracking-tight mb-4"
              style={{ color: "#293045", fontFamily: '"Instrument Serif", serif' }}
            >
              Terms of Service
            </h1>
            <p style={{ color: "oklch(55.3% 0.013 58.071)" }}>
              Last updated: June 6, 2026
            </p>
          </div>

          <Section number="1" title="Acceptance of Terms">
            <p>
              By accessing or using Viktor (the "Service"), you agree to be bound by these
              Terms of Service ("Terms"). If you do not agree to these Terms, you may not
              access or use the Service. These Terms constitute a legally binding agreement
              between you and Viktor.
            </p>
            <p>
              We may update these Terms from time to time. Your continued use of the Service
              after any changes constitutes acceptance of the revised Terms.
            </p>
          </Section>

          <Section number="2" title="Description of the Service">
            <p>
              Viktor provides an AI-powered platform that helps users create, organize, and
              manage their work through intelligent assistance and automation. The Service
              includes:
            </p>
            <ul>
              <li>AI-driven content generation and editing tools</li>
              <li>Collaborative workspaces for individuals and teams</li>
              <li>Integrations with third-party services and APIs</li>
              <li>Storage and synchronization of your data across devices</li>
              <li>Analytics and insights derived from your usage</li>
            </ul>
          </Section>

          <Section number="3" title="Account Registration and Security">
            <p>
              To access certain features, you must create an account. You agree to provide
              accurate, current, and complete information and to keep it updated.
            </p>
            <ul>
              <li>You are responsible for safeguarding your password and account credentials.</li>
              <li>You must notify us immediately of any unauthorized access or breach.</li>
              <li>You may not share your account or transfer it to another person.</li>
              <li>We reserve the right to suspend or terminate accounts that violate these Terms.</li>
              <li>You must be at least 13 years old (or the age of digital consent in your country) to use the Service.</li>
            </ul>
          </Section>

          <Section number="4" title="User Content and Data Privacy">
            <p>
              You retain ownership of any content you submit, upload, or create through the
              Service ("User Content"). By providing User Content, you grant Viktor a
              worldwide, non-exclusive, royalty-free license to host, store, process, and
              display it solely to operate and improve the Service.
            </p>
            <ul>
              <li>You are solely responsible for your User Content and the rights to it.</li>
              <li>We process personal data in accordance with our Privacy Policy.</li>
              <li>We do not sell your personal information to third parties.</li>
              <li>You may export or delete your data at any time from your account settings.</li>
              <li>We employ industry-standard security measures to protect your data.</li>
            </ul>
          </Section>

          <Section number="5" title="Approved Mechanisms and Automated Access">
            <p>
              Access to the Service must be conducted through our official applications,
              websites, and documented APIs.
            </p>
            <ul>
              <li>Use of unofficial clients, bots, or scrapers is prohibited.</li>
              <li>Automated access must comply with rate limits and our API terms.</li>
              <li>You may not reverse engineer, decompile, or attempt to extract source code.</li>
              <li>Bulk downloading or mirroring of Service data is not permitted.</li>
            </ul>
          </Section>

          <Section number="6" title="Acceptable Use Policy">
            <p>You agree not to use the Service to:</p>
            <ul>
              <li>Violate any applicable laws, regulations, or third-party rights.</li>
              <li>Upload or distribute malicious code, viruses, or harmful content.</li>
              <li>Harass, threaten, or harm other users.</li>
              <li>Generate or distribute illegal, deceptive, or fraudulent material.</li>
              <li>Interfere with or disrupt the Service or its infrastructure.</li>
              <li>Impersonate any person or misrepresent your affiliation.</li>
              <li>Attempt to gain unauthorized access to other accounts or systems.</li>
            </ul>
            <p>
              Violations may result in suspension or termination of your account without
              prior notice.
            </p>
          </Section>

          <Section number="7" title="Confidentiality and Privacy">
            <p>
              We take confidentiality seriously. Any information you mark as confidential or
              that is reasonably understood to be confidential will be handled with
              appropriate care.
            </p>
            <ul>
              <li>We will not disclose your confidential information except as required by law.</li>
              <li>Our staff and contractors are bound by confidentiality obligations.</li>
              <li>You agree to keep confidential any non-public information about the Service.</li>
              <li>Privacy practices are detailed in our Privacy Policy.</li>
            </ul>
          </Section>

          <Section number="8" title="Intellectual Property Rights">
            <p>
              All rights, title, and interest in and to the Service, including software,
              design, trademarks, and documentation, are and will remain the exclusive
              property of Viktor and its licensors.
            </p>
            <ul>
              <li>The Viktor name, logo, and visual identity are trademarks of Viktor.</li>
              <li>You may not use our trademarks without prior written consent.</li>
              <li>Feedback you provide may be used by us without obligation to you.</li>
              <li>Open-source components are governed by their respective licenses.</li>
            </ul>
          </Section>

          <Section number="9" title="AI Generation and Disclaimers">
            <p>
              The Service uses artificial intelligence to generate content. AI outputs may
              be inaccurate, incomplete, or inappropriate for your specific needs.
            </p>
            <ul>
              <li>You should review and verify AI-generated content before relying on it.</li>
              <li>Viktor does not guarantee the accuracy or fitness of AI outputs.</li>
              <li>AI-generated content may not be eligible for copyright protection in some jurisdictions.</li>
              <li>You are responsible for how you use AI-generated content.</li>
            </ul>
          </Section>

          <Section number="10" title="Pricing and Plan Changes">
            <p>
              Paid plans are billed in advance on a recurring basis. By subscribing, you
              authorize us to charge your payment method for the selected plan.
            </p>
            <ul>
              <li>Prices are subject to change with at least 30 days' notice.</li>
              <li>Refunds are issued at our discretion and in accordance with applicable law.</li>
              <li>You may cancel your subscription at any time from your account settings.</li>
              <li>Failure to pay may result in suspension of paid features.</li>
            </ul>
          </Section>

          <Section number="11" title="Termination of Service">
            <p>
              Either party may terminate this agreement at any time. You may stop using the
              Service and delete your account at any time.
            </p>
            <p>
              We may suspend or terminate your access to the Service immediately if you
              violate these Terms, engage in fraudulent activity, or otherwise create risk or
              legal exposure for Viktor.
            </p>
            <p>
              Upon termination, your right to use the Service ceases immediately. Provisions
              that by their nature should survive termination will remain in effect.
            </p>
          </Section>

          <Section number="12" title="Disclaimers & Warranties">
            <p>
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis without
              warranties of any kind, either express or implied, including but not limited to
              implied warranties of merchantability, fitness for a particular purpose, and
              non-infringement.
            </p>
            <p>
              We do not warrant that the Service will be uninterrupted, error-free, secure,
              or that defects will be corrected.
            </p>
          </Section>

          <Section number="13" title="Limitation of Liability">
            <p>
              To the maximum extent permitted by law, Viktor shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages, including
              but not limited to:
            </p>
            <ul>
              <li>Loss of profits, revenue, data, or business opportunities</li>
              <li>Service interruptions or data loss</li>
              <li>Damages resulting from third-party actions or content</li>
            </ul>
            <p>
              Our total liability for any claim arising out of these Terms or the Service
              shall not exceed the amount you paid us in the twelve months preceding the
              claim.
            </p>
          </Section>

          <Section number="14" title="Indemnification">
            <p>
              You agree to indemnify, defend, and hold harmless Viktor and its affiliates,
              officers, employees, and agents from any claims, damages, losses, liabilities,
              and expenses arising out of:
            </p>
            <ul>
              <li>Your use or misuse of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights</li>
              <li>Your User Content</li>
            </ul>
          </Section>

          <Section number="15" title="Modifications to the Terms or Service">
            <p>
              We reserve the right to modify these Terms or any aspect of the Service at any
              time. Material changes will be communicated through the Service or by email.
              Continued use after changes take effect constitutes acceptance.
            </p>
          </Section>

          <Section number="16" title="Governing Law and Jurisdiction">
            <p>
              These Terms are governed by and construed in accordance with the laws of the
              jurisdiction in which Viktor is established, without regard to its conflict of
              law principles. Any disputes arising out of or relating to these Terms shall be
              resolved exclusively in the competent courts of that jurisdiction.
            </p>
          </Section>

          <Section number="17" title="Notices and Dispute Resolution">
            <p>
              Notices to you may be made via email or through postings within the Service.
              Notices to Viktor must be sent to the contact address provided below.
            </p>
            <p>
              Before initiating formal proceedings, both parties agree to attempt to resolve
              disputes informally by contacting each other in good faith. If a resolution
              cannot be reached within 60 days, the dispute may be submitted to binding
              arbitration where permitted by law.
            </p>
          </Section>

          <Section number="18" title="Miscellaneous">
            <ul>
              <li>These Terms constitute the entire agreement between you and Viktor.</li>
              <li>If any provision is found unenforceable, the remaining provisions remain in effect.</li>
              <li>Our failure to enforce any right is not a waiver of that right.</li>
              <li>You may not assign these Terms without our prior written consent.</li>
              <li>Headings are for convenience only and do not affect interpretation.</li>
            </ul>
          </Section>

          <Section number="19" title="Contact Information">
            <p>
              If you have any questions about these Terms, please contact us:
            </p>
            <div
              className="rounded-lg p-6 mt-4"
              style={{ backgroundColor: "oklch(97% 0.001 106.424)" }}
            >
              <p className="mb-2" style={{ color: "#293045" }}>
                <strong>Viktor</strong>
              </p>
              <p className="mb-2" style={{ color: "#293045" }}>
                Legal Department
              </p>
              <p>
                <a href="mailto:legal@viktor.app">legal@viktor.app</a>
              </p>
            </div>
          </Section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
