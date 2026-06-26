---
title: "Dual-Mode Design Token System"
summary: "A theming and accessibility audit that fixed dark-mode contrast failures and consolidated a one-off status badge into the shared, token-driven design system."
tags: ["Design Tokens", "Accessibility", "Theming"]
product: "Intouch Ant Live Portal"
---

# Case Study: Theming & Accessibility Audit — Building a Dual-Mode Design Token System

## Context
Intouch Ant Live Portal supports both light and dark themes, toggled globally and
persisted per user. The light theme was designed first and matured over many
components; dark mode was added afterward by layering theme-aware tokens on top. As the
component library grew — tables, badges, progress indicators, dropdowns — dark mode
coverage became inconsistent: some components had full dark variants, others had none
at all.

## The Problem
A recurring failure pattern emerged: components built with **hardcoded hex colors**
(`color: #08204c`, `background: #ebebf2`, etc.) looked correct in light mode and were
either invisible, low-contrast, or jarring in dark mode — because nothing about them
*responded* to the theme. These bugs are easy to miss in design review (mockups are
usually reviewed in light mode) and easy to miss in QA (dark mode is often the
"secondary" pass).

Two concrete examples surfaced during this project:

1. **Progress-bar percentage text** in the campaign table used a hardcoded dark navy
   (`#08204c`) for its label. In dark mode, that text sat on a dark surface and was
   nearly unreadable — a contrast failure on a metric users specifically rely on
   (delivery progress).
2. **Campaign status badges** ("Running," "Paused," "Needs Attention," etc.) were a
   bespoke component with a hand-rolled map of background/text colors per status and
   *zero* dark-mode handling — every status badge in the product would have rendered
   with light-mode colors regardless of theme.

## Design Goals
1. Establish a **token taxonomy** that any new component can adopt, so "does this work
   in dark mode?" becomes a checklist item, not a redesign.
2. Fix the two contrast failures above as concrete, shippable proof points.
3. Where a component had drifted from the shared system (the status badge), evaluate
   whether to patch it locally or **consolidate it into the shared, token-driven
   component** — and make that call explicitly rather than by default.

## Key Design Decisions

### Scoped CSS custom-property tokens
The table component defines its own scoped token set (`--pt-text-primary`,
`--pt-bg-surface`, `--pt-border-row`, `--pt-brand`, etc.) with a light-mode block and a
`[data-theme='dark']` override block sitting side-by-side in the same file — making it
trivial to audit "does every token have a dark counterpart?" at a glance, and ensuring
sub-components (rows, cells, dropdowns) inherit consistent values regardless of
encapsulation boundaries.

### Fixing the progress-bar contrast bug
The percentage label was switched from a hardcoded hex value to `var(--text-primary)` —
a *global* token already defined for both themes (`#08204c` light / `#e2eaf5` dark).
Because the token already existed app-wide, the fix was a one-line change with full
theme coverage, rather than inventing a new dark-mode-specific color.

### Consolidating the status badge into the shared badge system
Rather than patch the bespoke status-badge component with a second color map for dark
mode (doubling the maintenance surface), it was **re-implemented on top of the shared
`app-badge` component** — which already has light *and* dark variants for every
semantic color (`success`, `warning`, `info`, `neutral`, etc.) via a `subtle` style.
Each campaign status was mapped to the closest semantic color (e.g., *Running* →
success, *Needs Attention* → warning, *Paused/Ended/Draft* → neutral), so:

- Every status badge across Sponsored Campaigns, Ad Groups, and the Dashboard
  automatically inherited dark-mode support.
- The badge's visual language (pill shape, weight, spacing) became consistent with
  every *other* badge in the product (tab counts, selection indicators, etc.).
- One bespoke color map was deleted entirely.

### Tradeoff made explicitly
This consolidation changed the badges' shape (from a rectangular tag to a rounded
pill) and removed a fixed minimum width — a visible design change across every table
in the product. That tradeoff (consistency + dark-mode coverage vs. a shape change to
an established pattern) was surfaced and decided on deliberately rather than
discovered after shipping.

## Outcome
- Two concrete dark-mode contrast bugs fixed.
- One component family (status badges) folded into the shared design system, reducing
  future maintenance and guaranteeing theme parity going forward.
- A reusable pattern (scoped token block with paired light/dark sections) that other
  components can copy.

## What This Demonstrates
- **Systemic thinking about theming**, not just spot-fixing colors.
- Ability to spot **when a one-off component should be retired** in favor of the
  design system, and to make that tradeoff visible rather than silent.
- Practical experience with **CSS custom property architecture** for scalable,
  themeable component libraries.
- An eye for **accessibility/contrast issues** that don't show up in light-mode-only
  reviews.
