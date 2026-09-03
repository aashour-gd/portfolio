---
product: "Nexa"
title: "Two-sided product architecture: one codebase, two audiences"
slug: two-sided-product-architecture
summary: How a retail media portal serves the retailer and the advertiser from one Angular codebase
  — what's shared, what deliberately diverges, and the two scoping bugs that proved the boundary
  was real.
project: Retail Media Network Portal
tags: [front-end architecture, product design, multi-tenant SaaS]
cover: /images/nexa-select-product.jpg
---

# Two-sided product architecture

> Part of the [Retail Media Network Portal](/case-studies/retail-media-network-portal) project.

## The situation

A retail media network has two customers who never appear on the same screen.

The **retailer** owns the physical inventory — screens in stores, in-store audio — and operates the
network. The **advertiser** buys into that inventory. They work on the same campaigns, the same
creatives, and the same targeting data, from opposite ends of the same transaction.

The portal already served the retailer. It needed to serve advertisers too, without becoming two
apps that drift apart.

![Product switcher](/images/nexa-select-product.jpg)

## The decision that shaped everything

Three options, and the middle one is the trap.

**Fork the app.** Fastest to start, and every shared change becomes two changes forever. About 80%
of the surface is the same nouns — campaigns, ad groups, ads, creatives, targeting profiles,
budgets, flight dates — so forking duplicates the overwhelming majority of the work to isolate the
minority that differs.

**One set of pages with conditionals.** `@if (isAds()) { … } @else { … }` scattered through
templates. Indistinguishable from the right answer for about three weeks, then unreadable — and
worse, the differences stop being visible as decisions. They become accidents of whoever last
edited the template.

**Share the primitives, separate the screens.** What I chose. Both products compose the same table,
drawer, modal, form and badge components, and read the same domain services. But the pages are
separate, the routes are separate, and anywhere behaviour differs, the difference is stated once,
explicitly, in a place you can point at.

## What that looks like in practice

Shared, one implementation: **45 UI components**, **15 domain services**, the theme token set, and
the table conventions (sorting, pagination, column visibility, CSV export).

Divergent, on purpose:

| | Retailer | Advertiser |
|---|---|---|
| Campaign types | Sponsored, House, Event-triggered, Takeover | Standard, Event-triggered, Takeover |
| Creative review | Reviews submissions | Submits and waits |
| Data scope | All advertisers in the tenant | One advertiser |
| Navigation | Full network + platform admin | Media, campaigns, targeting, admin |

The campaign-type difference is a good example of divergence that *looks* cosmetic and isn't. The
retailer's "Sponsored" type is defined as *the retailer* running a paid campaign funded by a brand
or agency. In the advertiser's product, the actor is the advertiser spending their own budget — the
same word names the wrong party. And with no House type on the advertiser side, there's nothing for
"Sponsored" to contrast against. So it's **Standard** there. One word, decided once, because the
alternative is a portal that quietly misdescribes who is paying.

## The boundary: which product am I in?

The most consequential piece of architecture is also one of the smallest — a service that answers
*"which product is this session looking at?"* from the route prefix:

```ts
readonly current = computed<ProductId>(() => {
  const url = this.url() ?? '';
  if (url.startsWith('/nexa-ads'))   return 'ads';
  if (url.startsWith('/nexa-spark')) return 'spark';
  if (url.startsWith('/platform'))   return 'platform';
  return 'live';
});

/** The advertiser product is the one used *as* an advertiser, so it is the one scope that narrows. */
readonly isAds = computed(() => this.current() === 'ads');
```

It exists because I got it wrong first, and the way it was wrong is the whole point.

## Bug one: the scope that always returned somebody

Advertiser scoping was originally derived from "who are we acting as?" — the acting-advertiser
signal. That reads like the right question. It isn't.

That accessor **always returns somebody**: it falls back to the tenant's first active advertiser so
the advertiser product always has an identity to render. So it can tell you *who* the advertiser
would be — never *whether* you are in the advertiser product at all.

Reading it directly put every product on the advertiser-scoped branch. The consequence landed in
the retailer's notification bell: it was scoped down to one advertiser's problems, and the
retailer's own notification groups — their review queue, their uploads — became unreachable. The
operator of the network could not see the network's notifications.

The fix separates the two questions permanently. **Product identity comes from the URL; actor
identity comes from session state.** Both the notification service and the intelligence dashboard
now derive scope from the same source, and the reasoning is written into the code so the next person
— me, six weeks later — doesn't collapse them again:

```ts
/**
 * Non-null only in the advertiser product, where the session acts as exactly one advertiser.
 *
 * Gated on the *product*, not on `actingAdvertiser()` alone: that always returns somebody, so
 * reading it by itself put every product on the advertiser-scoped branch.
 */
private readonly actingAdvertiserId = computed(() =>
  this.product.isAds() ? (this.advertisers.actingAdvertiser()?.id ?? null) : null,
);
```

## Bug two: advice that was correct for one side and nonsense for the other

A creative alert told advertisers to *"review the pending creatives in Media Review"* — and its
**Fix It** button routed them there.

Media Review is the retailer's approval queue. Advertisers don't review their own creatives; that's
the entire point of the review step. They don't even have that page in their navigation. So the
alert gave one audience correct instructions and the other an impossible one, then sent them to a
route that isn't in their sidebar.

![Media Review — the retailer's queue](/images/nexa-live-media-review.jpg)

Both creative alerts now flip their wording *and* their destination with the platform:

| | Retailer | Advertiser |
|---|---|---|
| **Pending** | "Review the pending creatives in Media Review." | "Approval sits with the retailer — the ad starts serving once it clears. Track the status in the Creative Library." |
| **Rejected** | "Replace the creative or resubmit it for review." | "Upload a replacement creative in the Creative Library and resubmit it for review." |
| **Fix It →** | The review queue | Their own creative library |

![The advertiser's creative library — where their Fix It now lands](/images/nexa-ads-creative-library.jpg)

It's a five-line change. What matters is that it was *findable*: the two sides are modelled as
genuinely different, so "which side is this advice for?" is a question the code can be asked. In a
forked codebase this would have been two separate bugs, discovered separately. In a fully-shared one
it would have been invisible — a single string that reads fine to whoever wrote it.

## What I'd keep, and what I'd change

**Keep:** deriving product identity from the URL. It's cheap, it's stateless, it survives refreshes
and deep links, and it can't disagree with what the user is looking at.

**Keep:** writing the reasoning next to the code. Both bugs above came from a plausible-looking
shortcut. A comment explaining why the obvious thing is wrong is the only durable fix.

**Change:** I'd introduce the product-identity service *before* the second product, not during it.
Every place that needed it had already grown its own prefix check by the time it existed, and
consolidating them was a bigger diff than writing it once would have been.

**Watch:** the divergence table is load-bearing documentation. It's the thing that tells you whether
a new difference is a decision or a mistake — and it only stays useful if it's updated the day the
difference is introduced.
