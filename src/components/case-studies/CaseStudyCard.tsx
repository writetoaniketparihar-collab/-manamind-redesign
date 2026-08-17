"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import * as Flags from "country-flag-icons/react/3x2";
import type { CaseStudy } from "@/data/case-studies";
import { PlatformIcon } from "./PlatformIcon";

function Flag({ code, name }: { code: string; name: string }) {
  const CountryFlag = (
    Flags as Record<string, React.ComponentType<{ title?: string; className?: string }>>
  )[code.toUpperCase()];
  if (!CountryFlag) return null;

  return (
    <span
      className="inline-flex h-4 w-6 overflow-hidden rounded-sm ring-1 ring-white/10"
      title={name}
      aria-label={name}
    >
      <CountryFlag className="h-full w-full object-cover" />
    </span>
  );
}

export function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
      className="mx-auto w-full max-w-3xl"
    >
      <Link
        href={`/case-studies/${study.slug}`}
        className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_40px_rgba(0,255,150,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-reduce:transform-none motion-reduce:transition-none"
      >
        <div className="flex items-center justify-between border-b border-white/5 bg-black/20 px-5 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(0,255,150,0.6)]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
              Published case study
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted/70">
            CASE.{String(index + 1).padStart(3, "0")}
          </span>
        </div>

        <div className="grid md:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-64 overflow-hidden border-b border-white/10 bg-black/35 p-5 md:border-r md:border-b-0">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `radial-gradient(circle at center, ${study.accent}44, transparent 70%)`,
              }}
            />
            <Image
              src={study.game.logo}
              alt={`${study.game.title} official artwork`}
              width={study.game.logoWidth}
              height={study.game.logoHeight}
              className="relative mx-auto h-full max-h-72 w-full rounded-xl object-contain transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>

          <div className="p-6">
            <div className="flex flex-wrap items-center gap-3">
              {study.organizations.map((organization) => (
                <span
                  key={`${organization.role}-${organization.name}`}
                  className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-text-muted"
                >
                  <Flag code={organization.country.code} name={organization.country.name} />
                  {organization.name}
                </span>
              ))}
            </div>

            <h2 className="mt-5 text-2xl font-bold text-foreground">{study.game.title}</h2>
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              {study.genres.slice(0, 3).map((genre) => (
                <span
                  key={genre}
                  className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-text-muted"
                >
                  {genre}
                </span>
              ))}
              {study.platforms.map((platform) => (
                <span
                  key={platform}
                  className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-text-muted"
                >
                  <PlatformIcon platform={platform} className="h-4 w-4 text-white" />
                  {platform}
                </span>
              ))}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-text-muted">
              {study.challengeOneLiner}
            </p>

            <div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                Headline result
              </p>
              <p
                className="mt-1.5 font-mono text-2xl font-bold leading-none md:text-3xl"
                style={{ color: study.accent }}
              >
                {study.headlineMetric.value}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-text-muted">
                {study.headlineMetric.label}
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-xs font-medium text-text-muted">Read the case study</span>
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-text-muted transition-all group-hover:border-primary/40 group-hover:bg-primary/10 group-hover:text-primary"
                aria-hidden
              >
                →
              </span>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
          style={{ background: study.accent }}
        />
      </Link>
    </motion.div>
  );
}
