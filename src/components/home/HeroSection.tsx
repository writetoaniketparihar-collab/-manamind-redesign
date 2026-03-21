"use client";

import { motion } from "framer-motion";
import { ParticleCanvas } from "./ParticleCanvas";
import { CTAButton } from "@/components/shared/CTAButton";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <ParticleCanvas />
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-7xl"
        >
          AI Agents That Test Your Game
          <br />
          <span className="text-primary">So You Can Ship It</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 max-w-2xl text-lg text-text-muted md:text-xl"
        >
          Autonomous QA that plays like real players. No scripts. No SDKs. 24/7.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <CTAButton href="/contact">Request Demo</CTAButton>
          <CTAButton href="/how-it-works" variant="outline">
            See How It Works
          </CTAButton>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
