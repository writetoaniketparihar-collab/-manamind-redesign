import { AboutHero } from "@/components/about/AboutHero";
import { OriginStory } from "@/components/about/OriginStory";
import { Philosophy } from "@/components/about/Philosophy";
import { TeamSection } from "@/components/about/TeamSection";
import { CompanySnapshot } from "@/components/about/CompanySnapshot";
import { Vision } from "@/components/about/Vision";

export const metadata = {
  title: "About | ManaMind",
  description:
    "Our mission, team, and the story behind ManaMind - building the autonomous testing infrastructure for interactive worlds.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OriginStory />
      <Philosophy />
      <TeamSection />
      <CompanySnapshot />
      <Vision />
    </>
  );
}
