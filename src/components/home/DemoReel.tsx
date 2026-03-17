"use client";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeInView } from "@/components/animations/FadeInView";

export function DemoReel() {
  return (
    <section className="border-t border-white/5 bg-bg-card py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <SectionHeading
            label="See It In Action"
            title="Watch our bots play"
            description="Autonomous AI agents exploring, testing, and documenting — in real time."
          />
        </FadeInView>

        <FadeInView delay={0.2}>
          <div className="mx-auto mt-12 max-w-4xl">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-background">
              {/* 16:9 aspect ratio placeholder */}
              <div className="relative aspect-video flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-sm text-text-muted">
                    Demo reel coming soon
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
