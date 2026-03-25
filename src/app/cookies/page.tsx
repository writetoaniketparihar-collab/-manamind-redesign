import Link from "next/link";
import { FadeInView } from "@/components/animations/FadeInView";

export default function CookiePolicyPage() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <FadeInView>
          <h1 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Cookie Policy
          </h1>
          <p className="mt-4 text-sm text-text-muted">
            Last Updated: 21 March 2026
          </p>
          <p className="text-sm text-text-muted">Company: ManaMind Limited</p>
        </FadeInView>

        <div className="mt-12 space-y-10 text-sm leading-relaxed text-text-muted">
          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">What Are Cookies</h2>
            <p>
              Cookies are small text files placed on your device when you visit a website. They help
              websites function properly and provide information about how the site is used.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">Cookies We Use</h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.03]">
                    <th className="px-4 py-3 font-semibold text-foreground">Cookie</th>
                    <th className="px-4 py-3 font-semibold text-foreground">Provider</th>
                    <th className="px-4 py-3 font-semibold text-foreground">Purpose</th>
                    <th className="px-4 py-3 font-semibold text-foreground">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="px-4 py-3 font-mono text-xs">_ga</td>
                    <td className="px-4 py-3">Google Analytics</td>
                    <td className="px-4 py-3">Distinguishes unique visitors</td>
                    <td className="px-4 py-3">2 years</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="px-4 py-3 font-mono text-xs">_ga_*</td>
                    <td className="px-4 py-3">Google Analytics</td>
                    <td className="px-4 py-3">Maintains session state</td>
                    <td className="px-4 py-3">2 years</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-4">Google Analytics collects information such as:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Pages visited</li>
              <li>Time spent on pages</li>
              <li>Device and browser information</li>
              <li>IP address (processed in anonymised form where possible)</li>
            </ul>
            <p className="mt-2">
              This information helps us understand how our website is used and improve its
              performance.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">Third-Party Processing</h2>
            <p>
              Analytics data is processed by Google LLC on our behalf. Google may process this data
              on servers located outside the United Kingdom. We rely on appropriate safeguards for
              international data transfers.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">Consent</h2>
            <p>
              Analytics cookies are only set after you provide your consent via the cookie banner.
              You may withdraw or change your consent at any time using the &ldquo;Cookie
              Settings&rdquo; link in the website footer.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">Essential Storage</h2>
            <p>
              We store your cookie consent preference in your browser using local storage.
            </p>
            <p className="mt-2">
              This storage is necessary to remember your choice and is treated similarly to cookies
              under applicable privacy laws.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">Managing Cookies</h2>
            <p>
              You can manage or delete cookies through your browser settings. Blocking cookies may
              affect website functionality.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              More Information &amp; Contact
            </h2>
            <p>
              For more information on how we process personal data, or for questions about cookies
              and data processing, please see our{" "}
              <Link href="/privacy" className="text-primary underline transition-colors hover:text-primary/80">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
