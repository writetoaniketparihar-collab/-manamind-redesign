import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  Product: [
    { label: "Overview", href: "/product" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Case Studies", href: "/case-studies" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
  ],
  Connect: [
    { label: "Contact", href: "/contact" },
    { label: "Book a Demo", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-bg-card">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/">
              <Image
                src="/manamind-logo.png"
                alt="ManaMind"
                width={160}
                height={33}
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-text-muted">
              Autonomous AI quality assurance for video games. Human-like
              testing at machine scale.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-text-muted">
          &copy; {new Date().getFullYear()} ManaMind. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
