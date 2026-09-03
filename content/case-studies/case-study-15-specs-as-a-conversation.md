---
product: "Nexa"
title: "Specs as a conversation, not a document"
slug: specs-as-a-conversation
summary: How I got business rules out of a domain expert's head using annotated living documents —
  and why the annotations mattered more than the prose.
project: Retail Media Network Portal
tags: [product management, requirements, process, documentation]
cover: /images/nexa-live-create-campaign.jpg
---

# Specs as a conversation, not a document

> Part of the [Retail Media Network Portal](/case-studies/retail-media-network-portal) project.

## The problem with building in someone else's domain

Retail media has rules that aren't guessable. Which campaign type can override another? Does a
house campaign have a budget? What does an ad group inherit from its campaign, and what can it
override? When an ad's creative is rejected, does the ad stop or does the campaign?

I was the one building it. Someone else knew the answers. The usual failure mode is obvious:
I make a reasonable-sounding assumption, build a week on top of it, demo it, and learn the rule was
different — and now the correction is expensive rather than free.

Writing a specification up front doesn't fix that. A blank spec asks the domain expert to volunteer
everything they know, unprompted, in the right order, before seeing anything. Nobody can do that.
What they *can* do is correct a wrong statement instantly.

So I stopped writing specs and started writing **claims to be corrected**.

## The three annotations

Each spec file uses exactly three markers, and the whole method is in them:

**`// observed`** — a fact pulled out of the existing code, stated plainly, for confirmation.

> `// observed:` Campaign → Ad Group → Ad (one campaign has many ad groups; one ad group has many ads).

This is the important one. It's not a question — it's a claim, sourced from what the code already
does, presented for correction. It's much easier to say "no, actually…" than to answer "how does the
hierarchy work?" from nothing.

**`❓`** — a genuine open question, answered inline, in the file.

> ❓ Is that the full hierarchy, or is there anything above Campaign?
> — *"The hierarchy that could be above the campaign is the campaign type: we have 4 types in the
> display section. In Audio we have 2 types only, Sponsored and House."*

**`[BLOCKED]`** — this cannot be built until something outside the portal exists. Not "hard", not
"later": blocked, with the dependency named.

Two rules keep it working. Answers are written **inline in the file**, not in chat, so the file
stays the single source of truth. And when the expert changes the file, they say *"apply the spec"* —
and I reconcile the code to match it. The document is never an archive of what we once agreed; it's
the live statement of how the product works.

## Where the method earned its keep

**A naming error nobody would have reported as a bug.** The retailer's campaign types were defined
in the spec table by the expert, in their own words: *Sponsored is "for the paid campaigns that this
retailer creates with budget for a specific agency, or by himself, to promote a deal with a brand or
agency."*

Read that definition next to the advertiser product and the problem is unmissable: in the advertiser
portal, the actor is the advertiser spending their own budget — so "Sponsored" names the wrong
party. And with no House type on the advertiser side, the word has nothing to contrast with. It
became **Standard** there.

That's not a bug anyone files. It's a word that would have looked fine forever, subtly
misdescribing who pays, and it surfaced only because the definition was written down in the
expert's language next to the implementation.

**Route inconsistencies, found by tabulating rather than by testing.** Writing out which campaign
lists have `/create`, `/bulk-builder` and `/:id/edit` showed five lists missing an edit route. Not a
bug today — those lists don't link to it — so it's recorded as an open question with the impact
stated, rather than fixed reflexively or ignored silently.

**Decisions get recorded where the rule lives.** When Takeover campaigns shipped and Sponsored was
renamed on the advertiser side, the change went into the spec in the same commit. The next person to
read the campaign rules reads the current ones.

![Campaign creation — the flow the campaign-logic spec defines](/images/nexa-live-create-campaign.jpg)

## The same pattern, pointed at design decisions

The network spec (physical sites, screens, screen tags) uses a variant: instead of claims to
correct, it offers **lettered options with a recommendation**, and the expert picks or overrides.

> **N2 — Single source of truth for placement targeting?**
> Today campaign placement dropdowns are mock lists unrelated to the Network pages.
> **(a)** *(recommended)* Yes — a new `NetworkService` becomes the source; campaign targeting reads
> real sites and tags from it.
> **(b)** Not yet — build Network standalone now; connect targeting later.
>
> **Answer:** (a) — targeting reads from the service.

Two properties matter here. There's always a **recommendation**, so silence is a usable answer —
leave it blank and the default applies, and the project doesn't stall on a question nobody felt
strongly about. And the options are written so the trade-off is legible to someone who doesn't read
code: "not yet" is a real choice with a stated cost, not a way of avoiding the question.

## The rest of the operating system

**A per-feature process, as templates.** Seven phases — intake, requirements, design-system audit,
Figma brief, design review, accessibility, handoff — each a template, with filled instances per
feature request stored by date and slug. Five requests have been run through it. Phase 3 is the one
I'd defend hardest: a *design system audit* that forces an explicit reuse-vs-new-component decision
before any design work, which is what stops a library from growing a second, accidental copy of
itself.

**Epics that leave the repo.** Larger pieces of work get an epic document with user stories and
acceptance criteria, plus a Jira-import CSV generated alongside it — so the same definition feeds
both the build and whatever tracker the wider team uses, without being retyped into a second shape.

**A coded backlog.** Every module has a short code — `cl` for creative library, `bcb` for the bulk
campaign builder, `tp` for targeting profiles — so a request can be `CL-1` instead of a paragraph
of description, and so a note written three weeks ago still resolves to a specific place in the
codebase.

## What I'd change

**Start the spec on day one, not at the first surprise.** The campaign-logic file exists because I
guessed wrong about inheritance and lost work. The method is cheap enough that there was no reason
to wait for the lesson.

**Timestamp the answers.** Some inline answers are months old and describe a product that has since
moved. `// observed` claims are self-correcting because I re-derive them from the code; the expert's
prose isn't, and there's no marker for "this answer might be stale."

**Separate open questions from settled ones.** The files grew into a mix of live questions and
resolved history, which makes them heavier to re-read than they need to be. The next version splits
"decided" from "still open" — the decision log stays, but it stops competing for attention with the
things that still need an answer.
