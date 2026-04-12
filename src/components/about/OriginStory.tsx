"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// --- Story chapters with visual metaphors ---

const chapters = [
  {
    era: "The Love",
    text: "We grew up with games. Over time, they evolved into vast, complex worlds, but the way they were tested stayed the same.",
    visual: EraVisual1,
  },
  {
    era: "The Problem",
    text: "QA teams work long hours under tight deadlines. Problems still slip through, not from lack of skill, but because the scale of modern games has outpaced traditional testing.",
    visual: EraVisual2,
  },
  {
    era: "The Spark",
    text: "We started ManaMind because there had to be a better way, one where testing moves as fast as the games themselves.",
    visual: EraVisual3,
  },
  {
    era: "The Purpose",
    text: "Build systems that understand games the way players do. Let human testers focus on the creative, high-judgment work that machines can't replace.",
    visual: EraVisual4,
  },
];

// --- Lightweight animated SVG visuals per chapter ---

function EraVisual1() {
  // The Love: heart.
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="round">
      <path d="M60 92 C60 92 22 70 22 46 C22 34 31 26 42 26 C50 26 57 31 60 38 C63 31 70 26 78 26 C89 26 98 34 98 46 C98 70 60 92 60 92 Z" />
    </svg>
  );
}

function EraVisual2() {
  // The Problem: warning triangle with exclamation.
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M60 20 L102 94 L18 94 Z" />
      <line x1="60" y1="50" x2="60" y2="72" />
      <line x1="60" y1="84" x2="60" y2="84" />
    </svg>
  );
}

function EraVisual3() {
  // The Spark: lightbulb icon, static.
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M60 22 C44 22 34 34 34 48 C34 58 40 64 46 70 C50 74 52 78 52 84 L68 84 C68 78 70 74 74 70 C80 64 86 58 86 48 C86 34 76 22 60 22 Z" />
      <line x1="50" y1="92" x2="70" y2="92" />
      <line x1="54" y1="100" x2="66" y2="100" />
    </svg>
  );
}

function EraVisual4() {
  // The Purpose: target / bullseye.
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="60" cy="60" r="42" />
      <circle cx="60" cy="60" r="24" />
      <circle cx="60" cy="60" r="6" fill="currentColor" stroke="none" />
    </svg>
  );
}

// --- Compact chapter ---

function ChapterNode({
  chapter,
  index,
  inView,
}: {
  chapter: (typeof chapters)[0];
  index: number;
  inView: boolean;
}) {
  const Visual = chapter.visual;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="flex flex-col"
    >
      {/* Small icon */}
      <div className="h-10 w-10 text-text-muted/60">
        <Visual />
      </div>

      {/* Era label */}
      <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-text-muted/60">
        {chapter.era}
      </p>

      {/* Text */}
      <p className="mt-2 text-sm leading-relaxed text-text-muted">
        {chapter.text}
      </p>
    </motion.div>
  );
}

// --- Main component ---

export function OriginStory() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-16 md:py-20 lg:py-24"
    >
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
            className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary"
          >
            Origin Story
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-2xl font-bold text-foreground md:text-3xl lg:text-4xl"
          >
            Why we started ManaMind
          </motion.h2>
        </div>

        {/* Chapter grid */}
        <div className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
          {chapters.map((chapter, i) => (
            <ChapterNode
              key={chapter.era}
              chapter={chapter}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* Closing line */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 px-5 py-3">
            <motion.span
              className="h-2 w-2 shrink-0 rounded-full bg-primary"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="whitespace-nowrap text-sm font-medium text-primary">
              These experiences shaped the principles that guide how we design and build ManaMind today.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
