"use client";

import { motion } from "framer-motion";
import { CTAButton } from "@/components/shared/CTAButton";

const layers = [
  { name: "Hivemind", subtitle: "Core Intelligence", color: "#00FF96", y: 0 },
  { name: "Command Centre", subtitle: "Mission Control", color: "#FF4C54", y: 1 },
  { name: "Legion", subtitle: "Orchestration", color: "#A78BFA", y: 2 },
  { name: "Bots", subtitle: "Autonomous Agents", color: "#38BDF8", y: 3 },
];

function DataPulse({ fromY, toY, delay, color }: { fromY: number; toY: number; delay: number; color: string }) {
  return (
    <motion.circle
      r="1.5"
      fill={color}
      initial={{ cy: fromY, cx: 50, opacity: 0 }}
      animate={{
        cy: [fromY, toY],
        opacity: [0, 0.9, 0],
      }}
      transition={{
        duration: 1.8,
        delay,
        repeat: Infinity,
        repeatDelay: 2 + Math.random() * 3,
        ease: "easeInOut",
      }}
    />
  );
}

function LayerBlock({
  name,
  subtitle,
  color,
  yPos,
  index,
}: {
  name: string;
  subtitle: string;
  color: string;
  yPos: number;
  index: number;
}) {
  const y = 10 + yPos * 22;

  return (
    <motion.g
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
    >
      {/* Layer box */}
      <rect
        x="15"
        y={y}
        width="70"
        height="16"
        rx="3"
        fill={`${color}08`}
        stroke={`${color}40`}
        strokeWidth="0.4"
      />

      {/* Glow effect */}
      <motion.rect
        x="15"
        y={y}
        width="70"
        height="16"
        rx="3"
        fill="none"
        stroke={color}
        strokeWidth="0.6"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.1, 0.4, 0.1] }}
        transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
      />

      {/* Layer name */}
      <text
        x="50"
        y={y + 7}
        textAnchor="middle"
        fill={color}
        fontSize="3.5"
        fontFamily="monospace"
        fontWeight="700"
      >
        {name}
      </text>

      {/* Subtitle */}
      <text
        x="50"
        y={y + 12}
        textAnchor="middle"
        fill={`${color}80`}
        fontSize="2"
        fontFamily="monospace"
      >
        {subtitle}
      </text>

      {/* Connection line down */}
      {index < 3 && (
        <motion.line
          x1="50"
          y1={y + 16}
          x2="50"
          y2={y + 22}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="0.3"
          strokeDasharray="1 1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
        />
      )}
    </motion.g>
  );
}

export function ProductHero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,150,0.04)_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-32 lg:grid-cols-2">
        {/* Text side */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary"
          >
            Product
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl font-bold text-foreground md:text-5xl lg:text-6xl"
          >
            The engine behind
            <br />
            <span className="text-primary">autonomous testing</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 max-w-xl text-lg text-text-muted"
          >
            Four layers of AI — from our proprietary Hivemind model to ten
            autonomous bots — working together to test your game with
            human-like intelligence at machine scale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <CTAButton href="/contact">Request Demo</CTAButton>
            <CTAButton href="#architecture" variant="outline">
              Explore Architecture
            </CTAButton>
          </motion.div>
        </div>

        {/* Animated architecture diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <svg viewBox="0 0 100 100" className="mx-auto w-full max-w-md">
            {/* Background grid */}
            <defs>
              <pattern id="heroGrid" width="5" height="5" patternUnits="userSpaceOnUse">
                <circle cx="2.5" cy="2.5" r="0.15" fill="rgba(255,255,255,0.05)" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#heroGrid)" />

            {/* Layer blocks */}
            {layers.map((layer, i) => (
              <LayerBlock
                key={layer.name}
                name={layer.name}
                subtitle={layer.subtitle}
                color={layer.color}
                yPos={layer.y}
                index={i}
              />
            ))}

            {/* Data pulses flowing between layers */}
            <DataPulse fromY={26} toY={32} delay={1.5} color="#00FF96" />
            <DataPulse fromY={48} toY={54} delay={2.0} color="#FF4C54" />
            <DataPulse fromY={70} toY={76} delay={2.5} color="#A78BFA" />

            {/* Upward feedback pulses */}
            <DataPulse fromY={76} toY={70} delay={3.0} color="#38BDF8" />
            <DataPulse fromY={54} toY={48} delay={3.5} color="#A78BFA" />
            <DataPulse fromY={32} toY={26} delay={4.0} color="#FF4C54" />
          </svg>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
