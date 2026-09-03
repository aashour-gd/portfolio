---
title: "Medu — A Free Design System, Built to Prove a Point"
summary: "A free, platform-agnostic Figma design system — built in public to demonstrate systems thinking, not just finished screens."
tags: ["Design Systems", "Figma", "Design Tokens", "Accessibility"]
product: "Medu"
cover: "/images/medu-cover.png"
---

# Medu — A Free Design System, Built to Prove a Point

![Medu — a free, platform-agnostic design system](/images/medu-cover.png)

## Problem

Most portfolios show finished screens. Almost none show the thing that actually separates a senior designer from a mid-level one: the ability to build the *system* underneath the screens, not just the screens themselves. I'd said "design systems" on my CV for years — co-led the one at Intouch, built one before that at Inmobly — but a hiring manager reading a bullet point has to take my word for it. I wanted something they could open in Figma and judge for themselves, with no NDA in the way.

## My Role

Sole designer and systems architect. Self-initiated, built outside client and Intouch work, released publicly under my own name.

## The Hard Decision

The obvious move was to theme it — a fintech kit, or an e-commerce kit, something with a narrative. I didn't. I built Medu platform-agnostic on purpose: tokens and components with no industry skin, so it reads as pure systems thinking rather than one more themed UI kit competing on visuals. That's a real trade-off — it's less flashy in a scroll of colorful Dribbble shots — but it's the more honest demonstration of what I actually do at work, where the system has to serve three different products, not one polished demo.

The second trade-off was scope. It would have been easy to promise a sprawling kit — fifty components, every pattern imaginable — and ship half of it working. Instead I fixed the v1.0.0 scope up front — foundations, 21 production components, an icon set, four assembled patterns, and two reference templates — and didn't publish until every piece of that scope was actually built, variant-complete, and accessibility-annotated, not sketched. Nothing in the released file is a placeholder or a "coming soon." What's left for v1.1 (binding spacing and radius as Number Variables, for instance) is on the roadmap precisely because it's *not* in v1.0.0 — the honesty is in the version number matching the file, not in a spec for components that don't exist yet.

## What I Built

Medu: a free, platform-agnostic Figma design system. Color and spacing live as Figma Variables (light and dark mode in one file, not duplicated), on top of a type and elevation scale. The component library — 21 components from buttons through data tables through modals — ships with documented variants, interaction states, and accessibility notes (contrast ratios, keyboard behavior, ARIA roles) built in rather than bolted on afterward.

Above the component level, a Patterns page shows four real compositions — a validated form, an empty state, a filtered data table, and an escalating feedback set (banner, toast, confirmation modal) — assembled entirely from the actual shipped components, so they stay honest rather than drifting from what's really in the library. A Templates page takes it one step further into two full assembled screens. A versioned Get Started page ties it together with the component inventory, a changelog, and a roadmap, so anyone linking this into their own file knows exactly what they're getting and what's still coming.

## Result

Shipping v1.0.0 in September 2026. Adoption is tracked two ways: Figma Community's own insights on the published file (views, likes, duplicates) as the source of truth for how many people actually took a copy, and the download count on the Marketplace listing at aashour.com as the top-of-funnel number — how many people found it worth clicking on from the portfolio itself. *[Swap this paragraph for the real numbers after 2–4 weeks live — that's enough time for an honest first read without looking thin.]*

## What I Learned

Design systems aren't about the component count — they're about the decisions you're willing to write down. The hardest part of Medu wasn't drawing a button in four states; it was deciding, and then documenting, *why* the contrast ratio, the spacing scale, and the naming convention are what they are. That's the same job as building one inside a company. Building Medu in public just means the reasoning has to survive without me standing next to it explaining it.
