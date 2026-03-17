"use client";

import { motion } from "framer-motion";
import { ParticleCanvas } from "./ParticleCanvas";
import { StrikeoutHeadline } from "./StrikeoutHeadline";
import { CTAButton } from "@/components/shared/CTAButton";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <ParticleCanvas />
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32">
        <StrikeoutHeadline />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="mt-6 max-w-xl text-lg text-text-muted md:text-xl"
        >
          Human-like testing at machine scale. Zero-shot, no code access,
          infinitely scalable.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.6 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <CTAButton href="/contact">Request Demo</CTAButton>
          <CTAButton href="/product" variant="outline">
            Learn More
          </CTAButton>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
