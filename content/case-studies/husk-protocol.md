---
order: 1
published: true
publishedAt: "2026-08-17"
accent: "#C084FC"
seo:
  title: Husk Protocol Case Study | Autonomous Game QA | ManaMind
  description: >-
    See how OddSub and Fireshine Games used ManaMind's Wayfinder to validate 60 cards across eight sessions, finding five verified issues in 50 minutes.
  canonical: /case-studies/husk-protocol
  openGraphImage: /case-studies/husk-protocol/husk-protocol-social.jpg
organizations:
  - name: OddSub
    role: Developer
    initials: OS
    logo: /case-studies/husk-protocol/oddsub-logo.png
    logoTone: dark
    country:
      code: BG
      name: Bulgaria
  - name: Fireshine Games
    role: Publisher
    initials: FG
    logo: /case-studies/husk-protocol/fireshine-games-logo.png
    logoTone: light
    country:
      code: GB
      name: United Kingdom
game:
  title: Husk Protocol
  codename: HUSK-ALPHA
  logo: /case-studies/husk-protocol/husk-protocol-art.webp
  logoWidth: 460
  logoHeight: 215
  externalUrl: https://store.steampowered.com/app/4202270/Husk_Protocol/
platforms:
  - Windows
genres:
  - Roguelike Deckbuilder
  - Strategy
  - Deckbuilding
  - Card Game
challengeOneLiner: >-
  If a card does not explain itself, players are left guessing - and there was no systematic way to check whether every card in Husk Protocol's constantly growing portfolio still did.
headlineMetric:
  value: 60+ cards
  label: 0 systematic checks - until now
snapshot:
  - label: Studio Type
    value: Indie
  - label: Team Size
    value: "3"
  - label: Stage
    value: Alpha
challenge:
  headline: What the team already understood, a new player could not.
  problem: >-
    Two cards in Husk Protocol both use the term "Purge" in their on-screen descriptions. Hover over either one and every other keyword gets a plain-English explanation, except Purge. On one card, the description simply ends on the word "Purge", with nothing telling the player what it means. The same keyword works and explains itself correctly on a different card. Once you have built a keyword, you know what it means, so it stops registering that a tooltip is missing or that a new player would be stuck. Husk Protocol carries dozens of these keywords across 60 cards, and there was no systematic way to check, from a first-time player's point of view, that every card's on-screen text delivered what someone needed to understand it on every new build. As cards and tooltips kept changing, Fireshine brought in ManaMind to build that check: could Wayfinder read the entire catalogue the way a brand-new player would and flag anywhere the text did not hold up?
deployment:
  headline: Wayfinder became an irreplaceable part of the development team.
  summary: >-
    Wayfinder plays the real Steam build through the screen, exactly like a human tester. The team's entire setup was a Steam branch and one spreadsheet defining what every card and tooltip was supposed to say. From a single plain-language task in ManaMind's Command Centre - "Game: Husk Protocol · Task: Validate compendium husks" - it launches the build, explores the entire in-game card catalogue, hovers every card to capture the tooltip text exactly as a player sees it, and checks that text word for word against the sheet. It flags anywhere the two do not match, including cases where a number or keyword has silently gone missing, and verifies every click before moving on.
  stats:
    - label: Integration
      value: 1 branch + 1 sheet
      detail: No SDKs, scripts, or engine access
    - label: Full sweep
      value: 10-12 min
      detail: 40-card catalogue run
    - label: Focused sweep
      value: 2-4 min
      detail: Smaller Cards/Modules run
  mediaIds:
    - command-centre
    - validation-video
media:
  - id: command-centre
    kind: image
    src: /case-studies/husk-protocol/command-centre.webp
    source: Husk Protocol draft source-media folder (app.jpg)
    alt: ManaMind Command Centre showing Husk Protocol compendium validation sessions and the validation report.
    width: 1500
    height: 880
    caption: A single plain-language task launches the build, validates the catalogue, and returns a structured report.
  - id: validation-video
    kind: video
    src: /case-studies/husk-protocol/wayfinder-validation.mp4
    source: Husk Protocol draft source-media folder (hero_cut_2x.mp4)
    poster: /case-studies/husk-protocol/video-poster.webp
    alt: Silent gameplay footage of Wayfinder navigating the Husk Protocol card catalogue and verifying cards.
    width: 1920
    height: 504
    caption: Wayfinder moves through the live Steam build and verifies each interaction before continuing. This footage has no audio.
  - id: grapple
    kind: image
    src: /case-studies/husk-protocol/grapple.webp
    source: Husk Protocol draft source-media folder (grapple.jpg)
    alt: Husk Protocol Grapple card showing a Buff tooltip while the Purge keyword has no tooltip.
    width: 1400
    height: 875
    caption: The Buff tooltip renders, but Purge is left unexplained.
  - id: sudden-death
    kind: image
    src: /case-studies/husk-protocol/sudden-death.webp
    source: Husk Protocol draft source-media folder (sudden_death.jpg)
    alt: Husk Protocol Sudden Death card whose description ends with the unexplained Purge keyword.
    width: 1400
    height: 875
    caption: The description ends on a bare "Purge" with no supporting tooltip.
  - id: electrify
    kind: image
    src: /case-studies/husk-protocol/electrify.webp
    source: Husk Protocol draft source-media folder (electrify.jpg)
    alt: Husk Protocol Electrify card showing a Static Damage tooltip that is shorter than the localisation reference text.
    width: 1400
    height: 875
    caption: The in-game Static Damage tooltip omits the final Shield clause from the localisation sheet.
  - id: tap-core
    kind: image
    src: /case-studies/husk-protocol/tap-core.webp
    source: Husk Protocol draft source-media folder (tap_core.jpg)
    alt: Husk Protocol Tap Core card showing the same truncated Static Damage tooltip beside a separate Shield tooltip.
    width: 1400
    height: 875
    caption: A second card and Husk type reproduce the same text drift.
  - id: reinforced-strike
    kind: image
    src: /case-studies/husk-protocol/reinforced-strike.webp
    source: Husk Protocol draft source-media folder (reinforced_strike.jpg)
    alt: Reinforced Strike card preview showing a bracketed zero in a runtime numeric template.
    width: 1670
    height: 550
    caption: The bracketed value resolves to zero in this live preview, so Wayfinder routes it for review instead of declaring a bug.
findings:
  - id: grapple-purge-tooltip
    category: Missing tooltip
    status: Verified finding
    title: Grapple invokes Purge without explaining it.
    summary: >-
      Grapple says "purge 1 random Buff". Its Buff tooltip renders correctly, but no Purge tooltip appears.
    detail: Flagged consistently across all three Husk sweeps.
    mediaIds:
      - grapple
  - id: sudden-death-purge-tooltip
    category: Missing tooltip
    status: Verified finding
    title: Sudden Death ends on an unexplained keyword.
    summary: >-
      The card description ends on the bare word "Purge", leaving a first-time player with no explanation of the action.
    detail: The same keyword renders correctly on a Tank card.
    mediaIds:
      - sudden-death
  - id: electrify-text-drift
    category: Text drift
    status: Verified finding
    title: Electrify drops the Shield clause.
    summary: >-
      The in-game Static Damage tooltip and the localisation sheet disagree on whether Static Damage breaks Shield.
    reference: "Expected: Static Damage cannot be modified in any way and ignores defences but doesn't break Shield."
    detail: Persistent in every sweep.
    mediaIds:
      - electrify
  - id: tap-core-text-drift
    category: Text drift
    status: Verified finding
    title: Tap Core reproduces the same stale string.
    summary: >-
      A second Husk type renders the identical truncated Static Damage text while its separate Shield tooltip appears beneath it.
    reference: "Expected: Static Damage cannot be modified in any way and ignores defences but doesn't break Shield."
    detail: Resolving each card to its string ID lets the team go straight to the affected row.
    mediaIds:
      - tap-core
  - id: honing-module-sheet-gap
    category: Sheet gap
    status: Verified finding
    title: Honing Module existed in-game but not in the sheet.
    summary: >-
      This time the localisation sheet was stale, not the game. Wayfinder kept both sides honest instead of assuming the build was always wrong.
    detail: The team updated the reference sheet after review.
    mediaIds: []
  - id: reinforced-strike-soft-flag
    category: Numeric placeholder
    status: Soft flag
    title: Reinforced Strike surfaced a zero for human review.
    summary: >-
      The card's damage line carries two runtime values. In the compendium, the second resolves to zero.
    detail: >-
      With no Block in the preview, zero may be correct. Wayfinder conservatively recorded the observation as a reviewer note rather than asserting it as a bug.
    mediaIds:
      - reinforced-strike
results:
  - metric: Unique cards in scope
    value: 60, validated 2-3× each across builds
  - metric: Card validations performed
    value: 170 across 8 sessions
  - metric: Total autonomous runtime
    value: 50 minutes
  - metric: Full catalogue sweep (40 cards)
    value: 10-12 minutes
  - metric: Cards/Modules sweep (10 cards)
    value: ~3 minutes
  - metric: Verified findings
    value: 5 + 1 soft flag, each with screenshot evidence
  - metric: Integration effort
    value: 1 Steam branch + 1 reference sheet - no SDKs, scripts, or engine access
testimonials:
  - body: >-
      Husk Protocol is in active development. We're adding new content constantly, and every addition risks quietly breaking something we already thought is ready. A small dev team has limited time to check everything new that is added to the game. That's exactly the job Wayfinder took over. It checks the whole catalogue on every build, helping us find small things we missed. So we can stay focused on building the game instead of rechecking content we've already finished.
    author: Konstantin Altaparmakov
    title: Co-Founder
    organization: OddSub
    initials: KA
    headshot: /case-studies/husk-protocol/konstantin-altaparmakov.webp
  - body: >-
      The set up was very simple, we handed the ManaMind team the Husk Protocol build and a spreadsheet, a few days later Wayfinder was playing the game, flagging any potential inconsistencies in the text. This is particularly reassuring because inconsistencies in the detail can really frustrate players. If it happens frequently enough, players will eventually give up on the game all together and tell others of their bad experience. No, we want to find any issues early - before they even become issues. We do not want to find out about them in a Steam review or live stream.
    author: Tony Evans
    title: Producer
    organization: Fireshine Games
    initials: TE
    headshot: /case-studies/husk-protocol/tony-evans.webp
---
