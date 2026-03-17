import { HeroSection } from "@/components/home/HeroSection";
import { BotSection } from "@/components/home/BotSection";
import { ValueProps } from "@/components/home/ValueProps";
import { LogoCarousel } from "@/components/home/LogoCarousel";
import { DemoReel } from "@/components/home/DemoReel";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BotSection />
      <ValueProps />
      <LogoCarousel />
      <DemoReel />
    </>
  );
}
