import { ProductHero } from "@/components/product/ProductHero";
import { ArchitectureSection } from "@/components/product/ArchitectureSection";
import { BotInteraction } from "@/components/product/BotInteraction";
import { FeatureBreakdown } from "@/components/product/FeatureBreakdown";
import { ZeroShotExplainer } from "@/components/product/ZeroShotExplainer";

import { Benchmarks } from "@/components/product/Benchmarks";
import { SecuritySection } from "@/components/product/SecuritySection";
import { ProductCTA } from "@/components/product/ProductCTA";

export const metadata = {
  title: "Product | ManaMind",
  description:
    "Hivemind, Command Centre, Legion, and autonomous bots - four layers powering fully autonomous AI game testing at machine scale.",
};

export default function ProductPage() {
  return (
    <>
      <ProductHero />
      <ArchitectureSection />
      <BotInteraction />
      <FeatureBreakdown />
      <ZeroShotExplainer />
      <Benchmarks />

      <SecuritySection />
      <ProductCTA />
    </>
  );
}
