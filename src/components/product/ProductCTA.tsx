"use client";

import { motion } from "framer-motion";
import { CTAButton } from "@/components/shared/CTAButton";
import { FadeInView } from "@/components/animations/FadeInView";

export function ProductCTA() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,150,0.06)_0%,transparent_60%)]" />

      {/* Floating particles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-primary/20"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <FadeInView>
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
            Get Started
          </span>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Ready to see it in action?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-text-muted">
            Book a demo and watch our bots find bugs in your game, live. No
            integration required. No commitment.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <CTAButton href="/contact">Talk to Our Team</CTAButton>
            <CTAButton href="/how-it-works" variant="outline">
              See How It Works
            </CTAButton>
          </div>

          <p className="mt-8 text-xs text-text-muted/60">
            No credit card required · Live demo in under 30 minutes · Works with any game engine
          </p>
        </FadeInView>
      </div>
    </section>
  );
}
