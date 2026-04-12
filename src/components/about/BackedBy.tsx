"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FadeInView } from "@/components/animations/FadeInView";
import { INVESTORS, PARTNERS, PRESS_MENTIONS } from "@/lib/constants";

function PressMarquee() {
  const articles = PRESS_MENTIONS.filter((p) => p.type === "article");
  const podcasts = PRESS_MENTIONS.filter((p) => p.type === "podcast");

  return (
    <div className="space-y-14">
      {/* Featured articles — editorial cards with hero image */}
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
            className="group block overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] transition-all duration-500 hover:border-primary/30"
          >
            {/* Hero image */}
            <div className="relative aspect-[16/9] overflow-hidden bg-black/40">
              {item.thumbnail && (
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Meta */}
            <div className="p-6 md:p-8">
              <span className="mb-3 inline-block font-mono text-[10px] font-bold uppercase tracking-widest text-primary/60">
                {item.source ?? "Article"}
              </span>
              <h4 className="text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary md:text-xl">
                {item.title}
              </h4>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Podcasts — thumbnail cards */}
      <div>
        <h3 className="mb-5 text-center font-mono text-[10px] font-bold uppercase tracking-widest text-primary/60">
          Podcasts
        </h3>
        <div className="grid gap-6 md:grid-cols-3">
          {podcasts.map((item, i) => (
            <motion.a
              key={item.title}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="group block overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02] transition-all duration-300 hover:border-primary/30"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-black/40">
                {item.thumbnail && (
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}
                {/* Subtle dark overlay for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-black/40 text-white backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-primary group-hover:bg-primary/20 group-hover:text-primary">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-5 w-5">
                      <polygon points="8,5 19,12 8,19" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Meta */}
              <div className="p-5">
                {item.source && (
                  <p className="mb-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-primary/60">
                    {item.source}
                  </p>
                )}
                <p className="line-clamp-3 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                  {item.title}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BackedBy() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Investors & Partners */}
        <FadeInView>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
              Customers
            </span>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              Backed by outliers
            </h2>
            <p className="mt-4 text-base text-text-muted md:text-lg">
              We&rsquo;re proudly supported by a network of investors and partners at the forefront of AI, gaming, and tech.
            </p>
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
                    className="group flex h-20 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] px-6 transition-colors hover:border-primary/30"
                  >
                    {inv.logo ? (
                      <Image
                        src={inv.logo}
                        alt={inv.name}
                        width={160}
                        height={48}
                        className="max-h-12 w-auto object-contain opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                      />
                    ) : (
                      <span className="text-sm font-medium text-text-muted">{inv.name}</span>
                    )}
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
