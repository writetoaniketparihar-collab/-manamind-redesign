export type Platform =
  | "Windows"
  | "PC"
  | "PS5"
  | "Xbox Series"
  | "Switch"
  | "Mobile"
  | "Android"
  | "iOS"
  | "VR";

export type Country = {
  code: string;
  name: string;
};

export type CaseStudyOrganization = {
  name: string;
  role: "Developer" | "Publisher";
  initials: string;
  logo: string;
  logoTone: "light" | "dark";
  country: Country;
};

export type CaseStudyMedia = {
  id: string;
  kind: "image" | "video";
  src: string;
  source: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  poster?: string;
};

export type CaseStudy = {
  slug: string;
  order: number;
  published: boolean;
  publishedAt: string;
  accent: string;
  seo: {
    title: string;
    description: string;
    canonical: string;
    openGraphImage: string;
  };
  organizations: CaseStudyOrganization[];
  game: {
    title: string;
    codename: string;
    logo: string;
    logoWidth: number;
    logoHeight: number;
    externalUrl?: string;
  };
  platforms: Platform[];
  genres: string[];
  challengeOneLiner: string;
  headlineMetric: { value: string; label: string };
  snapshot: Array<{ label: string; value: string }>;
  challenge: {
    headline: string;
    problem: string;
  };
  deployment: {
    headline: string;
    summary: string;
    stats: Array<{ label: string; value: string; detail?: string }>;
    mediaIds: string[];
  };
  media: CaseStudyMedia[];
  findings: Array<{
    id: string;
    category: string;
    status: "Verified finding" | "Soft flag";
    title: string;
    summary: string;
    detail?: string;
    reference?: string;
    mediaIds: string[];
  }>;
  results: Array<{ metric: string; value: string }>;
  testimonials: Array<{
    body: string;
    author: string;
    title: string;
    organization: string;
    initials: string;
    headshot?: string;
  }>;
};
