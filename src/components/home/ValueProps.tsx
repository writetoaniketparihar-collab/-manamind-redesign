"use client";

import { VALUE_PROPS } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeInView } from "@/components/animations/FadeInView";

export function ValueProps() {
  return (
    <section className="border-t border-white/5 bg-bg-card py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <SectionHeading
            label="Why ManaMind"
            title="Testing that thinks for itself"
            description="We figured out a way to marry the intelligence of humans with the speed of machines."
          />
        </FadeInView>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {VALUE_PROPS.map((prop, i) => (
            <FadeInView key={prop.title} delay={i * 0.15}>
              <div className="text-center md:text-left">
                <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-primary md:mx-0" />
                <h3 className="text-lg font-semibold text-foreground">
                  {prop.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {prop.description}
                </p>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
