---
title: "Designing both sides of a retail media network"
summary: "Six years designing Intouch Live for retailers and Intouch Ads for advertisers: a retail media network live on three continents. From sole designer to Head of UX."
tags: ["Product Design", "Design Systems", "UX Leadership", "Retail Media"]
product: "Intouch"
cover: /images/nexa-cover.png
unlisted: true
next: two-sided-product-architecture
---

# Designing both sides of a retail media network

## At a glance

|  |  |
|---|---|
| **Company** | Intouch: retail media technology, founded 2015, HQ Dublin |
| **When** | Aug 2020 – Oct 2026 · El Gouna, Egypt |
| **Role** | Joined as the sole designer, Head of UX from mid-2022 |
| **Team** | Built and led a UX team of three |
| **Products** | Intouch Live (retailers) and Intouch Ads (advertisers), plus Spark, Platform and Play |
| **Outcomes** | 3 core B2B products from 0→1 · 40% retention lift on Intouch Live over my last two years · a 44-component design system used by 3 engineering squads |

![Two products, one network: the retailer's console and the advertiser's portal](/images/nexa-cover.png)

## The big picture

A retailer's stores are full of screens and speakers. Intouch turns them into an advertising network: the retailer runs it, brands buy into it, and shoppers see and hear the result. The platform is live for retailers across Europe, Latin America and MENA.

That makes the product two-sided by nature. The retailer owns the inventory and approves what plays on it. The advertiser wants their campaigns live and their numbers visible, without ever seeing another advertiser's. Same campaigns, same creatives, opposite ends of the deal.

Most of my six years came back to that one tension: the same data means different things to the retailer and to the advertiser.

## My role, and how it grew

I joined in August 2020 as the only designer. Everything that needed design came to me: discovery, flows, UI, handoff.

By mid-2022 I was Head of UX. I built and led a UX team of three, set up the design process and critique cadence, and worked with PMs and engineers in Agile, from problem framing through IA and interaction design to Figma Dev Mode handoff.

I kept designing hands-on the whole time. Leading the team never replaced doing the work.

## The products

### Intouch Live

The retailer's console for running an in-store advertising network.

**Who uses it:** retailer operations teams who own the screens, the audio and the campaigns that run on them.

**What I owned**

- The core flows retailers run their network with: campaigns, creatives, and the screens and sites they play on
- A data-informed redesign of those flows, validated with usability testing and product analytics, which lifted retention by 40% over my last two years
- Design from discovery and problem framing through IA, interaction design and handoff

![Intouch Live dashboard](/images/nexa-live-dashboard.jpg)
*Intouch Live dashboard, from the 2026 rebuild on mock data.*

**Case studies:** [Flexible data tables](/case-studies/flexible-data-tables) · [Specs as a conversation](/case-studies/specs-as-a-conversation)

### Intouch Ads

The advertiser's self-serve portal into the same network.

**Who uses it:** brands buying campaigns on a retailer's in-store screens and audio.

**What I owned**

- The advertiser's way in: building campaigns on inventory they don't own, and submitting creatives for the retailer to approve
- Strict scoping, so one advertiser never sees another's campaigns, creatives or results
- The shared language with Intouch Live: same components, same vocabulary, different job

![Intouch Ads campaign intelligence dashboard](/images/nexa-ads-intelligence-dashboard.jpg)
*Intouch Ads campaign intelligence, from the 2026 rebuild on mock data.*

**Case studies:** [Flexible data tables](/case-studies/flexible-data-tables) · [Campaign intelligence and alerts](/case-studies/campaign-intelligence-and-alerts)

### The rest of the platform

The products around the two main sides.

**Who uses it:** retailers running audio, and Intouch's own teams running the platform.

**What they cover**

- **Intouch Spark:** audio campaigns and in-store audio management
- **Intouch Platform:** internal tenant management, support and administration
- **Intouch Play:** part of the wider Intouch platform

**Case studies:** [Two-sided product architecture](/case-studies/two-sided-product-architecture)

## Shared foundations

Two products for two audiences can drift apart fast. The design system is what kept them one platform.

I co-built Intouch's design system with Figma Variables, Auto Layout and a 44-component library. Three engineering squads built from it, which cut handoff friction and UI bug reports. Each product keeps its own identity on top of the same foundations.

![One token set, two product identities](/images/nexa-design-system-cover.png)

**Case study:** [A design system for two products](/case-studies/design-system-two-products)

## 2026: one codebase for both products

This chapter is different from the rest of the page. Everything above was built by a team over six years. This part I did alone.

In 2026 I redesigned and rebuilt Intouch Live and Intouch Ads myself, in one Angular codebase, running on a mock data layer shaped for a real API. The question was simple: roughly 80% of both products is the same nouns (campaigns, ad groups, creatives, targeting, budgets), so can they share everything except the parts that genuinely differ?

The constraint I set: **share the primitives, make the differences explicit.**

![Product switcher](/images/nexa-select-product.jpg)
*The product switcher in the 2026 rebuild.*

What it came to, between June and August 2026:

- **448 source files, ~124k lines, 108 routes**, written by me
- **44 shared components** and **75 theme tokens per mode**, with each product deriving its own accent from the same token names
- **One table component behind 52 tables on 30 screens**
- **Business rules captured as living specs** that a domain expert corrected inline, instead of guessed

The case studies below come from this rebuild.

## How I worked

**Problem first.** Every piece of work started with discovery and problem framing, before any UI.

**Validate, don't assume.** The Intouch Live redesign was driven by product analytics and checked with usability testing, not by taste.

**Build the team's habits, not just the screens.** A design process, a critique cadence, and a handoff in Figma Dev Mode that engineers could trust.

**Write the rules down.** When I didn't own the domain knowledge, I made it visible: annotated specs the expert could correct before I built on a wrong assumption.

## Outcomes and what I learned

- **3 core B2B products from 0→1**, now live for retailers across Europe, Latin America and MENA (including Saudi Arabia and UAE)
- **40% retention lift on Intouch Live** over my last two years, from a data-informed redesign of core flows
- **A 44-component design system** used across 3 engineering squads, with less handoff friction and fewer UI bug reports
- **From sole designer to Head of UX**, building and leading a team of three

The hard part was never a single screen. It was holding one distinction (the same data means different things to the retailer and the advertiser) consistently across the flows, the vocabulary, the scoping rules and the copy. Most of the interesting decisions I made at Intouch were a version of that, and most of the bugs I found were what happens when it slips.

## All case studies

Read in this order, each one picks up where the last left off:

| # | Case study | What it covers |
|---|---|---|
| 1 | **[Two-sided product architecture](/case-studies/two-sided-product-architecture)** | One codebase, two audiences: what's shared, what diverges, and the two scoping bugs that proved the boundary was real |
| 2 | **[A design system for two products](/case-studies/design-system-two-products)** | Shared components, semantic tokens and per-product theming from one token set |
| 3 | **[Flexible data tables](/case-studies/flexible-data-tables)** | One table, three teams, three jobs: a table that adapts instead of multiplying |
| 4 | **[Campaign intelligence and alerts](/case-studies/campaign-intelligence-and-alerts)** | Turning a PRD into a scoring model, and naming what couldn't honestly be built |
| 5 | **[Specs as a conversation](/case-studies/specs-as-a-conversation)** | Getting business rules out of a domain expert's head with annotated living documents |
