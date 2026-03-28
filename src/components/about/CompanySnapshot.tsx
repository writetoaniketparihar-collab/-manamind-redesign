"use client";

import { motion } from "framer-motion";
import { FadeInView } from "@/components/animations/FadeInView";
import { INVESTORS, PARTNERS, PRESS_MENTIONS } from "@/lib/constants";

const stats = [
  { label: "Founded", value: "2025" },
  { label: "HQ", value: "London" },
];

function PressCard({
  item,
  index,
}: {
  item: (typeof PRESS_MENTIONS)[0];
  index: number;
}) {
  const isArticle = item.type === "article";

  return (
    <FadeInView delay={0.1 + index * 0.08}>
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-start gap-4 rounded-xl border border-white/[0.07] bg-background/40 p-5 transition-all duration-300 hover:border-primary/30 hover:bg-primary/[0.03]"
      >
        {/* Type icon */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {isArticle ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
              <rect x="4" y="3" width="16" height="18" rx="2" />
              <path d="M8 7h8M8 11h8M8 15h5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
              <circle cx="12" cy="12" r="10" />
              <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
            </svg>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
            {item.title}
          </p>
          {item.source && (
            <p className="mt-0.5 text-xs text-text-muted">{item.source}</p>
          )}
        </div>

        {/* Arrow */}
        <svg
          className="mt-1 h-4 w-4 shrink-0 text-text-muted transition-transform group-hover:translate-x-1 group-hover:text-primary"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </FadeInView>
  );
}

export function CompanySnapshot() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Stats row */}
        <FadeInView>
          <div className="mx-auto flex max-w-md justify-center gap-16">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <motion.span
                  className="block text-3xl font-bold text-primary md:text-4xl"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {stat.value}
                </motion.span>
                <span className="mt-1 block text-sm text-text-muted">{stat.label}</span>
              </div>
            ))}
          </div>
        </FadeInView>

        {/* Investors & Partners */}
        <div className="mt-20">
          <FadeInView>
            <div className="mx-auto max-w-3xl text-center">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
                Customers
              </span>
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                Backed by leading investors and partners
              </h2>
            </div>
          </FadeInView>

          <div className="mx-auto mt-12 grid max-w-4xl gap-10 md:grid-cols-2">
            {/* Investors */}
            <FadeInView delay={0.15}>
              <div>
                <h3 className="mb-4 text-center font-mono text-xs font-semibold uppercase tracking-widest text-text-muted">
                  Investors
                </h3>
                <div className="space-y-3">
                  {INVESTORS.map((inv, i) => (
                    <motion.div
                      key={inv.name}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.08 }}
                      className="flex items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] px-6 py-3.5"
                    >
                      <span className="text-sm font-medium text-text-muted">{inv.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeInView>

            {/* Partners */}
            <FadeInView delay={0.25}>
              <div>
                <h3 className="mb-4 text-center font-mono text-xs font-semibold uppercase tracking-widest text-text-muted">
                  Partners
                </h3>
                <div className="space-y-3">
                  {PARTNERS.map((partner, i) => (
                    <motion.div
                      key={partner.name}
                      initial={{ opacity: 0, x: 15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.08 }}
                      className="flex items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] px-6 py-3.5"
                    >
                      <span className="text-sm font-medium text-text-muted">{partner.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeInView>
          </div>
        </div>

        {/* Press */}
        <div className="mt-20">
          <FadeInView>
            <div className="mx-auto max-w-3xl text-center">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
                Press
              </span>
            </div>
          </FadeInView>

          <div className="mx-auto mt-6 max-w-2xl space-y-3">
            {PRESS_MENTIONS.map((item, i) => (
              <PressCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
