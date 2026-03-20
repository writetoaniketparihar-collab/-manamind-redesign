import { HeroSection } from "@/components/home/HeroSection";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { BotInteraction } from "@/components/product/BotInteraction";
import { ValueProps } from "@/components/home/ValueProps";
import { LogoCarousel } from "@/components/home/LogoCarousel";
import { DemoReel } from "@/components/home/DemoReel";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductShowcase />
      <BotInteraction />
      <ValueProps />
      <LogoCarousel />
      <DemoReel />
    </>
  );
}
