---
order: 3
published: false
studio:
  name: Lumen Labs
  initials: LL
  accent: "#A78BFA"
game:
  title: Echoes of Atrium
  codename: EOA-1.0
platforms:
  - Switch
  - PC
  - Mobile
genres:
  - Puzzle
  - Narrative
country:
  code: SE
  flag: SE
  name: Sweden
challengeOneLiner: >-
  Localisation QA across nine languages was a three-week bottleneck per build.
headlineMetric:
  value: 3 wks -> 18 hrs
  label: loc QA cycle time
snapshot:
  type: Indie / Publisher-funded
  teamSize: 11 (1 QA)
  stage: Pre-cert -> launch
  testWindow: 5 weeks
challenge:
  headline: Nine languages. One QA lead. Three weeks per pass.
  problem: >-
    Echoes of Atrium ships with nine fully voiced and translated languages. Each
    loc pass required a manual playthrough per language to catch text overflow,
    missing strings, and cert-blocking encoding issues. The single QA lead
    became the bottleneck for every cert submission.
deployment:
  headline: Every language, every build, every night.
  summary: >-
    ManaMind ran nine parallel localised sessions per nightly build, replaying a
    scripted golden-path traversal in each language and flagging any visual or
    string anomaly against a baseline.
  sessions: 9
  focus:
    - Text overflow
    - Missing strings
    - Encoding (CJK, Cyrillic)
    - Voiceover sync
findings:
  - id: EOA-0233
    severity: Critical
    title: JP build crashes on chapter 4 cinematic
    summary: >-
      A specific kanji glyph in the chapter 4 subtitle string caused a hard
      crash on Switch JP builds. Cert-blocking.
    evidence: video
  - id: EOA-0241
    severity: High
    title: DE strings overflow journal panel
    summary: >-
      14 journal entries overflow the panel in German. Panel does not scroll, so
      closing entries are unreadable.
    evidence: screenshot
  - id: EOA-0258
    severity: Medium
    title: PT-BR voiceover desync after pause
    summary: >-
      Pausing during a dialog beat in PT-BR resumes voiceover one line ahead of
      subtitles.
    evidence: log
results:
  - metric: Loc QA cycle time
    before: 3 weeks
    after: 18 hours
    delta: "-96%"
  - metric: Cert-blocking issues caught pre-submission
    before: 60%
    after: 100%
    delta: "+40 pts"
  - metric: Cert resubmissions
    before: 2 avg
    after: "0"
    delta: "-100%"
  - metric: Languages tested per build
    before: "2"
    after: "9"
    delta: "+350%"
quote:
  body: >-
    We hit cert on the first submission for every platform. For an 11-person
    team, that is the difference between launching on time and slipping a
    quarter.
  author: Astrid Lindqvist
  title: Studio Lead, Lumen Labs
  initials: AL
---
