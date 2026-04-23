export type BotModelAsset =
  | { path: string; glb: string; obj?: undefined; png?: undefined }
  | { path: string; obj: string; png: string; glb?: undefined };

export type BotStatus = "online" | "spawning" | "training";

export type Bot = {
  name: string;
  role: string;
  specialisesIn: string;
  bio: string;
  impact: string;
  color: string;
  status: BotStatus;
  model?: BotModelAsset;
};

export type BotTeam = {
  name: string;
  emoji: string;
  bots: Bot[];
};

export const teams: BotTeam[] = [
  {
    name: "Player Experience Team",
    emoji: "🎮",
    bots: [
      {
        name: "Wayfinder",
        role: "The Explorer",
        specialisesIn: "Menus, UI navigation, onboarding flows, player paths",
        bio: "Wayfinder systematically navigates menus, UI flows, settings, and onboarding journeys, clicking through every possible path a player might take. From main menus to deep settings trees, he ensures everything is accessible, responsive, and intuitive.",
        impact: "Ensures players understand how to play and never get lost before the game even begins.",
        color: "#38BDF8",
        status: "online",
        model: { path: "/models/Wayfinder", glb: "wayfinder.glb" },
      },
      {
        name: "Trailblazer",
        role: "The Adventurer",
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
    emoji: "⚙️",
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
    emoji: "🌍",
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
    emoji: "🧠",
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
    emoji: "🌐",
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

export const STATUS_CONFIG: Record<BotStatus, { label: string; color: string; dot: string }> = {
  online: { label: "Online", color: "text-emerald-400", dot: "bg-emerald-400" },
  spawning: { label: "Spawning", color: "text-amber-400", dot: "bg-amber-400" },
  training: { label: "Training", color: "text-blue-400", dot: "bg-blue-400" },
};

export const ALL_MODEL_PATHS = teams.flatMap((team) =>
  team.bots
    .filter((b) => b.model?.glb)
    .map((b) => `${b.model!.path}/${b.model!.glb}`)
);
