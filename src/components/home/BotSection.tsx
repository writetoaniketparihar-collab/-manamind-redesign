"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FadeInView } from "@/components/animations/FadeInView";
import { BotModel } from "@/components/home/BotModel";

const bots = [
  {
    name: "Wayfinder",
    role: "The Navigator",
    headline: "Maps every path and hidden route",
    description:
      "Wayfinder systematically charts game worlds, uncovering hidden paths, unreachable areas, and navigation inconsistencies. It builds a complete map of traversable space so no corner goes untested.",
    color: "#38BDF8",
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
    model: {
      path: "/models/Stressor",
      obj: "Meshy_AI_Stressor_0317143024_texture.obj",
      png: "Meshy_AI_Stressor_0317143024_texture.png",
    },
  },
];

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
              Seven bots. One mission.
            </h2>
            <p className="mt-4 text-lg text-text-muted">
              Each agent has a distinct role. Together, they deliver fully
              autonomous QA.
            </p>
          </div>
        </FadeInView>

        <div className="mt-20 space-y-32">
          {bots.map((bot, i) => (
            <BotRow key={bot.name} bot={bot} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BotRow({ bot, index }: { bot: (typeof bots)[number]; index: number }) {
  const ref = useRef(null);

  return (
    <div ref={ref}>
      <FadeInView delay={0.1}>
        <div
          className="grid items-center gap-12 lg:grid-cols-2"
          style={{ direction: index % 2 === 1 ? "rtl" : "ltr" }}
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

          {/* 3D Model */}
          <div style={{ direction: "ltr" }}>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0D0515]">
              {/* Scanline overlay */}
              <div className="pointer-events-none absolute inset-0 z-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.015)_2px,rgba(255,255,255,0.015)_4px)]" />

              <BotModel
                modelPath={bot.model.path}
                objFile={bot.model.obj}
                pngFile={bot.model.png}
                color={bot.color}
              />
            </div>
          </div>
        </div>
      </FadeInView>
    </div>
  );
}
