import { ArchitectureSection } from "@/components/product/ArchitectureSection";
import { FeatureBreakdown } from "@/components/product/FeatureBreakdown";
import { ZeroShotExplainer } from "@/components/product/ZeroShotExplainer";
import { BenchmarksSection } from "@/components/product/BenchmarksSection";
import { SecuritySection } from "@/components/product/SecuritySection";

export default function ProductPage() {
  return (
    <>
      {/* Product Hero */}
      <section className="flex min-h-[60vh] items-center pt-24">
        <div className="mx-auto max-w-7xl px-6">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
            Product
          </span>
          <h1 className="text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
            The engine behind
            <br />
            <span className="text-primary">autonomous testing</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-text-muted">
            Hivemind, Command Centre, Legion, and our autonomous bots — four
            layers working together to test your game with human-like
            intelligence at machine scale.
          </p>
        </div>
      </section>

      <ArchitectureSection />
      <FeatureBreakdown />
      <ZeroShotExplainer />
      <BenchmarksSection />
      <SecuritySection />
    </>
  );
}
