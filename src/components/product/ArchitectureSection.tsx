"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ARCHITECTURE } from "@/lib/constants";
import { FadeInView } from "@/components/animations/FadeInView";
import { SectionHeading } from "@/components/shared/SectionHeading";

const layers = [
  {
    key: "hivemind" as const,
    color: "#00FF96",
    subtitle: "The brain behind autonomous game testing.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M12 2a4 4 0 014 4c0 1.5-.8 2.8-2 3.5v1h2a3 3 0 013 3v1.5M12 2a4 4 0 00-4 4c0 1.5.8 2.8 2 3.5v1H8a3 3 0 00-3 3v1.5M12 2v8.5M5 15v4a2 2 0 002 2h10a2 2 0 002-2v-4" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
    details: [
      "Built from the ground up to understand games and player behaviour",
      "Combines vision, memory, and reasoning to navigate dynamic environments",
      "Learns from every session, improving coverage and accuracy over time",
      "Makes real-time decisions without scripts or predefined paths",
    ],
  },
  {
    key: "commandCentre" as const,
    color: "#FF4C54",
    subtitle: "The control dashboard.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4M6 8h.01M9 8h.01M6 11h4" />
        <rect x="14" y="7" width="4" height="6" rx="0.5" fill="currentColor" opacity="0.3" />
      </svg>
    ),
    details: [
      "Real-time dashboard showing live bot activity and coverage",
      "Configure test objectives, priorities, and focus areas",
      "Review, triage, and assign issues with severity classification",
      "Export structured reports into your existing QA workflow",
    ],
  },
  {
    key: "legion" as const,
    color: "#A78BFA",
    subtitle: "The orchestration swarm.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M4 6h16M4 12h16M4 18h16" />
        <circle cx="8" cy="6" r="2" fill="currentColor" opacity="0.3" />
        <circle cx="16" cy="12" r="2" fill="currentColor" opacity="0.3" />
        <circle cx="10" cy="18" r="2" fill="currentColor" opacity="0.3" />
      </svg>
    ),
    details: [
      "Dynamically spawns and terminates bot instances based on test needs",
      "Distributes bots across environments to maximise coverage and throughput",
      "Coordinates multi-agent exploration to avoid redundant testing paths",
      "Automatically balances workload across available compute resources",
    ],
  },
  {
    key: "bots" as const,
    color: "#38BDF8",
    subtitle: "Autonomous testers.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <rect x="3" y="4" width="7" height="7" rx="1.5" />
        <rect x="14" y="4" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <circle cx="6.5" cy="7.5" r="1" fill="currentColor" opacity="0.5" />
        <circle cx="17.5" cy="7.5" r="1" fill="currentColor" opacity="0.5" />
        <circle cx="6.5" cy="17.5" r="1" fill="currentColor" opacity="0.5" />
        <circle cx="17.5" cy="17.5" r="1" fill="currentColor" opacity="0.5" />
      </svg>
    ),
    details: [
      "Expands test coverage beyond what manual QA can realistically achieve",
      "Executes test sessions continuously without fatigue or bias",
      "Runs in parallel to compress weeks of testing into hours",
      "Covers edge cases and player behaviours human testers rarely reach",
    ],
  },
];

function ExpandedDetails({ details, color }: { details: string[]; color: string }) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <div className="grid gap-3 pt-6 sm:grid-cols-2">
        {details.map((detail, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="flex items-start gap-3"
          >
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-sm leading-relaxed text-text-muted">{detail}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function ArchitectureSection() {
  const [expanded, setExpanded] = useState<string | null>("hivemind");

  return (
    <section id="architecture" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <SectionHeading
            label="Architecture"
            title="Architecture designed for fully autonomous testing"
            description="Four coordinated layers, from perception to execution."
            titleClassName="text-xl md:text-2xl lg:text-3xl"
          />
        </FadeInView>

        <div className="mx-auto mt-16 max-w-3xl">
          {layers.map((layer, i) => {
            const data = ARCHITECTURE[layer.key];
            const isExpanded = expanded === layer.key;

            return (
              <FadeInView key={layer.key} delay={i * 0.12}>
                <div className="relative">
                  {/* Connector line */}
                  {i < layers.length - 1 && (
                    <div className="absolute left-8 top-full z-0 h-4 w-px bg-gradient-to-b from-white/10 to-transparent" />
                  )}

                  <motion.button
                    onClick={() => setExpanded(isExpanded ? null : layer.key)}
                    className="group relative mb-4 w-full cursor-pointer overflow-hidden rounded-2xl border text-left transition-colors"
                    style={{
                      borderColor: isExpanded ? `${layer.color}40` : "rgba(255,255,255,0.07)",
                      backgroundColor: isExpanded ? `${layer.color}06` : "rgba(30,13,38,0.6)",
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.995 }}
                  >
                    {/* Active indicator bar */}
                    <motion.div
                      className="absolute left-0 top-0 h-full w-1 rounded-l-2xl"
                      style={{ backgroundColor: layer.color }}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: isExpanded ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className="p-6 sm:p-8">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          {/* Icon */}
                          <div
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                            style={{
                              backgroundColor: `${layer.color}12`,
                              color: layer.color,
                            }}
                          >
                            {layer.icon}
                          </div>

                          <div>
                            {/* Layer number + name */}
                            <div className="flex items-center gap-3">
                              <span
                                className="font-mono text-xs font-semibold uppercase tracking-widest"
                                style={{ color: `${layer.color}80` }}
                              >
                                Layer {String(i + 1).padStart(2, "0")}
                              </span>
                            </div>
                            <h3
                              className="mt-0.5 text-xl font-bold"
                              style={{ color: isExpanded ? layer.color : "var(--foreground)" }}
                            >
                              {data.name}
                            </h3>
                            <p className="mt-0.5 text-xs text-text-muted">
                              {layer.subtitle}
                            </p>
                          </div>
                        </div>

                        {/* Expand indicator */}
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-text-muted"
                        >
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                          </svg>
                        </motion.div>
                      </div>

                      <p className="mt-3 text-sm leading-relaxed text-text-muted">
                        {data.description}
                      </p>

                      <AnimatePresence>
                        {isExpanded && (
                          <ExpandedDetails details={layer.details} color={layer.color} />
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.button>
                </div>
              </FadeInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}
