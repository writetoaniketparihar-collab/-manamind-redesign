"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FadeInView } from "@/components/animations/FadeInView";
import { CTAButton } from "@/components/shared/CTAButton";

const stages = [
  {
    status: "now",
    label: "Now",
    title: "Autonomous game testing",
    color: "#00FF96",
    glow: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    status: "next",
    label: "Next",
    title: "General software testing (apps, ERPs, websites)",
    color: "#A78BFA",
    glow: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    status: "future",
    label: "Long Term",
    title: "Robotics",
    color: "#38BDF8",
    glow: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <path d="M12 2v4M4 10h16v8a4 4 0 01-4 4H8a4 4 0 01-4-4v-8z" />
        <circle cx="9" cy="15" r="1.5" fill="currentColor" opacity="0.4" />
        <circle cx="15" cy="15" r="1.5" fill="currentColor" opacity="0.4" />
        <path d="M2 10l3-3M22 10l-3-3" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function Vision() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-white/5 py-24 md:py-32">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,255,150,0.04)_0%,transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <FadeInView>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
              Vision
            </span>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Where we&apos;re heading
            </h2>
            <p className="mt-4 text-lg text-text-muted">
              ManaMind is built in stages, each expanding the environments our agents can understand and operate in.
            </p>
          </div>
        </FadeInView>

        {/* Timeline */}
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="relative">
            {/* Vertical connector */}
            <motion.div
              className="absolute left-8 top-0 w-px bg-gradient-to-b from-primary/40 via-[#A78BFA]/30 to-[#38BDF8]/20"
              style={{ height: "100%" }}
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.3 }}
            />

            <div className="space-y-8">
              {stages.map((stage, i) => (
                <motion.div
                  key={stage.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
                  className="relative flex gap-6 pl-4"
                >
                  {/* Node */}
                  <div className="relative z-10 flex shrink-0 flex-col items-center">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-full border"
                      style={{
                        borderColor: `${stage.color}50`,
                        backgroundColor: `${stage.color}15`,
                        color: stage.color,
                        boxShadow: stage.glow ? `0 0 20px ${stage.color}30` : "none",
                      }}
                    >
                      {stage.glow ? (
                        <motion.div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: stage.color }}
                          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      ) : (
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: `${stage.color}50` }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Content card */}
                  <div
                    className="flex-1 rounded-2xl border p-6 sm:p-8"
                    style={{
                      borderColor: stage.glow ? `${stage.color}30` : "rgba(255,255,255,0.07)",
                      backgroundColor: stage.glow ? `${stage.color}06` : "rgba(30,13,38,0.4)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest"
                        style={{
                          color: stage.color,
                          backgroundColor: `${stage.color}15`,
                        }}
                      >
                        {stage.label}
                      </span>
                    </div>

                    <h3
                      className="mt-3 text-xl font-bold"
                      style={{ color: stage.glow ? stage.color : "var(--foreground)" }}
                    >
                      {stage.title}
                    </h3>

                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Robotics explanation */}
        <FadeInView delay={0.5}>
          <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-text-muted">
            The same core perception and decision-making systems that allow AI to navigate complex game worlds can be applied to real-world machines operating in visual environments.
          </p>
        </FadeInView>

        {/* CTA */}
        <FadeInView delay={0.6}>
          <div className="mt-12 text-center">
            <CTAButton href="/product">See what we&apos;re building</CTAButton>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
