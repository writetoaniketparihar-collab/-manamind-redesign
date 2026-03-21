"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function StrikeoutHeadline() {
  const [manualTyped, setManualTyped] = useState("");
  const [struck, setStruck] = useState(false);
  const [newTyped, setNewTyped] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [phase, setPhase] = useState<"typing-old" | "striking" | "typing-new" | "done">("typing-old");

  const oldText = "Manual QA";
  const newText = "Autonomous Game Testing";

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (phase === "typing-old") {
      if (manualTyped.length < oldText.length) {
        timeout = setTimeout(() => setManualTyped(oldText.slice(0, manualTyped.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setPhase("striking"), 1000);
      }
    } else if (phase === "striking") {
      setStruck(true);
      timeout = setTimeout(() => setPhase("typing-new"), 800);
    } else if (phase === "typing-new") {
      if (newTyped.length < newText.length) {
        timeout = setTimeout(() => setNewTyped(newText.slice(0, newTyped.length + 1)), 50);
      } else {
        timeout = setTimeout(() => {
          setShowCursor(false);
          setPhase("done");
        }, 500);
      }
    }

    return () => clearTimeout(timeout);
  }, [manualTyped, newTyped, phase]);

  return (
    <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-7xl">
      {/* Line 1: Manual QA with strikethrough */}
      <span className="relative inline-block">
        <span className={struck ? "text-text-muted/40" : "text-foreground"} style={{ transition: "color 0.5s" }}>
          {manualTyped}
        </span>
        {struck && (
          <motion.span
            className="absolute left-0 top-1/2 h-[3px] bg-highlight"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        )}
        {phase === "typing-old" && (
          <motion.span
            className="ml-0.5 inline-block w-[3px] bg-foreground align-middle"
            style={{ height: "0.85em" }}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
        )}
      </span>

      {/* Line 2: Autonomous Game Testing */}
      {(phase === "typing-new" || phase === "done") && (
        <>
          <br />
          <span className="text-primary">
            {newTyped}
          </span>
          <AnimatePresence>
            {showCursor && (
              <motion.span
                className="ml-0.5 inline-block w-[3px] bg-primary align-middle"
                style={{ height: "0.85em" }}
                animate={{ opacity: [1, 0, 1] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </h1>
  );
}
