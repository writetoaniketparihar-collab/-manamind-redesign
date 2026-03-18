"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FadeInView } from "@/components/animations/FadeInView";

// Traditional setup steps — shown as a painful terminal log
const traditionalSteps = [
  { text: "$ npm install game-testing-sdk", delay: 0, status: "run" },
  { text: "Installing 847 dependencies...", delay: 0.4, status: "wait" },
  { text: "$ configure-api-keys --env production", delay: 1.2, status: "run" },
  { text: "ERROR: Missing credentials for GAME_API_SECRET", delay: 1.8, status: "error" },
  { text: "$ write-test-scripts --coverage full", delay: 2.4, status: "run" },
  { text: "Generating 2,400 test scripts...", delay: 3.0, status: "wait" },
  { text: "$ integrate-source --access level=deep", delay: 3.6, status: "run" },
  { text: "WARNING: Requires source code access", delay: 4.0, status: "error" },
  { text: "$ train-model --data ./gameplay-recordings", delay: 4.6, status: "run" },
  { text: "Training... ETA: 3 weeks", delay: 5.0, status: "wait" },
  { text: "$ maintain-scripts --version 2.1.4", delay: 5.6, status: "run" },
  { text: "47 scripts broken by last update", delay: 6.0, status: "error" },
];

// ManaMind — just works
const manamindSteps = [
  { text: "$ manamind connect", delay: 0, status: "run" },
  { text: "Connecting to game stream...", delay: 0.3, status: "wait" },
  { text: "✓ Stream active. Deploying bots.", delay: 0.8, status: "success" },
  { text: "✓ Probe exploring world...", delay: 1.2, status: "success" },
  { text: "✓ First bug found in 00:04:12", delay: 1.8, status: "success" },
  { text: "✓ 23 issues documented. Reports ready.", delay: 2.4, status: "success" },
];

function TerminalLine({
  text,
  status,
  delay,
  inView,
}: {
  text: string;
  status: string;
  delay: number;
  inView: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const [typing, setTyping] = useState("");

  useEffect(() => {
    if (!inView) return;
    const show = setTimeout(() => {
      setVisible(true);
      // Typewriter effect
      let i = 0;
      const type = setInterval(() => {
        i++;
        if (i <= text.length) {
          setTyping(text.slice(0, i));
        } else {
          clearInterval(type);
        }
      }, 15);
      return () => clearInterval(type);
    }, delay * 1000);
    return () => clearTimeout(show);
  }, [inView, text, delay]);

  if (!visible) return null;

  const colorMap: Record<string, string> = {
    run: "text-text-muted",
    wait: "text-text-muted/60",
    error: "text-highlight",
    success: "text-primary",
  };

  return (
    <div className={`font-mono text-xs leading-relaxed ${colorMap[status]}`}>
      {typing}
      {typing.length < text.length && (
        <motion.span
          className="inline-block h-3 w-1.5 bg-current"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </div>
  );
}

export function ZeroShotExplainer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="border-t border-white/5 bg-bg-card py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
              Zero-Shot Testing
            </span>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Drop in. Start testing.
              <br />
              <span className="text-primary">No setup required.</span>
            </h2>
            <p className="mt-4 text-lg text-text-muted">
              No SDK. No API keys. No training data. No scripts. Our bots see the screen
              and play — just like a human.
            </p>
          </div>
        </FadeInView>

        {/* Terminal comparison */}
        <div className="mx-auto mt-16 grid max-w-5xl gap-6 lg:grid-cols-2">
          {/* Traditional - the painful way */}
          <FadeInView delay={0.2}>
            <div className="relative overflow-hidden rounded-2xl border border-highlight/20 bg-[#1a0a10]">
              {/* Terminal header */}
              <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
                <div className="h-2.5 w-2.5 rounded-full bg-highlight/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-highlight/60">
                  Traditional QA Setup
                </span>
              </div>

              {/* Terminal body */}
              <div className="h-72 overflow-hidden p-5">
                <div className="space-y-1.5">
                  {traditionalSteps.map((step, i) => (
                    <TerminalLine
                      key={i}
                      text={step.text}
                      status={step.status}
                      delay={step.delay}
                      inView={inView}
                    />
                  ))}
                </div>
              </div>

              {/* Bottom status */}
              <div className="border-t border-white/5 px-5 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-highlight/60" />
                  <span className="font-mono text-[10px] text-highlight/60">
                    Setup time: 3–6 weeks
                  </span>
                </div>
              </div>

              {/* Red overlay tint */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-highlight/[0.02] to-transparent" />
            </div>
          </FadeInView>

          {/* ManaMind - the easy way */}
          <FadeInView delay={0.4}>
            <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-[#0a1a10]">
              {/* Terminal header */}
              <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
                <div className="h-2.5 w-2.5 rounded-full bg-primary/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-primary/60">
                  ManaMind
                </span>
              </div>

              {/* Terminal body */}
              <div className="h-72 overflow-hidden p-5">
                <div className="space-y-1.5">
                  {manamindSteps.map((step, i) => (
                    <TerminalLine
                      key={i}
                      text={step.text}
                      status={step.status}
                      delay={step.delay}
                      inView={inView}
                    />
                  ))}
                </div>
              </div>

              {/* Bottom status */}
              <div className="border-t border-white/5 px-5 py-3">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="h-2 w-2 rounded-full bg-primary"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="font-mono text-[10px] text-primary/80">
                    Setup time: 0 minutes
                  </span>
                </div>
              </div>

              {/* Green overlay tint */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent" />
            </div>
          </FadeInView>
        </div>

        {/* Key points */}
        <FadeInView delay={0.6}>
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              "No code access",
              "No training data",
              "No SDK integration",
              "No API keys",
            ].map((point, i) => (
              <div key={point} className="text-center">
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 8l3 3 5-5" stroke="#00FF96" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-foreground">{point}</span>
              </div>
            ))}
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
