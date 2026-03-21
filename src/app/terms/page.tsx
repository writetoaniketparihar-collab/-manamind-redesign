import { FadeInView } from "@/components/animations/FadeInView";

export default function TermsPage() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <FadeInView>
          <h1 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Terms of Use
          </h1>
          <p className="mt-4 text-sm text-text-muted">
            Last Updated: 16.01.2026
          </p>
          <p className="text-sm text-text-muted">Company: ManaMind Limited</p>
        </FadeInView>

        <div className="mt-12 space-y-10 text-sm leading-relaxed text-text-muted">
          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">Introduction</h2>
            <p>These Terms govern access to and use of ManaMind&apos;s AI QA automation platform.</p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">Services</h2>
            <p>ManaMind provides AI-driven automated quality assurance tools for game development.</p>
            <p className="mt-2">Services are provided under a separate commercial agreement or order form.</p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">Access &amp; Accounts</h2>
            <p>Customer must:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Provide accurate account information</li>
              <li>Maintain confidentiality of credentials</li>
              <li>Notify us of unauthorised access</li>
            </ul>
            <p className="mt-2">We may suspend access if misuse or security risks arise.</p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">Acceptable Use</h2>
            <p>Customer shall not:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Reverse engineer the platform or attempt to reverse engineer the platform</li>
              <li>Use the platform for unlawful purposes</li>
              <li>Attempt to extract or replicate underlying AI models</li>
              <li>Use the service to infringe intellectual property rights</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">Intellectual Property</h2>
            <p>ManaMind retains all rights to its platform, models, game data, and software.</p>
            <p className="mt-2">Customer retains ownership of its game, and content.</p>
            <p className="mt-2">Customer grants ManaMind a limited licence to process data for the provision and improvement of services.</p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">AI &amp; Output Disclaimer</h2>
            <p>Our system provides automated testing outputs.</p>
            <p className="mt-2">Final QA decisions remain the responsibility of the customer.</p>
            <p className="mt-2">We do not guarantee detection of all defects.</p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">Confidentiality</h2>
            <p>Both parties agree to maintain confidentiality of proprietary information disclosed during the relationship.</p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">Fees &amp; Payment</h2>
            <p>Fees are governed by separate commercial agreement.</p>
            <p className="mt-2">Failure to pay may result in suspension.</p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">Limitation of Liability</h2>
            <p>To the maximum extent permitted by law:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>We are not liable for indirect or consequential damages.</li>
              <li>Liability is capped at fees paid in the preceding 12 months.</li>
            </ul>
            <p className="mt-2">Nothing excludes liability for death, fraud, or statutory rights.</p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">Termination</h2>
            <p>We may terminate for material breach if not cured within 30 days.</p>
            <p className="mt-2">Upon termination:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Access ceases</li>
              <li>Customer data may be deleted per agreement</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">Governing Law</h2>
            <p>These Terms are governed by the laws of England and Wales.</p>
            <p className="mt-2">Disputes shall be subject to the courts of England and Wales.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
