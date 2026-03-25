import { FadeInView } from "@/components/animations/FadeInView";

export default function PrivacyPage() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <FadeInView>
          <h1 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-text-muted">
            Last Updated: 12.01.2026
          </p>
          <p className="text-sm text-text-muted">Company: ManaMind Ltd</p>
          <p className="text-sm text-text-muted">Registered in England &amp; Wales</p>
          <p className="text-sm text-text-muted">
            Contact:{" "}
            <a href="mailto:emil@manamind.ai" className="text-primary hover:text-primary/80">
              emil@manamind.ai
            </a>
          </p>
        </FadeInView>

        <div className="mt-12 space-y-10 text-sm leading-relaxed text-text-muted">
          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">Introduction</h2>
            <p>
              ManaMind Ltd (&ldquo;ManaMind&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;,
              &ldquo;our&rdquo;) provides AI-powered QA automation software for video game
              development studios.
            </p>
            <p className="mt-2">
              We are committed to protecting personal data in accordance with the UK GDPR and the
              Data Protection Act 2018.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">What Data We Collect</h2>
            <p>We may collect:</p>

            <h3 className="mt-4 mb-2 font-semibold text-foreground">A. Business Contact Data</h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>Name</li>
              <li>Work email address</li>
              <li>Company name</li>
              <li>Job title</li>
              <li>Phone number</li>
            </ul>

            <h3 className="mt-4 mb-2 font-semibold text-foreground">B. Account &amp; Usage Data</h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>Login credentials</li>
              <li>IP address</li>
              <li>Device/browser metadata</li>
              <li>Platform usage logs</li>
              <li>Error logs</li>
            </ul>

            <h3 className="mt-4 mb-2 font-semibold text-foreground">C. Test Environment Data</h3>
            <p>Our software may process data within customer game environments, which may include:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Game telemetry</li>
              <li>System logs</li>
              <li>Debug data</li>
              <li>Non-production test accounts</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Lawful Basis for Processing
            </h2>
            <p>We process data under:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Contractual necessity (to deliver services)</li>
              <li>Legitimate interests (product improvement, security)</li>
              <li>Legal obligations</li>
              <li>Consent (where required)</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">How We Use Data</h2>
            <p>We use data to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Provide and operate our services</li>
              <li>Improve model performance</li>
              <li>Ensure security and fraud prevention</li>
              <li>Communicate with customers</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p className="mt-2">We do not sell personal data.</p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">Data Sharing</h2>
            <p>We may share data with:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Cloud infrastructure providers (e.g. hosting providers)</li>
              <li>Analytics providers</li>
              <li>Professional advisers</li>
              <li>Regulators where required by law</li>
            </ul>
            <p className="mt-2">
              All third parties are bound by confidentiality and data protection obligations.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">International Transfers</h2>
            <p>
              If data is transferred outside the UK, we ensure appropriate safeguards (e.g. Standard
              Contractual Clauses).
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">Data Retention</h2>
            <p>We retain data only as long as necessary to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Fulfil contractual obligations</li>
              <li>Comply with legal requirements</li>
              <li>Resolve disputes</li>
            </ul>
            <p className="mt-2">
              Test environment data is retained according to contractual agreement.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">Security</h2>
            <p>
              We implement appropriate technical and organisational safeguards, including:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Access controls</li>
              <li>Encryption in transit</li>
              <li>Role-based permissions</li>
              <li>Secure cloud infrastructure</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">Data Subject Rights</h2>
            <p>Individuals have the right to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Access their data</li>
              <li>Request correction</li>
              <li>Request deletion</li>
              <li>Restrict processing</li>
              <li>Object to processing</li>
              <li>Lodge a complaint with the UK ICO</li>
            </ul>
            <p className="mt-2">
              Contact:{" "}
              <a href="mailto:emil@manamind.ai" className="text-primary hover:text-primary/80">
                emil@manamind.ai
              </a>
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">Updates</h2>
            <p>
              We may update this policy periodically. The latest version will be available on our
              website.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
