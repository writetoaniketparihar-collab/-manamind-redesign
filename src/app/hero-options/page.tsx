"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const headline = (
  <>
    AI Agents That Test Your Game
    <br />
    <span className="text-primary">So You Can Ship It</span>
  </>
);
const sub =
  "Autonomous QA that plays like real players. No scripts. No SDKs. 24/7.";

function CTAs() {
  return (
    <div className="flex flex-wrap gap-4">
      <span className="inline-flex items-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-background">
        Request Demo
      </span>
      <span className="inline-flex items-center rounded-full border border-primary px-8 py-3 text-sm font-semibold text-primary">
        See How It Works
      </span>
    </div>
  );
}

/* ─── 1: LIVE TERMINAL — Bots reporting bugs in real-time terminal output ─── */
function HeroTerminal() {
  const lines = [
    { text: "$ manamind deploy --game 'Project Nova'", color: "text-primary", delay: 0 },
    { text: "▸ Initializing Hivemind...", color: "text-text-muted", delay: 0.8 },
    { text: "▸ Deploying Wayfinder bot... ✓", color: "text-green-400", delay: 1.6 },
    { text: "▸ Deploying Breaker bot...  ✓", color: "text-green-400", delay: 2.2 },
    { text: "▸ Deploying Scout bot...    ✓", color: "text-green-400", delay: 2.8 },
    { text: "▸ 3 bots active. Scanning world...", color: "text-text-muted", delay: 3.4 },
    { text: "", color: "", delay: 4.0 },
    { text: "🐛 BUG-157  Crash on settings nav   [High]  Wayfinder  95%", color: "text-red-400", delay: 4.4 },
    { text: "🐛 BUG-156  UI overlap on inventory  [Med]   Explorer   78%", color: "text-yellow-400", delay: 5.2 },
    { text: "🐛 BUG-155  Logic loop in tutorial   [High]  Scribe     91%", color: "text-red-400", delay: 6.0 },
    { text: "", color: "", delay: 6.6 },
    { text: "▸ 3 bugs found in 47 seconds. Full repro steps attached.", color: "text-primary", delay: 7.0 },
  ];

  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timers = lines.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative flex min-h-[80vh] items-center overflow-hidden rounded-2xl border border-white/10 bg-background">
      <div className="grid w-full gap-12 px-8 py-24 md:grid-cols-2 md:px-16">
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {headline}
          </h2>
          <p className="mt-6 max-w-lg text-lg text-text-muted md:text-xl">{sub}</p>
          <div className="mt-10">
            <CTAs />
          </div>
        </div>

        {/* Terminal */}
        <div className="flex items-center">
          <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-black/60 font-mono text-xs shadow-2xl md:text-sm">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-red-500/70" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <div className="h-3 w-3 rounded-full bg-green-500/70" />
              <span className="ml-2 text-[10px] text-text-muted">manamind — session</span>
            </div>
            <div className="min-h-[320px] p-4 leading-relaxed">
              {lines.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`${line.color} ${line.text === "" ? "h-3" : ""}`}
                >
                  {line.text}
                </motion.div>
              ))}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="inline-block h-4 w-2 bg-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── 2: BOT ORBIT — Animated bots orbiting a central core ─── */
function HeroBotOrbit() {
  const bots = [
    { name: "Wayfinder", initial: "W", color: "#00FF96", angle: 0 },
    { name: "Breaker", initial: "B", color: "#FF4C54", angle: 51 },
    { name: "Scout", initial: "S", color: "#4CC9FF", angle: 103 },
    { name: "Scribe", initial: "Sc", color: "#FFB84C", angle: 154 },
    { name: "Probe", initial: "P", color: "#A855F7", angle: 206 },
    { name: "Speed", initial: "Sp", color: "#EC4899", angle: 257 },
    { name: "Replicator", initial: "R", color: "#06B6D4", angle: 309 },
  ];

  return (
    <div className="relative flex min-h-[80vh] items-center overflow-hidden rounded-2xl border border-white/10 bg-background">
      <div className="relative z-10 w-full px-8 py-24 text-center md:px-16">
        {/* Orbit system */}
        <div className="relative mx-auto mb-16 h-72 w-72 md:h-96 md:w-96">
          {/* Orbit rings */}
          {[1, 0.7, 0.45].map((scale, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 rounded-full border border-white/[0.06]"
              style={{
                width: `${scale * 100}%`,
                height: `${scale * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}

          {/* Center core — ManaMind logo style */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-primary/10"
              animate={{ boxShadow: ["0 0 20px rgba(0,255,150,0.2)", "0 0 40px rgba(0,255,150,0.4)", "0 0 20px rgba(0,255,150,0.2)"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-lg font-black text-primary">M</span>
            </motion.div>
          </div>

          {/* Orbiting bots */}
          {bots.map((bot, i) => (
            <motion.div
              key={bot.name}
              className="absolute left-1/2 top-1/2"
              animate={{ rotate: 360 }}
              transition={{ duration: 20 + i * 3, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "0 0" }}
            >
              <motion.div
                className="flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[10px] font-bold text-background"
                style={{
                  background: bot.color,
                  boxShadow: `0 0 12px ${bot.color}60`,
                  position: "absolute",
                  left: Math.cos((bot.angle * Math.PI) / 180) * 140,
                  top: Math.sin((bot.angle * Math.PI) / 180) * 140,
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 20 + i * 3, repeat: Infinity, ease: "linear" }}
              >
                {bot.initial}
              </motion.div>
            </motion.div>
          ))}
        </div>

        <h2 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-7xl">
          {headline}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-text-muted md:text-xl">{sub}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <CTAs />
        </div>
      </div>
    </div>
  );
}

/* ─── 3: SCANNING LINE — A game screen being "scanned" with bugs revealed ─── */
function HeroScanLine() {
  const bugs = [
    { x: "22%", y: "35%", label: "UI overlap", severity: "Med" },
    { x: "58%", y: "55%", label: "Collision fail", severity: "High" },
    { x: "78%", y: "28%", label: "Frame drop", severity: "Low" },
    { x: "40%", y: "72%", label: "Crash trigger", severity: "High" },
  ];

  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-background">
      <div className="relative z-10 w-full px-8 py-24 text-center md:px-16">
        <h2 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-7xl">
          {headline}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-text-muted md:text-xl">{sub}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <CTAs />
        </div>

        {/* Scan area */}
        <div className="relative mx-auto mt-16 h-64 max-w-4xl overflow-hidden rounded-xl border border-white/10 bg-black/40 md:h-80">
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Scanning line */}
          <motion.div
            className="absolute left-0 top-0 h-full w-px"
            style={{
              background: "linear-gradient(to bottom, transparent, #00FF96, transparent)",
              boxShadow: "0 0 15px 3px rgba(0,255,150,0.3)",
            }}
            animate={{ left: ["0%", "100%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
          />

          {/* Bug markers that appear */}
          {bugs.map((bug, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: bug.x, top: bug.y }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + i * 0.8, duration: 0.3 }}
            >
              {/* Ping ring */}
              <motion.div
                className="absolute -inset-3 rounded-full border border-red-500/40"
                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 1.5 + i * 0.8 }}
              />
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(255,0,0,0.5)]" />
                <span className="hidden rounded bg-black/80 px-2 py-0.5 text-[10px] font-semibold text-red-400 md:inline">
                  {bug.label} [{bug.severity}]
                </span>
              </div>
            </motion.div>
          ))}

          {/* Corner markers like a targeting HUD */}
          {["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"].map(
            (pos, i) => (
              <div
                key={i}
                className={`absolute ${pos} h-4 w-4 ${
                  i < 2 ? "border-t" : "border-b"
                } ${i % 2 === 0 ? "border-l" : "border-r"} border-primary/30`}
              />
            )
          )}

          {/* Status text */}
          <div className="absolute bottom-3 left-3 font-mono text-[10px] text-primary/60">
            SCANNING // FRAME 2,847 // 4 ANOMALIES DETECTED
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── 4: LIVE CHAT — Bot reporting a bug in real-time messenger style ─── */
function HeroChat() {
  const messages = [
    {
      bot: { name: "Wayfinder", color: "#00FF96", initial: "W" },
      text: "Navigated to Settings > Audio. App crashed on toggle.",
      time: "just now",
      delay: 0.5,
    },
    {
      bot: { name: "Breaker", color: "#FF4C54", initial: "B" },
      text: "Confirmed. Reproduced 3/3 times. Stack trace attached.",
      time: "just now",
      delay: 2.0,
    },
    {
      bot: { name: "Scribe", color: "#FFB84C", initial: "Sc" },
      text: "Bug report generated. BUG-157 — High severity. Repro steps, screenshot, and logs included.",
      time: "just now",
      delay: 3.5,
    },
  ];

  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const timers = messages.map((msg, i) =>
      setTimeout(() => setVisibleCount(i + 1), msg.delay * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative flex min-h-[80vh] items-center overflow-hidden rounded-2xl border border-white/10 bg-background">
      <div className="grid w-full gap-12 px-8 py-24 md:grid-cols-2 md:px-16">
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {headline}
          </h2>
          <p className="mt-6 max-w-lg text-lg text-text-muted md:text-xl">{sub}</p>
          <div className="mt-10">
            <CTAs />
          </div>
        </div>

        {/* Chat window */}
        <div className="flex items-center">
          <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-2xl">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold text-foreground">ManaMind — Live Feed</span>
              <span className="ml-auto text-[10px] text-text-muted">3 bots active</span>
            </div>
            <div className="min-h-[300px] space-y-4 p-4">
              <AnimatePresence>
                {messages.slice(0, visibleCount).map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-3"
                  >
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-background"
                      style={{ background: msg.bot.color }}
                    >
                      {msg.bot.initial}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span
                          className="text-xs font-semibold"
                          style={{ color: msg.bot.color }}
                        >
                          {msg.bot.name}
                        </span>
                        <span className="text-[10px] text-text-muted">{msg.time}</span>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-foreground/90">
                        {msg.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {visibleCount < messages.length && (
                <motion.div
                  className="flex items-center gap-2 text-text-muted"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  <div className="flex gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-text-muted" />
                    <div className="h-1.5 w-1.5 rounded-full bg-text-muted" />
                    <div className="h-1.5 w-1.5 rounded-full bg-text-muted" />
                  </div>
                  <span className="text-[10px]">bot is typing...</span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── 5: GLITCH MORPH — "Manual QA" glitches/morphs into "Autonomous QA" ─── */
function HeroGlitch() {
  const [phase, setPhase] = useState<"manual" | "glitch" | "auto">("manual");

  useEffect(() => {
    const loop = () => {
      setPhase("manual");
      setTimeout(() => setPhase("glitch"), 2500);
      setTimeout(() => setPhase("auto"), 3200);
    };
    loop();
    const interval = setInterval(loop, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-background">
      {/* Noise/grain overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      }} />

      <div className="relative z-10 px-8 py-24 text-center md:px-16">
        {/* The morphing headline */}
        <div className="relative mx-auto mb-8 h-32 max-w-4xl overflow-hidden md:h-40">
          <AnimatePresence mode="wait">
            {phase === "manual" && (
              <motion.div
                key="manual"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, filter: "blur(8px)" }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="text-5xl font-black text-foreground/40 line-through decoration-red-500/60 md:text-7xl lg:text-8xl">
                  Manual QA
                </span>
              </motion.div>
            )}
            {phase === "glitch" && (
              <motion.div
                key="glitch"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.span
                  className="text-5xl font-black md:text-7xl lg:text-8xl"
                  animate={{
                    x: [0, -3, 5, -2, 4, 0],
                    color: ["#ffffff", "#FF4C54", "#00FF96", "#4CC9FF", "#00FF96"],
                    textShadow: [
                      "0 0 0px transparent",
                      "-3px 0 #FF4C54, 3px 0 #4CC9FF",
                      "2px 0 #FF4C54, -2px 0 #00FF96",
                      "0 0 0px transparent",
                    ],
                  }}
                  transition={{ duration: 0.6, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
                >
                  ▓░▒ QA ░▓▒
                </motion.span>
              </motion.div>
            )}
            {phase === "auto" && (
              <motion.div
                key="auto"
                initial={{ opacity: 0, filter: "blur(8px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="text-5xl font-black text-primary md:text-7xl lg:text-8xl">
                  Autonomous QA
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="mx-auto max-w-2xl text-lg text-text-muted md:text-xl">{sub}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <CTAs />
        </div>

        {/* Bottom comparison strip */}
        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/10">
          {[
            { old: "Scripts", new: "Zero-shot", icon: "⚡" },
            { old: "8hr shifts", new: "24/7", icon: "🔄" },
            { old: "Days to report", new: "Seconds", icon: "⚡" },
          ].map((item, i) => (
            <div key={i} className="bg-white/[0.02] px-4 py-5 text-center">
              <div className="text-lg">{item.icon}</div>
              <div className="mt-2 text-xs text-text-muted line-through">{item.old}</div>
              <div className="mt-1 text-sm font-semibold text-primary">{item.new}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── 6: GAME HUD — Hero styled like a game interface / heads-up display ─── */
function HeroGameHUD() {
  const [bugsFound, setBugsFound] = useState(0);
  const [coverage, setCoverage] = useState(0);

  useEffect(() => {
    const bugInterval = setInterval(() => {
      setBugsFound((prev) => (prev < 47 ? prev + 1 : prev));
    }, 80);
    const covInterval = setInterval(() => {
      setCoverage((prev) => (prev < 94 ? prev + 1 : prev));
    }, 50);
    return () => {
      clearInterval(bugInterval);
      clearInterval(covInterval);
    };
  }, []);

  return (
    <div className="relative flex min-h-[80vh] items-center overflow-hidden rounded-2xl border border-white/10 bg-background">
      {/* HUD corner brackets */}
      <div className="absolute inset-4 border border-primary/10 rounded-lg pointer-events-none" />
      {["top-6 left-6", "top-6 right-6", "bottom-6 left-6", "bottom-6 right-6"].map(
        (pos, i) => (
          <div
            key={i}
            className={`absolute ${pos} h-6 w-6 ${
              i < 2 ? "border-t-2" : "border-b-2"
            } ${i % 2 === 0 ? "border-l-2" : "border-r-2"} border-primary/40`}
          />
        )
      )}

      {/* Top-left HUD status */}
      <div className="absolute left-8 top-8 font-mono text-[10px] text-primary/50 space-y-1">
        <div>SYS: HIVEMIND v3.2</div>
        <div>STATUS: <span className="text-primary">ACTIVE</span></div>
        <div>BOTS: 7/7 DEPLOYED</div>
      </div>

      {/* Top-right live stats */}
      <div className="absolute right-8 top-8 text-right font-mono text-[10px] space-y-1">
        <div className="text-text-muted">SESSION: 00:04:12</div>
        <div className="text-primary">BUGS: {bugsFound}</div>
        <div className="text-text-muted">COVERAGE: {coverage}%</div>
      </div>

      {/* Center content */}
      <div className="relative z-10 w-full px-8 py-24 text-center md:px-16">
        <h2 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-7xl">
          {headline}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-text-muted md:text-xl">{sub}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <CTAs />
        </div>

        {/* Bot status bar at bottom */}
        <div className="mx-auto mt-16 flex max-w-2xl flex-wrap justify-center gap-3">
          {[
            { name: "Wayfinder", color: "#00FF96", status: "Exploring" },
            { name: "Breaker", color: "#FF4C54", status: "Stress testing" },
            { name: "Scout", color: "#4CC9FF", status: "Mapping" },
            { name: "Scribe", color: "#FFB84C", status: "Reporting" },
            { name: "Probe", color: "#A855F7", status: "Scanning" },
            { name: "Speed", color: "#EC4899", status: "Benchmarking" },
            { name: "Replicator", color: "#06B6D4", status: "Verifying" },
          ].map((bot) => (
            <motion.div
              key={bot.name}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5"
              animate={{ borderColor: [`${bot.color}00`, `${bot.color}40`, `${bot.color}00`] }}
              transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
            >
              <motion.div
                className="h-2 w-2 rounded-full"
                style={{ background: bot.color }}
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-[10px] font-semibold text-foreground/80">{bot.name}</span>
              <span className="text-[9px] text-text-muted">{bot.status}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom scanline */}
      <motion.div
        className="absolute left-0 h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

/* ─── Comparison Page ─── */
export default function HeroOptionsPage() {
  const options = [
    {
      id: 1,
      label: "Live Terminal",
      desc: "Real-time terminal showing bots deploying and catching bugs. Shows the product in action through code output. Feels technical and immediate.",
      component: <HeroTerminal />,
    },
    {
      id: 2,
      label: "Bot Orbit System",
      desc: "All 7 bots orbit a central ManaMind core, like a living system. Visualises the multi-agent architecture. Echoes the logo's circle motif.",
      component: <HeroBotOrbit />,
    },
    {
      id: 3,
      label: "Scan Line — Bug Detection",
      desc: "A scanning line sweeps across a game environment, revealing bugs in real-time with severity markers. Shows the core value prop visually.",
      component: <HeroScanLine />,
    },
    {
      id: 4,
      label: "Live Bot Chat Feed",
      desc: "Bots report bugs in a real-time messenger/chat interface. Makes the AI agents feel like teammates. Humanises the product.",
      component: <HeroChat />,
    },
    {
      id: 5,
      label: "Glitch Morph — Manual → Autonomous",
      desc: "\"Manual QA\" glitches and transforms into \"Autonomous QA\" with a cyberpunk distortion effect. Bold, disruptive positioning statement.",
      component: <HeroGlitch />,
    },
    {
      id: 6,
      label: "Game HUD — Heads-Up Display",
      desc: "The entire hero is styled like a game interface with corner brackets, live counters, bot status indicators, and a scanning line. Speaks the audience's language.",
      component: <HeroGameHUD />,
    },
  ];

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
          Hero Section — Design Options
        </h1>
        <p className="mb-16 text-text-muted">
          6 visually distinct concepts. Same core message, different presentations.
        </p>

        <div className="space-y-24">
          {options.map((opt) => (
            <div key={opt.id}>
              <div className="mb-6">
                <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  Option {opt.id}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-foreground">
                  {opt.label}
                </h3>
                <p className="mt-1 text-sm text-text-muted">{opt.desc}</p>
              </div>
              {opt.component}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
