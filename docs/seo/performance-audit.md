# Performance & SEO Audit — ManaMind Website

**Date:** 2026-03-18
**Stack:** Next.js 16.1.7 (Turbopack) + Tailwind CSS + Framer Motion + Three.js
**Pages audited:** Homepage (`/`), Product (`/product`)

---

## Bundle Analysis

| Chunk | Size | Source |
|---|---|---|
| Three.js + R3F + Drei | ~908 KB | `@react-three/fiber`, `@react-three/drei`, `three` |
| Framer Motion | ~220 KB | `framer-motion` (loaded on every page) |
| App code + shared | ~128 KB | Components, layout, pages |
| Other chunks | ~112 KB | Next.js runtime, fonts, etc. |
| **Total static output** | **~2.1 MB** | `.next/static` |

---

## Performance Issues

### Critical — Homepage

| Issue | Impact | Detail |
|---|---|---|
| **Three.js bundle (~908 KB)** | Massive JS payload | 7 `<Canvas>` (WebGL) instances for BotModel — one per bot with a 3D model. All load eagerly. |
| **ParticleCanvas** | Continuous CPU/GPU usage | 150 particles with O(n²) connection checks (~11,175 distance calculations per frame) running in `requestAnimationFrame`. |
| **7 BotModel WebGL contexts** | GPU memory + init time | Each bot with a `.obj` model gets its own Three.js canvas. Mobile devices may struggle. |

### Moderate — Both Pages

| Issue | Impact | Detail |
|---|---|---|
| **Framer Motion (~220 KB)** | Loaded on every page | Used in Navbar, FadeInView, and most components. Cannot be easily removed but could be code-split. |
| **Font: 6 weights loaded** | Extra network request size | Inter loads weights 300, 400, 500, 600, 700, 800. Only 400, 500, 600, 700 are actually used. |
| **GA script in `<head>`** | Render-blocking risk | Should be in `<body>` (Next.js `<Script>` with `strategy="afterInteractive"` handles this, but placement in `<head>` is non-standard). |

### Product Page — Clean

The product page has **no Three.js dependency**. All visuals are lightweight SVG animations + Framer Motion. No significant performance concerns.

---

## Recommended Performance Fixes

### 1. Lazy-load BotModel with `next/dynamic`

```tsx
const BotModel = dynamic(() => import("./BotModel").then(m => m.BotModel), {
  ssr: false,
  loading: () => <BotModelSkeleton />,
});
```

This defers the entire Three.js bundle (~908 KB) until the bot section scrolls into view. Use `IntersectionObserver` to trigger the load.

### 2. Reduce ParticleCanvas load

- Drop particle count from 150 → 80 (desktop) and 60 → 40 (mobile)
- Reduce connection radius from 160 → 120 to cut O(n²) comparisons
- Skip connection lines on mobile entirely
- Consider replacing with a CSS/SVG alternative for better performance

### 3. Trim font weights

Remove weights 300 and 800 from the Inter import — they're not used anywhere in the codebase.

```tsx
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
```

### 4. Move GA script placement

Move `<Script>` tags from `<head>` to `<body>` in layout.tsx. The `afterInteractive` strategy already defers them, but correct placement ensures no accidental blocking.

---

## SEO Issues

### Missing Entirely

| Item | Status | Impact |
|---|---|---|
| `robots.txt` | Missing | Crawlers have no rules — default allows all, but explicit is better for control |
| `sitemap.xml` | Missing | Google can't efficiently discover all 8 pages |
| Open Graph meta tags | Missing | No social media preview cards (LinkedIn, Twitter/X, Slack) |
| Twitter Card meta tags | Missing | No Twitter preview |
| Structured data (JSON-LD) | Missing | No rich results in Google (Organization, Product, FAQ) |
| Per-page `<title>` and `<meta description>` | Partial | Only root layout and Product page have metadata. 6 other pages use defaults. |
| Canonical URLs | Missing | Risk of duplicate content if accessed via multiple URLs |

### Present but Incomplete

| Item | Status |
|---|---|
| `<html lang="en">` | Present |
| Root `<title>` | Present: "ManaMind — Autonomous AI Quality Assurance for Video Games" |
| Root `<meta description>` | Present |
| Semantic HTML (`<main>`, `<nav>`, `<footer>`) | Present |
| Mobile hamburger `aria-label` | Present |
| Google Analytics | Configured with `G-PP9ZLMJTTH` |

---

## Recommended SEO Fixes

### 1. Add `robots.txt`

Create `src/app/robots.ts`:

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://manamind.ai/sitemap.xml",
  };
}
```

### 2. Add `sitemap.xml`

Create `src/app/sitemap.ts`:

```ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://manamind.ai";
  const pages = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" },
    { url: "/product", priority: 0.9, changeFrequency: "monthly" },
    { url: "/how-it-works", priority: 0.8, changeFrequency: "monthly" },
    { url: "/case-studies", priority: 0.7, changeFrequency: "monthly" },
    { url: "/about", priority: 0.7, changeFrequency: "monthly" },
    { url: "/careers", priority: 0.6, changeFrequency: "weekly" },
    { url: "/contact", priority: 0.8, changeFrequency: "yearly" },
    { url: "/blog", priority: 0.6, changeFrequency: "weekly" },
  ];

  return pages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
```

### 3. Add Open Graph & Twitter meta

Update root `layout.tsx` metadata:

```ts
export const metadata: Metadata = {
  metadataBase: new URL("https://manamind.ai"),
  title: {
    default: "ManaMind — Autonomous AI Quality Assurance for Video Games",
    template: "%s | ManaMind",
  },
  description: "Human-like testing at machine scale...",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ManaMind",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};
```

### 4. Add per-page metadata

Every page needs its own `title` and `description`. Example for How It Works:

```ts
export const metadata = {
  title: "How It Works",
  description: "Zero-shot, fully autonomous game testing. Learn how ManaMind's AI bots test your game without code access, training data, or integration.",
};
```

### 5. Add JSON-LD structured data

Add Organization schema in layout and Product schema on `/product`.

### 6. Add canonical URLs

Set `metadataBase` in root layout (covered in item 3 above) — Next.js auto-generates canonical URLs from this.

---

## Priority Order

| Priority | Fix | Effort | Impact |
|---|---|---|---|
| P0 | Lazy-load Three.js / BotModel | Medium | Cuts ~908 KB from initial load |
| P0 | Add sitemap.xml + robots.txt | Low | Google discoverability |
| P0 | Add OG + Twitter meta | Low | Social sharing previews |
| P1 | Per-page metadata for all 8 pages | Low | SEO for every page |
| P1 | Trim font weights | Trivial | ~20 KB saved |
| P1 | Reduce ParticleCanvas load | Low | Homepage FPS improvement |
| P2 | JSON-LD structured data | Medium | Rich Google results |
| P2 | Move GA script placement | Trivial | Best practice |
| P2 | Code-split framer-motion | Hard | Would need architecture changes |
