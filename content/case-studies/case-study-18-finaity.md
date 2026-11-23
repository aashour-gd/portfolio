---
title: "Finaity: a money app where every number can be checked"
slug: finaity
year: 2026
product: "Finaity"
summary: "A multi-currency personal-finance product. One number answers \"what can I spend today?\", and every line behind it can be checked."
tags: [Fintech, Personal Finance, Multi-currency, Design Systems]
cover: /images/finaity-cover.png
order: 1.5
---

# Finaity: a money app where every number can be checked

| | |
|---|---|
| **Role** | Solo: product, design, design system, front end |
| **Type** | Self-initiated product |
| **Status** | Prototype, on-device — no users yet |

## Problem

My money is in too many places. Several banks, a wallet or two, cash, a credit card, and more than one currency. Every finance app I tried assumed one currency and one bank, or showed me a balance that ignored the rent due on Thursday. The question I actually ask each morning is simple: what can I safely spend today?

A balance cannot answer that. A balance is what you have. Safe to spend is what you have, minus what is already spoken for. And if the app cannot show how it got that number, I will not trust it, so I will keep doing the sum in my head.

## Role

I did this on my own, as a side project: the product thinking, the interface, the design system and the front-end build. No client, no team, and no users yet.

## Hard Decision

**A number you cannot check is a number you will not trust.**

I made safe-to-spend the hero figure and made it open up. Tap it and every line behind it appears: the money you can spend, the bills due before your next income, and what you owe on cards. Nothing is hidden in the sum.

Then I had to decide what a plan is. My first version took savings plans off the figure as well. A steep plan, a laptop to buy in four months, turned the whole number into a red shortfall while there was plenty of money in hand. It looked precise and it was unhelpful, because it answered "can I keep every plan on track?" when I had asked "can I spend today?".

So I split them. A bill is not a choice. A plan is. The main figure takes off bills and card balances only, and what the plans would ask for sits on its own line beside it, with a warning if keeping every plan would leave me short. The cost is real: the main figure can look more generous than my plans allow, and a reader has to look one line further to see that. I accepted it because the first number now answers the question that was asked.

The same rule shaped exchange rates. I never replace a rate you typed without your approval. I do not scrape a search page for rates. Each rate carries its source and date, and a missing rate marks the total as incomplete instead of guessing. The cost is some manual upkeep. In a money app, a quiet wrong number costs more than a visible gap.

## What I Built

**An exact money model.** Amounts are whole units of the smallest coin, so nothing drifts through rounding. Every transaction keeps its own currency, and a total converts using the rate in force that day. Moves between my own accounts are not spending, but a fee on the move is. A credit card purchase counts on the day I buy; paying the card is a transfer.

**Safe to spend, with a runway.** The hero figure sits above a track that runs from the last income to the next one. Today is marked, each bill is a dot you can hover or tap for its name, date and amount, and the breakdown lists every line.

**A design system built with my own method.** Tokens in three layers (raw values, meaning, component), a 4px grid, a fixed type scale, one icon weight, light and dark as modes, and logical direction so right-to-left works by default. Big figures use a display cut of the typeface, with the currency and decimals set quieter than the digits.

**A KPI card I redesigned twice.** I started from a detailed spec, built it, and found it bulky. The final card puts the icon and title on one row and moves the explanation into an info popover, which cut the card height by about a third.

Process: Frame, Model, Decide, Build, Prove, Ship. Every decision is a written record with its cost, and nothing is marked done without evidence in a proof log.

> **Visuals — to add.** Hero with the runway tooltip open (light and dark); safe-to-spend breakdown open; KPI cards before and after; Decision Record cards for plans and exchange rates; a 20-second screen recording.

## Result

This is a prototype, built over about 10 days, with no users yet. What I can show is what I measured.

- **Audit.** I ran my design-system audit against 13 rules four times. The first run found 6 Blocker, 6 Major and 6 Minor issues. The latest run found 0 Blocker, 3 Major and 4 Minor.
- **Correctness.** I worked out the figures by hand and checked the app against them. With sample data, safe to spend came out as 26,000 minus 2,500 minus 8,800, which is 14,700.00, and the commitments page showed the overdue, going-out and coming-in totals I had calculated.
- **Tests.** 182 unit tests and 20+ browser suites pass, including a rule that payments every 28 days fall exactly 13 times in any 364 days.
- **Access.** 0 of 241 controls were under 44px on a phone, and the checked pages passed an automated accessibility scan in light and dark.
- **What is not proven.** A real phone, browsers other than Chromium, a screen reader, Arabic, the live rate feed, real bank statements, and real users. I list these on purpose.

> **To add.** One period of real use with my own accounts, and what the app got wrong.

## Learning

I chose the spacing of the big numbers by theory: tighter looks more refined. Then I looked at specimens, and at 48px two neighbouring digits merged into one shape. The evidence changed my decision, so I now test type on the real digits before I set it. In a money app the digits are the content, and a number that reads wrongly is a bug.
