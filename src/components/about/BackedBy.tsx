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
      {/* Featured articles, editorial cards with hero image */}
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

      {/* Podcasts, thumbnail cards */}
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
    <section className="border-t border-white/5 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Investors & Partners */}
        <FadeInView>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
              Partnerships
            </span>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              Backed by outliers
            </h2>
            <p className="mt-4 text-base text-text-muted md:text-lg">
              We&rsquo;re proudly supported by a network of investors and partners at the forefront of AI, gaming, and tech.
            </p>
          </div>
        </FadeInView>

        {/* Investors marquee */}
        <FadeInView delay={0.15}>
          <div className="mt-12">
            <h3 className="mb-6 text-center font-mono text-xs font-semibold uppercase tracking-widest text-text-muted">
              Investors
            </h3>
            <div className="relative overflow-hidden">
              <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />
              <motion.div
                className="flex w-max gap-16 py-4"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {[...INVESTORS, ...INVESTORS].map((inv, i) => (
                  <div key={`${inv.name}-${i}`} className="relative flex h-12 w-[160px] shrink-0 items-center justify-center">
                    {inv.logo ? (
                      <Image
                        src={inv.logo}
                        alt={inv.name}
                        fill
                        className="object-contain brightness-0 invert"
                        style={inv.scale ? { transform: `scale(${inv.scale})` } : undefined}
                      />
                    ) : (
                      <span className="whitespace-nowrap text-sm font-medium text-white">{inv.name}</span>
                    )}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </FadeInView>

        {/* Partners marquee */}
        <FadeInView delay={0.25}>
          <div className="mt-12">
            <h3 className="mb-6 text-center font-mono text-xs font-semibold uppercase tracking-widest text-text-muted">
              Partners
            </h3>
            <div className="relative overflow-hidden">
              <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />
              <motion.div
                className="flex w-max gap-16 py-4"
                animate={{ x: ["-50%", "0%"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {[...PARTNERS, ...PARTNERS].map((partner, i) => (
                  <div key={`${partner.name}-${i}`} className="relative flex h-12 w-[160px] shrink-0 items-center justify-center">
                    {partner.logo ? (
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className="object-contain brightness-0 invert"
                        style={partner.scale ? { transform: `scale(${partner.scale})` } : undefined}
                      />
                    ) : (
                      <span className="whitespace-nowrap text-sm font-medium text-white">{partner.name}</span>
                    )}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </FadeInView>

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
