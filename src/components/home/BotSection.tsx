"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useGLTF } from "@react-three/drei";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { FadeInView } from "@/components/animations/FadeInView";
import { BotModel } from "@/components/home/BotModel";

// Kick off all GLB downloads as soon as this module loads,
// so the files are already cached by the time the canvases mount.
const ALL_MODELS = [
  "/models/Wayfinder/wayfinder.glb",
  "/models/Trailblazer/trailblazer.glb",
  "/models/Rogue/rogue.glb",
  "/models/Daredevil/daredevil.glb",
  "/models/Gladiator/gladiator.glb",
  "/models/Quartermaster/quartermaster.glb",
  "/models/Merchant/merchant.glb",
  "/models/Replicator/replicator.glb",
  "/models/Stressor/stressor.glb",
  "/models/Sentinel/sentinel.glb",
  "/models/Diplomat/diplomat.glb",
  "/models/Arbiter/arbiter.glb",
  "/models/Rosetta/rosetta.glb",
];

for (const model of ALL_MODELS) {
  useGLTF.preload(
    model,
    undefined,
    undefined,
    (loader) => {
      (loader as { setMeshoptDecoder: (d: typeof MeshoptDecoder) => void }).setMeshoptDecoder(MeshoptDecoder);
    }
  );
}

type BotModelAsset =
  | { path: string; glb: string; obj?: undefined; png?: undefined }
  | { path: string; obj: string; png: string; glb?: undefined };

type BotStatus = "online" | "spawning" | "training";

type Bot = {
  name: string;
  role: string;
  specialisesIn: string;
  bio: string;
  impact: string;
  color: string;
  status: BotStatus;
  model?: BotModelAsset;
};

type BotTeam = {
  name: string;
  emoji: string;
  bots: Bot[];
};

const teams: BotTeam[] = [
  {
    name: "Player Experience Team",
    emoji: "\uD83C\uDFAE",
    bots: [
      {
        name: "Wayfinder",
        role: "The Adventurer",
        specialisesIn: "Menus, UI navigation, onboarding flows, player paths",
        bio: "Wayfinder systematically navigates menus, UI flows, settings, and onboarding journeys, clicking through every possible path a player might take. From main menus to deep settings trees, he ensures everything is accessible, responsive, and intuitive.",
        impact: "Ensures players understand how to play and never get lost before the game even begins.",
        color: "#38BDF8",
        status: "online",
        model: {
          path: "/models/Wayfinder",
          glb: "wayfinder.glb",
        },
      },
      {
        name: "Trailblazer",
        role: "The Explorer",
        specialisesIn: "Progression systems, quest flows, game completion paths",
        bio: "Trailblazer plays through your game from start to finish, validating progression, objectives, and unlocks to make sure the journey is always completable.",
        impact: "Prevents blockers that stop players from finishing or progressing through your game.",
        color: "#34D399",
        status: "spawning",
        model: { path: "/models/Trailblazer", glb: "trailblazer.glb" },
      },
      {
        name: "Rogue",
        role: "The Rulebreaker",
        specialisesIn: "Edge cases, unintended behaviours, rule-breaking scenarios",
        bio: "Rogue ignores intended paths and deliberately breaks the rules. He explores edge cases, unusual inputs, and unintended behaviours to uncover hidden bugs.",
        impact: "Finds the bugs your scripted tests miss by behaving in ways real players often do.",
        color: "#C084FC",
        status: "training",
        model: { path: "/models/Rogue", glb: "rogue.glb" },
      },
      {
        name: "Daredevil",
        role: "The Speedrunner",
        specialisesIn: "Sequence breaking, skips, unintended shortcuts, progression exploits",
        bio: "Daredevil searches for the fastest possible routes through your game, identifying skips, sequence breaks, and unintended shortcuts that can disrupt progression.",
        impact: "Protects your progression design from being bypassed or broken by advanced players.",
        color: "#FB923C",
        status: "training",
        model: { path: "/models/Daredevil", glb: "daredevil.glb" },
      },
    ],
  },
  {
    name: "Systems & Mechanics Team",
    emoji: "\u2699\uFE0F",
    bots: [
      {
        name: "Gladiator",
        role: "The Fighter",
        specialisesIn: "Combat systems, hit detection, AI behaviour, damage logic",
        bio: "Gladiator stress-tests your combat systems by engaging enemies, abilities, and damage calculations at scale to ensure every fight behaves correctly.",
        impact: "Guarantees combat feels fair, consistent, and free of game-breaking bugs.",
        color: "#F97316",
        status: "training",
        model: { path: "/models/Gladiator", glb: "gladiator.glb" },
      },
      {
        name: "Quartermaster",
        role: "The Collector",
        specialisesIn: "Inventory systems, item management, crafting, resource flow",
        bio: "Quartermaster manages inventory, items, and crafting systems to ensure resources are stored, used, and updated correctly throughout gameplay.",
        impact: "Prevents item loss, duplication, or corruption that can ruin player progression.",
        color: "#22D3EE",
        status: "training",
        model: { path: "/models/Quartermaster", glb: "quartermaster.glb" },
      },
      {
        name: "Merchant",
        role: "The Broker",
        specialisesIn: "In-game stores, purchases, DLC flows, transaction validation",
        bio: "Merchant validates your in-game economy, testing store flows, purchases, and reward delivery to ensure every transaction completes reliably.",
        impact: "Protects your revenue and prevents failed purchases or missing rewards.",
        color: "#FBBF24",
        status: "training",
        model: { path: "/models/Merchant", glb: "merchant.glb" },
      },
    ],
  },
  {
    name: "Scale & Coverage Team",
    emoji: "\uD83C\uDF0D",
    bots: [
      {
        name: "Replicator",
        role: "The Perfectionist",
        specialisesIn: "Test replication, cross-device testing, multi-build validation",
        bio: "Replicator turns one test into thousands, replaying scenarios across devices, builds, and configurations to guarantee consistent behaviour everywhere.",
        impact: "Ensures bugs stay fixed and features behave consistently across platforms.",
        color: "#60A5FA",
        status: "training",
        model: { path: "/models/Replicator", glb: "replicator.glb" },
      },
      {
        name: "Stressor",
        role: "The Workhorse",
        specialisesIn: "Performance under load, stress testing, stability limits",
        bio: "Stressor pushes your game beyond normal limits by flooding systems with inputs, entities, and load to expose performance and stability weaknesses.",
        impact: "Reveals crashes and slowdowns that only appear under real-world scale.",
        color: "#FB7185",
        status: "online",
        model: { path: "/models/Stressor", glb: "stressor.glb" },
      },
    ],
  },
  {
    name: "Intelligence & Insight Team",
    emoji: "\uD83E\uDDE0",
    bots: [
      {
        name: "Sentinel",
        role: "The Observer",
        specialisesIn: "Performance monitoring, FPS, load times, system stability",
        bio: "Sentinel continuously monitors performance while other agents test, tracking FPS, memory, and load times to detect issues as they emerge.",
        impact: "Gives you clear visibility into performance regressions before players notice them.",
        color: "#A78BFA",
        status: "training",
        model: { path: "/models/Sentinel", glb: "sentinel.glb" },
      },
      {
        name: "Diplomat",
        role: "The Mediator",
        specialisesIn: "Multiplayer systems, chat, invites, social features",
        bio: "Diplomat focuses on social and multiplayer systems, validating chat, invites, and connectivity to ensure players can communicate and play together smoothly.",
        impact: "Prevents broken social features from damaging retention and player trust.",
        color: "#F472B6",
        status: "training",
        model: { path: "/models/Diplomat", glb: "diplomat.glb" },
      },
    ],
  },
  {
    name: "Global & Compliance Team",
    emoji: "\uD83C\uDF10",
    bots: [
      {
        name: "Arbiter",
        role: "The Certifier",
        specialisesIn: "Platform compliance, certification checks, submission requirements",
        bio: "Arbiter performs automated compliance checks against platform requirements, validating system behaviour, edge cases, and submission-critical scenarios.",
        impact: "Reduces the risk of certification failure and costly resubmissions to platform holders.",
        color: "#FACC15",
        status: "training",
        model: { path: "/models/Arbiter", glb: "arbiter.glb" },
      },
      {
        name: "Rosetta",
        role: "The Translator",
        specialisesIn: "Localisation, translations, subtitles, cultural accuracy",
        bio: "Rosetta ensures your game works in every language by validating translations, text layout, subtitles, and regional formatting across all supported locales.",
        impact: "Ensures global players receive a polished, natural experience in their own language.",
        color: "#E879F9",
        status: "training",
        model: { path: "/models/Rosetta", glb: "rosetta.glb" },
      },
    ],
  },
];

const STATUS_CONFIG: Record<BotStatus, { label: string; color: string; dot: string }> = {
  online: { label: "Online", color: "text-emerald-400", dot: "bg-emerald-400" },
  spawning: { label: "Spawning", color: "text-amber-400", dot: "bg-amber-400" },
  training: { label: "Training", color: "text-blue-400", dot: "bg-blue-400" },
};

function StatusPill({ status }: { status: BotStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${config.color}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot} ${status === "online" ? "animate-pulse" : ""}`} />
      {config.label}
    </span>
  );
}

export function BotSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
              Legion
            </span>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
              The Autonomous QA Team
            </h2>
            <p className="mt-4 text-lg text-text-muted">
              Each agent specialises in a different part of the game. Together, they cover everything from first click to certification.
            </p>
          </div>
        </FadeInView>

        {/* Status legend */}
        <FadeInView delay={0.1}>
          <div className="mt-8 flex items-center justify-center gap-6">
            {(["online", "spawning", "training"] as BotStatus[]).map((status) => {
              const config = STATUS_CONFIG[status];
              return (
                <div key={status} className="flex items-center gap-2 text-xs text-text-muted">
                  <span className={`h-2 w-2 rounded-full ${config.dot} ${status === "online" ? "animate-pulse" : ""}`} />
                  <span className="font-medium">{config.label}</span>
                  <span className="hidden sm:inline">
                    {status === "online" && "- Live and operational"}
                    {status === "spawning" && "- Deploying soon"}
                    {status === "training" && "- In development"}
                  </span>
                </div>
              );
            })}
          </div>
        </FadeInView>

        {/* Teams */}
        {teams.map((team, teamIdx) => (
          <div key={team.name} className="mt-16">
            <FadeInView delay={0.05}>
              <h3 className="mb-6 text-center font-mono text-xs font-semibold uppercase tracking-widest text-text-muted">
                {team.emoji} {team.name}
              </h3>
            </FadeInView>
            <div className="flex flex-wrap justify-center gap-6">
              {team.bots.map((bot, i) => (
                <FadeInView key={bot.name} delay={0.05 + (i % 3) * 0.05}>
                  <div className="w-[280px]">
                    <BotCard bot={bot} />
                  </div>
                </FadeInView>
              ))}
            </div>
          </div>
        ))}
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
        className="relative aspect-square overflow-hidden border-b border-white/[0.06] bg-[#0D0515]"
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
        <div className="flex items-center justify-between">
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
          <StatusPill status={bot.status} />
        </div>

        <div className="mt-4">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted/60">
            Specialises In
          </p>
          <p className="mt-1 text-sm leading-relaxed text-foreground/80">
            {bot.specialisesIn}
          </p>
        </div>

        <div className="mt-3">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted/60">
            Bio
          </p>
          <p className="mt-1 text-sm leading-relaxed text-text-muted">
            {bot.bio}
          </p>
        </div>

        <div className="mt-3">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted/60">
            Impact
          </p>
          <p className="mt-1 text-sm leading-relaxed text-primary/80">
            {bot.impact}
          </p>
        </div>
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
