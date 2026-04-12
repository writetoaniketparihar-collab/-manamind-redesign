"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { FadeInView } from "@/components/animations/FadeInView";
import { SectionHeading } from "@/components/shared/SectionHeading";

const benchmarks = [
  {
    metric: "Regression Time",
    target: 6,
    suffix: " hours",
    // Slow + linear so each integer step is clearly visible despite the small range
    duration: 2.6,
    ease: "linear" as const,
    comparison: "vs. 3 days",
    description: "Full regression cycles completed in hours, not days",
    color: "#00FF96",
  },
  {
    metric: "Bug Detection",
    target: 86,
    suffix: "%",
    duration: 1.8,
    comparison: "of critical bugs",
    description: "Critical bugs caught before shipping",
    color: "#38BDF8",
  },
  {
    metric: "Parallel Coverage",
    target: 20,
    suffix: "+",
    duration: 1.8,
    comparison: "device configs",
    description: "Device configurations tested per run",
    color: "#A78BFA",
  },
];

// Module-level so the reference is stable across renders.
// (If declared as a destructuring default, a new array is created every
// render, which would invalidate the effect deps and restart the animation.)
const DEFAULT_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function CountUp({
  to,
  suffix,
  inView,
  delay = 0,
  duration = 1.6,
  ease,
  className,
  style,
}: {
  to: number;
  suffix: string;
  inView: boolean;
  delay?: number;
  duration?: number;
  ease?: "linear" | [number, number, number, number];
  className?: string;
  style?: React.CSSProperties;
}) {
  const [val, setVal] = useState(0);
  const easing = ease ?? DEFAULT_EASE;

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      delay,
      ease: easing,
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, delay, duration, easing]);

  return (
    <p className={className} style={style}>
      {val}
      {suffix}
    </p>
  );
}

export function Benchmarks() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-100px" });
  // Trigger the count-up only when the cards themselves enter the viewport,
  // so the numbers don't already be at their final value when the user scrolls to them.
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.4 });

  return (
    <section ref={sectionRef} className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <SectionHeading
            label="Performance Benchmarks"
            title="Results that speak for themselves"
          />
        </FadeInView>

        <div
          ref={cardsRef}
          className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3"
        >
          {benchmarks.map((item, i) => (
            <motion.div
              key={i}
              className="rounded-2xl border border-white/[0.07] bg-bg-card p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                {item.metric}
              </p>
              <CountUp
                to={item.target}
                suffix={item.suffix}
                inView={cardsInView}
                delay={i * 0.15}
                duration={item.duration}
                ease={item.ease}
                className="mt-4 text-4xl font-bold md:text-5xl"
                style={{ color: item.color }}
              />
              <p className="mt-2 text-sm font-medium text-text-muted">
                {item.comparison}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-text-muted/70">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
