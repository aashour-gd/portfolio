---
product: "Nexa"
title: "Campaign intelligence: turning a PRD into a scoring model"
slug: campaign-intelligence-and-alerts
summary: A spec asked for campaign alerts. Two of the four requested alert families were impossible
  with the data that exists — so I said so, then built a health-scoring model for the two that
  weren't.
project: Retail Media Network Portal
tags: [product design, data modelling, adtech, product thinking]
cover: /images/nexa-ads-intelligence-dashboard.jpg
---

# Campaign intelligence: turning a PRD into a scoring model

> Part of the [Retail Media Network Portal](/case-studies/retail-media-network-portal) project.

## What was asked for

A PRD landed for a *Campaign Warnings & Alert Notification Center*. Nine deliverables, condensed:

1. One alert-evaluation service writing typed alerts
2. **Delivery** alerts — under/over-delivery against the expected daily plan, configurable deviation
3. **Creative** alerts — rejected, pending, undeliverable
4. **Performance** alerts — low correlation between impressions and attributed sales
5. A per-campaign recommendations-and-alerts column in both products' listings
6. A centralized Warnings & Alerts Center
7. Per-alert actions: Fix It, Refresh, Report Issue
8. Report Issue → an automatic support ticket carrying campaign context
9. A feature flag, since this changes shared components across both products

## The first thing I built was an inventory of what was impossible

Before writing any code, I wrote the portal-side reading of the PRD: what it asks for, what this
codebase can support today, and what it cannot support at any amount of effort. Three annotations —
`// observed` for facts pulled from the code, `❓` for open questions, `[BLOCKED]` for things
requiring something outside the portal to exist first.

**What already existed** (so I built on it rather than beside it): a health signal in the campaign
listings, per-ad creative status in both vocabularies (`processed`/`failed` on the retailer side,
`approved`/`in-review`/`rejected` on the advertiser side), a toast service with actions, badges and
modals, feature-flag infrastructure, and the new semantic status tokens for severity.

**What was missing, and mattered:**

- **No notifications system at all.** The header bell was decorative — a hardcoded count of 3, no
  panel, no store, no data.
- **No expected daily delivery plan.** Campaigns carry start date, end date, impressions, spend and
  a progress figure — but that progress is *network receipt progress* (how far ads have propagated
  to their screens), not delivery pacing. There was no per-day target and no pacing curve.
- **No sales-attribution data.** No service, no field, not even a mock. The page that would own it
  was a placeholder route.
- **No shared campaign store.** Every listing page owned a private array of campaigns. Nothing
  aggregated across pages, let alone across products — and an alerts center in the retailer product
  that reports on advertiser campaigns needs exactly that layer.

So of the four requested alert families: **delivery** and **creative** were buildable — delivery
only after inventing the daily plan the model lacked. **Performance** (impressions-to-sales
correlation) was blocked on data that does not exist anywhere in the system, and predictive alerting
was explicitly out of scope. Reporting that up front turned a feature that would have quietly
shipped two-thirds done into one with an honest, defined scope — and it named the two upstream
dependencies as work someone else has to do.

## From alerts to a scoring model

The PRD asked for alerts. Alerts answer *"what is wrong with this campaign?"* — but the question an
operator actually opens the portal with is *"which campaigns should I look at first?"* A list of
alerts doesn't rank; a score does.

So the service produces both: a **0–100 health score** with three weighted components, plus the
typed alerts that explain it.

![Campaign intelligence dashboard — score, bands, forecast, risk, recommendations](/images/nexa-ads-intelligence-dashboard.jpg)

### Pacing — measured against the elapsed flight, not the total

A campaign can be perfectly on track for its total target and badly paced *today*. Pacing is scored
against the expected plan for the days elapsed:

```ts
private pacingScore(c: AlertCampaign): number {
  const expected = c.expectedDailyImpressions * c.elapsedDays;
  if (expected <= 0) return 100;              // hasn't started — nothing is wrong with it
  const ratio = c.impressionsToDate / expected;
  if (ratio <= 1) return clamp(ratio * 100);  // under-delivery scores linearly
  return clamp(100 - (ratio - 1) * 100 * 0.5); // over-delivery penalised at half rate
}
```

Three judgments in nine lines, and each is a product decision rather than a formula:

- **Under-delivery is linear.** At 42% of plan you have delivered 42% of what you sold. There's no
  need to editorialize.
- **Over-delivery is a milder fault, so it's penalised at half rate.** It still spends the budget
  early and risks going dark before the flight ends — but the impressions were served. Treating it
  as symmetrical with under-delivery would rank a campaign that over-delivered alongside one that
  didn't deliver, and operators would learn to distrust the score.
- **A campaign that hasn't started scores 100, not 0.** The absence of delivery before the start
  date isn't a problem, and a scoring model that flags it teaches people to ignore it.

### Creative — the share of ads that can actually serve

```ts
private creativeScore(c: AlertCampaign): number {
  if (c.totalAds <= 0) return 100;
  const blocked = c.rejectedCreatives + c.pendingCreatives * 0.5;
  return clamp(((c.totalAds - blocked) / c.totalAds) * 100);
}
```

A rejected creative is a hard zero for its ad — it will never serve as-is. A pending one counts as
half: temporarily blocked, not refused. The half-weight is the difference between "this campaign is
broken" and "this campaign is waiting", which is the difference between an alert someone acts on and
an alert someone mutes.

### Reach, and the renormalisation that keeps the score honest

Not every campaign records a reach figure. The naive handling — treat a missing component as zero —
silently caps a perfectly healthy campaign at 85. So when reach is absent, the remaining weights
renormalise:

```ts
const divisor = reach === null ? HEALTH_WEIGHTS.pacing + HEALTH_WEIGHTS.creative : 1;
```

Dropping a component must not look like failing it. This is the kind of detail that decides whether
people trust a score enough to sort by it.

Alongside the score: a **forecast** (plan-rate recovery across the remaining days, flagged at risk
below 95% rather than 100%, since a rounding-margin shortfall isn't news) and **risk flags**
(underpacing, overpacing, low reach, creative-blocked) that say what *kind* of trouble a campaign is
in without requiring the reader to interpret the number.

## Surfacing it in four places, with one rule each

**The listing column** — health and open alerts inline, so triage happens before anything is
opened.

![Campaign listing with health and alerts](/images/nexa-live-campaign-listing.jpg)

**The Warnings & Alerts Center** — every alert across both products, filterable by severity, in the
retailer product only. It's the operator's queue, and it's the one view that legitimately spans
advertisers.

![Warnings & Alerts Center](/images/nexa-live-alerts-center.jpg)

**The notification panel and inbox** — the header bell, which the PRD found decorative. Read rows
stay in the inbox: a notification list that hides what you've read can't show you the same problem
tomorrow, and these conditions don't resolve because someone glanced at them. Muting and snoozing
exist for that instead.

![Notification panel](/images/nexa-notification-panel.jpg)

**The advertiser dashboard** — the same intelligence, scoped to one advertiser and sorted
worst-health-first, with recommendations rendered as buttons rather than as a text column so the
alert and the thing that fixes it sit together.

## The alert that was right for one audience and wrong for the other

Every alert carries a recommended action and a Fix It route. The creative alerts pointed both
audiences at the retailer's review queue — correct for the operator, impossible for the advertiser,
who doesn't review their own creatives and doesn't have that page. Fixing it meant making the
wording *and* the destination flip with the product; the full story is in
[the two-sided architecture case study](/case-studies/two-sided-product-architecture).

## What I'd change

**Invent the daily plan earlier.** Pacing is the most useful signal in the system and it depended on
a field the campaign model didn't have. Adding it was small; discovering that it was missing halfway
through designing the scoring model was not.

**Make the weights configurable sooner.** They're constants today. The PRD asked for a configurable
deviation threshold, and the first real operator conversation will ask for weights too — different
retailers care about pacing and creative readiness in different proportions.

**Keep writing down what can't be built.** The blocked-alert inventory was the highest-leverage part
of this work. It's also the part that would have been easiest to skip in favour of shipping
something that looked complete.
