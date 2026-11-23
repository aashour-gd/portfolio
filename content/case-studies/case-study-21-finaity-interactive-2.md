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

I did this on my own, as a side project: the product thinking, the interface, the design system and the front-end build. No client, no team, and no users yet. Scroll, and watch one number get built.

```story
{
  "start": { "label": "Balance", "amount": 26000 },
  "title": "Safe to spend today",
  "ledger": [
    { "id": "bills", "label": "Bills due before next income", "amount": 2500, "detail": "Rent, phone, internet. A bill is not a choice. (Sample data.)" },
    { "id": "cards", "label": "Owed on cards", "amount": 8800, "detail": "A card purchase counts on the day I buy. Paying the card is a transfer. (Sample data.)" }
  ],
  "plan": { "label": "Plans would ask for", "amount": 18000, "warning": "Keeping every plan would leave you 3,300 short." },
  "rates": [
    { "text": "Rate typed by you" },
    { "text": "Source and date shown" },
    { "text": "Missing rate: total marked incomplete", "tone": "warn" }
  ],
  "audit": { "labels": ["Blocker", "Major", "Minor"], "first": [6, 6, 6], "latest": [0, 3, 4], "note": "Design-system audit, 13 rules, four runs. [Refresh at publish.]" },
  "chapters": [
    {
      "kicker": "01 · Problem",
      "title": "A balance is not an answer.",
      "body": [
        "My money is in too many places. Several banks, a wallet or two, cash, a credit card, and more than one currency. Every finance app I tried assumed one currency and one bank, or showed me a balance that ignored the rent due on Thursday.",
        "The question I actually ask each morning is simple: **what can I safely spend today?** A balance is what you have. Safe to spend is what you have, minus what is already spoken for."
      ],
      "scene": { "lines": 0 }
    },
    {
      "kicker": "02 · Hard decision",
      "title": "A number you cannot check is a number you will not trust.",
      "body": [
        "I made safe-to-spend the hero figure and made it open up. Tap it and every line behind it appears: the money you can spend, the bills due before your next income, and what you owe on cards. Nothing is hidden in the sum.",
        "Hover a line on the right to see what is behind it."
      ],
      "scene": { "lines": 1, "focus": "bills" }
    },
    {
      "kicker": "03 · What counts",
      "title": "Every line has to earn its place.",
      "body": [
        "Moves between my own accounts are not spending, but a fee on the move is. A credit card purchase counts on the day I buy; paying the card is a transfer.",
        "Exchange rates follow the same rule. I never replace a rate you typed without your approval, and I do not scrape a search page for rates. Each rate carries its source and date, and a missing rate marks the total as incomplete instead of guessing. **The cost is some manual upkeep.** In a money app, a quiet wrong number costs more than a visible gap."
      ],
      "scene": { "lines": 2, "focus": "cards", "rates": true }
    },
    {
      "kicker": "04 · The cost",
      "title": "A bill is not a choice. A plan is.",
      "body": [
        "My first version took savings plans off the figure as well. A steep plan, a laptop to buy in four months, turned the whole number into a red shortfall while there was plenty of money in hand. It looked precise and it was unhelpful: it answered \"can I keep every plan on track?\" when I had asked \"can I spend today?\".",
        "So I split them. The main figure takes off bills and card balances only, and what the plans would ask for sits on its own line beside it, with a warning. **The cost is real:** the main figure can look more generous than my plans allow, and a reader has to look one line further to see that. I accepted it because the first number now answers the question that was asked."
      ],
      "scene": { "lines": 2, "plan": true }
    },
    {
      "kicker": "05 · What I built",
      "title": "An exact money model and a system around it.",
      "body": [
        "**An exact money model.** Amounts are whole units of the smallest coin, so nothing drifts through rounding. Every transaction keeps its own currency, and a total converts using the rate in force that day.",
        "**A design system built with my own method.** Tokens in three layers, a 4px grid, a fixed type scale, one icon weight, light and dark as modes, and logical direction so right-to-left works by default. Notice the stage switching mode."
      ],
      "scene": { "lines": 2, "light": true }
    },
    {
      "kicker": "06 · Proof",
      "title": "Nothing is done without evidence.",
      "body": [
        "This is a prototype, built over about [10 days], with no users yet. What I can show is what I measured. I ran my design-system audit against 13 rules four times: the first run found 6 Blocker, 6 Major and 6 Minor issues, and the latest found 0, 3 and 4 [refresh at publish].",
        "I also worked out the figures by hand and checked the app against them. With sample data, 26,000 minus 2,500 minus 8,800 is 14,700.00, and the app agreed.",
        "**What is not proven:** a real phone, browsers other than Chromium, a screen reader, Arabic, the live rate feed, real bank statements, and real users. I list these on purpose."
      ],
      "scene": { "lines": 2, "audit": true, "stamp": true }
    },
    {
      "kicker": "07 · Learning",
      "title": "The digits are the content.",
      "body": [
        "I chose the spacing of the big numbers by theory: tighter looks more refined. Then I looked at specimens, and at 48px two neighbouring digits merged into one shape.",
        "The evidence changed my decision, so I now test type on the real digits before I set it. In a money app, **a number that reads wrongly is a bug.**"
      ],
      "scene": { "lines": 2, "digits": true }
    }
  ],
  "caption": "Sample data. The figure on the right is a live component, not a screenshot."
}
```
