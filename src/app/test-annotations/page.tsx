"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";

const annotations = [
  "See which bot discovered each issue",
  "Confidence scoring helps prioritise what to fix first",
  "Auto-generated reports with repro steps directly from gameplay",
  "Export issues directly to your existing workflow",
];

/* ──────────────────────────────────────────────
   VARIANT 1 — Floating Hotspots with Pulse
   ────────────────────────────────────────────── */

const hotspots = [
  { x: 25, y: 30 },
  { x: 45, y: 55 },
  { x: 65, y: 35 },
  { x: 85, y: 60 },
];

function Variant1() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="relative w-full max-w-[1200px] mx-auto">
      <Image
        src="/product-screenshot.png"
        alt="Product screenshot"
        width={1920}
        height={1080}
        className="w-full h-auto rounded-xl"
      />

      {hotspots.map((spot, i) => (
        <div
          key={i}
          className="absolute"
          style={{ left: `${spot.x}%`, top: `${spot.y}%`, transform: "translate(-50%, -50%)" }}
          onMouseEnter={() => setActive(i)}
          onMouseLeave={() => setActive(null)}
        >
          {/* Pulse rings */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/30"
            animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: i * 0.3 }}
            style={{ width: 20, height: 20, marginLeft: -10, marginTop: -10 }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/20"
            animate={{ scale: [1, 3], opacity: [0.4, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: i * 0.3 + 0.3 }}
            style={{ width: 20, height: 20, marginLeft: -10, marginTop: -10 }}
          />

          {/* Core dot */}
          <div className="w-5 h-5 rounded-full bg-primary border-2 border-primary shadow-[0_0_12px_rgba(0,255,150,0.7)] cursor-pointer relative z-10" />

          {/* Tooltip */}
          <AnimatePresence>
            {active === i && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 z-20 w-64"
              >
                <div className="bg-bg-card border border-primary/30 rounded-lg px-4 py-3 shadow-[0_0_20px_rgba(0,255,150,0.15)] text-sm text-foreground">
                  <span className="text-primary font-mono text-xs block mb-1">#{i + 1}</span>
                  {annotations[i]}
                </div>
                <div className="w-3 h-3 bg-bg-card border-b border-r border-primary/30 rotate-45 mx-auto -mt-1.5" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────
   VARIANT 2 — Scan Line Reveal
   ────────────────────────────────────────────── */

const scanPositions = [20, 40, 60, 80]; // % positions where annotations appear

function Variant2() {
  const [lineX, setLineX] = useState(0);
  const [revealed, setRevealed] = useState<boolean[]>([false, false, false, false]);
  const animRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const DURATION = 4000;

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = (timestamp - startTimeRef.current) % DURATION;
      const progress = (elapsed / DURATION) * 100;
      setLineX(progress);

      // On new cycle, reset revealed
      if (elapsed < 50) {
        setRevealed([false, false, false, false]);
      }

      setRevealed((prev) => {
        const next = [...prev];
        scanPositions.forEach((pos, i) => {
          if (progress >= pos) next[i] = true;
        });
        return next;
      });

      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div className="relative w-full max-w-[1200px] mx-auto overflow-hidden">
      <Image
        src="/product-screenshot.png"
        alt="Product screenshot"
        width={1920}
        height={1080}
        className="w-full h-auto rounded-xl"
      />

      {/* Scan line */}
      <div
        className="absolute top-0 bottom-0 w-[2px] z-10 pointer-events-none"
        style={{
          left: `${lineX}%`,
          background: "linear-gradient(to bottom, transparent 0%, #00FF96 20%, #00FF96 80%, transparent 100%)",
          boxShadow: "0 0 15px 4px rgba(0,255,150,0.5), 0 0 40px 8px rgba(0,255,150,0.2)",
        }}
      />

      {/* Annotations */}
      {scanPositions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute z-20"
          style={{
            left: `${pos}%`,
            top: `${15 + i * 20}%`,
            transform: "translateX(-50%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: revealed[i] ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-bg-card/90 backdrop-blur-sm border border-primary/40 rounded-md px-3 py-2 text-xs text-foreground max-w-[200px] shadow-[0_0_12px_rgba(0,255,150,0.15)]">
            <div className="w-2 h-2 rounded-full bg-primary inline-block mr-2 shadow-[0_0_6px_rgba(0,255,150,0.6)]" />
            {annotations[i]}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────
   VARIANT 3 — Terminal Log Feed
   ────────────────────────────────────────────── */

function useTypingEffect(text: string, speed: number, start: boolean) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!start) {
      setDisplayed("");
      return;
    }
    let idx = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      idx++;
      setDisplayed(text.slice(0, idx));
      if (idx >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, start]);
  return displayed;
}

function TerminalLine({ text, delay, index }: { text: string; delay: number; index: number }) {
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const timestamp = `00:${String(index * 3).padStart(2, "0")}:${String((index * 7) % 60).padStart(2, "0")}`;

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const displayed = useTypingEffect(text, 30, started);

  useEffect(() => {
    if (displayed === text) setDone(true);
  }, [displayed, text]);

  if (!started) return null;

  return (
    <div className="flex gap-2 text-[11px] leading-relaxed">
      <span className="text-text-muted shrink-0">[{timestamp}]</span>
      <span className="text-primary shrink-0">&gt;</span>
      <span className="text-foreground">
        {displayed}
        {!done && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="inline-block w-[6px] h-[13px] bg-primary ml-0.5 align-middle"
          />
        )}
      </span>
    </div>
  );
}

function Variant3() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="relative w-full max-w-[1200px] mx-auto" ref={ref}>
      <Image
        src="/product-screenshot.png"
        alt="Product screenshot"
        width={1920}
        height={1080}
        className="w-full h-auto rounded-xl"
      />

      {/* Terminal overlay */}
      <div className="absolute bottom-4 right-4 w-[420px] max-w-[90%] bg-[#0a0a0a]/95 backdrop-blur-md border border-primary/20 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.6)] z-10">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-primary/10 bg-[#111]/80">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-highlight" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
          </div>
          <span className="text-text-muted text-[10px] font-mono ml-2">manamind — live feed</span>
        </div>
        {/* Log entries */}
        <div className="p-3 font-mono space-y-2 min-h-[120px]">
          {isInView &&
            annotations.map((a, i) => (
              <TerminalLine key={i} text={a} delay={i * 2200} index={i} />
            ))}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   VARIANT 4 — Bot Callouts
   ────────────────────────────────────────────── */

const bots = [
  { initial: "W", name: "Wayfinder", color: "#00FF96" },
  { initial: "B", name: "Breaker", color: "#FF4C54" },
  { initial: "S", name: "Scout", color: "#4CC9FF" },
  { initial: "R", name: "Reporter", color: "#FFB84C" },
];

const calloutPositions = [
  { x: 15, y: 20, pointerSide: "right" as const },
  { x: 60, y: 15, pointerSide: "left" as const },
  { x: 10, y: 65, pointerSide: "right" as const },
  { x: 55, y: 70, pointerSide: "left" as const },
];

function Variant4() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="relative w-full max-w-[1200px] mx-auto" ref={ref}>
      <Image
        src="/product-screenshot.png"
        alt="Product screenshot"
        width={1920}
        height={1080}
        className="w-full h-auto rounded-xl"
      />

      {calloutPositions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute z-10"
          style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          initial={{ opacity: 0, x: pos.pointerSide === "right" ? -30 : 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.2, ease: "easeOut" }}
        >
          <div className="relative">
            {/* Bubble */}
            <div className="bg-bg-card/95 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 max-w-[240px] shadow-lg">
              <div className="flex items-center gap-2 mb-1.5">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-background"
                  style={{ background: bots[i].color }}
                >
                  {bots[i].initial}
                </div>
                <span className="text-xs font-semibold" style={{ color: bots[i].color }}>
                  {bots[i].name}
                </span>
              </div>
              <p className="text-xs text-foreground leading-relaxed">{annotations[i]}</p>
            </div>

            {/* Pointer triangle */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-0 h-0"
              style={{
                ...(pos.pointerSide === "right"
                  ? {
                      right: -8,
                      borderTop: "6px solid transparent",
                      borderBottom: "6px solid transparent",
                      borderLeft: "8px solid rgba(30, 13, 38, 0.95)",
                    }
                  : {
                      left: -8,
                      borderTop: "6px solid transparent",
                      borderBottom: "6px solid transparent",
                      borderRight: "8px solid rgba(30, 13, 38, 0.95)",
                    }),
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────
   VARIANT 5 — Layered Reveal on Scroll
   ────────────────────────────────────────────── */

const layers = [
  { x: 5, y: 10, w: 40, h: 25, tint: "rgba(0,255,150,0.08)", border: "rgba(0,255,150,0.3)", labelSide: "right" as const },
  { x: 50, y: 8, w: 45, h: 30, tint: "rgba(0,255,150,0.06)", border: "rgba(0,200,120,0.3)", labelSide: "left" as const },
  { x: 3, y: 50, w: 50, h: 30, tint: "rgba(0,255,150,0.07)", border: "rgba(0,255,100,0.3)", labelSide: "right" as const },
  { x: 55, y: 55, w: 42, h: 28, tint: "rgba(0,255,150,0.05)", border: "rgba(0,220,130,0.3)", labelSide: "left" as const },
];

function RevealLayer({ layer, annotation, index }: { layer: typeof layers[0]; annotation: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="absolute z-10"
      style={{
        left: `${layer.x}%`,
        top: `${layer.y}%`,
        width: `${layer.w}%`,
        height: `${layer.h}%`,
      }}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
    >
      {/* Highlight region */}
      <div
        className="absolute inset-0 rounded-lg"
        style={{
          background: layer.tint,
          border: `1px solid ${layer.border}`,
          boxShadow: `inset 0 0 20px ${layer.tint}`,
        }}
      />
      {/* Label */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2"
        style={layer.labelSide === "right" ? { left: "calc(100% + 12px)" } : { right: "calc(100% + 12px)" }}
        initial={{ opacity: 0, x: layer.labelSide === "right" ? -10 : 10 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
      >
        <div className="bg-bg-card/90 border border-primary/20 rounded-md px-3 py-2 text-xs text-foreground max-w-[180px] whitespace-normal shadow-lg">
          <span className="text-primary font-bold mr-1">{index + 1}.</span>
          {annotation}
        </div>
      </motion.div>
    </motion.div>
  );
}

function Variant5() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <div className="relative w-full max-w-[1200px] mx-auto" ref={containerRef}>
      <Image
        src="/product-screenshot.png"
        alt="Product screenshot"
        width={1920}
        height={1080}
        className={`w-full h-auto rounded-xl transition-opacity duration-700 ${isInView ? "opacity-100" : "opacity-50"}`}
      />

      {layers.map((layer, i) => (
        <RevealLayer key={i} layer={layer} annotation={annotations[i]} index={i} />
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────
   PAGE
   ────────────────────────────────────────────── */

export default function TestAnnotationsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Page header */}
      <div className="text-center pt-16 pb-12 px-4">
        <h1 className="text-4xl font-bold mb-3">
          Annotation Style <span className="text-primary">Exploration</span>
        </h1>
        <p className="text-text-muted text-lg max-w-2xl mx-auto">
          Five creative approaches to annotating a product screenshot. Scroll to compare each variant.
        </p>
      </div>

      {/* Variant 1 */}
      <section className="py-24 px-4">
        <div className="max-w-[1200px] mx-auto mb-8">
          <h2 className="text-2xl font-bold text-foreground">
            <span className="text-primary font-mono mr-2">01</span>
            Floating Hotspots with Pulse
          </h2>
          <p className="text-text-muted text-sm mt-2">
            Hover each glowing dot to reveal its annotation.
          </p>
        </div>
        <Variant1 />
      </section>

      {/* Variant 2 */}
      <section className="py-24 px-4">
        <div className="max-w-[1200px] mx-auto mb-8">
          <h2 className="text-2xl font-bold text-foreground">
            <span className="text-primary font-mono mr-2">02</span>
            Scan Line Reveal
          </h2>
          <p className="text-text-muted text-sm mt-2">
            A scanning line progressively reveals annotations as it sweeps across.
          </p>
        </div>
        <Variant2 />
      </section>

      {/* Variant 3 */}
      <section className="py-24 px-4">
        <div className="max-w-[1200px] mx-auto mb-8">
          <h2 className="text-2xl font-bold text-foreground">
            <span className="text-primary font-mono mr-2">03</span>
            Terminal Log Feed
          </h2>
          <p className="text-text-muted text-sm mt-2">
            Annotations appear as real-time terminal log entries with a typing effect.
          </p>
        </div>
        <Variant3 />
      </section>

      {/* Variant 4 */}
      <section className="py-24 px-4">
        <div className="max-w-[1200px] mx-auto mb-8">
          <h2 className="text-2xl font-bold text-foreground">
            <span className="text-primary font-mono mr-2">04</span>
            Bot Callouts
          </h2>
          <p className="text-text-muted text-sm mt-2">
            Chat-bubble callouts from each bot, sliding in on scroll.
          </p>
        </div>
        <Variant4 />
      </section>

      {/* Variant 5 */}
      <section className="py-24 px-4">
        <div className="max-w-[1200px] mx-auto mb-8">
          <h2 className="text-2xl font-bold text-foreground">
            <span className="text-primary font-mono mr-2">05</span>
            Layered Reveal on Scroll
          </h2>
          <p className="text-text-muted text-sm mt-2">
            Screenshot starts dimmed; highlighted regions light up as you scroll into view.
          </p>
        </div>
        <Variant5 />
      </section>

      {/* Footer spacing */}
      <div className="h-32" />
    </main>
  );
}
