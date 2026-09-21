import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { contactInfo } from "@/lib/data";

const LAST_UPDATED = "September 21, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Ashro Design collects, uses, shares, and protects your personal information when you visit ashrodesign.net, contact us, or use our services.",
};

function Section({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-12 border-t border-white/10 pt-10">
      <h2 className="text-xl font-semibold leading-snug text-fg sm:text-2xl">
        <span className="mr-2.5 text-accent-glow">{n}.</span>
        {title}
      </h2>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

function P({ children }: { children: ReactNode }) {
  return (
    <p className="text-[0.95rem] leading-relaxed text-muted">{children}</p>
  );
}

function Lead({ children }: { children: ReactNode }) {
  return <strong className="font-medium text-fg">{children}</strong>;
}

function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex gap-3 text-[0.95rem] leading-relaxed text-muted"
        >
          <span
            aria-hidden
            className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-accent-glow"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Nav linkPrefix="/" />
      <main className="relative px-6 pb-24 pt-32 sm:pt-36">
        <div
          aria-hidden
          className="bloom"
          style={{
            top: "-6%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "42rem",
            height: "42rem",
            background:
              "radial-gradient(circle, rgba(58,26,255,0.18), transparent 65%)",
          }}
        />

        <div className="relative mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.22em] text-accent-glow">
            <span className="h-px w-6 bg-accent-glow/50" />
            Legal
          </span>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight text-fg sm:text-5xl">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <p className="mt-4 text-sm text-muted-2">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="mt-8 space-y-4">
            <P>
              This Privacy Policy explains how <Lead>Ashro Design</Lead> (“Ashro
              Design,” “we,” “us,” or “our”) — a business owned and operated by
              Asher Akeem Rolle and based in Nassau, New Providence, The Bahamas
              — collects, uses, shares, and protects your personal information
              when you visit <Lead>ashrodesign.net</Lead> (the “Site”), contact
              us, or use our services.
            </P>
            <P>
              By using our Site or services, you agree to the practices
              described in this policy.
            </P>
          </div>

          <Section n={1} title="Who We Are">
            <P>
              Ashro Design is a Bahamian e-commerce and digital marketing
              business providing website design and development, advertising,
              email and SMS marketing, and graphic design services. If you have
              any questions about this policy or your information, contact us
              at:
            </P>
            <Bullets
              items={[
                <>
                  <Lead>Email:</Lead>{" "}
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="link-underline text-fg/90 transition-colors hover:text-fg"
                  >
                    {contactInfo.email}
                  </a>
                </>,
                <>
                  <Lead>Phone:</Lead>{" "}
                  <a
                    href={`tel:${contactInfo.phoneHref}`}
                    className="link-underline text-fg/90 transition-colors hover:text-fg"
                  >
                    {contactInfo.phone}
                  </a>
                </>,
                <>
                  <Lead>Location:</Lead> Nassau, New Providence, The Bahamas
                </>,
              ]}
            />
          </Section>

          <Section n={2} title="Information We Collect">
            <P>
              <Lead>Information you provide to us</Lead> — for example when you
              submit a form, request our free strategy session or blueprint, or
              become a client:
            </P>
            <Bullets
              items={[
                "Name and contact details (email address, phone/WhatsApp number)",
                "Business details (business name, location, products/services, and similar information)",
                "The content of messages, inquiries, and any information or files you send us (e.g., logos, photos, and content for your project)",
                "Payment-related information (processed by third-party payment providers — see Section 6)",
              ]}
            />
            <P>
              <Lead>Information we collect automatically</Lead> when you visit
              the Site:
            </P>
            <Bullets
              items={[
                "Device and browser information, IP address, and general location",
                "Pages viewed, links clicked, and how you interact with the Site",
                "Information collected through cookies and similar technologies (see Section 4)",
              ]}
            />
            <P>
              <Lead>Marketing information</Lead> — if you opt in, we record your
              consent to receive email and/or SMS communications from us.
            </P>
          </Section>

          <Section n={3} title="How We Use Your Information">
            <P>We use your information to:</P>
            <Bullets
              items={[
                "Respond to your inquiries and provide our services",
                "Deliver materials you request (such as our downloadable guide) and related follow-ups",
                "Send marketing communications where you have consented, and let you opt out at any time",
                "Operate, maintain, and improve the Site and our services",
                "Process payments and manage our client relationships",
                "Comply with legal, tax, and regulatory obligations",
              ]}
            />
          </Section>

          <Section n={4} title="Cookies & Analytics">
            <P>
              Our Site may use cookies and similar technologies to help it
              function, remember your preferences, understand how the Site is
              used, and measure our marketing. This may include:
            </P>
            <Bullets
              items={[
                <>
                  <Lead>Analytics tools</Lead> (such as Google Analytics) to
                  understand Site traffic and usage
                </>,
                <>
                  <Lead>Advertising technologies</Lead> (such as the
                  Meta/Facebook Pixel and Google advertising tools) to measure
                  and improve our ads and to show relevant ads
                </>,
              ]}
            />
            <P>
              You can control or disable cookies through your browser settings.
              Disabling cookies may affect how parts of the Site work.
            </P>
          </Section>

          <Section n={5} title="Marketing Communications & Consent">
            <P>
              If you opt in, we may send you emails or text messages with tips,
              updates, and offers.
            </P>
            <Bullets
              items={[
                <>
                  You can <Lead>unsubscribe</Lead> from emails at any time using
                  the link in any email.
                </>,
                <>
                  You can <Lead>opt out of SMS</Lead> at any time by replying{" "}
                  <Lead>STOP</Lead> (or as otherwise instructed in the message).
                </>,
              ]}
            />
            <P>
              We will not send you marketing messages without an appropriate
              basis to do so, and we honour opt-out requests promptly.
            </P>
          </Section>

          <Section n={6} title="How We Share Your Information">
            <P>
              We do <Lead>not</Lead> sell your personal information. We share it
              only as needed to run our business, including with:
            </P>
            <Bullets
              items={[
                <>
                  <Lead>Service providers</Lead> who help us operate — such as
                  website hosting, email marketing platforms, form and survey
                  tools, analytics providers, and payment processors
                </>,
                <>
                  <Lead>Advertising platforms</Lead> (such as Meta and Google) in
                  connection with our marketing
                </>,
                <>
                  <Lead>Professional advisors</Lead> (such as accountants) where
                  necessary
                </>,
                <>
                  <Lead>Authorities or others</Lead> where required by law, to
                  comply with legal process, or to protect our rights, safety, or
                  property
                </>,
                <>
                  <Lead>A successor</Lead> in the event of a business sale,
                  merger, or transfer of assets
                </>,
              ]}
            />
            <P>
              These third parties are permitted to use your information only as
              necessary to provide their services to us.
            </P>
          </Section>

          <Section n={7} title="Third-Party Links">
            <P>
              Our Site and communications may contain links to third-party
              websites or services (including social media). We are not
              responsible for the privacy practices of those third parties, and
              we encourage you to review their privacy policies.
            </P>
          </Section>

          <Section n={8} title="Data Retention">
            <P>
              We keep your personal information only for as long as necessary to
              fulfil the purposes described in this policy, to provide our
              services, and to meet legal, tax, and accounting requirements. When
              it is no longer needed, we take reasonable steps to delete or
              anonymize it.
            </P>
          </Section>

          <Section n={9} title="Data Security">
            <P>
              We take reasonable measures to protect your personal information
              against loss, misuse, and unauthorized access. However, no method
              of transmission over the internet or electronic storage is
              completely secure, and we cannot guarantee absolute security.
            </P>
          </Section>

          <Section n={10} title="Your Rights">
            <P>
              Subject to applicable law, including the Bahamian{" "}
              <Lead>
                Data Protection (Privacy of Personal Information) Act
              </Lead>
              , you may have the right to:
            </P>
            <Bullets
              items={[
                "Request access to the personal information we hold about you",
                "Request that we correct inaccurate information",
                "Request that we delete your information",
                "Withdraw your consent to marketing at any time",
                "Object to or ask us to restrict certain uses of your information",
              ]}
            />
            <P>
              To exercise any of these rights, contact us at{" "}
              <a
                href={`mailto:${contactInfo.email}`}
                className="link-underline font-medium text-fg/90 transition-colors hover:text-fg"
              >
                {contactInfo.email}
              </a>
              . We may need to verify your identity before responding. If you are
              located outside The Bahamas, additional rights may apply under your
              local laws.
            </P>
          </Section>

          <Section n={11} title="Children’s Privacy">
            <P>
              Our Site and services are intended for adults and are not directed
              to children. We do not knowingly collect personal information from
              children. If you believe a child has provided us with information,
              please contact us so we can remove it.
            </P>
          </Section>

          <Section n={12} title="International Visitors">
            <P>
              We are based in The Bahamas, and your information may be processed
              here and by our service providers, which may be located in other
              countries. By using our Site or services, you understand that your
              information may be transferred to and processed in locations
              outside your country of residence.
            </P>
          </Section>

          <Section n={13} title="Changes to This Policy">
            <P>
              We may update this Privacy Policy from time to time. When we do, we
              will revise the “Last updated” date above. Significant changes may
              be communicated through the Site. Your continued use of the Site or
              services after changes take effect constitutes acceptance of the
              updated policy.
            </P>
          </Section>

          <Section n={14} title="Contact Us">
            <P>
              If you have questions or requests regarding this Privacy Policy or
              your personal information:
            </P>
            <div className="glass hairline rounded-2xl p-6">
              <p className="font-semibold text-fg">Ashro Design</p>
              <ul className="mt-3 space-y-1.5 text-[0.95rem] leading-relaxed text-muted">
                <li>
                  Email:{" "}
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="link-underline text-fg/90 transition-colors hover:text-fg"
                  >
                    {contactInfo.email}
                  </a>
                </li>
                <li>
                  Phone:{" "}
                  <a
                    href={`tel:${contactInfo.phoneHref}`}
                    className="link-underline text-fg/90 transition-colors hover:text-fg"
                  >
                    {contactInfo.phone}
                  </a>
                </li>
                <li>Web: ashrodesign.net</li>
                <li>Nassau, New Providence, The Bahamas</li>
              </ul>
            </div>
          </Section>
        </div>
      </main>
      <Footer linkPrefix="/" />
    </>
  );
}
