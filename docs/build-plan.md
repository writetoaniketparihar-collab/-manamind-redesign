# ManaMind Website — Build Plan

## Scope
Build Homepage and Product pages first. All other pages (How It Works, Case Studies, About, Careers, Contact, Blog/News) as stub routes.

## Stack
- Next.js (App Router) + TypeScript + Tailwind CSS
- Framer Motion (section reveals) + GSAP (scroll-linked animations)
- Deploy to Vercel
- Inter font via next/font

## Brand
- Background: #2E1339
- Primary: #00FF96
- Highlight: #FF4C54
- Dark mode default, sci-fi premium aesthetic

## File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (Inter font, GA, global styles)
│   ├── page.tsx                # Homepage
│   ├── product/page.tsx        # Product page
│   ├── how-it-works/page.tsx   # Stub
│   ├── case-studies/page.tsx   # Stub
│   ├── about/page.tsx          # Stub
│   ├── careers/page.tsx        # Stub
│   ├── contact/page.tsx        # Stub
│   └── blog/page.tsx           # Stub
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── StubPage.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── ParticleCanvas.tsx
│   │   ├── StrikeoutHeadline.tsx
│   │   ├── BotSection.tsx
│   │   ├── ValueProps.tsx
│   │   ├── LogoCarousel.tsx
│   │   └── DemoReel.tsx
│   ├── product/
│   │   ├── ArchitectureSection.tsx
│   │   ├── FeatureBreakdown.tsx
│   │   ├── ZeroShotExplainer.tsx
│   │   ├── BenchmarksSection.tsx
│   │   ├── SecuritySection.tsx
│   │   └── NumberedSteps.tsx
│   ├── shared/
│   │   ├── CTAButton.tsx
│   │   ├── SectionHeading.tsx
│   │   ├── Card.tsx
│   │   ├── ContactForm.tsx
│   │   └── CalendarPlaceholder.tsx
│   └── animations/
│       ├── FadeInView.tsx
│       └── useGsapScrollTrigger.ts
├── lib/
│   ├── constants.ts
│   └── analytics.ts
└── styles/
    └── globals.css
```

## Key Design Decisions

### Particle Hero Animation
- Custom Canvas (~80 lines), not a library (saves ~40KB)
- Green (#00FF96) particles with mouse-reactive connecting lines on #2E1339
- ~80-120 particles desktop, ~40 on mobile
- Respects prefers-reduced-motion

### Strikeout Headline (Slite-style)
- ~~Manual QA~~ → Autonomous AI Testing
- Red line (#FF4C54) animates across in ~0.8s
- Green replacement text fades in after ~0.3s pause
- CSS animation, no JS timers

### Logo Carousel
- CSS infinite marquee (translateX keyframes, duplicated items)
- Two rows: investors + partners
- Pauses on hover
- No GSAP needed for this pattern

### Navbar
- Fixed top, transparent on hero → solid bg-bg/90 backdrop-blur on scroll
- Logo left, nav center, "Request Demo" CTA right
- Mobile: hamburger with Framer Motion slide-in drawer

### Architecture Diagram (Product page)
- Hivemind > Command Centre > Legion > Bots hierarchy
- Built with positioned divs + SVG connecting lines (not an image)
- Each node is a card with name + description

### Animation Strategy
- Framer Motion: section entrance animations (FadeInView wrapper)
- GSAP: scroll-linked / timeline-based animations
- CSS: marquee carousel, strikeout effect
- All respect prefers-reduced-motion

## Build Order

### Batch 1 — Foundation
1. Initialize Next.js project
2. Install framer-motion, gsap, @gsap/react
3. Configure tailwind.config.ts (colors, font, animations)
4. globals.css (base styles, strikeout keyframes, scrollbar)
5. Root layout.tsx (Inter font, GA script, dark bg)
6. constants.ts (nav links, copy, partner/investor data)

### Batch 2 — Layout Shell
7. Navbar.tsx + Footer.tsx
8. StubPage.tsx
9. All 6 stub route pages
→ Deploy checkpoint: navigable shell

### Batch 3 — Shared Components
10. CTAButton, SectionHeading, Card
11. FadeInView (Framer Motion wrapper)
12. ContactForm + CalendarPlaceholder

### Batch 4 — Homepage
13. ParticleCanvas.tsx
14. StrikeoutHeadline.tsx
15. HeroSection.tsx (composes above + CTA)
16. BotSection, ValueProps, DemoReel
17. LogoCarousel
18. app/page.tsx (compose all sections)
→ Deploy checkpoint

### Batch 5 — Product Page
19. NumberedSteps.tsx (reusable)
20. ArchitectureSection.tsx
21. FeatureBreakdown, ZeroShotExplainer, BenchmarksSection, SecuritySection
22. app/product/page.tsx (compose all sections)
→ Deploy checkpoint

### Batch 6 — Polish
23. Responsive audit (375px, 768px, 1024px, 1440px)
24. Animation timing pass + prefers-reduced-motion
25. SEO metadata (generateMetadata per page)
26. Lighthouse performance audit

## Integrations
- Google Analytics: G-PP9ZLMJTTH via Next.js Script (afterInteractive)
- Contact form: UI only, success toast on submit (no backend)
- Demo booking: iCal placeholder link
