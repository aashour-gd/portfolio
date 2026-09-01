---
title: "Retail OS — Modular Retail Platform"
summary: "A modular omnichannel platform for grocery retailers, piloted on a 78-year-old wholesaler with zero digital presence."
tags: ["Product Design", "UX Strategy", "Design Systems", "Retail Media"]
product: "Retail OS"
---

# Retail OS — Modular Retail Platform

![Retail OS — one modular platform across storefront and retail media](/images/retail-os-before-gomla.png)
*Retail OS — one modular platform, from the consumer storefront to the retail-media dashboard, sharing a single design system.*

## Problem

Gomla Market has run 30+ grocery branches across Egypt since 1948, and today it has no cart, no app, no loyalty program — just a static site and a WhatsApp number. McKinsey's 2026 MENA grocery survey found that shoppers who try Q-commerce apps and go back to buying offline cite high prices, poor UX, and limited range — not slow delivery. So the real problem wasn't "Gomla needs an app." It was: how does a physically-scaled, digitally-absent retailer get online without copying the exact playbook that's already losing shoppers.

## Role

Solo, end-to-end. I ran this as a self-directed product design project — strategy, research, UX, and design system work — using Gomla as a real pilot and Spinneys Egypt as a second retailer, brought in specifically to pressure-test whether anything I designed would actually survive a change of brand. I scoped it as 12 sprints inside a hard 2–4 week window, closer to how a lean team gets forced to prioritize than an open-ended side project.

## The Hard Decision

The obvious move was to chase Talabat Mart's 20–30 minute delivery. I didn't. The research said the churn problem is price, UX, and assortment — not speed — so I built the strategy around what Gomla actually has (30+ existing branches) instead of a delivery war it can't win, fulfilling from branches instead of building dark stores it doesn't need. The harder call was inside Retail Media: the campaign builder's audience targeting is deliberately locked until a retailer's loyalty data is mature enough to target reliably — shown, not hidden, with the actual reason attached. It's a less impressive-looking MVP than "we do everything Amazon Ads does." I chose it anyway, because targeting without enough loyalty data isn't precision, it's a guess wearing a dashboard.

![Advanced targeting stays visibly locked until loyalty data can actually support it](/images/retail-os-audience-gate.png)
*The campaign builder's audience step — locked, not hidden, with the real reason shown.*

## What I Built

A four-sided platform — customer, retailer, store, brand — sharing one design system, built around a Weekly Basket feature that turned out to be a real gap, not just a nice idea: reordering and personalization were unconfirmed for every competitor I researched, including well-funded ones. Retail Media got the same fidelity as the consumer app — a full campaign builder, sponsored placements built into the actual product cards shoppers see, and a measurement dashboard that visibly flags which numbers it can trust and which it can't yet. Store Operations and Retail Admin stayed at wireframe depth on purpose: enough to prove the operational thinking (substitution rules, fulfillment queue) without spending the whole timeline polishing screens nobody's hiring me to ship.

![Weekly Basket — the flagship feature](/images/retail-os-weekly-basket.png)
*Weekly Basket, with partial availability shown honestly rather than glossed over.*

![Closed-loop measurement dashboard](/images/retail-os-measurement.png)
*Every metric flagged by confidence, not just totals.*

## Result

There's no real launch, so there are no real metrics — every number in this project is labeled a hypothesis, not a fact, because I'd rather say that plainly than fake a dashboard. What I can actually show: the same core consumer screens, reconfigured for Spinneys Egypt using only color, type, and content swaps — no component was rebuilt. That's the checkable proof this is a platform, not a Gomla-shaped app pretending to scale.

![Same core, different retailer — Gomla and Spinneys Egypt side by side](/images/retail-os-gomla-vs-spinneys.png)
*Same design system, same components, different brand — the actual scalability proof.*

## What I Learned

The hard part was never a single screen — it was resisting the urge to polish every surface equally and instead tiering fidelity the way a real team is forced to. A senior portfolio piece isn't the one with the most screens finished. It's the one where every screen that *isn't* fully finished has a reason you can say out loud.
