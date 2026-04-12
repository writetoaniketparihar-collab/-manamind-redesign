"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FadeInView } from "@/components/animations/FadeInView";
import { SectionHeading } from "@/components/shared/SectionHeading";

// --- Animated Visuals ---

function VisualModVisual({ inView }: { inView: boolean }) {
  // Frame scan + video timeline
  const uiBoxes = [
    { x: 12, y: 15, w: 25, h: 8, label: "MENU" },
    { x: 63, y: 10, w: 20, h: 6, label: "HUD" },
    { x: 15, y: 55, w: 30, h: 12, label: "PLAYER" },
    { x: 60, y: 60, w: 22, h: 10, label: "NPC" },
  ];

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      {/* Background grid */}
      {Array.from({ length: 100 }).map((_, i) => (
        <circle
          key={i}
          cx={(i % 10) * 10 + 5}
          cy={Math.floor(i / 10) * 10 + 5}
          r="0.3"
          fill="rgba(255,255,255,0.04)"
        />
      ))}

      {/* Scan line sweep */}
      <motion.line
        x1="0" y1="0" x2="100" y2="0"
        stroke="#00FF96"
        strokeWidth="0.6"
        initial={{ y1: 0, y2: 0 }}
        animate={inView ? { y1: [0, 100, 0], y2: [0, 100, 0] } : {}}
        transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 0.5 }}
        opacity={0.3}
      />

      {/* Detected UI element boxes */}
      {uiBoxes.map((box, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.8 + i * 0.3, type: "spring", stiffness: 150 }}
        >
          <motion.rect
            x={box.x} y={box.y} width={box.w} height={box.h}
            rx="1.5"
            fill="none"
            stroke="#00FF96"
            strokeWidth="0.5"
            strokeDasharray="2 1"
            animate={{ strokeDashoffset: [0, -12] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <motion.rect
            x={box.x} y={box.y} width={box.w} height={box.h}
            rx="1.5"
            fill="#00FF9608"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
          />
          <text
            x={box.x + box.w / 2}
            y={box.y + box.h / 2 + 1}
            textAnchor="middle"
            fill="#00FF96"
            fontSize="2.5"
            fontFamily="monospace"
            fontWeight="600"
          >
            {box.label}
          </text>
        </motion.g>
      ))}

      {/* Video timeline at bottom */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 2 }}
      >
        <rect x="10" y="85" width="80" height="4" rx="2" fill="rgba(255,255,255,0.05)" />
        {/* Frame markers */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.rect
            key={i}
            x={14 + i * 9.5}
            y="86"
            width="6"
            height="2"
            rx="0.5"
            fill="#00FF9640"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: [0.3, 0.8, 0.3] } : {}}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
        {/* Playhead */}
        <motion.rect
          x="14"
          y="84.5"
          width="2"
          height="5"
          rx="1"
          fill="#00FF96"
          animate={inView ? { x: [14, 84, 14] } : {}}
          transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 2.5 }}
        />
      </motion.g>

      {/* Corner brackets - frame indicator */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.6 } : {}}
        transition={{ delay: 0.5 }}
        stroke="#00FF96"
        strokeWidth="0.5"
        fill="none"
      >
        <path d="M5 5 L5 12 M5 5 L12 5" />
        <path d="M95 5 L95 12 M95 5 L88 5" />
        <path d="M5 78 L5 71 M5 78 L12 78" />
        <path d="M95 78 L95 71 M95 78 L88 78" />
      </motion.g>
    </svg>
  );
}

function NLPModVisual({ inView }: { inView: boolean }) {
  // Text parsing + objective interpretation
  const objectives = [
    { text: '"Test the tutorial flow"', y: 18 },
    { text: '"Stress-test inventory"', y: 30 },
    { text: '"Find edge cases in shop"', y: 42 },
  ];

  const gameTexts = [
    { text: "Start Game", x: 58, y: 62 },
    { text: "Health: 100", x: 62, y: 72 },
    { text: "Quest Complete!", x: 56, y: 82 },
  ];

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      {/* Objective section */}
      <motion.text
        x="5" y="10"
        fill="#A78BFA"
        fontSize="3"
        fontFamily="monospace"
        fontWeight="700"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
      >
        OBJECTIVES
      </motion.text>

      {objectives.map((obj, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, x: -15 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.6 + i * 0.25, duration: 0.5 }}
        >
          <rect
            x="5" y={obj.y - 4}
            width="45" height="8"
            rx="1.5"
            fill="#A78BFA08"
            stroke="#A78BFA30"
            strokeWidth="0.3"
          />
          <motion.text
            x="8" y={obj.y + 1}
            fill="#A78BFA"
            fontSize="2.2"
            fontFamily="monospace"
          >
            {obj.text}
          </motion.text>
          {/* Processing arrow */}
          <motion.path
            d={`M 52 ${obj.y} L 56 ${obj.y}`}
            stroke="#A78BFA"
            strokeWidth="0.5"
            fill="none"
            markerEnd="url(#arrowNLP)"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ delay: 1 + i * 0.25 }}
          />
        </motion.g>
      ))}

      {/* Divider */}
      <motion.line
        x1="50" y1="55" x2="50" y2="90"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="0.3"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ delay: 1.5 }}
      />

      {/* In-game text section */}
      <motion.text
        x="55" y="55"
        fill="#A78BFA80"
        fontSize="2.5"
        fontFamily="monospace"
        fontWeight="600"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.5 }}
      >
        IN-GAME TEXT
      </motion.text>

      {gameTexts.map((t, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.8 + i * 0.3 }}
        >
          <rect
            x={t.x - 2} y={t.y - 4}
            width="40" height="7"
            rx="1"
            fill="#A78BFA06"
            stroke="#A78BFA20"
            strokeWidth="0.3"
          />
          <text x={t.x} y={t.y} fill="#A78BFA90" fontSize="2.2" fontFamily="monospace">
            {t.text}
          </text>
          {/* Highlight scan */}
          <motion.rect
            x={t.x - 2} y={t.y - 4}
            width="40" height="7"
            rx="1"
            fill="#A78BFA"
            opacity={0}
            animate={inView ? { opacity: [0, 0.15, 0] } : {}}
            transition={{ duration: 1.5, delay: 2.5 + i * 0.4, repeat: Infinity, repeatDelay: 3 }}
          />
        </motion.g>
      ))}

      <defs>
        <marker id="arrowNLP" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
          <path d="M0 0 L4 2 L0 4" fill="#A78BFA" />
        </marker>
      </defs>
    </svg>
  );
}

function InteractionModVisual({ inView }: { inView: boolean }) {
  // Input signals animation
  const inputs = [
    { label: "W", x: 30, y: 20, delay: 0.5 },
    { label: "A", x: 18, y: 35, delay: 0.8 },
    { label: "S", x: 30, y: 35, delay: 1.1 },
    { label: "D", x: 42, y: 35, delay: 1.4 },
    { label: "CLICK", x: 70, y: 25, delay: 1.7 },
    { label: "SPACE", x: 30, y: 55, delay: 2.0 },
  ];

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      {/* Background grid */}
      {Array.from({ length: 100 }).map((_, i) => (
        <circle
          key={i}
          cx={(i % 10) * 10 + 5}
          cy={Math.floor(i / 10) * 10 + 5}
          r="0.25"
          fill="rgba(255,255,255,0.03)"
        />
      ))}

      {/* Input keys */}
      {inputs.map((input, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: input.delay, type: "spring", stiffness: 200 }}
        >
          <rect
            x={input.x - (input.label.length > 1 ? 8 : 5)}
            y={input.y - 5}
            width={input.label.length > 1 ? 16 : 10}
            height={10}
            rx="2"
            fill="#38BDF808"
            stroke="#38BDF840"
            strokeWidth="0.5"
          />
          {/* Key press pulse */}
          <motion.rect
            x={input.x - (input.label.length > 1 ? 8 : 5)}
            y={input.y - 5}
            width={input.label.length > 1 ? 16 : 10}
            height={10}
            rx="2"
            fill="#38BDF8"
            animate={inView ? { opacity: [0, 0.3, 0] } : {}}
            transition={{ duration: 0.6, delay: input.delay + 0.5, repeat: Infinity, repeatDelay: 2 + i * 0.3 }}
          />
          <text
            x={input.x}
            y={input.y + 1}
            textAnchor="middle"
            fill="#38BDF8"
            fontSize={input.label.length > 1 ? "2.5" : "3.5"}
            fontFamily="monospace"
            fontWeight="700"
          >
            {input.label}
          </text>
        </motion.g>
      ))}

      {/* Mouse cursor */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.5 }}
      >
        <motion.g
          animate={inView ? { x: [0, 8, 5, 12], y: [0, -5, 3, -2] } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M66 38 L66 50 L69 47 L72 53 L74 52 L71 46 L75 46 Z"
            fill="#38BDF8"
            stroke="#38BDF8"
            strokeWidth="0.3"
            strokeLinejoin="round"
          />
        </motion.g>
      </motion.g>

      {/* Controller at bottom */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 0.6, y: 0 } : {}}
        transition={{ delay: 2.5 }}
      >
        <rect x="30" y="72" width="40" height="18" rx="5" fill="none" stroke="#38BDF830" strokeWidth="0.5" />
        {/* D-pad */}
        <rect x="38" y="78" width="3" height="8" rx="0.5" fill="#38BDF820" />
        <rect x="35" y="80.5" width="8" height="3" rx="0.5" fill="#38BDF820" />
        {/* Buttons */}
        <circle cx="58" cy="79" r="1.5" fill="none" stroke="#38BDF830" strokeWidth="0.4" />
        <circle cx="62" cy="82" r="1.5" fill="none" stroke="#38BDF830" strokeWidth="0.4" />
        <circle cx="58" cy="85" r="1.5" fill="none" stroke="#38BDF830" strokeWidth="0.4" />
        <circle cx="54" cy="82" r="1.5" fill="none" stroke="#38BDF830" strokeWidth="0.4" />
        {/* Button press pulse */}
        <motion.circle
          cx="62" cy="82" r="1.5"
          fill="#38BDF8"
          animate={inView ? { opacity: [0, 0.6, 0] } : {}}
          transition={{ duration: 0.5, delay: 3, repeat: Infinity, repeatDelay: 2 }}
        />
      </motion.g>

      {/* Signal lines from inputs to game area */}
      <motion.path
        d="M 50 60 Q 50 65 65 68"
        fill="none"
        stroke="#38BDF830"
        strokeWidth="0.4"
        strokeDasharray="2 2"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ delay: 2.2, duration: 0.8 }}
      />
    </svg>
  );
}

function AudioModVisual({ inView }: { inView: boolean }) {
  // Waveform + timing analysis
  const bars = 24;

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      {/* Waveform bars */}
      {Array.from({ length: bars }).map((_, i) => {
        const height = 5 + Math.sin(i * 0.8) * 15 + Math.sin(i * 2.3 + 1.7) * 5;
        return (
          <motion.rect
            key={i}
            x={8 + i * 3.5}
            y={50 - height / 2}
            width="2"
            height={height}
            rx="1"
            fill="#FBBF2430"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: [0.3, 1, 0.5, 0.8, 0.3] } : {}}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.08,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: `${8 + i * 3.5 + 1}px 50px` }}
          />
        );
      })}

      {/* Center line */}
      <motion.line
        x1="5" y1="50" x2="95" y2="50"
        stroke="#FBBF2415"
        strokeWidth="0.3"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.8 }}
      />

      {/* Sync markers */}
      {[25, 50, 75].map((x, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 + i * 0.3 }}
        >
          <motion.line
            x1={x} y1="30" x2={x} y2="70"
            stroke="#FBBF2440"
            strokeWidth="0.3"
            strokeDasharray="1 1"
          />
          <motion.circle
            cx={x} cy={30}
            r="2"
            fill="none"
            stroke="#FBBF24"
            strokeWidth="0.4"
            animate={inView ? { r: [2, 4, 2], opacity: [0.6, 0, 0.6] } : {}}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
          />
        </motion.g>
      ))}

      {/* "Coming Soon" overlay */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 2 }}
      >
        <rect x="25" y="80" width="50" height="10" rx="5" fill="#FBBF2410" stroke="#FBBF2430" strokeWidth="0.4" />
        <text x="50" y="86.5" textAnchor="middle" fill="#FBBF24" fontSize="3" fontFamily="monospace" fontWeight="600">
          COMING SOON
        </text>
      </motion.g>
    </svg>
  );
}

// --- Data ---

const modalities = [
  {
    category: "Visual",
    color: "#00FF96",
    headline: "Seeing and understanding gameplay as both moments and motion",
    visual: VisualModVisual,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    subsections: [
      {
        title: "Frames",
        subtitle: "Instantaneous understanding",
        description:
          "Our bots analyse individual frames to detect UI elements, objects, and scene layout in real time. This enables precise interaction with menus, HUDs, and other visual systems.",
        bullets: [],
      },
      {
        title: "Video",
        subtitle: "Temporal understanding",
        description:
          "By tracking sequences of frames, agents understand movement, animation, and cause-and-effect across time, allowing them to detect issues like flickering, desynchronisation, or unstable physics.",
        bullets: [],
      },
    ],
  },
  {
    category: "Natural Language",
    color: "#A78BFA",
    headline: "Interpreting instructions and in-game text",
    visual: NLPModVisual,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        <path d="M8 9h8M8 13h4" strokeLinecap="round" />
      </svg>
    ),
    subsections: [
      {
        title: "Objectives",
        subtitle: "Developer instructions",
        description:
          "Teams describe testing goals in plain language instead of writing brittle scripts. Objectives can be updated instantly, enabling rapid iteration and exploratory testing.",
        bullets: [],
      },
      {
        title: "In-Game Text",
        subtitle: "UI and system feedback",
        description:
          "Agents extract and interpret text rendered in the game - including menus, dialogue, and prompts - to understand progression, validate actions, and detect inconsistencies in messaging.",
        bullets: [],
      },
    ],
  },
  {
    category: "Interaction",
    color: "#38BDF8",
    headline: "Executing actions through real player inputs",
    visual: InteractionModVisual,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M13.8 12H3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    description:
      "Our bots control games using native inputs, ensuring behaviour is tested under authentic gameplay conditions and can be reliably reproduced.",
    subsections: [
      {
        title: "Executing Actions Through Real Player Inputs",
        subtitle: "",
        description:
          "Our bots control games using native inputs, ensuring behaviour is tested under authentic gameplay conditions and can be reliably reproduced.",
        bullets: [
          "PC - Keystrokes & Mouse Clicks",
          "Console - Controller Commands",
          "Mobile - Taps & Swipes",
        ],
      },
    ],
  },
  {
    category: "Audio",
    color: "#FBBF24",
    headline: "Extending testing into sound and timing",
    visual: AudioModVisual,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.08" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    comingSoon: true,
    description:
      "Future versions will analyse in-game audio to detect missing cues, incorrect triggers, and mismatches between sound and visuals.",
    subsections: [],
  },
];

// --- Components ---

function SubsectionCard({
  sub,
  color,
  index,
}: {
  sub: (typeof modalities)[0]["subsections"][0];
  color: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
      className="rounded-xl border border-white/[0.07] bg-bg-card p-6"
    >
      {sub.title && (
        <div className="mb-3">
          <span className="text-sm font-bold text-foreground">{sub.title}</span>
          {sub.subtitle && (
            <span className="ml-2 text-xs text-text-muted">· {sub.subtitle}</span>
          )}
        </div>
      )}
      {sub.description && (
        <p className="mb-4 text-sm leading-relaxed text-text-muted">{sub.description}</p>
      )}
      <ul className="space-y-2.5">
        {sub.bullets.map((bullet, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.08 }}
            className="flex items-start gap-3"
          >
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-sm leading-relaxed text-text-muted">{bullet}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export function FeatureBreakdown() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const modality = modalities[active];
  const Visual = modality.visual;

  return (
    <section ref={ref} className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <SectionHeading
            label="How Our Bots Interact With Your Game"
            title="Built to understand games the way humans do - through sight, context, and intent."
            description="ManaMind's agents observe the game world and interact through normal player inputs, allowing them to test any title without internal integration."
          />
        </FadeInView>

        {/* Tabbed modalities */}
        <FadeInView delay={0.15}>
          <div className="mt-16 overflow-hidden rounded-2xl border border-white/10 bg-bg-card">
            {/* Tab strip */}
            <div
              role="tablist"
              className="flex overflow-x-auto border-b border-white/10"
            >
              {modalities.map((m, i) => {
                const isActive = active === i;
                return (
                  <button
                    key={m.category}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(i)}
                    className="group relative flex flex-shrink-0 items-center gap-3 px-5 py-4 text-left transition-colors sm:px-6 sm:py-5"
                    style={{
                      backgroundColor: isActive
                        ? `${m.color}1A`
                        : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive)
                        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all"
                      style={{
                        backgroundColor: isActive
                          ? `${m.color}28`
                          : "rgba(255,255,255,0.05)",
                        color: isActive ? m.color : "rgb(156 163 175)",
                        boxShadow: isActive ? `0 0 18px ${m.color}30` : "none",
                      }}
                    >
                      {m.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="whitespace-nowrap text-sm font-bold transition-colors"
                        style={{
                          color: isActive ? m.color : "rgb(229 231 235)",
                        }}
                      >
                        {m.category}
                      </span>
                      {m.comingSoon && (
                        <span
                          className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest"
                          style={{
                            color: m.color,
                            backgroundColor: `${m.color}15`,
                          }}
                        >
                          Soon
                        </span>
                      )}
                    </div>
                    {/* Active accent underline, always rendered for clear affordance */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-[3px] transition-opacity"
                      style={{
                        backgroundColor: m.color,
                        opacity: isActive ? 1 : 0,
                      }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Active panel */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="p-6 sm:p-8 md:p-10"
                >
                  {/* Headline above content */}
                  <div className="mb-6 max-w-2xl">
                    <h3
                      className="text-lg font-bold leading-snug text-foreground md:text-xl"
                    >
                      {modality.headline}
                    </h3>
                    {modality.description && (
                      <p className="mt-2 text-sm leading-relaxed text-text-muted">
                        {modality.description}
                      </p>
                    )}
                  </div>

                  {/* Two-column: visual + cards */}
                  <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
                    {/* Animated visual */}
                    <div
                      className="aspect-[3/2] overflow-hidden rounded-xl border p-4"
                      style={{
                        borderColor: `${modality.color}15`,
                        backgroundColor: `${modality.color}03`,
                      }}
                    >
                      <Visual inView={inView} />
                    </div>

                    {/* Subsection cards */}
                    <div className="space-y-4">
                      {modality.subsections.map((sub, i) => (
                        <SubsectionCard
                          key={i}
                          sub={sub}
                          color={modality.color}
                          index={i}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </FadeInView>

        {/* Closing line */}
        <FadeInView delay={0.4}>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5">
              <motion.span
                className="h-2 w-2 rounded-full bg-primary"
                animate={inView ? { opacity: [1, 0.3, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-primary">
                Together, these modalities allow our agents to test games like human players, but at machine scale.
              </span>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
