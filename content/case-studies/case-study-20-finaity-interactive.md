---
title: "Finaity: a money app where every number can be checked"
slug: finaity
year: 2026
product: Finaity
summary: "A multi-currency personal-finance product. One number answers what can I spend today, and every line behind it can be checked."
tags: [Fintech, Personal Finance, Multi-currency, Design Systems]
unlisted: true
---

| | |
|---|---|
| **Role** | Solo: product, design, design system, front end |
| **Timeline** | [10 days] |
| **Domain** | Personal finance, multi-currency |
| **Status** | Self-initiated prototype, on-device |

Try the number below. It opens up.

```safe-to-spend
{
  "label": "Safe to spend today",
  "whole": "14,700",
  "decimals": ".00",
  "lines": [
    { "label": "Money you can spend", "value": "26,000.00" },
    { "label": "Bills due before next income", "value": "− 2,500.00" },
    { "label": "Owed on cards", "value": "− 8,800.00" }
  ],
  "total": { "label": "Safe to spend", "value": "14,700.00" },
  "note": "Sample data. The same component as the prototype, not a screenshot."
}
```

## Problem

My money is in too many places. Several banks, a wallet or two, cash, a credit card, and more than one currency. Every finance app I tried assumed one currency and one bank, or showed me a balance that ignored the rent due on Thursday. The question I actually ask each morning is simple: what can I safely spend today?

A balance cannot answer that. A balance is what you have. Safe to spend is what you have, minus what is already spoken for. And if the app cannot show how it got that number, I will not trust it, so I will keep doing the sum in my head.

## Role

I did this on my own, as a side project: the product thinking, the interface, the design system and the front-end build. No client, no team, and no users yet.

## Hard Decision

**A number you cannot check is a number you will not trust.**

I made safe-to-spend the hero figure and made it open up. Tap it and every line behind it appears. Then I had to decide what a plan is. Pick an option below to see what each choice would have shown.

```decision
{
  "question": "Should a savings plan come off the main figure?",
  "intro": "Sample data: 14,700.00 to spend today, and a laptop plan that would ask for 18,000.",
  "options": [
    {
      "id": "a",
      "label": "Plans come off the figure too",
      "summary": "One number that includes everything I intend to do.",
      "figure": "−3,300.00",
      "figureNote": "A shortfall, while there is plenty of money in hand",
      "tone": "warn",
      "body": "It looked precise and it was unhelpful. It answered \"can I keep every plan on track?\" when I had asked \"can I spend today?\". This was my first version."
    },
    {
      "id": "b",
      "label": "Split bills from plans",
      "summary": "A bill is not a choice. A plan is. Show them on separate lines.",
      "figure": "14,700.00",
      "figureNote": "Plans would ask for 18,000. Keeping all of them leaves 3,300 short.",
      "tone": "ok",
      "body": "The first number now answers the question that was asked. What the plans would ask for sits beside it, with a warning when keeping every plan would leave me short."
    }
  ],
  "chosen": "b",
  "record": "Safe to spend takes off bills and card balances only. Plans are a separate line.",
  "cost": "The main figure can look more generous than my plans allow, and a reader has to look one line further to see that. I accepted it because the first number now answers the question that was asked."
}
```

The same rule shaped exchange rates. I never replace a rate you typed without your approval. I do not scrape a search page for rates. Each rate carries its source and date, and a missing rate marks the total as incomplete instead of guessing. The cost is some manual upkeep. In a money app, a quiet wrong number costs more than a visible gap.

## What I Built

```stage
{
  "caption": "Sample data. Scroll, or click a step.",
  "steps": [
    {
      "title": "An exact money model",
      "blurb": "Amounts are whole units of the smallest coin, so nothing drifts through rounding. Every transaction keeps its own currency.",
      "stage": {
        "kind": "table",
        "head": ["Stored", "Shown"],
        "rows": [["1250", "12.50"], ["1470000", "14,700.00"]],
        "chips": [
          { "text": "Rate typed by you · source and date shown" },
          { "text": "Missing rate: total marked incomplete", "tone": "warn" }
        ]
      }
    },
    {
      "title": "Safe to spend, with a runway",
      "blurb": "The hero figure sits above a track from the last income to the next. Each bill is a dot you can tap.",
      "stage": {
        "kind": "runway",
        "todayAt": 34,
        "bills": [
          { "name": "Rent", "due": "Due in 6 days", "amount": "1,800.00", "at": 48 },
          { "name": "Phone", "due": "Due in 12 days", "amount": "250.00", "at": 66 },
          { "name": "Internet", "due": "Due in 19 days", "amount": "450.00", "at": 84 }
        ]
      }
    },
    {
      "title": "A design system built with my own method",
      "blurb": "Three token layers, a 4px grid, one icon weight, light and dark as modes, and right-to-left by default.",
      "stage": {
        "kind": "table",
        "head": ["Layer", "Example"],
        "rows": [["Raw", "teal-700"], ["Meaning", "color.accent"], ["Component", "button.primary.bg"]]
      }
    },
    {
      "title": "A KPI card I redesigned twice",
      "blurb": "I built the detailed spec, found it bulky, and moved the explanation into an info popover.",
      "stage": {
        "kind": "text",
        "lines": [
          "Spec version: icon, title, figure and a paragraph of explanation.",
          "Compact version: icon and title on one row, explanation in an info popover. Cut the card height by about a third [refresh figure at publish]."
        ]
      }
    }
  ]
}
```

Process: Frame, Model, Decide, Build, Prove, Ship. Every decision is a written record with its cost, and nothing is marked done without evidence in a proof log.

## Result

This is a prototype, built over about [10 days], with no users yet. What I can show is what I measured.

- **Audit.** I ran my design-system audit against 13 rules four times. The first run found 6 Blocker, 6 Major and 6 Minor issues. The latest run found 0 Blocker, 3 Major and 4 Minor [refresh at publish].
- **Correctness.** I worked out the figures by hand and checked the app against them. With sample data, safe to spend came out as 26,000 minus 2,500 minus 8,800, which is 14,700.00.
- **Tests.** [182] unit tests and [20+] browser suites pass, including a rule that payments every 28 days fall exactly 13 times in any 364 days.
- **Access.** [0 of 241] controls were under 44px on a phone, and the checked pages passed an automated accessibility scan in light and dark.
- **What is not proven.** A real phone, browsers other than Chromium, a screen reader, Arabic, the live rate feed, real bank statements, and real users. I list these on purpose.

## Learning

I chose the spacing of the big numbers by theory: tighter looks more refined. Then I looked at specimens, and at 48px two neighbouring digits merged into one shape. The evidence changed my decision, so I now test type on the real digits before I set it. In a money app the digits are the content, and a number that reads wrongly is a bug.
