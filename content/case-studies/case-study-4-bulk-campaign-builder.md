---
title: "Bulk Campaign Builder"
summary: "A spreadsheet-style bulk editor for dozens of campaigns at once, balancing power-user density with sticky orientation cues and the product's existing patterns."
tags: ["Power-User Tools", "Interaction Design", "Data Grids"]
product: "Intouch Ant Live Portal"
---

# Case Study: Designing Dense Editing Surfaces — The Bulk Campaign Builder

## Context
Creating or editing campaigns one at a time doesn't scale for media buyers managing
large portfolios — they often need to adjust budgets, schedules, or targeting across
dozens of campaigns or ad groups at once. The **Bulk Campaign Builder** is a
spreadsheet-style interface for exactly that: a dense, editable table where each row is
a campaign and each column is an editable field.

## The Problem
Spreadsheet-like interfaces are powerful but easy to get wrong in a browser:

- With many columns, users lose track of **which row** they're editing once they scroll
  horizontally.
- Dense tables can feel like "just a spreadsheet" with none of the product's visual
  identity or affordances (selection state, status, validation).
- Users need to know **when there's more content to scroll to** — a table that simply
  cuts off at the viewport edge with no visual cue leaves users unsure whether they're
  seeing everything.

## Design Goals
1. Keep **identity columns** (selection checkbox, campaign name) visible at all times,
   regardless of horizontal scroll position.
2. Make it **visually obvious** when there's more content off-screen, without resorting
   to obtrusive scroll arrows or pagination that would break the "spreadsheet" mental
   model.
3. Reuse the **selection and bulk-action patterns** already established elsewhere in
   the product, so this feels like the same app, not a separate tool bolted on.

## Key Design Decisions

### Sticky checkbox + name columns
The leftmost checkbox column and the campaign-name column remain pinned while the rest
of the row's fields scroll horizontally beneath them. This means a user can scroll all
the way to a "Total Ad Spend" column on the far right and still see *exactly* which
campaign that value belongs to — critical for a bulk-edit context where mistakes are
costly (editing the wrong row's budget, for example).

### Scroll-shadow affordance
Rather than a hard visual cutoff at the edge of the sticky columns, a subtle gradient
"shadow" overlay indicates that content continues underneath/beyond — a lightweight,
ambient cue that doesn't compete with the data itself, similar to the affordance
pattern used in many native spreadsheet and data-grid tools.

### Shared selection model
Row selection, the bulk-action bar, and "select all results" behavior were built on the
*same* underlying patterns as the read-only campaign tables elsewhere in the product —
so a user who's learned how selection works in Sponsored Campaigns doesn't have to
re-learn it here, even though this surface is fundamentally an editing tool rather than
a browsing one.

## Design Tension Worth Highlighting
Dense editing tables sit at the intersection of **"powerful tool for experts"** and
**"consistent with the rest of the product."** Pure spreadsheet conventions (e.g.,
borderless cells, minimal chrome) optimize for raw editing speed; product conventions
(branded selection states, consistent badges/buttons) optimize for learnability and
brand cohesion. The sticky-column + scroll-shadow approach was chosen specifically
because it adds *spreadsheet-grade* usability (anchoring, scroll affordance) without
abandoning the product's visual language — a middle path between "looks like Excel" and
"looks like everything else in the app, badly suited to bulk editing."

## Outcome
A bulk-editing surface that supports wide, many-column campaign data while keeping
users oriented (sticky identity columns), aware of off-screen content (scroll shadow),
and within familiar interaction patterns (shared selection/bulk-action model).

## What This Demonstrates
- Designing for **expert/power-user workflows** without sacrificing product
  consistency.
- Solving **orientation problems in dense, scrollable UI** — a common but
  under-addressed challenge in enterprise tools.
- Recognizing and naming a **design tension** (spreadsheet conventions vs. product
  conventions) and choosing a deliberate middle ground rather than defaulting to one
  extreme.
- **Pattern reuse across contexts** — applying a read-oriented selection model to an
  edit-oriented surface without friction.
