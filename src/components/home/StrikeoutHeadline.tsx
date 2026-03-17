"use client";

import { motion } from "framer-motion";

export function StrikeoutHeadline() {
  return (
    <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-7xl">
      <span className="animate-strikethrough text-text-muted">Manual QA</span>
      <br />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="text-foreground"
      >
        Autonomous AI
      </motion.span>
      <br />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="text-primary"
      >
        Quality Assurance
      </motion.span>
    </h1>
  );
}
