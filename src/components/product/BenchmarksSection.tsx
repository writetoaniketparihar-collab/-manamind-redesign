"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeInView } from "@/components/animations/FadeInView";

const stats = [
  { value: "10x", label: "Faster than manual QA" },
  { value: "0", label: "Lines of integration code" },
  { value: "24/7", label: "Continuous testing" },
  { value: "100%", label: "Autonomous coverage" },
];

function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="text-4xl font-bold text-primary md:text-5xl">{value}</div>
      <p className="mt-2 text-sm text-text-muted">{label}</p>
    </motion.div>
  );
}

export function BenchmarksSection() {
  return (
    <section className="border-t border-white/5 bg-bg-card py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <SectionHeading
            label="Performance"
            title="Built for speed and scale"
          />
        </FadeInView>

        <div className="mt-16 grid grid-cols-2 gap-12 md:grid-cols-4">
          {stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
