---
title: "Flexible Data Tables for Enterprise Retail Media Operations"
subtitle: "One table, three teams, three different jobs — designing a table that adapts instead of multiplying."
tags: [Product Design, Enterprise UX, Design Systems, Data Tables]
project: "Retail Media Network Portal"
---

> Part of the [Retail Media Network Portal](https://aashour.com/case-studies/retail-media-network-portal) project.

![The campaign table — saved views, column management, density control and sticky columns](/images/nexa-tables-hero.png)
*The final campaign table: saved views, column management, density control and sticky columns, all from one shared component.*

## At a glance

| | |
|---|---|
| **My role** | Solo — UX, interaction design, and front-end implementation |
| **Users** | Operations, Finance, and Performance teams |
| **Built with** | Angular, the shared `PortalTableComponent`, design tokens, Storybook |
| **Used in** | Sponsored Campaigns, Ad Groups, Campaign Intelligence |

---

## The Problem

In a retail media platform, the campaign table is where most of the day actually happens. And three teams open the same table to do three completely different jobs.

**Operations** wants to know: is this campaign delivering, on schedule, in the right locations?
**Finance** wants budget, spend, and revenue.
**Performance** wants impressions, CTR, and conversions.

One table, one dataset, three mental models. The default answer to this is to keep adding columns until everyone's data is technically there. That works until the table is 30 columns wide, the campaign name scrolls off-screen, and every team spends the first minute of every session hunting for the five columns they actually care about.

![One dataset, three teams with different needs](/images/nexa-tables-problem.png)

## My Role

I owned this end-to-end — the UX, the interaction design, and the front-end implementation of the shared table component — working with a domain expert who answered business-rule questions about what each team actually needs to see. That combination mattered here: most of the interesting problems in a data table live in the gap between the mockup and the browser.

## The Insight

The problem was never that users needed *more* columns. They needed the *right* columns — and "right" changed depending on who was looking.

[CONFIRM: one or two sentences on where this came from — e.g. "Watching Operations and Finance use the same screen made it obvious: each team was scrolling past most of the table to reach their five columns." Replace with what actually happened.]

## The Hard Decision

The obvious move was three tables: an Operations table, a Finance table, a Performance table. Each one clean, each one tuned for its audience. It's easy to design, easy to demo, and it would have looked great in a review.

I didn't build it that way. Three tables means three components to maintain, three sets of bugs, and a hard-coded opinion about what each role needs — which breaks the first time a Finance user needs one Performance column. And the next screen that needs a table would have started that argument all over again.

So I built one table framework with four controls instead: **saved views, column management, density, and sticky columns.** The trade-off is real — a configurable table asks more of the user up front than a pre-tuned one. The answer was strong defaults: every view opens in a sensible state, and configuration is there when someone needs it, not something they have to do before they can work.

![The four parts of the framework: views, columns, density, sticky columns](/images/nexa-tables-framework.png)

## What I Built

### Saved views

Users shape the table once and get back to that shape in one click. A view captures which columns are visible, their order, and the density — so "my Finance setup" is a dropdown choice, not five minutes of rearranging every morning.

![Saved views dropdown with custom views and active state](/images/nexa-tables-saved-views.png)

### Column management

A drawer for showing, hiding, and reordering columns, with a reset that always gets you back to a known state. The reset matters more than it looks: people only experiment with a configurable UI when they trust they can undo it.

![Column management drawer — default, reordered, hidden and reset states](/images/nexa-tables-columns.png)

### Density control

Two densities — **Comfortable (56px rows)** and **Compact (48px rows)**. Operations scanning delivery status benefits from breathing room; someone reconciling spend across dozens of campaigns wants as many rows on screen as possible. Two modes, not three: a third option would have been a choice nobody could explain the difference of.

![Comfortable vs Compact density](/images/nexa-tables-density.png)

### Sticky columns

On a wide table, the first thing to scroll out of view is the campaign name — the one column that tells you what you're looking at. Sticky columns keep identity anchored while the data scrolls, so a user at column 14 still knows which campaign column 14 belongs to.

![Before and after — campaign name lost vs kept in view](/images/nexa-tables-sticky.png)

## The Bug That Only Exists in the Browser

The moment sticky columns and horizontal scrolling went in, the column and view dropdowns broke. Menus opened and got cut off at the edge of the table — half a dropdown, with no way to reach the options underneath.

The cause was structural, not visual: the table's scroll container used `overflow: hidden` to make horizontal scrolling and sticky columns work, and any dropdown rendered *inside* that container got clipped by it. Nudging z-index wouldn't fix it — nothing inside a clipped container can escape it.

[CONFIRM: describe the actual fix — e.g. "The fix was to render menus in an overlay layer outside the scroll container, so they position against the viewport instead of the table." Edit to match what you did.]

This is the kind of problem a static mockup never shows you. The design was right; it just didn't survive contact with the layout engine until I understood why.

![Clipped dropdown → root cause → fixed](/images/nexa-tables-overflow-bug.png)

## Built as a System, Not a Screen

All of this lives in one shared component, `PortalTableComponent`, rather than being rebuilt per page:

```
PortalTableComponent
├ Views
├ Columns
├ Density
├ Sorting
├ Filters
├ Pagination
├ Bulk Actions
└ Sticky Columns
```

Some consistency can't be delivered by a component — only by a rule. So the table also carries written conventions: identifier columns are labelled `ID`, left-aligned, and never number-formatted (so ID `12345` never renders as `12,345`), and every table defaults to newest-first before the first render, not after the first click.

The result is that the same table now runs **Sponsored Campaigns, Ad Groups, and Campaign Intelligence** — three different screens, one component, one set of behaviors to learn.

![The same component across Sponsored Campaigns, Ad Groups and Campaign Intelligence](/images/nexa-tables-adoption.png)

## The Result

- **One table component** behind three product surfaces, instead of three separate tables to build and maintain.
- **Every new table screen starts from a finished framework** — views, columns, density and sticky columns come for free.
- **Users configure the table once** and get back to their setup in one click, instead of rearranging it every session.

[CONFIRM: add any real outcome you can stand behind — feedback from Ops or Finance, fewer "can you add a column" requests, time to build a new table screen. If you don't have one, delete this line; the three points above are honest as they are.]

## What I Learned

Enterprise users don't want a simpler interface. They want an interface that fits *their* job — and in a product used by three teams, that means building something that can bend without breaking.

The best enterprise experiences aren't built by creating more interfaces. They're built by creating more adaptable ones.
