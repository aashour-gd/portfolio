---
title: "Campaign Intelligence Dashboard"
summary: "A triage-first dashboard tab that turns raw campaign data into health signals, ranked recommendations, and a cross-tab filtered workspace."
tags: ["Dashboard Design", "Information Architecture", "Data Visualization"]
product: "Intouch Ant Live Portal"
---

# Case Study: From Data to Decisions — A Campaign Intelligence Dashboard

## Context
Media buyers managing dozens of live campaigns don't have time to open every campaign
and manually check delivery pace, budget consumption, and creative performance. The
Intouch Ant dashboard added a **Campaign Intelligence (CI)** tab designed to answer one
question first: *"What needs my attention right now?"*

## The Problem
The existing dashboard surfaced raw activity, but left prioritization entirely to the
user — there was no signal distinguishing a campaign that's healthy and on-track from
one that's about to miss its delivery target or burn through budget early. Users had
to build their own mental model of "normal" by cross-referencing numbers across
multiple campaigns.

## Design Goals
1. Give users an **at-a-glance triage view**: how many campaigns are healthy, how many
   need attention, how many are wrapping up soon, how many are waiting on approval.
2. Surface **per-campaign health and forecast signals** directly in the list, so users
   don't have to open each campaign to know if it's on track.
3. Go one step further than "here's the data" — provide a **recommendations rail** that
   translates signals into specific suggested actions, ranked by urgency.
4. Connect the dashboard to the rest of the app: selecting campaigns here should carry
   that context into the Ad Groups and Ads views.

## Key Design Decisions

### Stat-card summary row
Four cards across the top — **Active Campaigns**, **At Risk**, **Completing This
Week**, **Pending Approval** — give an immediate read on the health of the whole
portfolio before any scrolling. This frames the rest of the tab: "X campaigns need a
decision from you today."

### Health & Forecast columns in the campaign table
Rather than a separate "alerts" panel disconnected from the data, health and forecast
indicators were added as **columns in the same table** users already scan for names,
delivery status, and progress. Health and forecast are derived signals (not raw fields)
— computed from the underlying campaign data — so the table communicates *interpretation*,
not just numbers.

The table reuses the same configurable `PortalTableComponent` from Sponsored
Campaigns (Saved Views, density toggle, sticky columns), with a CI-specific column set
seeded as its default view — so the dashboard gets a tailored layout without
maintaining a separate table implementation.

### Recommendations rail
A dedicated right-hand rail surfaces specific, ranked suggestions — categorized as
**urgent**, **optimize**, or **explore** — each with a confidence indicator and
**Dismiss** / **Act** controls. This is the layer above "here's a chart": it's the
product taking a position on what the user should do next, while still leaving the
final call to them (dismissible, not automatic).

### Cross-tab selection
Selecting one or more campaigns updates the Ad Groups and Ads tabs to show *only*
items belonging to those campaigns, with the tab label and a removable selection badge
reflecting the active filter. This turns "I'm worried about these three campaigns"
into a filtered workspace across the whole app, rather than a one-off view.

## A Technical Note Worth Including
Early implementation hit a subtle but product-relevant bug: a layout grid
configuration caused an infinite re-render loop under certain conditions, which would
have manifested to users as a frozen or sluggish dashboard. Diagnosing and fixing this
is a good example of **design intent meeting implementation reality** — the fix
required no visual change, but was essential to the feature being usable at all.

## Outcome
A dashboard tab that goes from "data about campaigns" to "a prioritized worklist," with
a direct path from "what's wrong" (stat cards / health column) → "what should I do about
it" (recommendations rail) → "let me focus on just these" (cross-tab filtering).

## What This Demonstrates
- Designing **information hierarchy for triage**, not just display.
- Turning **derived/interpreted signals** (health, forecast) into first-class UI
  elements alongside raw data.
- Designing a **recommendation surface** that's actionable but not prescriptive
  (dismissible suggestions, confidence levels).
- **Cross-view interaction design** — selection state that has consequences beyond
  the component it lives in.
- Comfort working close enough to implementation to catch issues that affect
  real-world usability, not just visual design.
