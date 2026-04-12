"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function StrikeoutHeadline() {
  const [phase, setPhase] = useState<"show" | "struck" | "reveal">("show");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("struck"), 800);
    const t2 = setTimeout(() => setPhase("reveal"), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-7xl">
      {/* Line 1: Manual QA with glitch strikethrough */}
      <span className="relative inline-block">
        <span
          className={phase === "struck" || phase === "reveal" ? "text-text-muted/30 transition-colors duration-300" : "text-foreground transition-colors duration-300"}
        >
          Manual QA
        </span>

        {/* Strikethrough line, glitch morph style */}
        {(phase === "struck" || phase === "reveal") && (
          <>
            {/* Main strike line */}
            <motion.span
              className="absolute left-0 top-1/2 -translate-y-1/2 h-[5px] rounded-full bg-highlight"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            {/* RGB offset lines: cyan shifted up, red shifted down */}
            <motion.span
              className="absolute left-0 top-1/2 h-[3px] rounded-full bg-[#4CC9FF]/60"
              style={{ transform: "translateY(calc(-50% - 3px))" }}
              initial={{ width: 0 }}
              animate={{ width: "100%", opacity: [1, 0] }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            <motion.span
              className="absolute left-0 top-1/2 h-[3px] rounded-full bg-[#FF4C54]/60"
              style={{ transform: "translateY(calc(-50% + 3px))" }}
              initial={{ width: 0 }}
              animate={{ width: "100%", opacity: [1, 0] }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </>
        )}
      </span>

      {/* Line 2: Autonomous Game Testing, stays visible */}
      {phase === "reveal" && (
        <>
          <br />
          <motion.span
            className="text-primary"
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
          >
            Autonomous Game Testing
          </motion.span>
        </>
      )}
    </h1>
  );
}
