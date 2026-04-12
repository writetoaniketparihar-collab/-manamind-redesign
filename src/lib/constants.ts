export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Product", href: "/product" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const INVESTORS: Array<{ name: string; logo: string | null }> = [
  { name: "EWOR", logo: "/investors/ewor.png" },
  { name: "SVV", logo: "/investors/svv.png" },
  { name: "Heartfelt Capital", logo: "/investors/heartfelt.png" },
  { name: "Ascension", logo: "/investors/ascension.png" },
  { name: "Syndicate Room", logo: "/investors/syndicate-room.png" },
];

export const PARTNERS = [
  { name: "EWOR", logo: null },
  { name: "Microsoft for Startups", logo: null },
  { name: "Nvidia Inception", logo: null },
  { name: "Google for Startups", logo: null },
  { name: "UKIE", logo: null },
];

export type PressMention = {
  title: string;
  type: "article" | "podcast";
  url: string;
  source?: string;
  thumbnail?: string;
};

export const PRESS_MENTIONS: PressMention[] = [
  {
    title: "ManaMind Introduces Game-Playing AI To Test Titles In Production",
    type: "article",
    source: "Forbes",
    url: "https://www.forbes.com/sites/charliefink/2025/11/17/manamind-introduces-game-playing-ai-to-test-titles-in-production/",
    thumbnail: "/press/forbes-v2.webp",
  },
  {
    title: "Emil Kostadinov and ManaMind's new generation of AI",
    type: "article",
    source: "Capital",
    url: "https://kinsights.capital.bg/business/2026/02/16/4883084_emil_kostadinov_and_manaminds_new_generation_of_ai/",
    thumbnail: "/press/capital.jpg",
  },
  {
    title: "Creating the operating system for all future robots: Emil Kostadinov - CEO, Manamind",
    type: "podcast",
    source: "VENTURES with Viraj Acharya",
    url: "https://www.youtube.com/watch?v=5mZhVkgOk7g&t=744s",
    thumbnail: "/press/ventures-podcast.jpg",
  },
  {
    title: "AI Agents That Play Video Games & Find Bugs | Startup Founder Story (Emil, ManaMind)",
    type: "podcast",
    source: "The Builder's Mind",
    url: "https://www.youtube.com/watch?v=DwgZEKRGIDo",
    thumbnail: "/press/builders-mind-podcast.jpg",
  },
  {
    title: "The End of Manual QA: Automating Game Test with AI - ft. Emil Kostadinov | Founder & CEO, ManaMind",
    type: "podcast",
    source: "Tech Finds Tech Podcast",
    url: "https://www.youtube.com/watch?v=QCSOwrarwFU&t=3s",
    thumbnail: "/press/tech-finds-tech-podcast.jpg",
  },
];

export const BOTS = [
  {
    name: "Wayfinder",
    description: "Systematically charts game worlds, uncovering hidden paths, unreachable areas, and navigation inconsistencies to ensure no corner goes untested.",
  },
  {
    name: "Gladiator",
    description: "Stress-tests combat systems, weapon combos, and game mechanics to find balance issues, exploits, and edge cases.",
  },
  {
    name: "Replicator",
    description: "Reproduces reported issues thousands of times with variations, confirming reproducibility and identifying exact failure conditions.",
  },
  {
    name: "Rosetta",
    description: "Validates localisation across every supported language - catching text overflow, missing translations, and encoding issues automatically.",
  },
  {
    name: "Merchant",
    description: "Tests in-game economies, shop systems, loot tables, and transaction flows to find pricing exploits and economic imbalances.",
  },
  {
    name: "Trailblazer",
    description: "Goes where no tester has gone before - combining unusual actions and sequence-breaking to discover bugs that scripted tests never catch.",
  },
  {
    name: "Stressor",
    description: "Applies extreme load, rapid inputs, and resource pressure to find performance bottlenecks, memory leaks, and crash conditions.",
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
    description: "Hivemind is our proprietary vLMM and the perception and reasoning layer that interprets game frames, understands UI, and decides what each bot should do next.",
  },
  commandCentre: {
    name: "Command Centre",
    description: "The Command Centre is where teams configure, monitor, and manage every aspect of their AI-driven QA pipeline - from launching sessions to reviewing critical findings.",
  },
  legion: {
    name: "Legion",
    description: "Launches, coordinates, and scales hundreds of bot instances across machines and test sessions.",
  },
  bots: {
    name: "Bots",
    description: "Autonomous agents that interact with your game through the screen - just like human testers.",
  },
};

export const FEATURES = [
  {
    title: "Exploration",
    description: "Bots autonomously navigate game worlds, discovering areas, interacting with objects, and testing boundaries - just like a real player.",
  },
  {
    title: "Detection",
    description: "Visual anomalies, physics glitches, UI bugs, crash triggers - our bots identify issues across every layer of the game.",
  },
  {
    title: "Reporting",
    description: "Every bug comes with video evidence, reproduction steps, severity classification, and contextual metadata - ready for your team.",
  },
];

export const GA_MEASUREMENT_ID = "G-PP9ZLMJTTH";
