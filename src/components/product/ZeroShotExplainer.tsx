"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { FadeInView } from "@/components/animations/FadeInView";
import { SectionHeading } from "@/components/shared/SectionHeading";

// Traditional setup steps - shown as a painful terminal log
const traditionalSteps = [
  { text: "Scripted test cases", delay: 0, status: "error" },
  { text: "Per-game setup and configuration", delay: 0.6, status: "error" },
  { text: "Fragile when UI or flow changes", delay: 1.2, status: "error" },
  { text: "Value realised after weeks of setup", delay: 1.8, status: "error" },
];

// ManaMind - just works
const manamindSteps = [
  { text: "✓ Autonomous exploration", delay: 0, status: "success" },
  { text: "✓ Operates on new titles without custom training", delay: 0.6, status: "success" },
  { text: "✓ Adapts to new layouts and interactions", delay: 1.2, status: "success" },
  { text: "✓ Testing begins from the first playable build", delay: 1.8, status: "success" },
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
          <SectionHeading
            label="Zero-Shot Testing"
            title="Start testing immediately - no scripting or training"
            description="Our bots apply prior knowledge of games to operate in new titles without any per-game training or scripting."
          />
        </FadeInView>

        {/* How this differs */}
        <FadeInView delay={0.1}>
          <h3 className="mt-16 text-center text-sm font-semibold uppercase tracking-widest text-text-muted">
            How this differs from traditional automation
          </h3>
        </FadeInView>

        {/* Terminal comparison */}
        <div className="mx-auto mt-8 grid max-w-5xl gap-6 lg:grid-cols-2">
          {/* Traditional - the painful way */}
          <FadeInView delay={0.2}>
            <div className="relative overflow-hidden rounded-2xl border border-highlight/20 bg-[#1a0a10]">
              {/* Terminal header */}
              <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
                <div className="h-2.5 w-2.5 rounded-full bg-highlight/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-highlight/60">
                  Traditional Automation
                </span>
              </div>

              {/* Terminal body */}
              <div className="h-52 overflow-hidden p-5">
                <div className="space-y-3">
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
                  ManaMind Zero-Shot
                </span>
              </div>

              {/* Terminal body */}
              <div className="h-52 overflow-hidden p-5">
                <div className="space-y-3">
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

              {/* Green overlay tint */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent" />
            </div>
          </FadeInView>
        </div>

        {/* What enables zero-shot behaviour */}
        <FadeInView delay={0.5}>
          <div className="mx-auto mt-20 max-w-3xl text-center">
            <h3 className="text-xl font-bold text-foreground md:text-2xl">
              What enables zero-shot behaviour
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-text-muted">
              ManaMind&apos;s models are trained on a wide range of interactive environments and UI patterns, allowing them to generalise their behaviour to previously unseen games without requiring project-specific retraining.
            </p>
          </div>
        </FadeInView>

        {/* Closing line */}
        <FadeInView delay={0.7}>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5">
              <motion.span
                className="h-2 w-2 rounded-full bg-primary"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-primary">
                Zero-shot capability allows our bots to function as persistent testing infrastructure rather than a per-project automation tool - enabling studios to integrate autonomous testing without the setup overhead traditionally associated with automation.
              </span>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
