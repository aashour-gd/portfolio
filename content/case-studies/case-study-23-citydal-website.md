---
title: "CityDal website: a live prototype instead of a download button"
summary: "A website for an app that can no longer be installed: built around the live prototype, in English and Arabic, with no store buttons and no invented numbers."
tags: ["Web Design", "Landing Page", "Arabic / RTL", "Front-end"]
product: "CityDal"
cover: /assets/citydal-web/citydal-web-case-study-cover.webp
---

# CityDal website: a live prototype instead of a download button

![The CityDal website in English (light) and Arabic (dark): one page, the live prototype one tap away.](/assets/citydal-web/citydal-web-case-study-cover.webp)

## At a glance

| | |
|---|---|
| Project | The website and landing page for CityDal: a redesign of my own 2023 page, built around the v2 prototype |
| Role | Design, content structure and the front-end build. |
| Year | 2026 (the 2023 page was part of the original brand and product work) |
| Market | Qatar, with full Arabic and RTL |
| Scope | Home page and a Business page, each in English and Arabic, light and dark: four pages |
| Stack | Next.js, React, Tailwind, Phosphor icons, Plus Jakarta Sans and IBM Plex Sans Arabic |
| Status | Built and tested locally. Not deployed yet: this case study covers the design and the build. |

## Problem
The 2023 page had one job: get a stranger to download CityDal. Two things had changed. The app ran for about six months and was then discontinued by the client, so a page that says "download" points at something that is not there. And the page itself had problems I could see on rereading it: typos in the hero and the navigation, a rating line ("4.9 stars over 1.2k rated") that I cannot back with a real number, and contact details that belonged to the client.

The question I set myself: what should a page for an unknown app say, when the honest answer to "can I get it?" is "you can try it right now in your browser, but you cannot install it"?

## Role
I redesigned the page and built it, reusing the design system from the v2 apps: the same tokens, the same two typefaces, the same icon family, the same pillow radius. I also wrote the copy. The English and Arabic were written together, not translated from each other.

## Hard Decision: no store buttons, a live prototype instead
The easy path was to keep the App Store and Google Play buttons because every app landing page has them. I did not, for three reasons.
- They would be false. A visitor who taps one finds nothing to install.
- A broken promise on the first screen costs more than a modest honest one. The page is the first thing a hiring manager or a business owner sees of CityDal.
- The truth is a better offer than a badge. The prototype runs in the browser with sample data and needs no sign-up. That is something a visitor can do in ten seconds.

So the primary button is "Open the live prototype", the second one explains how booking works, and under them one line says what it is: it runs in your browser with sample data, no sign-up. The same went for the numbers. The rating line is gone, and so are the points card and the client's contact details.

What it cost: the page cannot say "download", so it loses the one call to action people recognise at a glance. I judged that a page that asks for a smaller thing and means it is better than one that asks for a bigger thing it cannot deliver.

## What I Built
**One page, two audiences.** The page leads with people. A switch in the hero, "For people" and "For businesses", changes the headline, the copy, the screens and the primary button. Businesses also get a section further down and their own `/business` page with the three steps: see your page and your numbers, publish a deal, confirm bookings.

![The Business section: three steps and the Business app screens.](/assets/citydal-web/citydal-web-business-section.webp)

*The Business section shows the real Business app: the dashboard, the publish-a-deal sheet with its English and Arabic tabs, and bookings with Confirm and Decline.*

**A hero that shows the app, and lets you steer it.** A phone shows the real home screen of the app. Four feature cards sit beside it (places near you, deals ending soon, ask before you go, your bookings). Tapping a card swaps the phone to that screen. I first put the live app inside the phone, then replaced it with screenshots of its screens, which load instantly and cannot break, and kept "Try it live" one tap away. On wide screens, small floating cards repeat what the phone shows.

![The hero in English, light: the headline, the four feature cards, the phone and the map behind it.](/assets/citydal-web/citydal-web-hero-en-light.webp)

**The app's own map as the background.** Behind the whole hero runs one wide map in the same style as the app: streets, a sea, a river, parks and pins. A route draws itself from pin to pin at a steady speed, holds a beat on arrival, then moves on to the next. It pauses when the hero is off screen and stops under reduced motion. I first built it from mirrored tiles, saw the repetition, and rebuilt it as one map with no repeats. A soft fade behind the text keeps the copy readable: measured text contrast over the map is at least 5.2:1 in light mode and 7.3:1 in dark mode.

![The hero in Arabic, dark: the page mirrored, the map and the route behind the phone.](/assets/citydal-web/citydal-web-hero-ar-dark.webp)

*The Arabic page is the English page mirrored, not translated strings: reading order, the phone, the feature cards and the nav all flip. The map does not flip, because a street map has no reading direction.*

**Proof blocks with real screens.** Three sections (find what is around you, book in three steps, ask before you go) each show the actual v2 screens, not icons.

![Find what is around you: home, the Nearby map and deals.](/assets/citydal-web/citydal-web-features.webp)

![Book in three steps: pick a day and time, add a note, confirm.](/assets/citydal-web/citydal-web-book.webp)

**A FAQ that works from the keyboard,** built on the native details element, with answers rewritten to match what the prototype really does.

**The small things the 2023 page got wrong:** the typos, the unverified rating, the client's contact details. All gone.

![The page on a phone: the hero, then the feature tiles and the phone.](/assets/citydal-web/citydal-web-mobile-pair.webp)

## Process strip
- **Frame:** read the three 2023 designs and listed what was false, missing or unclear.
- **Model:** one page, two audiences; the same tokens and components as the app.
- **Decide:** no store buttons; the live prototype as the offer; Arabic as a mirrored layout.
- **Build:** the hero first, approved, then the sections, the Business page and the FAQ.
- **Prove:** an audit against my design-system rules, sixteen runs (four pages, light and dark, desktop and phone width).
- **Ship:** not deployed yet. The site is built and tested locally, and this case study is the record of it.

## Result
Interim and honest.
- A four-page website, in English and Arabic, light and dark, that I can open and use locally.
- Zero text contrast failures across the sixteen audit runs. The lowest ratio on any text was 5.39:1 before the map, 5.2:1 over it.
- Two touch-target problems found (the logo link and the language toggle were under 44px on a phone) and fixed. A re-run found none.
- The page makes no claim it cannot back: no rating, no store badge, no client contact, no usage number.


## What is not proven
- Lighthouse and Core Web Vitals were not measured, because the site is not deployed yet.
- No screen reader pass and no full keyboard walk-through beyond focus rings.
- Tested in Chrome only. Not on iOS Safari or a real phone.
- Open Graph preview images were checked by eye, not in a link-preview tool.
- Whether visitors take the prototype over a store badge is untested. I have no traffic or conversion number, and I am not going to make one up.
- The map's weight on a low-end phone has not been tested.

## Learning
A landing page for an unknown product has to give a stranger one reason to try it and one reason for a business to join, and every other section competes with those two.

## Footer bio line
Ahmed Ashour is a Senior Product Designer with 10+ years across SaaS, mobile and e-commerce. This case study is published on aashour.com.
