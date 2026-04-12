"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useGLTF } from "@react-three/drei";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { FadeInView } from "@/components/animations/FadeInView";
import { BotModel } from "@/components/home/BotModel";

// Kick off the Wayfinder GLB download as soon as this module loads,
// so the file is already cached by the time the canvas mounts.
useGLTF.preload(
  "/models/Wayfinder/wayfinder.glb",
  undefined,
  undefined,
  (loader) => {
    // @ts-expect-error drei types the loader as Loader, but it's a GLTFLoader
    loader.setMeshoptDecoder(MeshoptDecoder);
  }
);

type BotModelAsset =
  | { path: string; glb: string; obj?: undefined; png?: undefined }
  | { path: string; obj: string; png: string; glb?: undefined };

type Bot = {
  name: string;
  role: string;
  headline: string;
  description: string;
  color: string;
  model?: BotModelAsset;
};

const bots: Bot[] = [
  {
    name: "Wayfinder",
    role: "The Navigator",
    headline: "Maps every path and hidden route",
    description:
      "Wayfinder systematically charts game worlds, uncovering hidden paths, unreachable areas, and navigation inconsistencies.",
    color: "#38BDF8",
    model: {
      path: "/models/Wayfinder",
      glb: "wayfinder.glb",
    },
  },
  {
    name: "Gladiator",
    role: "The Fighter",
    headline: "Stress-tests combat and mechanics",
    description:
      "Gladiator throws itself into every fight, tests every weapon combo, and pushes combat systems to their limits.",
    color: "#F97316",
  },
  {
    name: "Replicator",
    role: "The Cloner",
    headline: "Reproduces bugs with precision",
    description:
      "Takes any reported issue and runs it thousands of times with variations to confirm reproducibility.",
    color: "#22D3EE",
  },
  {
    name: "Rosetta",
    role: "The Translator",
    headline: "Tests every language and locale",
    description:
      "Validates localisation across every supported language, catching text overflow and translation issues.",
    color: "#E879F9",
  },
  {
    name: "Merchant",
    role: "The Economist",
    headline: "Audits economies and transactions",
    description:
      "Tests in-game economies, shops, loot tables, and transaction flows to find pricing exploits and imbalances.",
    color: "#FBBF24",
  },
  {
    name: "Trailblazer",
    role: "The Pioneer",
    headline: "Finds the unexpected edge cases",
    description:
      "Combines unusual actions and sequence-breaking to discover bugs that scripted tests never catch.",
    color: "#34D399",
  },
  {
    name: "Stressor",
    role: "The Breaker",
    headline: "Pushes your game to the breaking point",
    description:
      "Applies extreme load and rapid inputs to find performance bottlenecks and crash conditions under stress.",
    color: "#FB7185",
  },
  {
    name: "Sentinel",
    role: "The Guardian",
    headline: "Watches for security and integrity issues",
    description: "Placeholder description. Replace with the real bot copy.",
    color: "#A78BFA",
  },
  {
    name: "Oracle",
    role: "The Predictor",
    headline: "Forecasts where bugs are likely to appear",
    description: "Placeholder description. Replace with the real bot copy.",
    color: "#FACC15",
  },
  {
    name: "Cartographer",
    role: "The Mapmaker",
    headline: "Builds detailed maps of every level",
    description: "Placeholder description. Replace with the real bot copy.",
    color: "#60A5FA",
  },
  {
    name: "Phantom",
    role: "The Ghost",
    headline: "Tests invisible and hidden states",
    description: "Placeholder description. Replace with the real bot copy.",
    color: "#C084FC",
  },
  {
    name: "Anchor",
    role: "The Validator",
    headline: "Verifies save states and persistence",
    description: "Placeholder description. Replace with the real bot copy.",
    color: "#2DD4BF",
  },
  {
    name: "Pulse",
    role: "The Monitor",
    headline: "Tracks frame rate and runtime health",
    description: "Placeholder description. Replace with the real bot copy.",
    color: "#F472B6",
  },
  {
    name: "Echo",
    role: "The Listener",
    headline: "Audits audio, music, and sound triggers",
    description: "Placeholder description. Replace with the real bot copy.",
    color: "#818CF8",
  },
  {
    name: "Beacon",
    role: "The Signaler",
    headline: "Validates UI states and notifications",
    description: "Placeholder description. Replace with the real bot copy.",
    color: "#FB923C",
  },
  {
    name: "Forge",
    role: "The Crafter",
    headline: "Tests crafting and progression systems",
    description: "Placeholder description. Replace with the real bot copy.",
    color: "#F87171",
  },
  {
    name: "Nomad",
    role: "The Wanderer",
    headline: "Explores open-world content at scale",
    description: "Placeholder description. Replace with the real bot copy.",
    color: "#4ADE80",
  },
];

export function BotSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
              Our Bots
            </span>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
              Your autonomous QA team
            </h2>
            <p className="mt-4 text-lg text-text-muted">
              Each bot operates with a distinct strategy and role, contributing to a distributed system designed for comprehensive test coverage.
            </p>
          </div>
        </FadeInView>

        {/* Bot grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bots.map((bot, i) => (
            <FadeInView key={bot.name} delay={0.05 + (i % 3) * 0.05}>
              <BotCard bot={bot} />
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}

function BotCard({ bot }: { bot: Bot }) {
  // Lazy-mount the 3D canvas only when the card scrolls into view,
  // so 17 canvases don't all initialize on first render.
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // If the card is already in (or near) the viewport on mount, skip the
    // observer entirely so we don't wait a tick before starting to render.
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh + 400 && rect.bottom > -400) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-bg-card transition-colors hover:border-white/20"
      style={{
        boxShadow: `0 8px 32px ${bot.color}10`,
      }}
    >
      {/* 3D model area */}
      <div
        className="relative aspect-[4/3] overflow-hidden border-b border-white/[0.06] bg-[#0D0515]"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${bot.color}18 0%, #0D0515 70%)`,
        }}
      >
        {/* Scanline overlay */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.015)_2px,rgba(255,255,255,0.015)_4px)]" />

        {visible ? (
          bot.model ? (
            <BotModel
              modelPath={bot.model.path}
              objFile={bot.model.obj}
              pngFile={bot.model.png}
              glbFile={bot.model.glb}
              color={bot.color}
            />
          ) : (
            <BotModelPlaceholder bot={bot} />
          )
        ) : null}
      </div>

      {/* Text content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold"
            style={{
              backgroundColor: `${bot.color}15`,
              color: bot.color,
            }}
          >
            {bot.name[0]}
          </div>
          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: bot.color }}
            >
              {bot.name}
            </p>
            <p className="text-[11px] text-text-muted/70">{bot.role}</p>
          </div>
        </div>

        <h3 className="mt-4 text-base font-bold leading-snug text-foreground">
          {bot.headline}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          {bot.description}
        </p>
      </div>
    </motion.div>
  );
}

function BotModelPlaceholder({ bot }: { bot: Bot }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div
        className="absolute inset-10 rounded-full opacity-30 blur-3xl"
        style={{ background: bot.color }}
      />
      <div
        className="relative font-bold leading-none"
        style={{
          color: bot.color,
          fontSize: "5rem",
          textShadow: `0 0 32px ${bot.color}80`,
        }}
      >
        {bot.name[0]}
      </div>
      <div className="absolute bottom-3 left-0 right-0 text-center">
        <p className="font-mono text-[9px] uppercase tracking-widest text-text-muted/50">
          Model coming soon
        </p>
      </div>
    </div>
  );
}
