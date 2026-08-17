"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { CaseStudy, CaseStudyMedia } from "@/data/case-studies";
import { FadeInView } from "@/components/animations/FadeInView";

function SectionLabel({ index, label, accent }: { index: string; label: string; accent: string }) {
  return (
    <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest">
      <span
        className="flex h-7 w-7 items-center justify-center rounded-md border text-[11px]"
        style={{
          color: accent,
          borderColor: `${accent}40`,
          backgroundColor: `${accent}10`,
        }}
      >
        {index}
      </span>
      <span className="text-text-muted">{label}</span>
    </div>
  );
}

function EvidenceFigure({ media, compact = false }: { media: CaseStudyMedia; compact?: boolean }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-white/10 bg-black/30">
      {media.kind === "video" ? (
        <video
          controls
          playsInline
          preload="metadata"
          poster={media.poster}
          aria-label={media.alt}
          className="aspect-[1920/504] w-full bg-black object-contain"
        >
          <source src={media.src} type="video/mp4" />
          <a href={media.src}>Download the silent Husk Protocol validation footage.</a>
        </video>
      ) : (
        <a
          href={media.src}
          target="_blank"
          rel="noreferrer"
          className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
          aria-label={`Open full-size image: ${media.alt}`}
        >
          <Image
            src={media.src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            sizes={compact ? "(max-width: 768px) 100vw, 48vw" : "(max-width: 1024px) 100vw, 960px"}
            className="h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.01]"
          />
        </a>
      )}
      {media.caption && (
        <figcaption className="border-t border-white/10 px-4 py-3 text-xs leading-relaxed text-text-muted">
          {media.caption}
        </figcaption>
      )}
    </figure>
  );
}

export function DetailSections({ study }: { study: CaseStudy }) {
  const accent = study.accent;
  const prefersReducedMotion = useReducedMotion();
  const mediaById = new Map(study.media.map((media) => [media.id, media]));
  const deploymentMedia = study.deployment.mediaIds
    .map((id) => mediaById.get(id))
    .filter((media): media is CaseStudyMedia => Boolean(media));

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24">
      <FadeInView className="mt-20">
        <SectionLabel index="01" label="The Challenge" accent={accent} />
        <h2 className="mt-4 max-w-4xl text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
          {study.challenge.headline}
        </h2>
        <p className="mt-5 max-w-4xl text-base leading-relaxed text-text-muted md:text-lg">
          {study.challenge.problem}
        </p>
      </FadeInView>

      <FadeInView className="mt-24">
        <SectionLabel index="02" label="How ManaMind Was Deployed" accent={accent} />
        <h2 className="mt-4 max-w-4xl text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
          {study.deployment.headline}
        </h2>
        <p className="mt-5 max-w-4xl text-base leading-relaxed text-text-muted md:text-lg">
          {study.deployment.summary}
        </p>

        <dl className="mt-8 grid gap-4 md:grid-cols-3">
          {study.deployment.stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/10 bg-bg-card p-5">
              <dt className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                {stat.label}
              </dt>
              <dd className="mt-2 font-mono text-2xl font-bold" style={{ color: accent }}>
                {stat.value}
              </dd>
              {stat.detail && <p className="mt-2 text-xs leading-relaxed text-text-muted">{stat.detail}</p>}
            </div>
          ))}
        </dl>

        <div className="mt-8 space-y-5">
          {deploymentMedia.map((media) => (
            <EvidenceFigure key={media.id} media={media} />
          ))}
        </div>
      </FadeInView>

      <FadeInView className="mt-24">
        <SectionLabel index="03" label="What Wayfinder Found" accent={accent} />
        <h2 className="mt-4 text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
          Five verified findings. One conservative soft flag.
        </h2>
        <p className="mt-3 max-w-3xl text-text-muted">
          Every verified finding arrived with evidence. Ambiguous runtime text was routed to a human reviewer instead of being overstated as a bug.
        </p>

        <div className="mt-8 space-y-5">
          {study.findings.map((finding, index) => {
            const findingMedia = finding.mediaIds
              .map((id) => mediaById.get(id))
              .filter((media): media is CaseStudyMedia => Boolean(media));
            const isSoftFlag = finding.status === "Soft flag";

            return (
              <motion.article
                key={finding.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.16) }}
                className="overflow-hidden rounded-2xl border border-white/10 bg-bg-card"
              >
                <div className="p-5 md:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                      style={{
                        color: isSoftFlag ? "#FBBF24" : "#00FF96",
                        backgroundColor: isSoftFlag
                          ? "rgba(251,191,36,0.10)"
                          : "rgba(0,255,150,0.08)",
                        borderColor: isSoftFlag
                          ? "rgba(251,191,36,0.35)"
                          : "rgba(0,255,150,0.28)",
                      }}
                    >
                      {finding.status}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                      {finding.category}
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-foreground md:text-2xl">
                    {finding.title}
                  </h3>
                  <p className="mt-3 max-w-4xl text-sm leading-relaxed text-text-muted md:text-base">
                    {finding.summary}
                  </p>
                  {finding.reference && (
                    <p className="mt-4 rounded-lg border border-white/10 bg-black/30 px-4 py-3 font-mono text-xs leading-relaxed text-foreground">
                      {finding.reference}
                    </p>
                  )}
                  {finding.detail && (
                    <p className="mt-3 text-sm leading-relaxed text-text-muted">{finding.detail}</p>
                  )}
                </div>

                {findingMedia.length > 0 && (
                  <div className={`grid gap-px bg-white/10 ${findingMedia.length > 1 ? "md:grid-cols-2" : ""}`}>
                    {findingMedia.map((media) => (
                      <div key={media.id} className="bg-bg-card p-4">
                        <EvidenceFigure media={media} compact />
                      </div>
                    ))}
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>
      </FadeInView>

      <FadeInView className="mt-24">
        <SectionLabel index="04" label="Results & Metrics" accent={accent} />
        <h2 className="mt-4 text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
          The complete validation run, in numbers.
        </h2>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-bg-card">
          <table className="w-full table-fixed text-left">
            <thead>
              <tr className="border-b border-white/10 bg-black/20">
                <th scope="col" className="w-[42%] px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-text-muted md:px-5">
                  Metric
                </th>
                <th scope="col" className="px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-text-muted md:px-5">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {study.results.map((row, index) => (
                <tr key={row.metric} className={index !== study.results.length - 1 ? "border-b border-white/5" : ""}>
                  <th scope="row" className="px-4 py-4 text-sm font-medium text-foreground md:px-5">
                    {row.metric}
                  </th>
                  <td className="px-4 py-4 text-sm leading-relaxed text-text-muted md:px-5">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FadeInView>

      <FadeInView className="mt-24">
        <SectionLabel index="05" label="Team Feedback" accent={accent} />
        <h2 className="mt-4 text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
          What the development and publishing teams said.
        </h2>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {study.testimonials.map((testimonial) => (
            <figure
              key={`${testimonial.author}-${testimonial.organization}`}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-bg-card p-7 md:p-8"
            >
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  background: `radial-gradient(ellipse at 20% 0%, ${accent}16 0%, transparent 55%)`,
                }}
              />
              <div className="relative">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-8 w-8 opacity-30"
                  style={{ color: accent }}
                  aria-hidden
                >
                  <path d="M9 7H5a2 2 0 00-2 2v4a2 2 0 002 2h2v2a2 2 0 01-2 2H4v2h1a4 4 0 004-4V9a2 2 0 00-2-2zm10 0h-4a2 2 0 00-2 2v4a2 2 0 002 2h2v2a2 2 0 01-2 2h-1v2h1a4 4 0 004-4V9a2 2 0 00-2-2z" />
                </svg>

                <blockquote className="mt-4 text-lg font-medium leading-relaxed text-foreground">
                  “{testimonial.body}”
                </blockquote>

                <figcaption className="mt-7 flex items-center gap-4">
                  {testimonial.headshot ? (
                    <Image
                      src={testimonial.headshot}
                      alt={`Portrait of ${testimonial.author}`}
                      width={64}
                      height={64}
                      className="h-14 w-14 rounded-full border border-white/10 object-cover"
                    />
                  ) : (
                    <span
                      className="flex h-14 w-14 items-center justify-center rounded-full border text-sm font-bold"
                      style={{
                        color: accent,
                        borderColor: `${accent}40`,
                        backgroundColor: `${accent}14`,
                      }}
                    >
                      {testimonial.initials}
                    </span>
                  )}
                  <span>
                    <span className="block text-sm font-semibold text-foreground">
                      {testimonial.author}
                    </span>
                    <span className="mt-0.5 block text-xs text-text-muted">
                      {testimonial.title}, {testimonial.organization}
                    </span>
                  </span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </FadeInView>
    </div>
  );
}
