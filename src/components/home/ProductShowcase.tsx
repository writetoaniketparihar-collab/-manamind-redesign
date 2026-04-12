"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FadeInView } from "@/components/animations/FadeInView";

type TooltipAlign = "left" | "center" | "right";

const hotspots: Array<{
  annotation: string;
  bot: { initial: string; name: string; color: string };
  x: number;
  y: number;
  tooltipAlign: TooltipAlign;
}> = [
  {
    annotation: "Export issues directly to your existing workflow",
    bot: { initial: "R", name: "Reporter", color: "#FFB84C" },
    x: 28.9,
    y: 9.9,
    tooltipAlign: "center",
  },
  {
    annotation: "See which bot discovered each issue",
    bot: { initial: "W", name: "Wayfinder", color: "#00FF96" },
    x: 60.8,
    y: 31.9,
    tooltipAlign: "center",
  },
  {
    annotation: "Confidence scoring helps prioritise what to fix first",
    bot: { initial: "B", name: "Breaker", color: "#FF4C54" },
    x: 67,
    y: 32.1,
    tooltipAlign: "center",
  },
  {
    annotation: "Auto-generated reports with repo steps directly from gameplay",
    bot: { initial: "S", name: "Scout", color: "#4CC9FF" },
    x: 93.4,
    y: 9.9,
    tooltipAlign: "center",
  },
];

export function ProductShowcase() {
  const screenshotRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(screenshotRef, { once: true, margin: "-100px" });
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <div className="mx-auto max-w-4xl text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
              Command Centre
            </span>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
              Your autonomous QA team, reporting in real time.
            </h2>
            <p className="mt-4 text-lg text-text-muted">
              Track what your bots find across every build, all in one place.
            </p>
          </div>
        </FadeInView>

        <FadeInView delay={0.2}>
          <div
            ref={screenshotRef}
            className="relative mt-16 rounded-2xl border border-white/10 shadow-2xl shadow-primary/5"
          >
            <Image
              src="/product-screenshot.png"
              alt="ManaMind Command Centre - Bug Reports dashboard showing automated test results across builds and bots"
              width={1920}
              height={1080}
              className="w-full"
              priority
            />

            {/* Pulsing dots */}
            {hotspots.map((item, i) => (
              <div
                key={i}
                className="absolute hidden md:block"
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                {/* Outer ring, logo style, visible on hover only */}
                <motion.div
                  className="absolute rounded-full border"
                  style={{
                    width: 20,
                    height: 20,
                    left: -10,
                    top: -10,
                    borderColor: item.bot.color,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: active === i ? 0.5 : 0 }}
                  transition={{ duration: 0.2 }}
                />

                {/* Filled pulse ring, expanding from center */}
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    width: 20,
                    height: 20,
                    left: -10,
                    top: -10,
                    background: item.bot.color,
                  }}
                  animate={{
                    scale: [1, 2.2],
                    opacity: [0.3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: i * 0.4,
                  }}
                />

                {/* Core dot, upper-right like logo */}
                <div
                  className="absolute z-10 h-2.5 w-2.5 rounded-full cursor-pointer"
                  style={{
                    background: item.bot.color,
                    boxShadow: `0 0 8px ${item.bot.color}`,
                    top: -10,
                    right: -10,
                  }}
                />

                {/* Tooltip on hover */}
                <AnimatePresence>
                  {active === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute z-20"
                      style={{
                        // Anchor wrapper at the visible dot's center
                        // (dot is rendered at right:-10/top:-10 → center ≈ +5px right, -5px up from hotspot anchor)
                        left: 5,
                        bottom: "calc(100% + 12px)",
                      }}
                    >
                      <div
                        className="relative w-52"
                        style={{
                          transform:
                            item.tooltipAlign === "left"
                              ? "translateX(calc(-100% + 14px))"
                              : item.tooltipAlign === "right"
                              ? "translateX(-14px)"
                              : "translateX(-50%)",
                        }}
                      >
                        <div className="bg-bg-card border border-white/10 rounded-lg px-3 py-2.5 shadow-xl">
                          <p className="text-[11px] text-foreground leading-relaxed">{item.annotation}</p>
                        </div>
                        {/* Arrow, always lines up with the animation circle below */}
                        <div
                          className="absolute w-2.5 h-2.5 rotate-45"
                          style={{
                            background: "var(--color-bg-card)",
                            borderRight: "1px solid rgba(255,255,255,0.1)",
                            borderBottom: "1px solid rgba(255,255,255,0.1)",
                            bottom: -5,
                            left:
                              item.tooltipAlign === "left"
                                ? "calc(100% - 19px)"
                                : item.tooltipAlign === "right"
                                ? "9px"
                                : "calc(50% - 5px)",
                          }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
