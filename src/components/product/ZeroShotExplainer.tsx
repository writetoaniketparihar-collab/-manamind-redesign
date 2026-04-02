"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FadeInView } from "@/components/animations/FadeInView";
import { SectionHeading } from "@/components/shared/SectionHeading";

const comparisonRows = [
  { aspect: "Test Design", old: "Scripted test cases", new: "Autonomous exploration" },
  { aspect: "Setup", old: "Per-game setup and configuration", new: "Operates on new titles without custom training" },
  { aspect: "Adaptability", old: "Fragile when UI or flow changes", new: "Adapts to new layouts and interactions" },
  { aspect: "Time to Value", old: "Value realised after weeks of setup", new: "Testing begins from the first playable build" },
];


export function ZeroShotExplainer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="border-t border-white/5 bg-bg-card py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <SectionHeading
            label="Zero-Shot Testing"
            title="Start testing immediately - no scripting or training"
            description="Our bots apply prior knowledge of games to operate in new titles without any per-game training or scripting."
          />
        </FadeInView>

        {/* How this differs */}
        <FadeInView delay={0.1}>
          <h3 className="mt-16 text-center text-sm font-semibold uppercase tracking-widest text-text-muted">
            How this differs from traditional automation
          </h3>
        </FadeInView>

        {/* Comparison table */}
        <FadeInView delay={0.2}>
          <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-2xl border border-white/10">
            {/* Table header */}
            <div className="grid grid-cols-[1fr_2fr_auto_2fr] items-center gap-4 border-b border-white/10 bg-white/[0.02] px-6 py-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-text-muted" />
              <span className="text-xs font-semibold uppercase tracking-widest text-highlight">
                Traditional Automation
              </span>
              <span />
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                ManaMind Zero-Shot
              </span>
            </div>

            {/* Rows */}
            {comparisonRows.map((row, i) => (
              <motion.div
                key={i}
                className="grid grid-cols-[1fr_2fr_auto_2fr] items-center gap-4 border-b border-white/5 px-6 py-5 last:border-b-0"
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
              >
                <span className="text-sm font-semibold text-foreground">{row.aspect}</span>
                <span className="text-sm text-highlight/80">{row.old}</span>
                <span className="text-lg text-text-muted/40">›</span>
                <span className="text-sm text-primary">{row.new}</span>
              </motion.div>
            ))}
          </div>
        </FadeInView>

        {/* What enables zero-shot behaviour */}
        <FadeInView delay={0.5}>
          <div className="mx-auto mt-20 max-w-3xl text-center">
            <h3 className="text-xl font-bold text-foreground md:text-2xl">
              What enables zero-shot behaviour
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-text-muted">
              ManaMind&apos;s models are trained across diverse games and UI patterns, allowing them to generalise to new titles without retraining.
            </p>
          </div>
        </FadeInView>

        {/* Closing line */}
        <FadeInView delay={0.7}>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5">
              <motion.span
                className="h-2 w-2 rounded-full bg-primary"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-primary">
                Zero-shot capability turns autonomous testing into persistent infrastructure, not a per-project setup.
              </span>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
