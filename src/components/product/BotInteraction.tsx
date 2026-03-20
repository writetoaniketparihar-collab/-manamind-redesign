"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FadeInView } from "@/components/animations/FadeInView";
import { SectionHeading } from "@/components/shared/SectionHeading";

const pipeline = [
  {
    step: "01",
    label: "Capture",
    title: "See the Screen",
    description: "Bots watch the game exactly as a player would with no engine hooks or APIs required.",
    color: "#38BDF8",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10">
        <rect x="4" y="8" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 16l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="22" y="18" width="8" height="1.5" rx="0.75" fill="currentColor" opacity="0.5" />
        <rect x="22" y="22" width="5" height="1.5" rx="0.75" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
  {
    step: "02",
    label: "Understand",
    title: "Reason",
    description: "The system reads UI, recognises objects, and tracks game state to understand what's going on in each frame.",
    color: "#00FF96",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10">
        <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="1.5" fill="currentColor" />
        <path d="M20 6v4M20 30v4M6 20h4M30 20h4" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      </svg>
    ),
  },
  {
    step: "03",
    label: "Decide",
    title: "Plan the Next Action",
    description: "Based on what it sees, each bot chooses what to do next, navigate menus, explore new areas, or test edge cases.",
    color: "#A78BFA",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10">
        <path d="M20 6v6M20 28v6M6 20h6M28 20h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 12l4 4M24 24l4 4M12 28l4-4M24 12l4-4" stroke="currentColor" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
        <circle cx="20" cy="20" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M18 20l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    step: "04",
    label: "Report",
    title: "Log and Report Issues",
    description: "When something goes wrong, ManaMind records the session, generates reproduction steps, and logs a structured bug report.",
    color: "#FF4C54",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10">
        <rect x="8" y="4" width="24" height="32" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 12h12M14 18h12M14 24h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <circle cx="28" cy="30" r="6" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
        <path d="M26 30l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function PipelineStep({
  step,
  index,
  inView,
}: {
  step: (typeof pipeline)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
        className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-bg-card transition-all duration-500 hover:border-white/15"
        style={{
          boxShadow: `0 0 0 0 ${step.color}00`,
        }}
        whileHover={{
          boxShadow: `0 0 40px ${step.color}10`,
        }}
      >
        {/* Top accent line */}
        <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${step.color}60, transparent)` }} />

        <div className="p-6 sm:p-8">
          {/* Step number + label */}
          <div className="mb-5 flex items-center gap-3">
            <span
              className="font-mono text-xs font-bold tracking-widest"
              style={{ color: `${step.color}60` }}
            >
              {step.step}
            </span>
            <span
              className="rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest"
              style={{
                color: step.color,
                backgroundColor: `${step.color}12`,
              }}
            >
              {step.label}
            </span>
          </div>

          {/* Icon */}
          <div
            className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{
              backgroundColor: `${step.color}08`,
              color: step.color,
            }}
          >
            {step.icon}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-foreground">{step.title}</h3>

          {/* Description */}
          <p className="mt-3 text-sm leading-relaxed text-text-muted">
            {step.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export function BotInteraction() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="border-t border-white/5 bg-bg-card py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <SectionHeading
            label="How It Works"
            title="From gameplay to actionable bug reports"
            description="ManaMind watches and plays your game through the screen, just like a human tester."
          />
        </FadeInView>

        {/* Pipeline grid */}
        <div className="mt-16 grid gap-6 lg:grid-cols-4 lg:gap-8">
          {pipeline.map((step, i) => (
            <PipelineStep
              key={step.step}
              step={step}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* Bottom note */}
        <FadeInView delay={0.8}>
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5">
              <motion.span
                className="h-2 w-2 rounded-full bg-primary"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-primary">
                This entire loop runs continuously and autonomously, without the need for manual input or supervision
              </span>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
