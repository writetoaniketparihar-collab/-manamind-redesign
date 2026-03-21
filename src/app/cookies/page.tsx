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
            Last Updated: 21.03.2026
          </p>
          <p className="text-sm text-text-muted">Company: ManaMind Limited</p>
        </FadeInView>

        <div className="mt-12 space-y-10 text-sm leading-relaxed text-text-muted">
          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">What Are Cookies</h2>
            <p>
              Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work efficiently and to provide information to the website owner.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">How We Use Cookies</h2>
            <p>
              We use a minimal set of cookies to understand how visitors interact with our website. We do not use cookies for advertising, retargeting, or tracking across other websites.
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
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">Essential Storage</h2>
            <p>
              We also store your cookie consent preference in your browser&apos;s local storage. This is not a cookie but is used to remember whether you have accepted or rejected analytics cookies. It does not track you or send data to any third party.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">Your Choices</h2>
            <p>
              When you first visit our website, a banner will ask for your consent before any analytics cookies are set. You can change your preference at any time by clicking &ldquo;Cookie Settings&rdquo; in the footer of any page.
            </p>
            <p className="mt-2">
              You can also control cookies through your browser settings. Most browsers allow you to block or delete cookies. Please note that blocking cookies may affect your experience on the site.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">Contact</h2>
            <p>
              If you have questions about our use of cookies, please contact us at{" "}
              <a href="mailto:contact@manamind.ai" className="text-primary underline transition-colors hover:text-primary/80">
                contact@manamind.ai
              </a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
