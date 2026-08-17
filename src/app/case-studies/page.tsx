import type { Metadata } from "next";
import { CaseStudiesHero } from "@/components/case-studies/CaseStudiesHero";
import { CaseStudyGrid } from "@/components/case-studies/CaseStudyGrid";
import { CaseStudyCTA } from "@/components/case-studies/CaseStudyCTA";
import { ComingSoon } from "@/components/layout/ComingSoon";
import { CASE_STUDIES_LIVE } from "@/config/flags";
import { getCaseStudies } from "@/lib/content/case-studies";

export const metadata: Metadata = {
  title: "Case Studies | ManaMind",
  description:
    "See how studios use ManaMind to uncover issues earlier, increase test coverage, and reduce QA costs.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Game QA Case Studies | ManaMind",
    description:
      "See how game teams use ManaMind's autonomous agents to validate builds and find player-facing issues.",
    url: "/case-studies",
    siteName: "ManaMind",
    type: "website",
    images: [
      {
        url: "/case-studies/husk-protocol/husk-protocol-social.jpg",
        width: 1200,
        height: 630,
        alt: "ManaMind autonomous game QA case studies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Game QA Case Studies | ManaMind",
    description:
      "See how game teams use ManaMind's autonomous agents to validate builds and find player-facing issues.",
    images: ["/case-studies/husk-protocol/husk-protocol-social.jpg"],
  },
  robots: CASE_STUDIES_LIVE
    ? { index: true, follow: true }
    : { index: false, follow: true },
};

export default function CaseStudiesPage() {
  if (!CASE_STUDIES_LIVE) {
    return (
      <ComingSoon
        title="Case Studies"
        description="Real studio results, coming soon."
      />
    );
  }

  return (
    <>
      <CaseStudiesHero />
      <CaseStudyGrid studies={getCaseStudies()} />
      <CaseStudyCTA />
    </>
  );
}
