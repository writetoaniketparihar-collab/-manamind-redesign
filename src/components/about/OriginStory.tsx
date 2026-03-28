"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// --- Story chapters with visual metaphors ---

const chapters = [
  {
    era: "The Love",
    text: "We grew up with games and spent years immersed in how they're built and tested. Over time, games evolved into vast, complex worlds. But the way they were tested stayed largely the same.",
    highlight: "games evolved into vast, complex worlds",
    color: "#A78BFA",
    visual: EraVisual1,
  },
  {
    era: "The Problem",
    text: "Behind every polished release are QA teams working long hours to catch issues by hand, often under tight deadlines and with limited tools. Despite their effort, many problems still slip through, not because of a lack of skill, but because the scale of modern games has outpaced traditional testing methods.",
    highlight: "the scale of modern games has outpaced traditional testing methods",
    color: "#FF4C54",
    visual: EraVisual2,
  },
  {
    era: "The Spark",
    text: "We started ManaMind because we believed there had to be a better way, one where testing could move as fast as the games themselves.",
    highlight: "there had to be a better way",
    color: "#00FF96",
    visual: EraVisual3,
  },
  {
    era: "The Purpose",
    text: "Our goal was to build systems that understand games the way players do: by seeing, exploring, and interacting with them. ManaMind exists to give studios that capability and to let human testers focus on the creative, high-judgment work that machines can't replace.",
    highlight: "understand games the way players do",
    color: "#38BDF8",
    visual: EraVisual4,
  },
];

// --- Lightweight animated SVG visuals per chapter ---

function EraVisual1({ inView }: { inView: boolean }) {
  // A game world expanding outward
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full">
      {/* Expanding rings - worlds growing */}
      {[18, 30, 42].map((r, i) => (
        <motion.circle
          key={i}
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="#A78BFA"
          strokeWidth="0.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: [0, 0.4, 0.15] } : {}}
          transition={{ duration: 1.5, delay: 0.3 + i * 0.3, ease: "easeOut" }}
        />
      ))}
      {/* Game controller in center */}
      <motion.g
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
      >
        <rect x="48" y="52" width="24" height="14" rx="7" fill="none" stroke="#A78BFA" strokeWidth="1" />
        <circle cx="55" cy="59" r="2" fill="#A78BFA" opacity="0.5" />
        <circle cx="65" cy="59" r="2" fill="#A78BFA" opacity="0.5" />
      </motion.g>
      {/* Orbiting dots - complexity growing */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.circle
          key={`dot-${i}`}
          cx="60"
          cy="60"
          r="1.5"
          fill="#A78BFA"
          initial={{ opacity: 0 }}
          animate={
            inView
              ? {
                  opacity: [0, 0.7, 0],
                  cx: [60, 60 + Math.cos((i * Math.PI * 2) / 5) * 48],
                  cy: [60, 60 + Math.sin((i * Math.PI * 2) / 5) * 48],
                }
              : {}
          }
          transition={{ duration: 3, delay: 1 + i * 0.4, repeat: Infinity, repeatDelay: 2 }}
        />
      ))}
    </svg>
  );
}

function EraVisual2({ inView }: { inView: boolean }) {
  // Bugs slipping through a net
  const bugs = [
    { x: 25, y: 20, delay: 0.5 },
    { x: 70, y: 15, delay: 1.0 },
    { x: 45, y: 25, delay: 1.5 },
    { x: 85, y: 30, delay: 2.0 },
    { x: 55, y: 10, delay: 2.5 },
  ];

  return (
    <svg viewBox="0 0 120 120" className="h-full w-full">
      {/* Net / grid - representing manual testing coverage */}
      {Array.from({ length: 7 }).map((_, i) => (
        <motion.line
          key={`h-${i}`}
          x1="10"
          y1={50 + i * 8}
          x2="110"
          y2={50 + i * 8}
          stroke="#FF4C54"
          strokeWidth="0.3"
          opacity="0.2"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 + i * 0.06 }}
        />
      ))}
      {Array.from({ length: 9 }).map((_, i) => (
        <motion.line
          key={`v-${i}`}
          x1={15 + i * 12}
          y1="48"
          x2={15 + i * 12}
          y2="100"
          stroke="#FF4C54"
          strokeWidth="0.3"
          opacity="0.2"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 + i * 0.06 }}
        />
      ))}

      {/* Bugs falling through gaps */}
      {bugs.map((bug, i) => (
        <motion.g key={i}>
          {/* Bug icon */}
          <motion.circle
            cx={bug.x}
            cy={bug.y}
            r="3"
            fill="#FF4C54"
            initial={{ opacity: 0 }}
            animate={
              inView
                ? {
                    opacity: [0, 0.8, 0.8, 0],
                    cy: [bug.y, 55, 55, 115],
                  }
                : {}
            }
            transition={{
              duration: 3,
              delay: bug.delay,
              repeat: Infinity,
              repeatDelay: 3,
              times: [0, 0.3, 0.5, 1],
            }}
          />
          {/* Trail */}
          <motion.line
            x1={bug.x}
            y1={bug.y}
            x2={bug.x}
            y2={bug.y + 8}
            stroke="#FF4C54"
            strokeWidth="0.5"
            initial={{ opacity: 0 }}
            animate={
              inView
                ? {
                    opacity: [0, 0.3, 0.3, 0],
                    y1: [bug.y, 55, 55, 115],
                    y2: [bug.y + 8, 63, 63, 120],
                  }
                : {}
            }
            transition={{
              duration: 3,
              delay: bug.delay,
              repeat: Infinity,
              repeatDelay: 3,
              times: [0, 0.3, 0.5, 1],
            }}
          />
        </motion.g>
      ))}

      {/* "gaps" label */}
      <motion.text
        x="60"
        y="44"
        textAnchor="middle"
        fill="#FF4C54"
        fontSize="4"
        fontFamily="monospace"
        fontWeight="600"
        opacity="0.5"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.5 } : {}}
        transition={{ delay: 1 }}
      >
        COVERAGE GAPS
      </motion.text>
    </svg>
  );
}

function EraVisual3({ inView }: { inView: boolean }) {
  // A lightbulb / spark moment
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full">
      {/* Central spark */}
      <motion.circle
        cx="60"
        cy="52"
        r="4"
        fill="#00FF96"
        initial={{ scale: 0, opacity: 0 }}
        animate={
          inView
            ? {
                scale: [0, 1.5, 1],
                opacity: [0, 1, 0.8],
              }
            : {}
        }
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      />

      {/* Radiating lines - the spark */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 60 + Math.cos(angle) * 12;
        const y1 = 52 + Math.sin(angle) * 12;
        const x2 = 60 + Math.cos(angle) * (22 + (i % 3) * 6);
        const y2 = 52 + Math.sin(angle) * (22 + (i % 3) * 6);

        return (
          <motion.line
            key={i}
            x1={60}
            y1={52}
            x2={x2}
            y2={y2}
            stroke="#00FF96"
            strokeWidth="0.8"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              inView
                ? {
                    pathLength: [0, 1],
                    opacity: [0, 0.6, 0.2],
                    x1: [60, x1],
                    y1: [52, y1],
                  }
                : {}
            }
            transition={{ duration: 1.2, delay: 0.6 + i * 0.05, ease: "easeOut" }}
          />
        );
      })}

      {/* Pulsing glow */}
      <motion.circle
        cx="60"
        cy="52"
        r="20"
        fill="none"
        stroke="#00FF96"
        strokeWidth="0.5"
        initial={{ scale: 0, opacity: 0 }}
        animate={
          inView
            ? {
                scale: [0.5, 2, 2.5],
                opacity: [0.5, 0.15, 0],
              }
            : {}
        }
        transition={{ duration: 2, delay: 0.8, repeat: Infinity, repeatDelay: 1.5 }}
      />

      {/* Text below */}
      <motion.text
        x="60"
        y="90"
        textAnchor="middle"
        fill="#00FF96"
        fontSize="4"
        fontFamily="monospace"
        fontWeight="700"
        initial={{ opacity: 0, y: 5 }}
        animate={inView ? { opacity: 0.6, y: 0 } : {}}
        transition={{ delay: 1.5 }}
      >
        A BETTER WAY
      </motion.text>
    </svg>
  );
}

function EraVisual4({ inView }: { inView: boolean }) {
  // An eye that sees the game world - vision-based AI
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full">
      {/* Eye shape */}
      <motion.path
        d="M15 60 Q60 25 105 60 Q60 95 15 60 Z"
        fill="none"
        stroke="#38BDF8"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
      />

      {/* Iris */}
      <motion.circle
        cx="60"
        cy="60"
        r="14"
        fill="none"
        stroke="#38BDF8"
        strokeWidth="0.8"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
      />

      {/* Pupil */}
      <motion.circle
        cx="60"
        cy="60"
        r="6"
        fill="#38BDF8"
        opacity="0.3"
        initial={{ scale: 0 }}
        animate={inView ? { scale: [0, 1.2, 1] } : {}}
        transition={{ duration: 0.5, delay: 1 }}
      />
      <motion.circle
        cx="60"
        cy="60"
        r="2.5"
        fill="#38BDF8"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.3, delay: 1.2 }}
      />

      {/* Scanning beam from eye */}
      <motion.line
        x1="60"
        y1="60"
        x2="60"
        y2="60"
        stroke="#38BDF8"
        strokeWidth="0.5"
        initial={{ opacity: 0 }}
        animate={
          inView
            ? {
                opacity: [0, 0.4, 0],
                x2: [60, 100, 20, 80, 60],
                y2: [60, 35, 40, 85, 60],
              }
            : {}
        }
        transition={{ duration: 4, delay: 1.5, repeat: Infinity, repeatDelay: 1 }}
      />

      {/* Small detected elements around the eye */}
      {[
        { x: 30, y: 42, w: 12, h: 6 },
        { x: 78, y: 44, w: 14, h: 5 },
        { x: 35, y: 76, w: 10, h: 7 },
        { x: 75, y: 74, w: 12, h: 6 },
      ].map((box, i) => (
        <motion.rect
          key={i}
          x={box.x}
          y={box.y}
          width={box.w}
          height={box.h}
          rx="1"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="0.5"
          strokeDasharray="2 1.5"
          initial={{ opacity: 0 }}
          animate={
            inView
              ? {
                  opacity: [0, 0.5, 0.5, 0],
                  strokeDashoffset: [0, -8],
                }
              : {}
          }
          transition={{
            opacity: { duration: 3, delay: 2 + i * 0.4, repeat: Infinity, repeatDelay: 2 },
            strokeDashoffset: { duration: 3, repeat: Infinity, ease: "linear" },
          }}
        />
      ))}
    </svg>
  );
}

// --- Highlighted text renderer ---

function HighlightedParagraph({
  text,
  highlight,
  color,
}: {
  text: string;
  highlight: string;
  color: string;
}) {
  const parts = text.split(highlight);
  if (parts.length === 1) {
    return <>{text}</>;
  }

  return (
    <>
      {parts[0]}
      <motion.span
        className="inline"
        initial={{ color: "inherit" }}
        whileInView={{ color }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {highlight}
      </motion.span>
      {parts[1]}
    </>
  );
}

// --- Chapter card ---

function ChapterCard({
  chapter,
  index,
}: {
  chapter: (typeof chapters)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Visual = chapter.visual;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="relative"
    >
      <div
        className={`flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12 ${
          !isEven ? "lg:flex-row-reverse" : ""
        }`}
      >
        {/* Visual */}
        <div className="lg:w-2/5">
          <motion.div
            className="mx-auto aspect-square max-w-[280px] overflow-hidden rounded-2xl border p-4"
            style={{
              borderColor: `${chapter.color}20`,
              backgroundColor: `${chapter.color}04`,
            }}
            whileHover={{
              borderColor: `${chapter.color}40`,
              boxShadow: `0 0 40px ${chapter.color}10`,
            }}
            transition={{ duration: 0.4 }}
          >
            <Visual inView={inView} />
          </motion.div>
        </div>

        {/* Text */}
        <div className="lg:w-3/5">
          {/* Era label */}
          <div className="mb-4 flex items-center gap-3">
            <motion.span
              className="font-mono text-xs font-bold uppercase tracking-widest"
              style={{ color: `${chapter.color}70` }}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              {String(index + 1).padStart(2, "0")}
            </motion.span>
            <motion.span
              className="rounded-full px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-widest"
              style={{
                color: chapter.color,
                backgroundColor: `${chapter.color}12`,
                borderColor: `${chapter.color}25`,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3, type: "spring" }}
            >
              {chapter.era}
            </motion.span>
          </div>

          {/* Paragraph */}
          <motion.p
            className="text-base leading-[1.85] text-text-muted md:text-lg"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            <HighlightedParagraph
              text={chapter.text}
              highlight={chapter.highlight}
              color={chapter.color}
            />
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

// --- Main component ---

export function OriginStory() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Background texture - subtle dot grid */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="originGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="0.5" fill="rgba(255,255,255,0.06)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#originGrid)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary"
          >
            Origin Story
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl"
          >
            Why we started ManaMind
          </motion.h2>
        </div>

        {/* Chapter cards */}
        <div className="mt-20 space-y-20 md:space-y-28">
          {chapters.map((chapter, i) => (
            <ChapterCard key={chapter.era} chapter={chapter} index={i} />
          ))}
        </div>

        {/* Closing line */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/5 px-6 py-3">
            <motion.span
              className="h-2 w-2 rounded-full bg-primary"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-sm font-medium text-primary">
              These experiences shaped the principles that guide how we design and build ManaMind today.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
