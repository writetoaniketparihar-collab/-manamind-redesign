"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FadeInView } from "@/components/animations/FadeInView";

// --- Animated visuals per belief ---

function HumanMachineVisual({ active }: { active: boolean }) {
  // Human + machine working together, not replacing
  return (
    <svg viewBox="0 0 200 140" className="h-full w-full">
      {/* Human figure */}
      <motion.g
        initial={{ opacity: 0, x: -20 }}
        animate={active ? { opacity: 1, x: 0 } : { opacity: 0.3, x: -10 }}
        transition={{ duration: 0.6 }}
      >
        <circle cx="50" cy="35" r="10" stroke="#00FF96" strokeWidth="1.2" fill="#00FF9608" />
        <path d="M50 45 L50 75 M35 58 L65 58 M50 75 L38 95 M50 75 L62 95" stroke="#00FF96" strokeWidth="1.2" strokeLinecap="round" />
        <text x="50" y="110" textAnchor="middle" fill="#00FF96" fontSize="7" fontFamily="monospace" fontWeight="600" opacity="0.7">CREATIVE WORK</text>
      </motion.g>

      {/* Connection / handoff */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0.2 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* Data flowing between */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            r="2"
            fill="#00FF96"
            opacity="0.6"
            animate={active ? {
              cx: [80, 120],
              cy: [60 + i * 8, 60 + i * 8],
              opacity: [0, 0.6, 0],
            } : { opacity: 0 }}
            transition={{ duration: 1.5, delay: 0.5 + i * 0.3, repeat: Infinity, repeatDelay: 1 }}
          />
        ))}
        <text x="100" y="50" textAnchor="middle" fill="#00FF9650" fontSize="5" fontFamily="monospace">ELEVATE</text>
      </motion.g>

      {/* Machine / bot */}
      <motion.g
        initial={{ opacity: 0, x: 20 }}
        animate={active ? { opacity: 1, x: 0 } : { opacity: 0.3, x: 10 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <rect x="135" y="30" width="30" height="35" rx="4" stroke="#00FF96" strokeWidth="1.2" fill="#00FF9608" />
        {/* Bot eyes */}
        <circle cx="144" cy="42" r="3" fill="#00FF96" opacity="0.4" />
        <circle cx="156" cy="42" r="3" fill="#00FF96" opacity="0.4" />
        {/* Bot mouth - processing */}
        <motion.rect
          x="141"
          y="52"
          width="18"
          height="2"
          rx="1"
          fill="#00FF96"
          opacity="0.3"
          animate={active ? { width: [18, 10, 18] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        {/* Antenna */}
        <line x1="150" y1="30" x2="150" y2="22" stroke="#00FF96" strokeWidth="1" />
        <motion.circle
          cx="150"
          cy="20"
          r="2.5"
          fill="#00FF96"
          animate={active ? { opacity: [0.3, 0.8, 0.3] } : { opacity: 0.2 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <text x="150" y="110" textAnchor="middle" fill="#00FF96" fontSize="7" fontFamily="monospace" fontWeight="600" opacity="0.7">SCALE & SPEED</text>
      </motion.g>
    </svg>
  );
}

function DynamicWorldVisual({ active }: { active: boolean }) {
  // Static app vs dynamic game world - symmetrical layout
  return (
    <svg viewBox="0 0 200 140" className="h-full w-full">
      {/* Left: static app (faded) */}
      <motion.g
        animate={active ? { opacity: 0.3 } : { opacity: 0.15 }}
        transition={{ duration: 0.5 }}
      >
        <rect x="10" y="20" width="75" height="80" rx="4" stroke="#A78BFA" strokeWidth="0.8" fill="#A78BFA03" />
        <rect x="18" y="30" width="59" height="4" rx="1" fill="#A78BFA" opacity="0.15" />
        <rect x="18" y="38" width="59" height="4" rx="1" fill="#A78BFA" opacity="0.15" />
        <rect x="18" y="46" width="35" height="4" rx="1" fill="#A78BFA" opacity="0.15" />
        <rect x="18" y="58" width="26" height="8" rx="2" fill="#A78BFA" opacity="0.15" />
        <rect x="48" y="58" width="26" height="8" rx="2" fill="#A78BFA" opacity="0.15" />
        <rect x="18" y="74" width="59" height="4" rx="1" fill="#A78BFA" opacity="0.1" />
        <rect x="18" y="82" width="40" height="4" rx="1" fill="#A78BFA" opacity="0.1" />
        <text x="47" y="112" textAnchor="middle" fill="#A78BFA" fontSize="6" fontFamily="monospace" opacity="0.4">STATIC APP</text>
      </motion.g>

      {/* Crossed out */}
      <motion.line
        x1="10" y1="20" x2="85" y2="100"
        stroke="#FF4C54"
        strokeWidth="0.8"
        initial={{ pathLength: 0 }}
        animate={active ? { pathLength: 1, opacity: 0.4 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />

      {/* Right: dynamic game world */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <rect x="115" y="20" width="75" height="80" rx="4" stroke="#A78BFA" strokeWidth="1" fill="#A78BFA05" strokeDasharray="3 2" />

        {/* Terrain */}
        <motion.path
          d="M122 85 L135 70 L148 78 L158 60 L168 68 L178 55 L185 62"
          stroke="#A78BFA"
          strokeWidth="0.8"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={active ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        />

        {/* Player character moving */}
        <motion.g
          animate={active ? { x: [0, 20, 10, 30, 0], y: [0, -4, 2, -6, 0] } : {}}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="138" cy="45" r="5" fill="#A78BFA" opacity="0.5" />
          <circle cx="138" cy="45" r="8" fill="none" stroke="#A78BFA" strokeWidth="0.5" opacity="0.3" />
        </motion.g>

        {/* Physics particles */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            r="1.5"
            fill="#A78BFA"
            animate={active ? {
              cx: [150 + i * 8, 155 + i * 6, 148 + i * 10],
              cy: [32 + i * 6, 28 + i * 4, 36 + i * 5],
              opacity: [0, 0.5, 0],
            } : { opacity: 0 }}
            transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
          />
        ))}

        {/* NPC */}
        <motion.rect
          x="170"
          y="38"
          width="8"
          height="12"
          rx="2"
          fill="#A78BFA"
          opacity="0.3"
          animate={active ? { y: [38, 35, 38] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <text x="152" y="112" textAnchor="middle" fill="#A78BFA" fontSize="6" fontFamily="monospace" fontWeight="600" opacity="0.7">DYNAMIC WORLD</text>
      </motion.g>
    </svg>
  );
}

function ZeroShotVisual({ active }: { active: boolean }) {
  // One brain adapting to multiple game environments
  const games = [
    { x: 30, y: 25, label: "RPG", delay: 0.5 },
    { x: 100, y: 25, label: "FPS", delay: 0.8 },
    { x: 170, y: 25, label: "PUZZLE", delay: 1.1 },
  ];

  return (
    <svg viewBox="0 0 200 140" className="h-full w-full">
      {/* Central brain / model */}
      <motion.g
        initial={{ scale: 0.8, opacity: 0 }}
        animate={active ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <circle cx="100" cy="90" r="18" fill="#38BDF808" stroke="#38BDF8" strokeWidth="1" />
        {/* Neural network dots */}
        {[
          [93, 84], [107, 84], [100, 78],
          [90, 93], [100, 96], [110, 93],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r="2"
            fill="#38BDF8"
            animate={active ? { opacity: [0.3, 0.8, 0.3] } : { opacity: 0.2 }}
            transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
        {/* Connections */}
        <path d="M93 84 L100 78 L107 84 M90 93 L100 96 L110 93 M93 84 L90 93 M107 84 L110 93 M100 78 L100 96" stroke="#38BDF830" strokeWidth="0.5" />
        <text x="100" y="118" textAnchor="middle" fill="#38BDF8" fontSize="6" fontFamily="monospace" fontWeight="600" opacity="0.7">ONE MODEL</text>
      </motion.g>

      {/* Game environments branching up */}
      {games.map((game, i) => (
        <motion.g key={game.label}>
          {/* Connection line from brain to game */}
          <motion.path
            d={`M100 72 Q${game.x + (100 - game.x) * 0.3} 50 ${game.x} 42`}
            fill="none"
            stroke="#38BDF8"
            strokeWidth="0.6"
            strokeDasharray="3 2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={active ? { pathLength: 1, opacity: 0.4 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.8, delay: game.delay }}
          />

          {/* Game box */}
          <motion.g
            initial={{ opacity: 0, y: 10 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0.2, y: 5 }}
            transition={{ duration: 0.5, delay: game.delay }}
          >
            <rect
              x={game.x - 20}
              y={game.y - 12}
              width="40"
              height="24"
              rx="4"
              fill="#38BDF808"
              stroke="#38BDF8"
              strokeWidth="0.8"
            />
            <text
              x={game.x}
              y={game.y + 2}
              textAnchor="middle"
              fill="#38BDF8"
              fontSize="6"
              fontFamily="monospace"
              fontWeight="700"
            >
              {game.label}
            </text>

            {/* Checkmark at top-right corner */}
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={active ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, delay: game.delay + 0.6, type: "spring" }}
            >
              <circle cx={game.x + 20} cy={game.y - 12} r="5" fill="#0a1a10" stroke="#00FF96" strokeWidth="0.8" />
              <path d={`M${game.x + 17} ${game.y - 12} l2 2 4-4`} stroke="#00FF96" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </motion.g>
          </motion.g>

          {/* Data pulse flowing */}
          <motion.circle
            r="2"
            fill="#38BDF8"
            animate={active ? {
              cx: [100, game.x],
              cy: [72, 42],
              opacity: [0, 0.7, 0],
            } : { opacity: 0 }}
            transition={{ duration: 1.2, delay: game.delay + 1, repeat: Infinity, repeatDelay: 3 }}
          />
        </motion.g>
      ))}
    </svg>
  );
}

const beliefs = [
  {
    number: "01",
    title: "Automation should elevate human testers, not replace them",
    description:
      "Great games are shaped by human judgment - intuition, taste, and empathy for players. We build autonomous systems to handle scale and repetition, so human teams can focus on the creative and high-impact parts of quality assurance.",
    color: "#00FF96",
    visual: HumanMachineVisual,
  },
  {
    number: "02",
    title: "Games require a different kind of testing",
    description:
      "Games are not static applications. They are dynamic worlds shaped by physics, systems, and player behaviour. We believe testing tools must interact with them the way players do - through vision, context, and exploration - rather than scripts and internal hooks.",
    color: "#A78BFA",
    visual: DynamicWorldVisual,
  },
  {
    number: "03",
    title: "General intelligence over per-project tooling",
    description:
      "We focus on systems that adapt to new environments instead of requiring configuration for every title. This belief drives our work on zero-shot behaviour and autonomous agents that can operate in unfamiliar games from day one.",
    color: "#38BDF8",
    visual: ZeroShotVisual,
  },
];

function BeliefCard({
  belief,
  index,
  isActive,
  onActivate,
}: {
  belief: (typeof beliefs)[0];
  index: number;
  isActive: boolean;
  onActivate: () => void;
}) {
  const Visual = belief.visual;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.12 }}
      onClick={onActivate}
      className="group cursor-pointer"
    >
      <div
        className="relative overflow-hidden rounded-2xl border transition-all duration-500"
        style={{
          borderColor: isActive ? `${belief.color}40` : "rgba(255,255,255,0.07)",
          backgroundColor: isActive ? `${belief.color}06` : "rgba(30,13,38,0.4)",
        }}
      >
        {/* Top accent line */}
        <motion.div
          className="h-px w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${belief.color}${isActive ? "80" : "30"}, transparent)`,
          }}
        />

        <div className="p-8 sm:p-10">
          {/* Header row */}
          <div className="flex items-center gap-4">
            <motion.div
              className="flex h-10 w-10 items-center justify-center rounded-full font-mono text-sm font-bold"
              style={{
                color: belief.color,
                backgroundColor: `${belief.color}${isActive ? "20" : "10"}`,
                boxShadow: isActive ? `0 0 20px ${belief.color}15` : "none",
              }}
              animate={isActive ? { scale: [1, 1.05, 1] } : { scale: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {belief.number}
            </motion.div>

            <h3
              className="flex-1 text-lg font-bold transition-colors duration-300"
              style={{ color: isActive ? belief.color : "var(--foreground)" }}
            >
              {belief.title}
            </h3>

            {/* Expand indicator */}
            <motion.div
              animate={{ rotate: isActive ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-text-muted"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
              </svg>
            </motion.div>
          </div>

          {/* Expandable content */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-6">
                  {/* Description */}
                  <p className="text-sm leading-relaxed text-text-muted">
                    {belief.description}
                  </p>

                  {/* Animated visual */}
                  <motion.div
                    className="mt-6 overflow-hidden rounded-xl border p-4"
                    style={{
                      borderColor: `${belief.color}15`,
                      backgroundColor: `${belief.color}04`,
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="h-40 sm:h-48">
                      <Visual active={isActive} />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export function Philosophy() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="border-t border-white/5 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
              Our Philosophy
            </span>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              These beliefs guide how we design and build ManaMind.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted">
              The ideas that shape how we think about testing, automation, and the future of games.
            </p>
          </div>
        </FadeInView>

        <div className="mx-auto mt-16 max-w-4xl space-y-4">
          {beliefs.map((belief, i) => (
            <BeliefCard
              key={belief.number}
              belief={belief}
              index={i}
              isActive={activeIndex === i}
              onActivate={() => setActiveIndex(activeIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
