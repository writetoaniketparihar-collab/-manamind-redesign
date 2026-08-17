import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { CaseStudy } from "@/data/case-studies";

// Build-time loader. Reads each markdown file in content/case-studies and
// returns the same CaseStudy shape the components already expect, so nothing
// downstream has to change. Only ever called from server components and
// generateStaticParams, never from the client.
const DIR = path.join(process.cwd(), "content", "case-studies");

function assertPublicAsset(assetPath: string, slug: string) {
  if (!assetPath.startsWith("/")) {
    throw new Error(`Case study "${slug}" asset must use a root-relative path: ${assetPath}`);
  }

  const absolutePath = path.join(process.cwd(), "public", assetPath.slice(1));
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Case study "${slug}" references a missing asset: ${assetPath}`);
  }
}

function validatePublishedStudy(study: CaseStudy): CaseStudy {
  const requiredStrings = [
    study.publishedAt,
    study.accent,
    study.seo?.title,
    study.seo?.description,
    study.seo?.canonical,
    study.seo?.openGraphImage,
    study.game?.title,
    study.challengeOneLiner,
    study.challenge?.headline,
    study.challenge?.problem,
    study.deployment?.headline,
    study.deployment?.summary,
  ];

  if (requiredStrings.some((value) => !value)) {
    throw new Error(`Published case study "${study.slug}" is missing required content.`);
  }

  if (
    !study.organizations?.length ||
    !study.snapshot?.length ||
    !study.media?.length ||
    !study.findings?.length ||
    !study.results?.length ||
    !study.testimonials?.length
  ) {
    throw new Error(
      `Published case study "${study.slug}" is missing organizations, snapshot data, media, findings, results, or testimonials.`,
    );
  }

  const incompleteOrganization = study.organizations.some(
    (organization) =>
      !organization.name ||
      !organization.role ||
      !organization.logo ||
      !organization.country?.code ||
      !organization.country?.name,
  );
  const incompleteSnapshot = study.snapshot.some((item) => !item.label || !item.value);
  const incompleteMedia = study.media.some(
    (item) =>
      !item.id ||
      !item.kind ||
      !item.src ||
      !item.source ||
      !item.alt ||
      !item.width ||
      !item.height,
  );
  const incompleteFinding = study.findings.some(
    (finding) =>
      !finding.id ||
      !finding.title ||
      !finding.category ||
      !finding.status ||
      !finding.summary,
  );
  const incompleteResult = study.results.some((result) => !result.metric || !result.value);
  const incompleteTestimonial = study.testimonials.some(
    (testimonial) =>
      !testimonial.body ||
      !testimonial.author ||
      !testimonial.title ||
      !testimonial.organization,
  );

  if (
    incompleteOrganization ||
    incompleteSnapshot ||
    incompleteMedia ||
    incompleteFinding ||
    incompleteResult ||
    incompleteTestimonial
  ) {
    throw new Error(`Published case study "${study.slug}" contains an incomplete content record.`);
  }

  const mediaIds = new Set(study.media.map((item) => item.id));
  if (mediaIds.size !== study.media.length) {
    throw new Error(`Published case study "${study.slug}" contains duplicate media IDs.`);
  }

  const referencedMedia = [
    ...study.deployment.mediaIds,
    ...study.findings.flatMap((finding) => finding.mediaIds),
  ];
  const missingMedia = referencedMedia.filter((id) => !mediaIds.has(id));
  if (missingMedia.length) {
    throw new Error(
      `Published case study "${study.slug}" references unknown media IDs: ${missingMedia.join(", ")}`,
    );
  }

  [
    study.game.logo,
    study.seo.openGraphImage,
    ...study.organizations.map((organization) => organization.logo),
    ...study.media.flatMap((item) => [item.src, ...(item.poster ? [item.poster] : [])]),
    ...study.testimonials.flatMap((testimonial) =>
      testimonial.headshot ? [testimonial.headshot] : [],
    ),
  ].forEach((asset) => assertPublicAsset(asset, study.slug));

  return study;
}

export function getCaseStudies(): CaseStudy[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const { data } = matter(fs.readFileSync(path.join(DIR, file), "utf8"));
      return { slug, ...data } as CaseStudy;
    })
    .filter((study) => study.published)
    .map(validatePublishedStudy)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return getCaseStudies().find((s) => s.slug === slug);
}
