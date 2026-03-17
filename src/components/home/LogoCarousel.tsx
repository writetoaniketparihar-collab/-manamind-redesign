"use client";

import { INVESTORS, PARTNERS } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeInView } from "@/components/animations/FadeInView";

function MarqueeRow({
  items,
  label,
}: {
  items: { name: string }[];
  label: string;
}) {
  // Duplicate items for seamless loop
  const doubled = [...items, ...items, ...items, ...items];

  return (
    <div className="mt-8">
      <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-text-muted">
        {label}
      </p>
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />

        <div className="animate-marquee flex w-max gap-12 py-4">
          {doubled.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className="flex h-12 items-center justify-center rounded-lg border border-white/10 bg-bg-card px-8 text-sm font-medium text-text-muted"
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LogoCarousel() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <SectionHeading
            label="Backed By"
            title="Trusted by leading investors & partners"
          />
        </FadeInView>

        <MarqueeRow items={INVESTORS} label="Investors" />
        <MarqueeRow items={PARTNERS} label="Partners" />
      </div>
    </section>
  );
}
