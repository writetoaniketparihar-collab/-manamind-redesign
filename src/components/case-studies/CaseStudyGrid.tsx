import type { CaseStudy } from "@/data/case-studies";
import { CaseStudyCard } from "./CaseStudyCard";

export function CaseStudyGrid({ studies }: { studies: CaseStudy[] }) {
  return (
    <section className="relative pb-8">
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={
            studies.length === 1
              ? "mx-auto grid max-w-4xl gap-6"
              : "grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          }
        >
          {studies.map((study, i) => (
            <CaseStudyCard key={study.slug} study={study} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
