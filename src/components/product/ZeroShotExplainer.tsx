"use client";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeInView } from "@/components/animations/FadeInView";

const points = [
  "No code access required",
  "No training data needed",
  "No SDK integration",
  "No API keys or credentials",
];

export function ZeroShotExplainer() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <FadeInView>
            <div>
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
                Zero-Shot Testing
              </span>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                Drop in. Start testing.
                <br />
                <span className="text-primary">No setup required.</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-text-muted">
                Our bots interact with your game exactly like a human player —
                through the screen. They see frames, read text, understand
                context, and make decisions in real time. No access to your
                source code, ever.
              </p>

              <ul className="mt-8 space-y-4">
                {points.map((point) => (
                  <li key={point} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">
                      &#10003;
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInView>

          <FadeInView delay={0.2}>
            {/* Placeholder visual */}
            <div className="flex aspect-square items-center justify-center rounded-2xl border border-white/10 bg-bg-card">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary/20">0</div>
                <p className="mt-2 text-sm text-text-muted">
                  Lines of integration code
                </p>
              </div>
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
