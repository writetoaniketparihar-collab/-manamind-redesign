"use client";

import { INVESTORS, PARTNERS } from "@/lib/constants";
import { FadeInView } from "@/components/animations/FadeInView";
import { motion } from "framer-motion";

function ScrollingRow({
  items,
  direction = "left",
  label,
}: {
  items: { name: string; logo: string | null }[];
  direction?: "left" | "right";
  label: string;
}) {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="space-y-4">
      <span className="block text-center font-mono text-xs font-semibold uppercase tracking-widest text-text-muted">
        {label}
      </span>
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />

        <motion.div
          className="flex gap-8"
          style={{ width: "max-content" }}
          animate={{
            x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
          }}
          transition={{
            x: {
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {repeated.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className="flex shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] px-8 py-4"
            >
              <span className="whitespace-nowrap text-sm font-medium text-text-muted">
                {item.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export function LogoCarousel() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <div className="mx-auto max-w-4xl text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
              Our Ecosystem
            </span>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
              Backed by the best
            </h2>
            <p className="mt-4 text-lg text-text-muted">
              Investors and partners powering the future of autonomous QA.
            </p>
          </div>
        </FadeInView>

        <div className="mt-16 space-y-10">
          <ScrollingRow items={INVESTORS} direction="left" label="Investors" />
          <ScrollingRow items={PARTNERS} direction="right" label="Partners" />
        </div>
      </div>
    </section>
  );
}
