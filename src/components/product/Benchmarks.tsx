"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FadeInView } from "@/components/animations/FadeInView";
import { SectionHeading } from "@/components/shared/SectionHeading";

const benchmarks = [
  {
    metric: "Regression Time",
    value: "6 hours",
    comparison: "vs. 3 days",
    description: "Full regression cycles completed in hours, not days",
    color: "#00FF96",
  },
  {
    metric: "Bug Detection",
    value: "86%",
    comparison: "of critical bugs",
    description: "Critical bugs caught before shipping",
    color: "#38BDF8",
  },
  {
    metric: "Parallel Coverage",
    value: "20+",
    comparison: "device configs",
    description: "Device configurations tested per run",
    color: "#A78BFA",
  },
];

export function Benchmarks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <SectionHeading
            label="Performance Benchmarks"
            title="Results that speak for themselves"
          />
        </FadeInView>

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
          {benchmarks.map((item, i) => (
            <motion.div
              key={i}
              className="rounded-2xl border border-white/[0.07] bg-bg-card p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                {item.metric}
              </p>
              <p
                className="mt-4 text-4xl font-bold md:text-5xl"
                style={{ color: item.color }}
              >
                {item.value}
              </p>
              <p className="mt-2 text-sm font-medium text-text-muted">
                {item.comparison}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-text-muted/70">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
