# CityDal v2: I fixed the flows that stopped people, in both apps

Status: DRAFT v0.3, 22 Nov 2026. Updated with Ahmed's answers (sole designer and builder, peer feedback, the v1 problem list, review time, map and daily-use points). Written by Claude from the v2 build, for Ahmed to rewrite in his own voice. Publishes under Case Studies on aashour.com. [BRACKETS] need Ahmed. No number below is invented; the ones that are targets, not measurements, say so.

## At a glance
| | |
|---|---|
| Project | CityDal v2: a redesign and live prototype of both CityDal apps (customer and Business), based on my own 2023 design |
| Role | Product design, interaction design and the front-end prototype. No one built it with me. |
| Year | 2026 (v1 shipped in 2023) |
| Market | Qatar, with full Arabic and RTL |
| Scope | Customer app, Business app, shared design system, dark mode, English and Arabic |
| Status | Live prototype at citydal-v2.vercel.app. Not a shipped product. |

## Problem
CityDal v1 shipped in 2023 and was discontinued by the client after about six months. Lately, while reviewing the app, I found areas I could improve: in the flows, in the visuals, and a few new ideas of my own. The flows were what stopped people most:

**For customers**
- Some flows were incomplete and left people stuck.
- Booking was a dull form with nothing to tell you where you were.
- Places and deals lived apart: from a deal you could not get to the place, and from a place you could not see its deals.
- There was no map view where you could see all the places at once.

**For business owners**
- No logo, and no photos at the first setup. A new business appeared as an empty page.
- Adding a business got no quick answer. Owners waited without knowing for how long.
- Chat was thin on both sides.

The question I set myself: what would it take for a business owner to publish a good-looking page, in either language, in a few minutes, on a phone, and for a customer to go from "what's near me" to "booked" without a dead end?

## Role
I redesigned both apps and built them as a working prototype, so every claim can be tried and not just looked at. No one built it with me. Before I started, I asked friends who are developers and designers to review the old app. Their feedback was direct: it felt outdated visually, and people now expect screens that are more interactive and get to the point. I rebuilt the look and the flows around that. This is a self-initiated redesign of my own earlier work, and I label it that way.

## Hard Decision: two languages, written by the owner, never translated by me
The easy path was a "translate" button. I did not take it, for three reasons.
- A machine translation of a bakery's description is wrong in small ways the owner cannot check, and it is published under their name.
- Auto-translation would have hidden the real work. The owner would never learn that half their customers read a different language.
- It breaks quietly. A wrong Arabic price word or a wrong dish name reads as carelessness.

So each business field has a language switch: the owner writes it in their main language, and adds the other version if they want to. If they only write one, customers in the other language still see it, in the language it was written in. Nothing is guessed. A small dot on each language tab shows what is filled in.

What it cost: the owner has to type more, and some pages will be single-language. I judged that an honest single-language page is better than a confidently wrong bilingual one.

## What I Built
Each v1 problem got a specific answer.

| v1 problem | What v2 does |
|---|---|
| Incomplete flows | Every flow ends in a clear state: booking ends in a confirmation and a ticket, onboarding ends in a review screen, and a "finish your page" checklist shows what is still missing. |
| Boring booking | Three numbered steps (date, time, optional note), a floating bar that shows the price and the chosen slot, and a ticket with a QR code. Booking in v2 is easier, and the steps tell you where you are. |
| Places and deals not linked | A place page lists its available deals, and a deal page links back to its place. Place and deal use one card family so they feel like one thing. |
| No map view of all places | Nearby now has a List and Map toggle, so all the places can be seen on one map, and every place page has a "Show on map" button. |
| No logo or photos for the business | Step 4 of onboarding is Photos: a logo, up to six photos (the first is the cover), and photos per service. They show in the business home and on the customer-facing page. |
| No quick answer after adding a business | A review step at the end and a pending state that sets expectations: a new business is reviewed within a week at most. [The prototype does not yet say this on the pending screen.] |
| Chat was weak | Chat has All and Unread filters with counts, unread rows that stand out, voice notes, suggested questions for first messages, and a "view place" link. The business sees the same thread. |

Beyond the fixes:

**A Business app that matches the customer app.** Same tokens, cards, fields, chips and list pattern. While building I measured the two apps side by side and found drift in page margins, card radius and list design. I fixed it to one standard: 20px gutters on feed pages, 16px on tab pages, one 24px card radius, one chat-row design.

**Bilingual fields everywhere the owner writes:** business name and description, services, and deals, through one shared component.

**A phone keyboard inside the prototype.** On a laptop, a simulated English or Arabic keyboard appears when a field is focused, so a reviewer sees the real mobile moment. I also removed web-only cues (scrollbars, text selection) so it reads as an app.

**A demo business.** One tap loads a complete business (bakery, services, deals, bookings, reviews, a chat), so any screen can be shown with realistic data.

## Process strip
| Phase | Artifact that exists |
|---|---|
| Frame | CityDal v2 Plan (goal, scope, what stays from v1) |
| Model | Flow map for both apps; the business data model for two languages |
| Decide | Theme brief and decision notes [CONFIRM names]; the no-auto-translate decision |
| Build | A working Next.js prototype with both apps, Arabic/RTL and dark mode |
| Prove | Imhotep design-system audits (18 and 19 Nov 2026); a side-by-side comparison of both apps; peer feedback from developer and designer friends |
| Ship | Live at citydal-v2.vercel.app |

## Result
Interim and honest.
- A live prototype of both apps that anyone can open and use, with every v1 problem above answered by a specific screen.
- Both apps share one design system, with the margin and radius drift found and fixed.
- Everything works in English, Arabic (RTL) and dark mode.
- CityDal is now an app a person can lean on every day to check the places, events and deals around them.
- Review time for a new business is set at a week at most [TARGET, not a measurement].

## What is not proven
- Whether owners actually write both languages. I believe they will if it takes under a minute; I have not tested that.
- Whether customers prefer a mixed-language page to a single-language one.
- No usability test with real business owners or real customers; the feedback came from developer and designer friends.
- Whether the one-week review time can be met in operation. It is a design target.
- The prototype uses sample places and sample data and does not connect to real businesses.

## Learning
I started by treating the Business app as the "other" app and ended up treating it as the first one to fix. The customer app can only be as good as the pages owners publish, and those are written on a phone, by someone busy, in a hurry. Designing for that person changed what I built more than any customer screen did.

## Footer bio line
Ahmed Ashour is a Senior Product Designer with 10+ years across SaaS, mobile and e-commerce. This case study is published on aashour.com.
