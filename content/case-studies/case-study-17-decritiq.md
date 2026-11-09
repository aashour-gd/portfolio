---
title: "Decritiq: a design critique tool that has to pass its own audit"
slug: decritiq
year: 2026
product: Decritiq
summary: "A design critique tool where every finding is pinned, measured and tied to a rule. I tested it on injected defects and audited the product with my own design-system method."
tags: [Product Design, Design Systems, AI Tooling]
cover: /images/decritiq-desktop-report-light.png
---

| | |
|---|---|
| **Role** | Solo: product, design, design system, front end |
| **Timeline** | Critique engine and test set from 1 Nov 2026; app and design system 7 to 9 Nov 2026 (versions 0.4.0 to 0.11.1) |
| **Domain** | AI design critique, design systems |
| **Stack** | Node, Gemini (free tier), W3C design tokens, Tabler icons, Plus Jakarta Sans, Figma plugins |
| **Scale** | 62 rules, 4 app pages, light and dark, 390 and 1440 px |
| **Status** | Private local build. Walkthrough on request. |

![Decritiq's report view: numbered pins over a Finaity dashboard design, with the measured values listed beside each finding](/images/decritiq-desktop-report-light.png)

*A stored result from a real run on my own Finaity design. Code measured the contrast; the model judged the rest.*

## Problem

Ask a model to critique a screenshot and you get confident, vague feedback. It says "improve contrast" without saying where, quotes ratios it never measured, and gives you no way to tell which findings to trust. A designer ends up checking the checker.

I wanted a tool where every finding could be checked: pinned to a spot on the design, tied to a named rule, and backed by a measurement when one exists.

The idea started from something simple. Anyone should be able to find out whether a design has a problem, even without any UI/UX knowledge. And I wanted to be able to compare a built design against its design file the same way.

## Role

I built Decritiq alone, from the rule base to the interface. It is a side project, separate from my work at Intouch.

## Hard Decision

**Who is allowed to judge what.**

The easy version sends the screenshot to a model and prints whatever comes back. I didn't ship that, because a model that invents a contrast ratio makes every other finding look doubtful too.

So I split the work. Code measures what code can measure: contrast, blur and alignment are computed from the pixels. The model judges only what needs eyes, such as hierarchy and clarity. Every finding must name a location on the design and cite one of 62 written rules. A rule the model is unsure about appears as "worth checking", never as a defect. If the measurements disagree with a finding, the finding is removed.

The cost is real. Decritiq reports fewer problems than a chatty model would, and it misses subtle ones. I chose that on purpose: a short list you can trust is more useful than a long list you have to audit.

![Decision record DR-010: the dark-mode control-border exception, with the failing contrast ratios and the risk to low-vision users written out](/images/decritiq-decision-light.png)

**A second decision tested me.** While testing a tighter look, I set dark-mode control borders to a quiet #3F3F46. My own audit then failed it: 1.70 to 1.91 against the 3:1 rule for control borders, on 19 controls. I could have loosened the rule or hidden the failure. Instead I recorded it as a named exception (DR-010), with the risk spelled out: someone with low vision may not see the edge of an idle field. The check still fails on purpose, so the exception stays visible and I can reverse it when it matters.

## What I Built

**A critique pipeline.** Upload a screenshot or paste a link. Decritiq reads what the design is, asks a few clickable questions about the goal, measures, critiques, then verifies each finding. The report shows numbered pins on the design, a plain-language explanation for non-experts, the measured values for people who want them, and a follow-up chat.

**A rule base.** 62 rules across universal, accessibility, web dashboard, mobile and platform guidance, each with a source and a confidence level. Low-confidence rules can't be reported as defects.

**A design system that audits itself.** Three token layers (primitive, semantic, component) generate the CSS, and a drift check fails if they disagree. Light and dark share the same tokens. Every release gets a 13-rule Imhotep audit, and each decision lands in a numbered record.

**A report you can share.** A report exports as one self-contained HTML file or a PDF, built on the computer that ran it. Nothing is uploaded, so the designs stay private. I chose files over hosted links because a hosted version would need accounts, storage and a privacy policy for other people's work (DR-011).

![The Decritiq critique pipeline, step by step: read the design, ask about the goal, measure, critique, then verify each finding](/images/decritiq-process-light.png)

![Decritiq on a phone: five nav items collapsed into one menu button and a slide-in side panel](/images/decritiq-compare-mobile-light.png)

*Five nav items in a phone-width bar became one menu and a side panel.*

![Decritiq's report library: a searchable, filterable list of saved reports with bulk delete](/images/decritiq-desktop-library-light.png)

*Search, filters and bulk delete, built around a list that grows.*

[See a real report](/decritiq-sample.html) — a stored result from my Finaity design, opens as a static page.

## Result

I tested the engine against defects I injected into real designs, plus unmodified decoys that should be left alone.

- With defects large enough to fail a contrast check, Decritiq found 5 of 6 (4 as defects, 1 as "worth checking") and flagged **0 of 5 decoys**. Before calibration it found 3 of 6.
- On subtle defects it found **0 of 6**. That is the limit of the current approach and the next problem to solve. The three unmodified controls produced no false alarms.

![A table of injected-defect test results: which defects Decritiq caught, which it missed, and no false alarms on the decoys](/images/decritiq-defects-light.png)

I audited the app against my own 13 rules four times. The first audit found 5 Blocker, 8 Major and 6 Minor issues. The latest has no Major issues and one accepted exception, the dark border above. Across 52 captured states, none of the 9,474 text elements fails contrast, and all 45 icons match the Tabler set exactly.

![Decritiq's self-audit history across four rounds: blocker, major and minor issue counts falling to no major issues](/images/decritiq-audits-light.png)

I have tested Decritiq in meetings with two to four of my colleagues, running critiques on screen and talking through the findings together. It is still a private build with no public users, so I make no usage claims beyond that.

## Learning

I think like an engineer and design like a designer, and this project needed both. The lesson was that a rule I wrote caught my own taste decision, and writing the exception down helped more than winning the argument. A check that can fail is worth more than one that always passes. I kept the dark-border check failing for that reason, and I did the same when I made minor findings yellow in light mode (DR-012): the colour is 1.5 to 1 against white, below the 3 to 1 rule, so the exception is on record instead of hidden.
