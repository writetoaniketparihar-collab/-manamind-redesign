"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FadeInView } from "@/components/animations/FadeInView";
import { BotModel } from "@/components/home/BotModel";

const bots = [
  {
    name: "Probe",
    role: "The Explorer",
    headline: "Explores your game like a real player",
    description:
      "Probe navigates your game autonomously — opening menus, interacting with NPCs, exploring worlds, and pushing boundaries. No scripts, no code access. Just pure human-like curiosity at machine speed.",
    color: "#00FF96",
    visual: {
      label: "PROBE — ACTIVE SESSION",
      items: [
        { label: "Code access needed", value: "None", suffix: "" },
        { label: "Training data needed", value: "None", suffix: "" },
        { label: "Parallel instances", value: "100", suffix: "+" },
        { label: "Uptime", value: "24", suffix: "/7" },
      ],
    },
  },
  {
    name: "Overseer",
    role: "The Coordinator",
    headline: "Coordinates and adapts in real time",
    description:
      "Overseer monitors every active session, spots patterns across multiple Probes, and decides where to focus next. It ensures complete coverage and catches what individual bots might miss.",
    color: "#FF4C54",
    visual: {
      label: "OVERSEER — MONITORING",
      items: [
        { label: "Parallel sessions", value: "100", suffix: "+" },
        { label: "Real-time adaptation", value: "24", suffix: "/7" },
        { label: "Auto-prioritisation", value: "100", suffix: "%" },
        { label: "Human input needed", value: "0", suffix: "" },
      ],
    },
  },
  {
    name: "Scribe",
    role: "The Reporter",
    headline: "Delivers developer-ready bug reports",
    description:
      "Every bug Scribe finds comes with video evidence, step-by-step reproduction, severity classification, and context. Your dev team gets actionable tickets — not noise.",
    color: "#A78BFA",
    visual: {
      label: "SCRIBE — REPORT OUTPUT",
      items: [
        { label: "Video evidence", value: "100", suffix: "%" },
        { label: "Repro steps", value: "Auto", suffix: "" },
        { label: "Severity rating", value: "Auto", suffix: "" },
        { label: "Export ready", value: "Yes", suffix: "" },
      ],
    },
  },
  {
    name: "Wayfinder",
    role: "The Navigator",
    headline: "Maps every path and hidden route",
    description:
      "Wayfinder systematically charts game worlds, uncovering hidden paths, unreachable areas, and navigation inconsistencies. It builds a complete map of traversable space so no corner goes untested.",
    color: "#38BDF8",
    visual: {
      label: "WAYFINDER — NAVIGATING",
      items: [
        { label: "Areas mapped", value: "100", suffix: "%" },
        { label: "Hidden paths found", value: "Auto", suffix: "" },
        { label: "Nav mesh coverage", value: "100", suffix: "%" },
        { label: "Boundary checks", value: "24", suffix: "/7" },
      ],
    },
    model: {
      path: "/models/Wayfinder",
      obj: "Meshy_AI_Wayfinder_0317142818_texture.obj",
      png: "Meshy_AI_Wayfinder_0317142818_texture.png",
    },
  },
  {
    name: "Gladiator",
    role: "The Fighter",
    headline: "Stress-tests combat and mechanics",
    description:
      "Gladiator throws itself into every fight, tests every weapon combo, and pushes combat systems to their limits. It finds balance issues, exploits, and edge cases in your game mechanics.",
    color: "#F97316",
    visual: {
      label: "GLADIATOR — IN COMBAT",
      items: [
        { label: "Combat scenarios", value: "1000", suffix: "+" },
        { label: "Exploit detection", value: "Auto", suffix: "" },
        { label: "Balance analysis", value: "100", suffix: "%" },
        { label: "Combo coverage", value: "100", suffix: "%" },
      ],
    },
    model: {
      path: "/models/Gladiator",
      obj: "Meshy_AI_Gladiator_0317142924_texture.obj",
      png: "Meshy_AI_Gladiator_0317142924_texture.png",
    },
  },
  {
    name: "Replicator",
    role: "The Cloner",
    headline: "Reproduces bugs with precision",
    description:
      "Replicator takes any reported issue and runs it thousands of times with variations, confirming reproducibility, identifying root causes, and establishing exact conditions for failure.",
    color: "#22D3EE",
    visual: {
      label: "REPLICATOR — REPRODUCING",
      items: [
        { label: "Repro attempts", value: "1000", suffix: "+" },
        { label: "Variation coverage", value: "100", suffix: "%" },
        { label: "Root cause ID", value: "Auto", suffix: "" },
        { label: "Confidence", value: "99", suffix: "%" },
      ],
    },
    model: {
      path: "/models/Replicator",
      obj: "Meshy_AI_Replicator_0317142846_texture.obj",
      png: "Meshy_AI_Replicator_0317142846_texture.png",
    },
  },
  {
    name: "Rosetta",
    role: "The Translator",
    headline: "Tests every language and locale",
    description:
      "Rosetta validates localisation across every supported language — catching text overflow, missing translations, encoding issues, and cultural context errors automatically.",
    color: "#E879F9",
    visual: {
      label: "ROSETTA — TRANSLATING",
      items: [
        { label: "Languages tested", value: "100", suffix: "+" },
        { label: "Text overflow", value: "Auto", suffix: "" },
        { label: "Missing strings", value: "Auto", suffix: "" },
        { label: "Encoding issues", value: "Auto", suffix: "" },
      ],
    },
    model: {
      path: "/models/Rosetta",
      obj: "Meshy_AI_Rosetta_0317143009_texture.obj",
      png: "Meshy_AI_Rosetta_0317143009_texture.png",
    },
  },
  {
    name: "Merchant",
    role: "The Economist",
    headline: "Audits economies and transactions",
    description:
      "Merchant tests in-game economies, shop systems, loot tables, and transaction flows. It finds pricing exploits, duplication glitches, and economic imbalances before players do.",
    color: "#FBBF24",
    visual: {
      label: "MERCHANT — TRADING",
      items: [
        { label: "Transactions tested", value: "1000", suffix: "+" },
        { label: "Exploit detection", value: "Auto", suffix: "" },
        { label: "Economy balance", value: "100", suffix: "%" },
        { label: "Loot validation", value: "Auto", suffix: "" },
      ],
    },
    model: {
      path: "/models/Merchant",
      obj: "Meshy_AI_Merchant_0317143101_texture.obj",
      png: "Meshy_AI_Merchant_0317143101_texture.png",
    },
  },
  {
    name: "Trailblazer",
    role: "The Pioneer",
    headline: "Finds the unexpected edge cases",
    description:
      "Trailblazer goes where no tester has gone before — combining unusual actions, sequence-breaking, and creative problem-solving to discover the bugs that scripted tests never catch.",
    color: "#34D399",
    visual: {
      label: "TRAILBLAZER — EXPLORING",
      items: [
        { label: "Edge cases found", value: "Auto", suffix: "" },
        { label: "Sequence breaks", value: "Auto", suffix: "" },
        { label: "Creative paths", value: "1000", suffix: "+" },
        { label: "Coverage depth", value: "100", suffix: "%" },
      ],
    },
    model: {
      path: "/models/Trailblazer",
      obj: "Meshy_AI_Trailblazer_0317142900_texture.obj",
      png: "Meshy_AI_Trailblazer_0317142900_texture.png",
    },
  },
  {
    name: "Stressor",
    role: "The Breaker",
    headline: "Pushes your game to the breaking point",
    description:
      "Stressor applies extreme load, rapid inputs, and resource pressure to find performance bottlenecks, memory leaks, and crash conditions under stress.",
    color: "#FB7185",
    visual: {
      label: "STRESSOR — STRESS TESTING",
      items: [
        { label: "Load scenarios", value: "1000", suffix: "+" },
        { label: "Crash detection", value: "Auto", suffix: "" },
        { label: "Memory profiling", value: "24", suffix: "/7" },
        { label: "Performance data", value: "100", suffix: "%" },
      ],
    },
    model: {
      path: "/models/Stressor",
      obj: "Meshy_AI_Stressor_0317143024_texture.obj",
      png: "Meshy_AI_Stressor_0317143024_texture.png",
    },
  },
];

// Split-flap digit animation
function FlipDigit({ digit, delay, color }: { digit: string; delay: number; color: string }) {
  const chars = "0123456789";
  const [display, setDisplay] = useState("0");
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    let frame = 0;
    const totalFrames = 8 + Math.floor(Math.random() * 6);
    setFlipping(true);

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        frame++;
        if (frame < totalFrames) {
          setDisplay(chars[Math.floor(Math.random() * 10)]);
        } else {
          setDisplay(digit);
          setFlipping(false);
          clearInterval(interval);
        }
      }, 50);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [digit, delay]);

  return (
    <span className="relative inline-block w-[0.65em] text-center">
      <span
        className={`inline-block transition-transform duration-75 ${flipping ? "scale-y-90" : ""}`}
        style={{ color }}
      >
        {display}
      </span>
    </span>
  );
}

// Animated number with split-flap effect
function FlipNumber({
  value,
  suffix,
  color,
  shouldAnimate,
}: {
  value: string;
  suffix: string;
  color: string;
  shouldAnimate: boolean;
}) {
  const isNumeric = /^\d+$/.test(value);

  // Text values (Auto, Yes, etc.) — no flip animation, just fade in
  if (!isNumeric) {
    return (
      <motion.span
        style={{ color }}
        initial={{ opacity: 0 }}
        animate={shouldAnimate ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        {value}{suffix}
      </motion.span>
    );
  }

  if (!shouldAnimate) {
    return (
      <span style={{ color }}>
        <span className="opacity-30">{"0".repeat(Math.max(0, 4 - value.length))}</span>
        {value}
        <span className="opacity-60">{suffix}</span>
      </span>
    );
  }

  return (
    <span>
      {/* Leading zeros (dimmed) */}
      {Array.from({ length: Math.max(0, 4 - value.length) }).map((_, i) => (
        <span key={`pad-${i}`} className="inline-block w-[0.65em] text-center opacity-20" style={{ color }}>
          0
        </span>
      ))}
      {/* Actual digits */}
      {value.split("").map((char, i) => (
        <FlipDigit key={i} digit={char} delay={i * 80} color={color} />
      ))}
      <span style={{ color }} className="opacity-60">{suffix}</span>
    </span>
  );
}

function BotVisual({ bot, inView }: { bot: (typeof bots)[0]; inView: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0D0515]">
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.015)_2px,rgba(255,255,255,0.015)_4px)]" />

      {/* 3D Model */}
      {bot.model && (
        <div className="border-b border-white/5">
          <BotModel
            modelPath={bot.model.path}
            objFile={bot.model.obj}
            pngFile={bot.model.png}
            color={bot.color}
          />
        </div>
      )}

      {/* Top bar */}
      <div className="flex items-center gap-2 border-b border-white/5 px-5 py-3">
        <motion.span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: bot.color }}
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="font-mono text-xs text-text-muted">
          {bot.visual.label}
        </span>
      </div>

      {/* Stats grid with flip numbers */}
      <div className="grid grid-cols-2 gap-px bg-white/5 p-px">
        {bot.visual.items.map((item, i) => (
          <div key={item.label} className="bg-[#0D0515] p-6">
            <p className="font-mono text-xs text-text-muted">{item.label}</p>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums md:text-3xl">
              <FlipNumber
                value={item.value}
                suffix={item.suffix}
                color={bot.color}
                shouldAnimate={inView}
              />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BotSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
              The Bot Arsenal
            </span>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Ten bots. One mission.
            </h2>
            <p className="mt-4 text-lg text-text-muted">
              Each agent has a distinct role. Together, they deliver fully
              autonomous QA.
            </p>
          </div>
        </FadeInView>

        <div className="mt-20 space-y-32">
          {bots.map((bot, i) => {
            const BotRow = () => {
              const ref = useRef(null);
              const isInView = useInView(ref, { once: true, margin: "-100px" });

              return (
                <div ref={ref}>
                  <FadeInView delay={0.1}>
                    <div
                      className="grid items-center gap-12 lg:grid-cols-2"
                      style={{ direction: i % 2 === 1 ? "rtl" : "ltr" }}
                    >
                      {/* Text side */}
                      <div style={{ direction: "ltr" }}>
                        <div
                          className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold"
                          style={{
                            backgroundColor: `${bot.color}15`,
                            color: bot.color,
                          }}
                        >
                          {bot.name[0]}
                        </div>
                        <p
                          className="text-sm font-semibold uppercase tracking-widest"
                          style={{ color: bot.color }}
                        >
                          {bot.name} — {bot.role}
                        </p>
                        <h3 className="mt-2 text-2xl font-bold text-foreground md:text-3xl">
                          {bot.headline}
                        </h3>
                        <p className="mt-4 text-base leading-relaxed text-text-muted">
                          {bot.description}
                        </p>
                      </div>

                      {/* Visual side */}
                      <div style={{ direction: "ltr" }}>
                        <BotVisual bot={bot} inView={isInView} />
                      </div>
                    </div>
                  </FadeInView>
                </div>
              );
            };

            return <BotRow key={bot.name} />;
          })}
        </div>
      </div>
    </section>
  );
}
