"use client";

import { ARCHITECTURE } from "@/lib/constants";
import { Card } from "@/components/shared/Card";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeInView } from "@/components/animations/FadeInView";

const layers = [
  { key: "hivemind" as const, color: "text-primary", border: "border-primary/30" },
  { key: "commandCentre" as const, color: "text-highlight", border: "border-highlight/30" },
  { key: "legion" as const, color: "text-primary", border: "border-primary/20" },
  { key: "bots" as const, color: "text-foreground", border: "border-white/10" },
];

export function ArchitectureSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <SectionHeading
            label="Architecture"
            title="Built from the ground up for autonomy"
            description="Four layers working in concert to deliver fully autonomous game testing."
          />
        </FadeInView>

        <div className="mx-auto mt-16 max-w-2xl space-y-6">
          {layers.map((layer, i) => {
            const data = ARCHITECTURE[layer.key];
            return (
              <FadeInView key={layer.key} delay={i * 0.15}>
                <div
                  className={`relative rounded-2xl border ${layer.border} bg-bg-card p-8`}
                >
                  {/* Connector line */}
                  {i < layers.length - 1 && (
                    <div className="absolute -bottom-6 left-1/2 h-6 w-px bg-white/10" />
                  )}
                  <h3 className={`text-xl font-bold ${layer.color}`}>
                    {data.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {data.description}
                  </p>
                </div>
              </FadeInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}
