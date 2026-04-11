"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FadeInView } from "@/components/animations/FadeInView";
import { SectionHeading } from "@/components/shared/SectionHeading";

const benchmarks = [
  {
    label: "Faster Than Manual QA",
    value: 10,
    displayValue: "10x",
    max: 12,
    color: "#00FF96",
    detail: "What takes a QA team weeks, ManaMind does in hours.",
  },
  {
    label: "Test Coverage",
    value: 98,
    displayValue: "98%",
    max: 100,
    color: "#38BDF8",
    detail: "Near-complete coverage of game surface per session.",
  },
  {
    label: "Integration Code",
    value: 0,
    displayValue: "0",
    max: 100,
    color: "#A78BFA",
    detail: "Lines of integration code required. Zero. None.",
    isZero: true,
  },
  {
    label: "Uptime",
    value: 100,
    displayValue: "24/7",
    max: 100,
    color: "#FF4C54",
    detail: "Continuous autonomous testing. No breaks. No shifts.",
  },
];

function CircularGauge({
  value,
  displayValue,
  max,
  color,
  label,
  detail,
  inView,
  delay,
  isZero,
}: {
  value: number;
  displayValue: string;
  max: number;
  color: string;
  label: string;
  detail: string;
  inView: boolean;
  delay: number;
  isZero?: boolean;
}) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const percentage = isZero ? 100 : (value / max) * 100;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center"
    >
      {/* Gauge */}
      <div className="relative h-36 w-36 sm:h-44 sm:w-44">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          {/* Background track */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="4"
          />
          {/* Progress arc */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={inView ? { strokeDashoffset } : {}}
            transition={{ duration: 1.5, delay: delay + 0.3, ease: "easeOut" }}
          />
          {/* Glow arc */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            opacity={0.15}
            initial={{ strokeDashoffset: circumference }}
            animate={inView ? { strokeDashoffset } : {}}
            transition={{ duration: 1.5, delay: delay + 0.3, ease: "easeOut" }}
          />
        </svg>

        {/* Center value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-3xl font-bold sm:text-4xl"
            style={{ color }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: delay + 0.5, type: "spring" }}
          >
            {displayValue}
          </motion.span>
        </div>
      </div>

      {/* Label */}
      <h3 className="mt-4 text-center text-sm font-bold text-foreground">{label}</h3>
      <p className="mt-1 text-center text-xs leading-relaxed text-text-muted">{detail}</p>
    </motion.div>
  );
}

export function BenchmarksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <SectionHeading
            label="Performance"
            title="Built for speed and scale"
            description="Faster testing, broader coverage, and higher bug capture rates"
          />
        </FadeInView>

        <div className="mt-16 grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
          {benchmarks.map((stat, i) => (
            <CircularGauge
              key={stat.label}
              value={stat.value}
              displayValue={stat.displayValue}
              max={stat.max}
              color={stat.color}
              label={stat.label}
              detail={stat.detail}
              inView={inView}
              delay={i * 0.15}
              isZero={stat.isZero}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
