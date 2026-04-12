"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FadeInView } from "@/components/animations/FadeInView";

const team: Array<{
  name: string;
  role: string;
  photo: string;
  bio?: string;
}> = [
  {
    name: "Emil Kostadinov",
    role: "Co-Founder & CEO",
    photo: "/team-emil.jpg",
    bio: "Emil is a lifelong gamer and racing driver who's been part of the startup world since his teens. He holds an Oxford MBA and is an EWOR Fellow, and is driven by competition and solving problems without clear playbooks. In his free time, he teaches entrepreneurship and serves on the board of RC Vision, helping underrepresented youth access motorsport and STEM.",
  },
  {
    name: "Sabtain Ahmad",
    role: "Co-Founder & CTO",
    photo: "/team-sabtain.png",
    bio: "ML PhD researcher with a career in distributed machine learning algorithms and gaming.",
  },
];

export function TeamSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section className="border-t border-white/5 bg-bg-card py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
              The Team
            </span>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              The people behind ManaMind
            </h2>
            <p className="mt-4 flex items-center justify-center gap-3 text-xs font-medium uppercase tracking-widest text-text-muted/70">
              <span>Founded 2025</span>
              <span className="h-1 w-1 rounded-full bg-text-muted/40" aria-hidden />
              <span>HQ London</span>
            </p>
          </div>
        </FadeInView>

        <div className="mx-auto mt-12 flex max-w-2xl flex-wrap items-start justify-center gap-8">
          {team.map((member, i) => {
            const isOpen = expanded === member.name;
            const hasBio = Boolean(member.bio);

            return (
              <FadeInView key={member.name} delay={0.15 + i * 0.1}>
                <div className="w-56">
                  <button
                    type="button"
                    onClick={() => hasBio && setExpanded(isOpen ? null : member.name)}
                    disabled={!hasBio}
                    aria-expanded={isOpen}
                    className={`group block w-full text-center ${
                      hasBio ? "cursor-pointer" : "cursor-default"
                    }`}
                  >
                    {/* Photo */}
                    <motion.div
                      className="mx-auto mb-5 flex h-40 w-40 items-center justify-center overflow-hidden rounded-2xl border border-white/[0.07] bg-background/60"
                      whileHover={hasBio ? { scale: 1.03, borderColor: "rgba(0,255,150,0.3)" } : undefined}
                      animate={
                        isOpen
                          ? { borderColor: "rgba(0,255,150,0.3)" }
                          : { borderColor: "rgba(255,255,255,0.07)" }
                      }
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={member.photo}
                        alt={member.name}
                        width={160}
                        height={160}
                        className="h-full w-full object-cover"
                      />
                    </motion.div>

                    <h3 className="text-base font-bold text-foreground">{member.name}</h3>
                    <p className="mt-0.5 text-xs text-text-muted">{member.role}</p>

                    {hasBio && (
                      <p className="mt-2 text-[11px] font-medium uppercase tracking-widest text-primary/80">
                        {isOpen ? "Hide bio −" : "Read bio +"}
                      </p>
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && member.bio && (
                      <motion.div
                        key="bio"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-left text-sm leading-relaxed text-text-muted">
                          {member.bio}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}
