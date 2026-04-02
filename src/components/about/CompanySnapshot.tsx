"use client";

import { motion } from "framer-motion";
import { FadeInView } from "@/components/animations/FadeInView";
import { INVESTORS, PARTNERS, PRESS_MENTIONS } from "@/lib/constants";

const stats = [
  { label: "Founded", value: "2025" },
  { label: "HQ", value: "London" },
];

function PressMarquee() {
  const articles = PRESS_MENTIONS.filter((p) => p.type === "article");
  const podcasts = PRESS_MENTIONS.filter((p) => p.type === "podcast");

  return (
    <div className="space-y-12">
      {/* Featured articles — large editorial style */}
      <div className="grid gap-6 md:grid-cols-2">
        {articles.map((item, i) => (
          <motion.a
            key={item.title}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.07] p-8 transition-all duration-500 hover:border-primary/30"
          >
            {/* Large quotation mark background */}
            <span
              className="pointer-events-none absolute -top-4 -left-2 text-[120px] font-bold leading-none text-white/[0.03] transition-colors duration-500 group-hover:text-primary/[0.06]"
              aria-hidden
            >
              &ldquo;
            </span>

            <span className="relative z-10 mb-3 inline-block font-mono text-[10px] font-bold uppercase tracking-widest text-primary/60">
              Article
            </span>
            <h4 className="relative z-10 text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary md:text-2xl">
              {item.title}
            </h4>
            {item.source && (
              <p className="relative z-10 mt-2 text-xs text-text-muted/50">{item.source}</p>
            )}
          </motion.a>
        ))}
      </div>

      {/* Podcasts — horizontal scroll strip */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {podcasts.map((item, i) => (
          <motion.a
            key={item.title}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="group flex w-72 shrink-0 items-center gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] px-5 py-4 transition-all duration-300 hover:border-primary/30"
          >
            {/* Play icon */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/30 text-primary transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110">
              <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-4 w-4">
                <polygon points="8,5 19,12 8,19" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {item.title}
              </p>
              {item.source && (
                <p className="mt-0.5 truncate text-[11px] text-text-muted/50">{item.source}</p>
              )}
            </div>
          </motion.a>
        ))}
      </div>
    </div>
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
                Press & Media
              </span>
            </div>
          </FadeInView>

          <div className="mx-auto mt-10 max-w-5xl">
            <PressMarquee />
          </div>
        </div>
      </div>
    </section>
  );
}
