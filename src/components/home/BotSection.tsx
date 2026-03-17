"use client";

import { BOTS } from "@/lib/constants";
import { Card } from "@/components/shared/Card";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeInView } from "@/components/animations/FadeInView";

export function BotSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <SectionHeading
            label="The Tri-Bot System"
            title="Three bots. Complete coverage."
            description="Our autonomous agents work together to explore, monitor, and document every corner of your game."
          />
        </FadeInView>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {BOTS.map((bot, i) => (
            <FadeInView key={bot.name} delay={i * 0.15}>
              <Card>
                {/* Placeholder icon */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-2xl font-bold text-primary">
                  {bot.name[0]}
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {bot.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {bot.description}
                </p>
              </Card>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
