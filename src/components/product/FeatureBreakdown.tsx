"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FadeInView } from "@/components/animations/FadeInView";
import { SectionHeading } from "@/components/shared/SectionHeading";

const features = [
  {
    title: "Exploration",
    headline: "Every corner. Every path.",
    description:
      "Bots autonomously navigate game worlds, discovering areas, interacting with objects, and testing boundaries — just like a real player. They build spatial maps and remember where they've been.",
    color: "#00FF96",
    visual: ExplorationVisual,
  },
  {
    title: "Detection",
    headline: "See what humans miss.",
    description:
      "Visual anomalies, physics glitches, UI bugs, crash triggers, z-fighting, texture pop-in — our bots identify issues across every layer of the game simultaneously.",
    color: "#FF4C54",
    visual: DetectionVisual,
  },
  {
    title: "Reporting",
    headline: "Actionable from the start.",
    description:
      "Every bug comes with video evidence, step-by-step reproduction, severity classification, and contextual metadata. Your dev team gets actionable tickets — not noise.",
    color: "#A78BFA",
    visual: ReportingVisual,
  },
];

// Animated pathfinding trails visual
function ExplorationVisual({ inView }: { inView: boolean }) {
  const paths = [
    "M 10 80 Q 25 60 30 45 T 55 30 T 80 20",
    "M 10 80 Q 20 70 35 65 T 60 55 T 90 35",
    "M 10 80 Q 30 75 40 60 T 50 45 T 70 50 T 85 60",
  ];
  const colors = ["#00FF96", "#00FF9680", "#00FF9640"];

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      {/* Grid dots */}
      {Array.from({ length: 100 }).map((_, i) => (
        <circle
          key={i}
          cx={(i % 10) * 10 + 5}
          cy={Math.floor(i / 10) * 10 + 5}
          r="0.4"
          fill="rgba(255,255,255,0.06)"
        />
      ))}

      {/* Animated paths */}
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke={colors[i]}
          strokeWidth={i === 0 ? "1.2" : "0.6"}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 2, delay: 0.5 + i * 0.4, ease: "easeInOut" }}
        />
      ))}

      {/* Start node */}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.3 }}
      >
        <circle cx="10" cy="80" r="4" fill="#00FF9620" stroke="#00FF96" strokeWidth="0.8" />
        <text x="10" y="80" textAnchor="middle" dominantBaseline="central" fill="#00FF96" fontSize="3" fontFamily="monospace" fontWeight="700">
          S
        </text>
      </motion.g>

      {/* Discovery nodes */}
      {[
        { x: 80, y: 20, delay: 2.5 },
        { x: 90, y: 35, delay: 3.0 },
        { x: 85, y: 60, delay: 3.5 },
      ].map((node, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: node.delay, type: "spring" }}
        >
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="5"
            fill="none"
            stroke="#00FF9640"
            strokeWidth="0.4"
            animate={{ r: [5, 8, 5], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
          />
          <circle cx={node.x} cy={node.y} r="2.5" fill="#00FF9615" stroke="#00FF96" strokeWidth="0.6" />
        </motion.g>
      ))}
    </svg>
  );
}

// Scanning grid with detected anomalies
function DetectionVisual({ inView }: { inView: boolean }) {
  const anomalies = [
    { x: 30, y: 25, severity: "high" },
    { x: 70, y: 45, severity: "medium" },
    { x: 50, y: 75, severity: "high" },
    { x: 85, y: 20, severity: "low" },
  ];

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      {/* Scan grid */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.line
          key={`h-${i}`}
          x1="0"
          y1={i * 10 + 5}
          x2="100"
          y2={i * 10 + 5}
          stroke="rgba(255,76,84,0.06)"
          strokeWidth="0.3"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.8, delay: i * 0.05 }}
        />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.line
          key={`v-${i}`}
          x1={i * 10 + 5}
          y1="0"
          x2={i * 10 + 5}
          y2="100"
          stroke="rgba(255,76,84,0.06)"
          strokeWidth="0.3"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.8, delay: i * 0.05 }}
        />
      ))}

      {/* Scan line sweep */}
      <motion.line
        x1="0"
        y1="0"
        x2="100"
        y2="0"
        stroke="#FF4C54"
        strokeWidth="0.8"
        initial={{ y1: 0, y2: 0 }}
        animate={inView ? { y1: [0, 100, 0], y2: [0, 100, 0] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
        opacity={0.4}
      />

      {/* Anomaly markers */}
      {anomalies.map((a, i) => {
        const color = a.severity === "high" ? "#FF4C54" : a.severity === "medium" ? "#FBBF24" : "#38BDF8";
        return (
          <motion.g
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1.5 + i * 0.3, type: "spring", stiffness: 200 }}
          >
            {/* Pulse ring */}
            <motion.circle
              cx={a.x}
              cy={a.y}
              r="4"
              fill="none"
              stroke={color}
              strokeWidth="0.3"
              animate={{ r: [4, 8, 4], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            />
            {/* Target crosshair */}
            <circle cx={a.x} cy={a.y} r="3.5" fill={`${color}10`} stroke={color} strokeWidth="0.5" />
            <line x1={a.x - 5} y1={a.y} x2={a.x - 2} y2={a.y} stroke={color} strokeWidth="0.3" opacity="0.6" />
            <line x1={a.x + 2} y1={a.y} x2={a.x + 5} y2={a.y} stroke={color} strokeWidth="0.3" opacity="0.6" />
            <line x1={a.x} y1={a.y - 5} x2={a.x} y2={a.y - 2} stroke={color} strokeWidth="0.3" opacity="0.6" />
            <line x1={a.x} y1={a.y + 2} x2={a.x} y2={a.y + 5} stroke={color} strokeWidth="0.3" opacity="0.6" />
            {/* Severity label */}
            <text
              x={a.x}
              y={a.y - 6}
              textAnchor="middle"
              fill={color}
              fontSize="2"
              fontFamily="monospace"
              fontWeight="600"
            >
              {a.severity.toUpperCase()}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}

// Document assembly animation
function ReportingVisual({ inView }: { inView: boolean }) {
  const reportLines = [
    { label: "BUG-1042", color: "#FF4C54", w: 35 },
    { label: "Severity: Critical", color: "#FF4C54", w: 42 },
    { label: "Repro: 12 steps", color: "#A78BFA", w: 38 },
    { label: "Video: 00:34", color: "#38BDF8", w: 30 },
    { label: "Screenshot ×3", color: "#38BDF8", w: 33 },
    { label: "Context: Menu > Shop", color: "#A78BFA", w: 45 },
  ];

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      {/* Document outline */}
      <motion.rect
        x="15"
        y="5"
        width="70"
        height="90"
        rx="3"
        fill="rgba(167,139,250,0.03)"
        stroke="rgba(167,139,250,0.2)"
        strokeWidth="0.5"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      />

      {/* Header */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
      >
        <rect x="15" y="5" width="70" height="14" rx="3" fill="rgba(167,139,250,0.06)" />
        <text x="50" y="14" textAnchor="middle" fill="#A78BFA" fontSize="3.5" fontFamily="monospace" fontWeight="700">
          BUG REPORT
        </text>
      </motion.g>

      {/* Report lines appearing one by one */}
      {reportLines.map((line, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.6 + i * 0.2, duration: 0.4 }}
        >
          <rect
            x="22"
            y={24 + i * 11}
            width={line.w}
            height="7"
            rx="1.5"
            fill={`${line.color}08`}
            stroke={`${line.color}25`}
            strokeWidth="0.3"
          />
          <text
            x="25"
            y={28.5 + i * 11}
            fill={line.color}
            fontSize="2.5"
            fontFamily="monospace"
          >
            {line.label}
          </text>
        </motion.g>
      ))}

      {/* Checkmark at bottom */}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 2.2, type: "spring" }}
      >
        <circle cx="75" cy="85" r="6" fill="#00FF9615" stroke="#00FF96" strokeWidth="0.5" />
        <motion.path
          d="M72 85l2 2 4-4"
          fill="none"
          stroke="#00FF96"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ delay: 2.4, duration: 0.3 }}
        />
      </motion.g>
    </svg>
  );
}

export function FeatureBreakdown() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <SectionHeading
            label="Capabilities"
            title="What our bots do"
            description="From exploration to reporting, every step is autonomous."
          />
        </FadeInView>

        <div className="mt-16 space-y-20">
          {features.map((feature, i) => {
            const Visual = feature.visual;
            const isReversed = i % 2 === 1;

            return (
              <FadeInView key={feature.title} delay={0.1}>
                <div
                  className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
                  style={{ direction: isReversed ? "rtl" : "ltr" }}
                >
                  {/* Text */}
                  <div style={{ direction: "ltr" }}>
                    <span
                      className="mb-3 inline-block font-mono text-xs font-bold uppercase tracking-widest"
                      style={{ color: feature.color }}
                    >
                      {feature.title}
                    </span>
                    <h3 className="text-2xl font-bold text-foreground md:text-3xl">
                      {feature.headline}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-text-muted">
                      {feature.description}
                    </p>
                  </div>

                  {/* Visual */}
                  <div style={{ direction: "ltr" }}>
                    <div
                      className="aspect-square overflow-hidden rounded-2xl border p-4"
                      style={{
                        borderColor: `${feature.color}15`,
                        backgroundColor: `${feature.color}03`,
                      }}
                    >
                      <Visual inView={inView} />
                    </div>
                  </div>
                </div>
              </FadeInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}
