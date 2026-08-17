"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import * as Flags from "country-flag-icons/react/3x2";
import type { CaseStudy, CaseStudyOrganization } from "@/data/case-studies";
import { PlatformIcon } from "./PlatformIcon";

function FlagBadge({ code, name }: { code: string; name: string }) {
  const Flag = (
    Flags as Record<string, React.ComponentType<{ title?: string; className?: string }>>
  )[code.toUpperCase()];
  if (!Flag) return null;

  return (
    <span
      className="inline-flex h-4 w-6 overflow-hidden rounded-sm ring-1 ring-white/10"
      title={name}
      aria-label={name}
    >
      <Flag className="h-full w-full object-cover" />
    </span>
  );
}

function OrganizationCard({ organization }: { organization: CaseStudyOrganization }) {
  const usesLightBackground = organization.logoTone === "light";

  return (
    <div className="flex min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-bg-card/60 p-3 backdrop-blur-sm">
      <div
        className={`flex h-12 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg px-2 py-1.5 ${
          usesLightBackground ? "bg-[#fffaf5]" : "bg-black/35"
        }`}
      >
        <Image
          src={organization.logo}
          alt={`${organization.name} logo`}
          width={180}
          height={72}
          className="max-h-full w-auto object-contain"
        />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
          {organization.role}
        </p>
        <p className="mt-0.5 truncate text-sm font-semibold text-foreground">
          {organization.name}
        </p>
        <span className="mt-1 flex items-center gap-2 text-[10px] uppercase tracking-widest text-text-muted">
          <FlagBadge
            code={organization.country.code}
            name={organization.country.name}
          />
          {organization.country.name}
        </span>
      </div>
    </div>
  );
}

export function DetailHero({ study }: { study: CaseStudy }) {
  const accent = study.accent;
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at top, ${accent}1f 0%, transparent 60%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-3.5 w-3.5"
            aria-hidden
          >
            <path
              d="M19 12H5M12 19l-7-7 7-7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          All case studies
        </Link>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-text-muted"
        >
          <span className="h-px w-8" style={{ background: accent }} />
          Dossier // {study.game.codename}
        </motion.div>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {study.organizations.map((organization) => (
            <OrganizationCard key={`${organization.role}-${organization.name}`} organization={organization} />
          ))}
        </div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 grid overflow-hidden rounded-2xl border border-white/10 bg-black/35 lg:grid-cols-[1.15fr_0.85fr]"
        >
          <div className="relative flex min-h-64 items-center justify-center border-b border-white/10 p-5 lg:min-h-80 lg:border-r lg:border-b-0">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `radial-gradient(circle at center, ${accent}35, transparent 66%)`,
              }}
            />
            <Image
              src={study.game.logo}
              alt={`${study.game.title} official artwork`}
              width={study.game.logoWidth}
              height={study.game.logoHeight}
              priority
              className="relative h-auto w-full max-w-2xl rounded-xl object-contain shadow-2xl"
            />
          </div>

          <div className="flex flex-col justify-center p-6 md:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-text-muted">
              Autonomous content validation
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-none text-foreground md:text-5xl">
              {study.game.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {study.genres.map((genre) => (
                <span
                  key={genre}
                  className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-text-muted"
                >
                  {genre}
                </span>
              ))}
              {study.platforms.map((platform) => (
                <span
                  key={platform}
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-text-muted"
                >
                  <PlatformIcon platform={platform} className="h-4 w-4 text-white" />
                  {platform}
                </span>
              ))}
            </div>
            {study.game.externalUrl && (
              <a
                href={study.game.externalUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-widest transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                style={{ color: accent }}
              >
                View Husk Protocol on Steam
                <span aria-hidden>↗</span>
              </a>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-stretch"
        >
          <div className="rounded-2xl border border-white/10 bg-bg-card/60 p-5 backdrop-blur-sm">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
              The challenge
            </p>
            <p className="mt-2 text-base leading-relaxed text-foreground md:text-lg">
              {study.challengeOneLiner}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-bg-card/60 p-5 backdrop-blur-sm md:min-w-64">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
              Headline result
            </p>
            <p
              className="mt-2 font-mono text-3xl font-bold leading-none md:text-4xl"
              style={{ color: accent }}
            >
              {study.headlineMetric.value}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-text-muted">
              {study.headlineMetric.label}
            </p>
          </div>
        </motion.div>

        <motion.dl
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-6 grid gap-4 rounded-2xl border border-white/10 bg-bg-card/60 p-5 backdrop-blur-sm sm:grid-cols-3"
        >
          {study.snapshot.map((item) => (
            <div key={item.label}>
              <dt className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                {item.label}
              </dt>
              <dd className="mt-1.5 text-sm font-medium text-foreground">{item.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
