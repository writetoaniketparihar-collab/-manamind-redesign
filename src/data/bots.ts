export type BotModelAsset = { path: string; glb: string };
export type BotStatus = "online" | "spawning" | "training";
export type BotCategory = "functional" | "compliance" | "compatibility" | "localisation" | "network";

export type BotAbility = {
  name: string;
  desc: string;
  example: string;
  icon: string;
  ultimate?: boolean;
};

export type BotAbilityGroup = { groupLabel?: string; abilities: BotAbility[] };

export type Bot = {
  id: string;
  name: string;
  role: string;
  category: BotCategory;
  categoryLabel: string;
  specialisesIn: string;
  bio: string;
  impact: string;
  color: string;
  status: BotStatus;
  model: BotModelAsset;
  scopeNote?: string;
  capabilities?: string[];
  abilityGroups?: BotAbilityGroup[];
};

export const categories: { id: "all" | BotCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "functional", label: "Functional QA" },
  { id: "compliance", label: "Compliance QA" },
  { id: "compatibility", label: "Compatibility QA" },
  { id: "localisation", label: "Localisation QA" },
  { id: "network", label: "Network QA" },
];

const svg = (content: string) => content;
const ability = (name: string, desc: string, example: string, icon: string, ultimate = false): BotAbility => ({ name, desc, example, icon: svg(icon), ...(ultimate ? { ultimate } : {}) });

const wayfinderAbilities: BotAbility[] = [
  ability("Cartographer", "Maps the entire menu tree in a single sweep, confirming every screen is reachable and exitable, with no dead ends and every Back and Cancel working.", "Opens Settings, visits every sub-page down to the deepest tab, and confirms each one has a way back out.", '<path d="M10 26 C20 15 44 15 54 26 C44 37 20 37 10 26 Z" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="32" cy="26" r="5" fill="currentColor"/><path d="M12 44 H52 M12 53 H52 M24 39 V57 M40 39 V57" stroke="currentColor" stroke-width="2.4" opacity=".65"/>'),
  ability("Tuning Sigil", "Reaches into any setting, whether a toggle, slider or dropdown, flips it, then confirms the change applies, survives scene changes and restarts, and resets cleanly to default.", "Sets resolution to 4K, restarts the game, and checks it is still 4K on relaunch.", '<path d="M12 22 H52 M12 42 H52" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><circle cx="25" cy="22" r="6.5" fill="currentColor"/><circle cx="43" cy="42" r="6.5" fill="currentColor"/>'),
  ability("Truesight", "Reads every label, tooltip, dialog and error string on contact, verifying each renders correctly in every state: selected, hovered, disabled and locked.", "Hovers a greyed-out button and confirms its tooltip explains why it is locked.", '<path d="M8 28 C18 17 46 17 56 28 C46 39 18 39 8 28 Z" fill="none" stroke="currentColor" stroke-width="3"/><path d="M26 28 l4.5 4.5 L40 23" fill="none" stroke="currentColor" stroke-width="3"/><path d="M16 49 H48 M16 57 H40" stroke="currentColor" stroke-width="2.6" opacity=".65"/>'),
  ability("Threshold", "Walks the first-time-user flow cold, from the very first screen through to playable, exactly as a brand new player meets it.", "Runs the tutorial from a fresh save and confirms every prompt fires in the right order.", '<path d="M34 11 H51 V53 H34 M44 32 H11 M22 21 L11 32 L22 43" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>'),
  ability("Wayfinder’s Gambit", "Navigates to a requested destination, then chains menus and in-world movement to reach a feature and prove it works from end to end.", "Finds the armory, equips a weapon, and confirms it shows up in the loadout and on the HUD.", '<path d="M32 8 L37 15 L32 21 L27 15 Z" fill="currentColor"/><path d="M32 19 V44 M22 44 H42 M32 44 V53 M28 53 H36" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>'),
];

const trailblazerAbilities: BotAbility[] = [
  ability("Muscle Memory", "Learns an action in one game and carries it into the next, with no retraining needed. This is the meta-talent beneath the rest: it is how Trailblazer picks up a brand new game’s quests and controls and simply plays.", "Masters aiming and firing in one shooter, then drops into a different shooter and shoots accurately from the first minute.", '<path d="M32 8 L37 17 L46 22 L37 27 L32 36 L27 27 L18 22 L27 17 Z" fill="currentColor"/><path d="M27 33 L18 44 M37 33 L46 44" stroke="currentColor" stroke-width="2.6"/><rect x="9" y="45" width="16" height="11" rx="2.5" fill="none" stroke="currentColor" stroke-width="2.6"/><rect x="39" y="45" width="16" height="11" rx="2.5" fill="none" stroke="currentColor" stroke-width="2.6"/>', true),
  ability("Ascent", "Advances through level, stage and chapter, confirming XP, rank, checkpoints and progress markers all climb correctly as they are earned.", "Clears a stage and checks the XP bar, level number and checkpoint flag all update.", '<path d="M11 53 H21 V41 H31 V29 H41 V17 H53 M46 17 L53 17 L53 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'),
  ability("Anchorhold", "Makes sure progress sticks. Gates open the moment their condition is met and stay open, and saving or reloading restores quest stage, position and unlocks intact across sessions.", "Saves mid-quest, quits to desktop, relaunches, and confirms the quest resumes exactly where it left off.", '<circle cx="32" cy="12" r="5.5" fill="none" stroke="currentColor" stroke-width="3"/><path d="M32 17.5 V52 M20 27 H44 M14 39 Q14 54 32 54 Q50 54 50 39" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>'),
  ability("Trail’s End", "Plays the whole game in one continuous run, from the opening to the credits, along the route a real player would take. Its job is to catch the worst bug of all: a soft-lock on the main path that leaves the player permanently stuck and unable to finish.", "Hits a story gate that never opens, flags it as a launch-blocking soft-lock, and reports where the run died.", '<path d="M5 55 L25 17 L39 39 L47 26 L59 55 Z" fill="none" stroke="currentColor" stroke-width="3"/><path d="M25 17 V8 M25 8 L35 11 L25 14" fill="none" stroke="currentColor" stroke-width="3"/>'),
];

const replicatorAbilities: BotAbilityGroup[] = [
  {
    groupLabel: "Replay & Compatibility",
    abilities: [
      ability("Echo", "Replays a recorded session exactly, same path and same inputs, and reaches the very same end state.", "Re-runs a captured ten-minute session and lands on the identical final screen.", '<path d="M20 19 L39 32 L20 45 Z" fill="currentColor"/><path d="M45 22 a14 14 0 0 1 0 20 M51 15 a23 23 0 0 1 0 34" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>'),
      ability("Bounty Hunter", "Tracks down a reported bug from its repro steps and confirms whether it still fires, then re-runs it many times to learn whether it strikes every time or only sometimes, and at what rate. Re-runs a claimed fix to confirm the bug is dead.", "Reproduces a crash 100 times, finds it hits 12% of runs, then verifies the patch drops it to zero.", '<circle cx="27" cy="27" r="14" fill="none" stroke="currentColor" stroke-width="3"/><path d="M37 37 L52 52" stroke="currentColor" stroke-width="4"/><circle cx="27" cy="27" r="7" fill="none" stroke="currentColor" stroke-width="2.4"/><circle cx="27" cy="27" r="2.4" fill="currentColor"/>'),
      ability("Spectrum", "Runs the same test across the full range of devices and configs, covering resolution, aspect ratio, OS, GPU tier and input method, and flags anything that passes on one but breaks on another.", "Runs a menu test on 20 device profiles and catches a button that falls off-screen at 21:9.", '<rect x="11" y="11" width="18" height="18" rx="2.5" fill="none" stroke="currentColor" stroke-width="3"/><rect x="35" y="11" width="18" height="18" rx="2.5" fill="none" stroke="currentColor" stroke-width="3"/><rect x="11" y="35" width="18" height="18" rx="2.5" fill="none" stroke="currentColor" stroke-width="3"/><rect x="35" y="35" width="18" height="18" fill="currentColor" opacity=".85"/>'),
      ability("Regression", "Runs the same test across two or more builds and compares the results, catching anything that worked in the previous build but breaks in the new one, plus any drift from the known-good reference build.", "Passes a save flow on build 41 but fails it on build 42, pinpointing a fresh regression.", '<rect x="9" y="16" width="20" height="32" rx="3" fill="none" stroke="currentColor" stroke-width="3"/><rect x="35" y="16" width="20" height="32" rx="3" fill="none" stroke="currentColor" stroke-width="3"/><path d="M27 32 H39 M35 27 l5 5 l-5 5" fill="none" stroke="currentColor" stroke-width="3"/>'),
      ability("Triangulate", "Takes a bug another hero found and pins it down precisely. It scopes the bug across the full device and build grid, then walks back through the build history to find the exact build that introduced it.", "Confirms a bug appears only on low-end Android at 16:9, then traces it to the build where it first showed up.", '<rect x="11" y="11" width="42" height="42" rx="4" fill="none" stroke="currentColor" stroke-width="3"/><path d="M25 11 V53 M39 11 V53 M11 25 H53 M11 39 H53" stroke="currentColor" stroke-width="1.8" opacity=".45"/><circle cx="46" cy="46" r="6.5" fill="none" stroke="currentColor" stroke-width="3"/>'),
    ],
  },
  {
    groupLabel: "Performance & Regression Intelligence",
    abilities: [
      ability("Heartbeat", "Reads the game’s pulse frame by frame, measuring frame time, FPS, startup and load times, CPU and GPU work, memory and VRAM, draw calls and garbage collection, from outside the build or through deeper engine sight.", "Shows a frame-time spike, GPU-thread cost, rising VRAM and the exact level-load duration together on one timeline.", '<path d="M7 34 H17 L23 19 L31 47 L39 26 L45 34 H57" fill="none" stroke="currentColor" stroke-width="3.2"/><circle cx="32" cy="34" r="22" fill="none" stroke="currentColor" stroke-width="2.4" opacity=".55"/>'),
      ability("Faultmark", "Marks every hitch, crash and hang at the instant it strikes, pinning its severity to the timeline and preserving the surrounding video, system state and world position as evidence.", "A 186 ms stutter hits in the city plaza, so the surrounding clip is saved and the exact hotspot is marked on the tour.", '<circle cx="29" cy="29" r="18" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="29" cy="29" r="7" fill="none" stroke="currentColor" stroke-width="2.6"/><path d="M29 6 V15 M29 43 V52 M6 29 H15 M43 29 H52 M41 41 L55 55" stroke="currentColor" stroke-width="2.6"/>'),
      ability("Endless Vigil", "Guards every new build without supervision, recording and replaying tours, running every scenario, preset and machine combination, and holding hours-long soaks, while rejecting diverged or contaminated runs and repeating them clean.", "A build lands overnight, so the full matrix runs, a CPU-contaminated attempt is rejected and re-run, and results are refreshed before morning.", '<path d="M8 31 C18 19 46 19 56 31 C46 43 18 43 8 31 Z" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="32" cy="31" r="7" fill="currentColor"/><path d="M14 16 C22 8 42 8 50 16 M50 47 C42 55 22 55 14 47" fill="none" stroke="currentColor" stroke-width="2.6"/>'),
      ability("Omen", "Studies each route’s natural noise and accepted baseline, then raises a confidence-scored alert when a build breaks budget, slows down, stutters more, leaks memory, regresses on min-spec or begins a slow creep.", "Detects a small frame-time loss accumulating across six builds and raises it before the slow creep becomes a launch-day crisis.", '<path d="M9 48 H55 M12 42 L23 34 L31 38 L43 21 L53 25 M43 21 H51 V29" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>'),
      ability("Sentinel’s Verdict", "Names the guilty build and the system behind it, tracing top engine-marker deltas, thread timings and spatial hotspots, bisecting the suspect changelist window, and forging a case file the dashboard, CI and issue tracker can act on.", "Names a level at +3.1 ms, marks the heavy zone, traces the break to a specific build and hands the team a ready-to-file case.", '<path d="M32 7 L49 14 V29 C49 41 42 50 32 56 C22 50 15 41 15 29 V14 Z" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="32" cy="29" r="11" fill="none" stroke="currentColor" stroke-width="2.8"/><path d="M26 48 L32 54 L43 42" fill="none" stroke="currentColor" stroke-width="3.2"/>', true),
    ],
  },
];

const shared = {
  arbiter: ["Platform compliance verification against first-party requirements", "Certification checklist execution", "Submission-readiness validation", "System behaviour checks against platform-holder guidelines", "Edge-case and submission-critical scenario testing"],
  rosetta: ["Translation accuracy checks against source strings", "Text layout and truncation / overflow validation", "Subtitle presence, timing and sync checks", "Regional formatting (dates, currency, units)", "Cultural accuracy review across supported locales"],
  stressor: ["Performance-under-load testing", "Stress testing to find breaking points", "Stability-limit and long-running / high-load scenario testing", "Multiplayer systems validation under load", "Chat, invites and social-feature testing", "Multi-user interaction flow testing"],
};

export const bots: Bot[] = [
  {
    id: "wayfinder", name: "Wayfinder", role: "The Explorer", category: "functional", categoryLabel: "Functional QA", specialisesIn: "UI navigation, onboarding flows and end-to-end player journeys.",
    bio: "Wayfinder systematically navigates menus, UI flows, settings, and onboarding journeys, clicking through every possible path a player might take. From main menus to deep settings trees, he ensures everything is accessible, responsive, and intuitive.", impact: "Ensures players understand how to play and never get lost before the game even begins.", color: "#38BDF8", status: "online", model: { path: "/models/Wayfinder", glb: "wayfinder.glb" }, abilityGroups: [{ abilities: wayfinderAbilities }],
  },
  {
    id: "trailblazer", name: "Trailblazer", role: "The Adventurer", category: "functional", categoryLabel: "Functional QA", specialisesIn: "Progression systems, quests and complete gameplay paths.",
    bio: "Trailblazer plays through your game from start to finish, validating progression, objectives, and unlocks to make sure the journey is always completable.", impact: "Prevents blockers that stop players from finishing or progressing through your game.", color: "#34D399", status: "online", model: { path: "/models/Trailblazer", glb: "trailblazer.glb" }, abilityGroups: [{ abilities: trailblazerAbilities }],
  },
  {
    id: "arbiter", name: "Arbiter", role: "The Certifier", category: "compliance", categoryLabel: "Compliance QA", specialisesIn: "Platform compliance, certification and submission checks.",
    bio: "Arbiter performs automated compliance checks against platform requirements, validating system behaviour, edge cases, and submission-critical scenarios.", impact: "Reduces the risk of certification failure and costly resubmissions to platform holders.", color: "#FACC15", status: "training", model: { path: "/models/Arbiter", glb: "arbiter.glb" }, capabilities: shared.arbiter,
  },
  {
    id: "replicator", name: "Replicator", role: "The Perfectionist", category: "compatibility", categoryLabel: "Compatibility QA", specialisesIn: "Cross-device and multi-build replay, compatibility validation, performance monitoring and regression detection.",
    bio: "Replicator turns one test into thousands, replaying scenarios across devices, builds, and configurations to guarantee consistent behaviour everywhere. Its role now also covers continuous performance monitoring — tracking frame rate, load times and system resource use to catch regressions as they emerge.", impact: "Ensures bugs stay fixed and features behave consistently across platforms, while giving the team clear visibility into performance regressions before players ever notice them.", color: "#60A5FA", status: "online", model: { path: "/models/Replicator", glb: "replicator.glb" }, scopeNote: "Expanded scope: this bot’s capability set now combines test replication / cross-device compatibility work with performance monitoring and regression detection, previously split across two bots. It is presented here as a single, unified Compatibility QA agent.", abilityGroups: replicatorAbilities,
  },
  {
    id: "rosetta", name: "Rosetta", role: "The Translator", category: "localisation", categoryLabel: "Localisation QA", specialisesIn: "Localisation, translations, subtitles and cultural accuracy.",
    bio: "Rosetta ensures your game works in every language by validating translations, text layout, subtitles, and regional formatting across all supported locales.", impact: "Ensures global players receive a polished, natural experience in their own language.", color: "#E879F9", status: "training", model: { path: "/models/Rosetta", glb: "rosetta.glb" }, capabilities: shared.rosetta,
  },
  {
    id: "stressor", name: "Stressor", role: "The Workhorse", category: "network", categoryLabel: "Network QA", specialisesIn: "Load, stress, stability and multiplayer-system validation.",
    bio: "Stressor pushes your game beyond normal limits by flooding systems with inputs, entities, and load to expose performance and stability weaknesses. Its scope now also covers multiplayer and social systems, testing chat, invites and connectivity under the same demanding, high-load conditions.", impact: "Reveals crashes, slowdowns and social/multiplayer breakdowns that only appear under real-world scale and concurrent player load.", color: "#FB7185", status: "training", model: { path: "/models/Stressor", glb: "stressor.glb" }, scopeNote: "Expanded scope: this bot’s capability set now combines load, stress and stability testing with multiplayer and social-system validation, previously split across two bots. It is presented here as a single, unified Network QA agent.", capabilities: shared.stressor,
  },
];

export const STATUS_CONFIG: Record<BotStatus, { label: string; color: string; dot: string }> = {
  online: { label: "Online", color: "text-emerald-400", dot: "bg-emerald-400" },
  spawning: { label: "Spawning", color: "text-amber-400", dot: "bg-amber-400" },
  training: { label: "Training", color: "text-blue-400", dot: "bg-blue-400" },
};

export const ALL_MODEL_PATHS = bots.map((bot) => `${bot.model.path}/${bot.model.glb}`);
