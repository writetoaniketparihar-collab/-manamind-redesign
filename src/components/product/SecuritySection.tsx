"use client";

import { FadeInView } from "@/components/animations/FadeInView";
import { CTAButton } from "@/components/shared/CTAButton";

const securityPoints = [
  {
    title: "Zero Code Access",
    description: "We never touch your source code. Our bots interact through the game's visual output only.",
  },
  {
    title: "Isolated Environments",
    description: "Each testing session runs in a sandboxed environment with no cross-contamination.",
  },
  {
    title: "Data Privacy",
    description: "Your game data stays yours. We process frames in real-time and don't store gameplay footage.",
  },
];

export function SecuritySection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-3xl border border-white/10 bg-bg-card p-12 md:p-16">
          <FadeInView>
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
              Security & Privacy
            </span>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Your game is safe with us
            </h2>
          </FadeInView>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {securityPoints.map((point, i) => (
              <FadeInView key={point.title} delay={i * 0.1}>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {point.description}
                  </p>
                </div>
              </FadeInView>
            ))}
          </div>

          <FadeInView delay={0.4}>
            <div className="mt-12">
              <CTAButton href="/contact">Talk to Our Team</CTAButton>
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
