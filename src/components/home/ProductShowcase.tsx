"use client";

import Image from "next/image";
import { FadeInView } from "@/components/animations/FadeInView";

export function ProductShowcase() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
              Command Centre
            </span>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Every bug. Every build. One dashboard.
            </h2>
            <p className="mt-4 text-lg text-text-muted">
              Track what your bots find across every build, all in one place.
            </p>
          </div>
        </FadeInView>

        <FadeInView delay={0.2}>
          <div className="relative mt-16 overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-primary/5">
            <Image
              src="/product-screenshot.png"
              alt="ManaMind Command Centre - Bug Reports dashboard showing automated test results across builds and bots"
              width={1920}
              height={1080}
              className="w-full"
              priority
            />
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
