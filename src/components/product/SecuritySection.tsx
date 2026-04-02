"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FadeInView } from "@/components/animations/FadeInView";

const pillars = [
  {
    title: "No Source Code Access Required",
    description:
      "ManaMind interacts with games exclusively through rendered frames and standard input signals. It does not require access to source code, engine internals, or proprietary debugging interfaces.",
    subtitle: "Operate without exposing your codebase or internal tools",
    color: "#00FF96",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <path d="M14 20V16a10 10 0 0120 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <rect x="10" y="20" width="28" height="22" rx="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="31" r="3" fill="currentColor" opacity="0.4" />
        <path d="M24 34v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    layers: [
      { label: "Reduces risk compared to tools that require deep engine integration", status: "allowed" },
      { label: "Works with closed-source or externally developed titles", status: "allowed" },
      { label: "Simplifies security reviews and internal approvals", status: "allowed" },
    ],
  },
  {
    title: "Data Handling & Storage",
    description:
      "ManaMind records gameplay sessions only to generate bug reports, reproduction steps, and visual evidence. Data collection is limited to what is required for testing and debugging.",
    subtitle: "Clear boundaries around what is stored and retained",
    color: "#38BDF8",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <rect x="6" y="6" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
        <rect x="26" y="6" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
        <rect x="6" y="26" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
        <rect x="26" y="26" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M22 14h4M14 22v4M34 22v4M22 34h4" stroke="currentColor" strokeWidth="1.5" opacity="0.3" strokeDasharray="2 2" />
      </svg>
    ),
    layers: [
      { label: "Captures frames and interaction logs for issue reproduction", status: "allowed" },
      { label: "Does not extract or store unrelated internal data", status: "allowed" },
      { label: "Retention policies can be configured based on studio requirements", status: "allowed" },
    ],
  },
  {
    title: "Deployment Flexibility",
    description:
      "To accommodate different studio policies, ManaMind can be deployed in controlled infrastructure rather than requiring builds to be uploaded to public cloud services.",
    subtitle: "Run in environments that match your security model",
    color: "#A78BFA",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <path d="M24 4l16 8v12c0 10-7 18-16 22C15 42 8 34 8 24V12l16-8z" stroke="currentColor" strokeWidth="2" />
        <path d="M18 24l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    layers: [
      { label: "Supports secure cloud environments or isolated deployments", status: "allowed" },
      { label: "Suitable for projects under NDA or platform-holder restrictions", status: "allowed" },
      { label: "Enables integration into existing secure CI or build pipelines", status: "allowed" },
    ],
  },
];

function SecurityPillar({
  pillar,
  index,
  inView,
}: {
  pillar: (typeof pillars)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-bg-card"
    >
      {/* Top glow */}
      <div
        className="h-px w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${pillar.color}50, transparent)` }}
      />

      <div className="p-8">
        {/* Icon */}
        <div
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${pillar.color}08`, color: pillar.color }}
        >
          {pillar.icon}
        </div>

        {/* Title & description */}
        <h3 className="text-xl font-bold text-foreground">{pillar.title}</h3>
        {pillar.subtitle && (
          <p className="mt-1 text-xs text-text-muted">{pillar.subtitle}</p>
        )}
        <p className="mt-3 text-sm leading-relaxed text-text-muted">{pillar.description}</p>

        {/* Access matrix */}
        <div className="mt-6 space-y-2.5">
          {pillar.layers.map((layer, i) => (
            <motion.div
              key={layer.label}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6 + index * 0.15 + i * 0.1 }}
              className="flex items-center justify-between rounded-lg border border-white/[0.04] bg-background/30 px-3 py-2"
            >
              <span className="font-mono text-xs text-text-muted">{layer.label}</span>
              {layer.status === "blocked" ? (
                <span className="flex items-center gap-1 font-mono text-[10px] font-bold uppercase text-highlight">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  Blocked
                </span>
              ) : (
                <span className="flex items-center gap-1 font-mono text-[10px] font-bold uppercase text-primary">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 6l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Active
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function SecuritySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="border-t border-white/5 bg-bg-card py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
              Security & Privacy
            </span>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Built for unreleased and sensitive builds
            </h2>
            <p className="mt-4 text-lg text-text-muted">
              ManaMind is designed for confidential environments, from early prototypes to pre-release builds, while minimising system access to your assets.
            </p>
          </div>
        </FadeInView>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <SecurityPillar key={pillar.title} pillar={pillar} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
