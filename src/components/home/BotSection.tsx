"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGLTF } from "@react-three/drei";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { FadeInView } from "@/components/animations/FadeInView";
import { BotModel } from "@/components/home/BotModel";
import { StatusLegend, StatusPill } from "@/components/bots/StatusPill";
import { ALL_MODEL_PATHS, bots, categories, type Bot, type BotAbility, type BotCategory } from "@/data/bots";

for (const model of ALL_MODEL_PATHS) {
  useGLTF.preload(model, undefined, undefined, (loader) => {
    (loader as { setMeshoptDecoder: (decoder: typeof MeshoptDecoder) => void }).setMeshoptDecoder(MeshoptDecoder);
  });
}

type Filter = "all" | BotCategory;

export function BotSection() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Bot | null>(null);
  const filtered = useMemo(() => (filter === "all" ? bots : bots.filter((bot) => bot.category === filter)), [filter]);

  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section id="our-bots" className="border-t border-white/5 bg-background py-24 scroll-mt-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">Our Bots</span>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">Your autonomous QA team</h2>
            <p className="mt-4 text-lg text-text-muted">
              Each bot operates with a distinct strategy and role, contributing to a distributed system designed for comprehensive test coverage across five QA solution areas. Hover an ability icon for a quick look, or open the full profile for details.
            </p>
          </div>
        </FadeInView>

        <FadeInView delay={0.08}><div className="mt-8"><StatusLegend /></div></FadeInView>

        <FadeInView delay={0.12}>
          <div className="mx-auto mt-10 flex max-w-5xl flex-wrap items-center justify-center gap-2">
            {categories.map((category) => (
              <FilterPill
                key={category.id}
                label={category.label}
                count={category.id === "all" ? bots.length : bots.filter((bot) => bot.category === category.id).length}
                active={filter === category.id}
                onClick={() => setFilter(category.id)}
              />
            ))}
          </div>
        </FadeInView>

        <div className="mt-12 grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((bot, index) => (
            <FadeInView key={bot.id} delay={0.03 + (index % 6) * 0.04}>
              <BotCard bot={bot} onOpen={() => setSelected(bot)} />
            </FadeInView>
          ))}
        </div>
      </div>

      <BotModal bot={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function FilterPill({ label, count, active, onClick }: { label: string; count: number; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-all ${active ? "border-primary bg-primary/10 text-foreground" : "border-white/10 bg-white/[0.02] text-text-muted hover:border-white/25 hover:text-foreground"}`}
    >
      {label} <span className="ml-1 rounded-full bg-white/[0.06] px-1.5 py-0.5 text-[10px] opacity-70">{count}</span>
    </button>
  );
}

function BotCard({ bot, onOpen }: { bot: Bot; onOpen: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: "400px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const abilities = bot.abilityGroups?.flatMap((group) => group.abilities) ?? [];

  return (
    <motion.article
      ref={ref}
      role="button"
      tabIndex={0}
      aria-label={`View ${bot.name} profile`}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      }}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative flex h-full w-full cursor-pointer flex-col overflow-visible rounded-2xl border border-white/[0.08] bg-bg-card transition-colors hover:z-20 hover:border-white/20 focus-visible:z-20 focus-visible:border-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      style={{ boxShadow: `0 8px 32px ${bot.color}12` }}
    >
      <div className="h-[3px] w-full rounded-t-2xl" style={{ background: bot.color }} />

      <div className="relative aspect-square overflow-hidden border-b border-white/[0.06]" style={{ background: "#3D1F4A" }}>
        <div className="pointer-events-none absolute inset-0 z-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.015)_2px,rgba(255,255,255,0.015)_4px)]" />
        {visible ? <BotModel modelPath={bot.model.path} glbFile={bot.model.glb} color={bot.color} className="relative h-full w-full" /> : null}
        <div className="absolute left-3 top-3 z-20">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-text-muted backdrop-blur-sm">{bot.categoryLabel}</span>
        </div>
        <div className="absolute right-3 top-3 z-20"><StatusPill status={bot.status} /></div>
      </div>

      <div className="flex flex-1 flex-col rounded-b-2xl p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-bold uppercase tracking-widest" style={{ color: bot.color }}>{bot.name}</p>
          <span aria-hidden="true" className="text-lg leading-none text-text-muted/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-primary">↗</span>
        </div>
        <p className="mt-1 text-[11px] text-text-muted/70">{bot.role}</p>
        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-foreground/80">{bot.specialisesIn}</p>

        <p className="mb-2 mt-4 text-[9.5px] font-bold uppercase tracking-[0.14em] text-text-muted/60">Hero Abilities</p>
        {abilities.length > 0 ? (
          <div className="flex flex-wrap gap-x-2 gap-y-3" role="group" aria-label={`${bot.name} hero abilities`}>
            {abilities.map((item) => <AbilityHex key={item.name} ability={item} accent={bot.color} />)}
          </div>
        ) : (
          <span className="inline-flex w-fit rounded-full border border-dashed border-white/20 px-2.5 py-1 text-[9.5px] font-extrabold uppercase tracking-wider text-text-muted/70">Coming soon</span>
        )}
      </div>
    </motion.article>
  );
}

function AbilityHex({ ability, accent }: { ability: BotAbility; accent: string }) {
  const [open, setOpen] = useState(false);
  const clipPath = "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";
  return (
    <div className="group/ability relative flex w-[42px] flex-col items-center gap-1 outline-none" onClick={(event) => event.stopPropagation()}>
      <button
        type="button"
        aria-label={`${ability.name}: show ability details`}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={(event) => event.stopPropagation()}
        className="relative h-[37px] w-[42px] transition-transform duration-150 hover:-translate-y-0.5 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      >
        <span className="absolute inset-0" style={{ clipPath, background: `color-mix(in srgb, ${accent} 55%, #2a1840)` }} />
        <span className="absolute inset-[2px] grid place-items-center" style={{ clipPath, background: "#1c1030" }}>
          <svg aria-hidden="true" className="h-[21px] w-[21px]" viewBox="0 0 64 64" fill="none" dangerouslySetInnerHTML={{ __html: ability.icon }} style={{ color: accent }} />
        </span>
        {ability.ultimate ? <span className="absolute inset-0" style={{ clipPath, boxShadow: `inset 0 0 0 2px ${accent}` }} /> : null}
      </button>
      <span className={`max-w-[52px] text-center text-[8px] font-bold leading-tight ${ability.ultimate ? "text-foreground" : "text-text-muted"}`}>{ability.name}</span>
      <div className={`pointer-events-none absolute bottom-[calc(100%+9px)] left-1/2 z-30 w-[228px] -translate-x-1/2 translate-y-1.5 scale-[.97] rounded-[13px] border bg-[#1b1030] p-3 text-left opacity-0 shadow-2xl transition-all duration-150 group-hover/ability:pointer-events-auto group-hover/ability:translate-y-0 group-hover/ability:scale-100 group-hover/ability:opacity-100 group-focus-within/ability:pointer-events-auto group-focus-within/ability:translate-y-0 group-focus-within/ability:scale-100 group-focus-within/ability:opacity-100 max-md:fixed max-md:bottom-4 max-md:left-4 max-md:right-4 max-md:top-auto max-md:w-auto max-md:translate-x-0 max-md:translate-y-1.5 ${open ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : ""}`} style={{ borderColor: `${accent}80` }} role="tooltip">
        <div className="mb-2 flex items-center gap-2">
          <svg aria-hidden="true" className="h-7 w-8 shrink-0" viewBox="0 0 64 64" fill="none" dangerouslySetInnerHTML={{ __html: ability.icon }} style={{ color: accent }} />
          <div className="text-[13px] font-bold text-foreground">{ability.name}{ability.ultimate ? <span className="ml-1.5 rounded-full border px-1.5 py-0.5 text-[8px] uppercase tracking-widest" style={{ color: accent, borderColor: accent }}>Ultimate</span> : null}</div>
        </div>
        <p className="text-[11.5px] leading-relaxed text-[#cfc6e6]">{ability.desc}</p>
        <p className="mt-2 border-t border-white/[0.09] pt-2 text-[10.5px] leading-relaxed text-[#b6acce]"><b style={{ color: accent }}>Example</b> {ability.example}</p>
      </div>
    </div>
  );
}

function BotModal({ bot, onClose }: { bot: Bot | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {bot ? (
        <motion.div key="bot-modal" className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button type="button" aria-label="Close bot details" className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-md" onClick={onClose} />
          <motion.div role="dialog" aria-modal="true" aria-label={`${bot.name} details`} className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-bg-card shadow-2xl" initial={{ opacity: 0, y: 20, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: .98 }} transition={{ duration: .25, ease: "easeOut" }}>
            <div className="h-[3px] w-full shrink-0" style={{ background: bot.color }} />
            <button type="button" onClick={onClose} aria-label="Close" className="absolute right-3 top-5 z-30 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/40 text-text-muted hover:border-white/20 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">×</button>
            <div className="grid min-h-0 grid-cols-1 md:grid-cols-[minmax(280px,.85fr)_minmax(0,1.15fr)]">
              <div className="relative flex h-[34vh] min-h-[260px] max-h-[360px] items-center justify-center overflow-hidden border-b border-white/[0.06] md:h-[calc(90vh-3px)] md:max-h-none md:border-b-0 md:border-r" style={{ background: "#3D1F4A" }}>
                <div className="pointer-events-none absolute inset-0 z-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.02)_2px,rgba(255,255,255,0.02)_4px)]" />
                <BotModel modelPath={bot.model.path} glbFile={bot.model.glb} color={bot.color} modelScale={2} fov={52} className="relative h-full w-full" />
                <div className="absolute left-4 top-4 z-20"><span className="rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-text-muted backdrop-blur-sm">{bot.categoryLabel}</span></div>
              </div>
              <div className="flex min-h-0 max-h-[calc(90vh-34vh)] flex-col gap-5 overflow-y-auto p-6 sm:p-8 md:max-h-[calc(90vh-3px)]">
                <div className="flex items-start justify-between gap-3 pr-10"><div><p className="text-xs font-bold uppercase tracking-widest" style={{ color: bot.color }}>{bot.name}</p><h3 className="mt-1 text-2xl font-bold text-foreground">{bot.role}</h3></div><StatusPill status={bot.status} /></div>
                <DetailBlock label="Specialises In" text={bot.specialisesIn} />
                <DetailBlock label="Bio" text={bot.bio} muted />
                {bot.scopeNote ? <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-[13px] leading-relaxed text-text-muted"><b className="text-foreground">{bot.name}</b> — {bot.scopeNote}</div> : null}
                <div>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest" style={{ color: bot.color }}>Hero Abilities</p>
                  {bot.abilityGroups ? <div className="space-y-5">{bot.abilityGroups.map((group) => <div key={group.groupLabel ?? "abilities"}>{group.groupLabel ? <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-text-muted/70">{group.groupLabel}</p> : null}<div className="grid gap-3 sm:grid-cols-2">{group.abilities.map((item) => <AbilityDetail key={item.name} ability={item} accent={bot.color} />)}</div></div>)}</div> : <ComingSoonCapabilities bot={bot} />}
                </div>
                <div className="mt-auto rounded-xl border border-white/5 bg-white/[0.02] p-4"><p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted/60">Impact</p><p className="mt-1.5 text-[14px] leading-relaxed" style={{ color: bot.color }}>{bot.impact}</p></div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function DetailBlock({ label, text, muted = false }: { label: string; text: string; muted?: boolean }) {
  return <div><p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted/60">{label}</p><p className={`mt-1.5 text-[14px] leading-relaxed ${muted ? "text-text-muted" : "text-foreground/90"}`}>{text}</p></div>;
}

function AbilityDetail({ ability, accent }: { ability: BotAbility; accent: string }) {
  return <div className={`rounded-xl border p-3 ${ability.ultimate ? "bg-white/[0.04]" : "bg-white/[0.02]"}`} style={{ borderColor: ability.ultimate ? `${accent}80` : "rgba(255,255,255,.09)" }}><div className="mb-1.5 flex items-center gap-2"><svg aria-hidden="true" className="h-[18px] w-[18px] shrink-0" viewBox="0 0 64 64" fill="none" dangerouslySetInnerHTML={{ __html: ability.icon }} style={{ color: accent }} /><span className="text-[13.5px] font-bold text-foreground">{ability.name}</span>{ability.ultimate ? <span className="rounded-full border px-1.5 py-0.5 text-[8px] uppercase tracking-widest" style={{ color: accent, borderColor: accent }}>Ultimate</span> : null}</div><p className="text-[12.5px] leading-relaxed text-text-muted">{ability.desc}</p><p className="mt-2 border-t border-white/[0.06] pt-2 text-[11.5px] leading-relaxed text-text-muted/80"><b style={{ color: accent }}>Example</b> {ability.example}</p></div>;
}

function ComingSoonCapabilities({ bot }: { bot: Bot }) {
  return <div className="space-y-3"><div className="rounded-xl border border-dashed border-white/20 p-4"><span className="rounded-full border px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider" style={{ color: bot.color, borderColor: bot.color }}>Coming soon</span><p className="mt-3 text-[12.5px] leading-relaxed text-text-muted">Hero abilities for {bot.name} haven’t been defined yet. This section will fill in once they’re published.</p></div>{bot.capabilities ? <div><p className="mb-2 text-[11px] font-bold uppercase tracking-wider" style={{ color: bot.color }}>Core Capabilities</p><ul className="grid gap-2 sm:grid-cols-2">{bot.capabilities.map((capability) => <li key={capability} className="flex gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] p-2.5 text-[12.5px] leading-relaxed text-foreground/85"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: bot.color }} />{capability}</li>)}</ul></div> : null}</div>;
}
