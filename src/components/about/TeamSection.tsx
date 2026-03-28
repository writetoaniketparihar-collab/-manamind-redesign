"use client";

import { motion } from "framer-motion";
import { FadeInView } from "@/components/animations/FadeInView";

const team = [
  { name: "Team Member 1", role: "Co-Founder & CEO", photo: null },
  { name: "Team Member 2", role: "Co-Founder & CTO", photo: null },
];

export function TeamSection() {
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
          </div>
        </FadeInView>

        <div className="mx-auto mt-12 flex max-w-2xl flex-wrap justify-center gap-8">
          {team.map((member, i) => (
            <FadeInView key={member.name} delay={0.15 + i * 0.1}>
              <div className="group w-56 text-center">
                {/* Photo placeholder */}
                <motion.div
                  className="mx-auto mb-5 flex h-40 w-40 items-center justify-center overflow-hidden rounded-2xl border border-white/[0.07] bg-background/60"
                  whileHover={{ scale: 1.03, borderColor: "rgba(0,255,150,0.3)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex h-full w-full items-center justify-center">
                    <svg viewBox="0 0 48 48" fill="none" className="h-16 w-16 text-text-muted/30">
                      <circle cx="24" cy="18" r="8" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M8 42c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </div>
                </motion.div>

                <h3 className="text-base font-bold text-foreground">{member.name}</h3>
                <p className="mt-0.5 text-xs text-text-muted">{member.role}</p>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
