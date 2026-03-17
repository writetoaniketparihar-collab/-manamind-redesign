export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Product", href: "/product" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const INVESTORS = [
  { name: "EWOR", logo: null },
  { name: "SVV", logo: null },
  { name: "Heartfelt Capital", logo: null },
  { name: "Ascension", logo: null },
  { name: "Syndicate Room", logo: null },
];

export const PARTNERS = [
  { name: "EWOR", logo: null },
  { name: "Microsoft for Startups", logo: null },
  { name: "Nvidia Inception", logo: null },
  { name: "Google for Startups", logo: null },
];

export const PRESS_MENTIONS = [
  { title: "Forbes Article", type: "article" as const, url: "#" },
  { title: "Capital Article", type: "article" as const, url: "#" },
  { title: "Creating the operating system for all future robots", type: "podcast" as const, source: "Ventures Podcast", url: "#" },
  { title: "AI agents that play games & find bugs", type: "podcast" as const, source: "The Builder's Mind Podcast", url: "#" },
  { title: "The End of Manual QA: Automating Game Testing with AI", type: "podcast" as const, source: "Tech Finds Tech Podcast", url: "#" },
];

export const BOTS = [
  {
    name: "Probe",
    description: "Autonomous explorer that navigates game worlds, interacts with objects, and discovers bugs through intelligent exploration — no scripting required.",
  },
  {
    name: "Overseer",
    description: "Monitors and coordinates testing sessions, analysing bot behaviour, prioritising discoveries, and ensuring comprehensive coverage across the game.",
  },
  {
    name: "Scribe",
    description: "Documents every finding with detailed reports, screenshots, reproduction steps, and severity classifications — ready for your QA team.",
  },
];

export const VALUE_PROPS = [
  {
    title: "Zero Integration",
    description: "No code access, no SDK, no API keys. Our bots interact with your game exactly like a human player would.",
  },
  {
    title: "Infinite Scale",
    description: "Run hundreds of autonomous testing sessions simultaneously. Cover more ground in hours than manual QA does in weeks.",
  },
  {
    title: "Zero-Shot Testing",
    description: "No training data required. Drop our bots into any game and they start testing immediately with human-like intelligence.",
  },
];

export const ARCHITECTURE = {
  hivemind: {
    name: "Hivemind",
    description: "Our proprietary AI model — the core intelligence that powers autonomous decision-making, learning, and adaptation across all bots.",
  },
  commandCentre: {
    name: "Command Centre",
    description: "Your mission control. Configure testing sessions, monitor bot activity in real-time, review findings, and manage your QA pipeline.",
  },
  legion: {
    name: "Legion",
    description: "The orchestration layer that deploys, coordinates, and scales bot instances across testing sessions.",
  },
  bots: {
    name: "Bots",
    description: "Autonomous agents (Probe, Overseer, Scribe) that interact with your game, find bugs, and report findings — all without human intervention.",
  },
};

export const FEATURES = [
  {
    title: "Exploration",
    description: "Bots autonomously navigate game worlds, discovering areas, interacting with objects, and testing boundaries — just like a real player.",
  },
  {
    title: "Detection",
    description: "Visual anomalies, physics glitches, UI bugs, crash triggers — our bots identify issues across every layer of the game.",
  },
  {
    title: "Reporting",
    description: "Every bug comes with video evidence, reproduction steps, severity classification, and contextual metadata — ready for your team.",
  },
];

export const GA_MEASUREMENT_ID = "G-PP9ZLMJTTH";
