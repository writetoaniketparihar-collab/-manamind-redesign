"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FadeInView } from "@/components/animations/FadeInView";

const comparisons = [
  {
    metric: "Test Coverage",
    manual: { value: "~15%", detail: "of game surface tested per cycle" },
    mana: { value: "98%+", detail: "autonomous coverage in a single run" },
  },
  {
    metric: "Time to First Bug",
    manual: { value: "Days", detail: "of scripted test writing & execution" },
    mana: { value: "Minutes", detail: "from deploy to first discovery" },
  },
  {
    metric: "Parallel Sessions",
    manual: { value: "1", detail: "human tester per session" },
    mana: { value: "100+", detail: "concurrent autonomous agents" },
  },
  {
    metric: "Integration Required",
    manual: { value: "Weeks", detail: "of SDK setup, scripting, maintenance" },
    mana: { value: "Zero", detail: "no code access, no SDK, no API keys" },
  },
  {
    metric: "Regression Testing",
    manual: { value: "Repeat", detail: "the same scripts every release" },
    mana: { value: "Adaptive", detail: "bots learn and explore new paths" },
  },
];

function AnimatedCounter({ text, inView }: { text: string; inView: boolean }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
      } else {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [inView, text]);

  return <span>{inView ? displayed : ""}</span>;
}

function ComparisonRow({
  item,
  index,
  inView,
}: {
  item: (typeof comparisons)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="group relative"
    >
      {/* Metric label */}
      <div className="mb-3">
        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-text-muted">
          {item.metric}
        </span>
      </div>

      {/* Comparison bars */}
      <div className="grid grid-cols-2 gap-3">
        {/* Manual QA side */}
        <div className="relative overflow-hidden rounded-xl border border-white/5 bg-[#1a0a22] p-5">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent" />
          <div className="relative">
            <p className="font-mono text-2xl font-bold text-red-400/80 md:text-3xl">
              <AnimatedCounter text={item.manual.value} inView={inView} />
            </p>
            <p className="mt-1 text-xs leading-relaxed text-text-muted/70">
              {item.manual.detail}
            </p>
          </div>
        </div>

        {/* ManaMind side */}
        <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-[#0a1a15] p-5">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
          {/* Glow pulse */}
          <motion.div
            className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-primary/10 blur-2xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
          />
          <div className="relative">
            <p className="font-mono text-2xl font-bold text-primary md:text-3xl">
              <AnimatedCounter text={item.mana.value} inView={inView} />
            </p>
            <p className="mt-1 text-xs leading-relaxed text-text-muted">
              {item.mana.detail}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function LivePulse() {
  return (
    <span className="relative ml-2 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
      <motion.span
        className="h-1.5 w-1.5 rounded-full bg-primary"
        animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      Live
    </span>
  );
}

export function ValueProps() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<"compare" | "metrics">("compare");

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-white/5 bg-bg-card py-24 md:py-32 overflow-hidden"
    >
      {/* Background grid effect */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,255,150,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,150,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <FadeInView>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
              Why ManaMind
            </span>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              The old way is broken
            </h2>
            <p className="mt-4 text-lg text-text-muted">
              Manual QA can&apos;t keep up. Here&apos;s what changes when AI takes over.
            </p>
          </div>
        </FadeInView>

        {/* Column Headers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="mt-16 mb-8 grid grid-cols-2 gap-3 pl-0"
        >
          <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-2.5">
            <div className="h-2 w-2 rounded-full bg-red-400/60" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-red-400/70">
              Manual QA
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/[0.03] px-4 py-2.5">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
              ManaMind
            </span>
            <LivePulse />
          </div>
        </motion.div>

        {/* Comparison rows */}
        <div className="space-y-4">
          {comparisons.map((item, i) => (
            <ComparisonRow
              key={item.metric}
              item={item}
              index={i}
              inView={isInView}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <FadeInView delay={0.8}>
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-5">
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">
                  Still running manual test scripts?
                </p>
                <p className="text-xs text-text-muted">
                  See how ManaMind finds bugs your team never will.
                </p>
              </div>
              <motion.a
                href="/contact"
                className="ml-4 shrink-0 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-[#0D0515] transition-colors hover:bg-primary/90"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Book a Demo
              </motion.a>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
