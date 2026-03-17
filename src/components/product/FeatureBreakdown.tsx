"use client";

import { FEATURES } from "@/lib/constants";
import { Card } from "@/components/shared/Card";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeInView } from "@/components/animations/FadeInView";

export function FeatureBreakdown() {
  return (
    <section className="border-t border-white/5 bg-bg-card py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <SectionHeading
            label="Capabilities"
            title="What our bots do"
            description="From exploration to reporting, every step is autonomous."
          />
        </FadeInView>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <FadeInView key={feature.title} delay={i * 0.15}>
              <Card>
                <div className="mb-4 text-3xl font-bold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {feature.description}
                </p>
              </Card>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
