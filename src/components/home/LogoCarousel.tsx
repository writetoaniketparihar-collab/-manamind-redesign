"use client";

import { useRef } from "react";
import { INVESTORS, PARTNERS } from "@/lib/constants";
import { FadeInView } from "@/components/animations/FadeInView";
import { motion, useInView } from "framer-motion";

const allBackers = [
  ...INVESTORS.map((b) => ({ ...b, type: "investor" as const })),
  ...PARTNERS.filter((p) => !INVESTORS.some((i) => i.name === p.name)).map(
    (b) => ({ ...b, type: "partner" as const })
  ),
  // EWOR is both — tag it specially
  ...INVESTORS.filter((i) => PARTNERS.some((p) => p.name === i.name)).map(
    (b) => ({ ...b, type: "both" as const })
  ),
].filter(
  (item, index, self) => self.findIndex((s) => s.name === item.name) === index
);

// Position nodes in two orbital rings
function getOrbitalPositions(count: number) {
  const positions: { x: number; y: number; ring: number }[] = [];
  // Inner ring (first 4), outer ring (rest)
  const innerCount = Math.min(4, count);
  const outerCount = count - innerCount;

  for (let i = 0; i < innerCount; i++) {
    const angle = (i / innerCount) * Math.PI * 2 - Math.PI / 2;
    positions.push({
      x: 50 + Math.cos(angle) * 28,
      y: 50 + Math.sin(angle) * 28,
      ring: 1,
    });
  }

  for (let i = 0; i < outerCount; i++) {
    const angle = (i / outerCount) * Math.PI * 2 - Math.PI / 4;
    positions.push({
      x: 50 + Math.cos(angle) * 44,
      y: 50 + Math.sin(angle) * 44,
      ring: 2,
    });
  }

  return positions;
}

function OrbitalNode({
  name,
  type,
  x,
  y,
  index,
  inView,
}: {
  name: string;
  type: "investor" | "partner" | "both";
  x: number;
  y: number;
  index: number;
  inView: boolean;
}) {
  const color =
    type === "investor"
      ? "rgba(251, 191, 36, 0.8)"
      : type === "partner"
        ? "rgba(56, 189, 248, 0.8)"
        : "rgba(0, 255, 150, 0.9)";
  const borderColor =
    type === "investor"
      ? "rgba(251, 191, 36, 0.25)"
      : type === "partner"
        ? "rgba(56, 189, 248, 0.25)"
        : "rgba(0, 255, 150, 0.35)";
  const bgColor =
    type === "investor"
      ? "rgba(251, 191, 36, 0.06)"
      : type === "partner"
        ? "rgba(56, 189, 248, 0.06)"
        : "rgba(0, 255, 150, 0.08)";

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.4 + index * 0.1,
        type: "spring",
        stiffness: 120,
      }}
    >
      {/* Connection line to center */}
      <motion.line
        x1={x}
        y1={y}
        x2={50}
        y2={50}
        stroke={borderColor}
        strokeWidth="0.3"
        strokeDasharray="2 3"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
      />

      {/* Pulse ring */}
      <motion.circle
        cx={x}
        cy={y}
        r="8"
        fill="none"
        stroke={borderColor}
        strokeWidth="0.3"
        animate={
          inView
            ? {
                r: [8, 12, 8],
                opacity: [0.4, 0, 0.4],
              }
            : {}
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: index * 0.4,
        }}
      />

      {/* Node background */}
      <circle cx={x} cy={y} r="7.5" fill={bgColor} stroke={borderColor} strokeWidth="0.4" />

      {/* Node label */}
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        fill={color}
        fontSize="2.5"
        fontFamily="monospace"
        fontWeight="600"
      >
        {name}
      </text>

      {/* Type badge */}
      <text
        x={x}
        y={y + 4.5}
        textAnchor="middle"
        dominantBaseline="central"
        fill={color}
        fontSize="1.4"
        fontFamily="monospace"
        opacity="0.5"
        textTransform="uppercase"
      >
        {type === "both" ? "INVESTOR & PARTNER" : type.toUpperCase()}
      </text>
    </motion.g>
  );
}

function DataParticle({
  startX,
  startY,
  delay,
  color,
}: {
  startX: number;
  startY: number;
  delay: number;
  color: string;
}) {
  return (
    <motion.circle
      r="0.4"
      fill={color}
      initial={{ cx: startX, cy: startY, opacity: 0 }}
      animate={{
        cx: [startX, 50],
        cy: [startY, 50],
        opacity: [0, 0.8, 0],
      }}
      transition={{
        duration: 2.5,
        delay,
        repeat: Infinity,
        repeatDelay: 3 + Math.random() * 4,
        ease: "easeInOut",
      }}
    />
  );
}

export function LogoCarousel() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const positions = getOrbitalPositions(allBackers.length);

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-5xl px-6">
        <FadeInView>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
              Our Ecosystem
            </span>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Backed by the best
            </h2>
            <p className="mt-4 text-lg text-text-muted">
              Investors and partners powering the future of autonomous QA.
            </p>
          </div>
        </FadeInView>

        {/* Orbital SVG */}
        <div className="relative mt-12 mx-auto max-w-2xl">
          <svg viewBox="0 0 100 100" className="w-full" style={{ aspectRatio: "1" }}>
            {/* Orbital rings */}
            <motion.circle
              cx="50"
              cy="50"
              r="28"
              fill="none"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="0.3"
              strokeDasharray="1.5 2"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1 }}
            />
            <motion.circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="0.3"
              strokeDasharray="1.5 2"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
            />

            {/* Data particles flowing to center */}
            {positions.map((pos, i) => (
              <DataParticle
                key={`particle-${i}`}
                startX={pos.x}
                startY={pos.y}
                delay={1 + i * 0.6}
                color={
                  allBackers[i]?.type === "investor"
                    ? "rgba(251, 191, 36, 0.6)"
                    : allBackers[i]?.type === "partner"
                      ? "rgba(56, 189, 248, 0.6)"
                      : "rgba(0, 255, 150, 0.7)"
                }
              />
            ))}

            {/* Center node — ManaMind */}
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
            >
              {/* Center glow */}
              <motion.circle
                cx="50"
                cy="50"
                r="10"
                fill="rgba(0, 255, 150, 0.03)"
                animate={{
                  r: [10, 13, 10],
                  opacity: [0.5, 0.2, 0.5],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <circle
                cx="50"
                cy="50"
                r="9"
                fill="rgba(0, 255, 150, 0.08)"
                stroke="rgba(0, 255, 150, 0.3)"
                strokeWidth="0.4"
              />
              <text
                x="50"
                y="49.5"
                textAnchor="middle"
                dominantBaseline="central"
                fill="#00FF96"
                fontSize="3"
                fontFamily="monospace"
                fontWeight="700"
              >
                ManaMind
              </text>
              <text
                x="50"
                y="53.5"
                textAnchor="middle"
                dominantBaseline="central"
                fill="rgba(0, 255, 150, 0.5)"
                fontSize="1.5"
                fontFamily="monospace"
              >
                AUTONOMOUS QA
              </text>
            </motion.g>

            {/* Backer nodes */}
            {allBackers.map((backer, i) => (
              <OrbitalNode
                key={backer.name}
                name={backer.name}
                type={backer.type}
                x={positions[i].x}
                y={positions[i].y}
                index={i}
                inView={inView}
              />
            ))}
          </svg>
        </div>

      </div>
    </section>
  );
}
