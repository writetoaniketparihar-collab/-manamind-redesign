"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FadeInView } from "@/components/animations/FadeInView";

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
              The Tri-Bot System
            </span>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Three bots. One mission.
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
