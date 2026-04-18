"use client";

import { motion } from "framer-motion";

export function AboutHero() {
  return (
    <section className="relative flex min-h-[50vh] items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,150,0.04)_0%,transparent_70%)]" />

      {/* Animated grid dots */}
      <div className="absolute inset-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-px rounded-full bg-primary/30"
            style={{
              left: `${10 + (i % 8) * 12}%`,
              top: `${15 + Math.floor(i / 8) * 18}%`,
            }}
            animate={{
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary"
        >
          Mission
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl font-bold text-foreground md:text-5xl lg:text-6xl"
        >
          Autonomous testing infrastructure
          <br />
          for{" "}
          <span className="text-primary">interactive worlds</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-text-muted"
        >
          ManaMind is a London-based AI company building vision-driven agents
          that automate quality assurance in video games.
        </motion.p>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
