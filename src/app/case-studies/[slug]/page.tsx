import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCaseStudies, getCaseStudy } from "@/lib/content/case-studies";
import { DetailHero } from "@/components/case-studies/DetailHero";
import { DetailSections } from "@/components/case-studies/DetailSections";
import { CaseStudyCTA } from "@/components/case-studies/CaseStudyCTA";
import { ComingSoon } from "@/components/layout/ComingSoon";
import { CASE_STUDIES_LIVE } from "@/config/flags";
import { JsonLd } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return getCaseStudies().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Case Study | ManaMind" };

  return {
    title: study.seo.title,
    description: study.seo.description,
    alternates: { canonical: study.seo.canonical },
    robots: CASE_STUDIES_LIVE
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      type: "article",
      title: study.seo.title,
      description: study.seo.description,
      url: study.seo.canonical,
      siteName: "ManaMind",
      publishedTime: study.publishedAt,
      authors: ["ManaMind"],
      images: [
        {
          url: study.seo.openGraphImage,
          width: 1200,
          height: 630,
          alt: `${study.game.title} autonomous game QA case study`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: study.seo.title,
      description: study.seo.description,
      images: [study.seo.openGraphImage],
    },
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  if (!CASE_STUDIES_LIVE) {
    return (
      <ComingSoon
        title="Case Studies"
        description="Real studio results, coming soon."
      />
    );
  }

  const developer = study.organizations.find((organization) => organization.role === "Developer");
  const publisher = study.organizations.find((organization) => organization.role === "Publisher");
  const canonicalUrl = `https://manamind.ai${study.seo.canonical}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        mainEntityOfPage: canonicalUrl,
        headline: study.seo.title.replace(" | ManaMind", ""),
        description: study.seo.description,
        image: `https://manamind.ai${study.seo.openGraphImage}`,
        datePublished: study.publishedAt,
        dateModified: study.publishedAt,
        author: {
          "@type": "Organization",
          name: "ManaMind",
          url: "https://manamind.ai",
        },
        publisher: {
          "@type": "Organization",
          name: "ManaMind",
          url: "https://manamind.ai",
          logo: {
            "@type": "ImageObject",
            url: "https://manamind.ai/manamind-logo.png",
          },
        },
        about: {
          "@type": "VideoGame",
          name: study.game.title,
          url: study.game.externalUrl,
          gamePlatform: study.platforms,
          genre: study.genres,
          ...(developer
            ? { developer: { "@type": "Organization", name: developer.name } }
            : {}),
          ...(publisher
            ? { publisher: { "@type": "Organization", name: publisher.name } }
            : {}),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumbs`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://manamind.ai/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Case Studies",
            item: "https://manamind.ai/case-studies",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: study.game.title,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <DetailHero study={study} />
      <DetailSections study={study} />
      <CaseStudyCTA />
    </>
  );
}
