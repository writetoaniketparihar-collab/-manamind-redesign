"use client";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeInView } from "@/components/animations/FadeInView";
import { motion } from "framer-motion";

export function DemoReel() {
  return (
    <section className="border-t border-white/5 bg-bg-card py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <SectionHeading
            label="See It In Action"
            title="Watch ManaMind test a live game build"
            description="See how our agents play, discover bugs, and surface issues without any scripts or human input."
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

                {/* Request Demo overlay -shown at end of video */}
                <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                  <motion.a
                    href="/contact"
                    className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-background transition-all hover:shadow-[0_0_20px_rgba(0,255,150,0.3)]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Request Demo
                  </motion.a>
                </div>
              </div>
            </div>

            {/* One-liner caption */}
            <p className="mt-4 text-center text-xs text-text-muted/60">
              Footage captured from an unmodified production build
            </p>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
