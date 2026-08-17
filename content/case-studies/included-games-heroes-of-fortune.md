---
order: 1
published: false
studio:
  name: Included Games
  initials: IG
  accent: "#00FF96"
  logo: /case-studies/included-games-logo.png
game:
  title: Heroes of Fortune
  codename: HOF-LIVE
  logo: /case-studies/heroes-of-fortune-logo.png
platforms:
  - Android
  - iOS
genres: []
country:
  code: GB
  flag: GB
  name: United Kingdom
challengeOneLiner: >-
  Device fragmentation and a weekly content cadence were outpacing manual QA.
headlineMetric:
  value: 5x
  label: device coverage per release
snapshot:
  type: Mobile / Live-service
  teamSize: Small team
  stage: Live operations
  testWindow: Ongoing
challenge:
  headline: Every new event risked breaking a device the team had not tested.
  problem: >-
    Heroes of Fortune ships content weekly across hundreds of Android and iOS
    device variants. The QA team could only manually verify a handful of
    reference devices per release, so regressions on older Android builds and
    edge-case iOS hardware were slipping into production and surfacing through
    player support tickets instead of pre-release testing.
deployment:
  headline: Continuous coverage across the device matrix.
  summary: >-
    ManaMind was integrated into the release pipeline and ran parallel sessions
    across a representative set of Android and iOS devices, replaying core
    gameplay loops, store flows, and event-specific content for every build.
  sessions: 80
  focus:
    - Core gameplay loop
    - In-app purchase flow
    - Event progression
    - Account / cloud save
findings:
  - id: HOF-0001
    severity: Critical
    title: Purchase confirmation hangs on older Android devices
    summary: >-
      On Android 10 devices with limited memory, the purchase confirmation
      overlay failed to dismiss after a successful transaction, leaving players
      unsure whether the purchase had completed.
    evidence: video
  - id: HOF-0002
    severity: High
    title: Event banner overflows on smaller iPhone screens
    summary: >-
      The new seasonal event banner overflowed the layout on iPhone SE-class
      screens, hiding the call-to-action button and blocking entry into the
      event.
    evidence: screenshot
  - id: HOF-0003
    severity: Medium
    title: Frame drops in the boss arena on mid-tier Android
    summary: >-
      A specific particle effect in the new boss arena caused sustained frame
      drops on a cluster of mid-tier Android devices. Reproduced consistently
      across multiple runs.
    evidence: log
results:
  - metric: Devices tested per release
    before: "6"
    after: "30+"
    delta: "+5x"
  - metric: Critical bugs caught pre-release
    before: Reactive
    after: Pre-release
    delta: Shift left
  - metric: Player-reported crash rate
    before: Higher
    after: Lower
    delta: Reduced
  - metric: QA time per release
    before: Days
    after: Hours
    delta: Faster
quote:
  body: >-
    ManaMind gives us coverage we could never reach by hand. We can ship weekly
    content with confidence that the experience holds up across the device range
    our players actually use.
  author: Included Games team
  title: Included Games
  initials: IG
---
