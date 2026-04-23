"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGLTF } from "@react-three/drei";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { FadeInView } from "@/components/animations/FadeInView";
import { BotModel } from "@/components/home/BotModel";
import { StatusPill, StatusLegend } from "@/components/bots/StatusPill";
import { ALL_MODEL_PATHS, teams, type Bot, type BotTeam } from "@/data/bots";

for (const model of ALL_MODEL_PATHS) {
  useGLTF.preload(model, undefined, undefined, (loader) => {
    (loader as { setMeshoptDecoder: (d: typeof MeshoptDecoder) => void }).setMeshoptDecoder(MeshoptDecoder);
  });
}

type TeamFilter = "all" | string;

type BotWithTeam = Bot & { teamName: string; teamEmoji: string };

const allBots: BotWithTeam[] = teams.flatMap((team) =>
  team.bots.map((bot) => ({ ...bot, teamName: team.name, teamEmoji: team.emoji }))
);

export function BotSection() {
  const [filter, setFilter] = useState<TeamFilter>("all");
  const [selected, setSelected] = useState<BotWithTeam | null>(null);

  const filtered = useMemo(
    () => (filter === "all" ? allBots : allBots.filter((b) => b.teamName === filter)),
    [filter]
  );

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
              Our Bots
            </span>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
              Your autonomous QA team
            </h2>
            <p className="mt-4 text-lg text-text-muted">
              Each bot operates with a distinct strategy and role, contributing to a distributed system designed for comprehensive test coverage.
            </p>
          </div>
        </FadeInView>

        <FadeInView delay={0.1}>
          <div className="mt-8">
            <StatusLegend />
          </div>
        </FadeInView>

        {/* Filter pills */}
        <FadeInView delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <FilterPill label="All" count={allBots.length} active={filter === "all"} onClick={() => setFilter("all")} />
            {teams.map((team) => (
              <FilterPill
                key={team.name}
                label={`${team.emoji} ${shortTeamName(team)}`}
                count={team.bots.length}
                active={filter === team.name}
                onClick={() => setFilter(team.name)}
              />
            ))}
          </div>
        </FadeInView>

        {/* Unified grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((bot, i) => (
            <FadeInView key={bot.name} delay={0.03 + (i % 8) * 0.03}>
              <BotCard bot={bot} onOpen={() => setSelected(bot)} />
            </FadeInView>
          ))}
        </div>
      </div>

      <BotModal bot={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function shortTeamName(team: BotTeam) {
  return team.name.replace(" Team", "");
}

function FilterPill({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest transition-all ${
        active
          ? "border-primary/40 bg-primary/10 text-primary"
          : "border-white/10 bg-white/[0.02] text-text-muted hover:border-white/20 hover:text-foreground"
      }`}
    >
      {label} <span className="ml-1 opacity-60">{count}</span>
    </button>
  );
}

function BotCard({ bot, onOpen }: { bot: BotWithTeam; onOpen: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh + 400 && rect.bottom > -400) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onOpen}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-bg-card text-left transition-colors hover:border-white/20"
      style={{
        boxShadow: `0 8px 32px ${bot.color}12`,
      }}
    >
      {/* Color anchor stripe so every card has identical visual contrast */}
      <div className="h-[3px] w-full" style={{ background: bot.color }} />

      {/* 3D model */}
      <div
        className="relative aspect-square overflow-hidden border-b border-white/[0.06] bg-[#0D0515]"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${bot.color}22 0%, #0D0515 70%)`,
        }}
      >
        <div className="pointer-events-none absolute inset-0 z-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.015)_2px,rgba(255,255,255,0.015)_4px)]" />
        {visible && bot.model ? (
          <BotModel
            modelPath={bot.model.path}
            objFile={bot.model.obj}
            pngFile={bot.model.png}
            glbFile={bot.model.glb}
            color={bot.color}
          />
        ) : null}

        <div className="absolute left-3 top-3 z-20">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/50 px-2 py-0.5 text-[10px] font-medium text-text-muted backdrop-blur-sm">
            <span>{bot.teamEmoji}</span>
            <span className="hidden sm:inline">{bot.teamName.replace(" Team", "")}</span>
          </span>
        </div>

        <div className="absolute right-3 top-3 z-20">
          <StatusPill status={bot.status} />
        </div>
      </div>

      <div className="flex flex-col p-4">
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-sm font-bold uppercase tracking-widest" style={{ color: bot.color }}>
            {bot.name}
          </p>
          <p className="shrink-0 text-[11px] text-text-muted/70">{bot.role}</p>
        </div>

        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-foreground/80">
          {bot.specialisesIn}
        </p>

        <span className="mt-3 text-[11px] font-semibold uppercase tracking-widest text-primary/80 transition-colors group-hover:text-primary">
          Read more +
        </span>
      </div>
    </motion.button>
  );
}

function BotModal({ bot, onClose }: { bot: BotWithTeam | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {bot && (
        <motion.div
          key="modal"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${bot.name} details`}
            className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-bg-card shadow-2xl"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Color stripe */}
            <div className="h-[3px] w-full shrink-0" style={{ background: bot.color }} />

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-5 z-30 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/40 text-text-muted transition-colors hover:border-white/20 hover:text-foreground"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <div className="grid grid-cols-1 overflow-y-auto md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
              {/* 3D model panel */}
              <div
                className="relative flex aspect-square min-h-[280px] items-center justify-center overflow-hidden border-b border-white/[0.06] md:aspect-auto md:border-b-0 md:border-r"
                style={{
                  background: `radial-gradient(circle at 50% 40%, ${bot.color}26 0%, #0D0515 70%)`,
                }}
              >
                <div className="pointer-events-none absolute inset-0 z-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.02)_2px,rgba(255,255,255,0.02)_4px)]" />
                {bot.model ? (
                  <BotModel
                    modelPath={bot.model.path}
                    objFile={bot.model.obj}
                    pngFile={bot.model.png}
                    glbFile={bot.model.glb}
                    color={bot.color}
                  />
                ) : null}
                <div className="absolute left-4 top-4 z-20">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/50 px-2 py-0.5 text-[10px] font-medium text-text-muted backdrop-blur-sm">
                    <span>{bot.teamEmoji}</span>
                    <span>{bot.teamName.replace(" Team", "")}</span>
                  </span>
                </div>
              </div>

              {/* Text panel */}
              <div className="flex flex-col gap-5 p-6 sm:p-8">
                <div className="flex items-start justify-between gap-3 pr-10">
                  <div>
                    <p
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: bot.color }}
                    >
                      {bot.name}
                    </p>
                    <h3 className="mt-1 text-2xl font-bold text-foreground">{bot.role}</h3>
                  </div>
                  <StatusPill status={bot.status} />
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted/60">
                    Specialises In
                  </p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-foreground/90">
                    {bot.specialisesIn}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted/60">
                    Bio
                  </p>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-text-muted">{bot.bio}</p>
                </div>

                <div className="mt-auto rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted/60">
                    Impact
                  </p>
                  <p
                    className="mt-1.5 text-[14px] leading-relaxed"
                    style={{ color: bot.color }}
                  >
                    {bot.impact}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
