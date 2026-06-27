# Ahmed Ashour — Claude Working Context
**Last updated:** June 2026  
**Purpose:** Load this file at the start of every session so Claude has complete context on who Ahmed is, what we're building, what decisions have already been made, and how to work with him effectively.

---

## 1. Who Is Ahmed

**Name:** Ahmed Ashour  
**Current title:** Senior Product Designer / Head of UX  
**Current employer:** Intouch, El Gouna, Egypt (Aug 2020 – Present)  
**Experience:** 10+ years across SaaS, OTT/entertainment, e-commerce, B2B/B2C  
**Education:** Bachelor's in Electronics & Communications Engineering, Cairo University (2014)  
**Location:** El Gouna, Red Sea, Egypt  
**Open to:** Senior & Lead Product Designer roles in Saudi Arabia, Gulf region, Egypt, and remote-first European companies

**Contact / Links:**  
- Email: aashour.gd@gmail.com  
- Phone: +20 102 8010 352  
- LinkedIn: linkedin.com/in/aashour-gd/  
- Portfolio: portfolio-aa-shour.vercel.app (new) / aashour.myportfolio.com (old baseline)  
- GitHub: aashour-gd/portfolio

---

## 2. The Core Brand Promise

> **"Ahmed makes complex products feel simple — powered by an engineering mind and a designer's soul."**

This is the north star for all content. Every headline, bullet, case study, and post should serve this idea.

---

## 3. Key Differentiators (Never Bury These)

1. **Engineering-trained designer** — ECE degree from Cairo University. Thinks in constraints, edge cases, and systems architecture before pixels. This is the #1 differentiator to foreground, especially for developer-collaboration-heavy roles.
2. **True versatility** — Has done research, systems design, UI craft, strategy, and team leadership — not just claimed them.
3. **0→1 builder** — Built core products from scratch under real startup pressure at Intouch and earlier.
4. **Design systems authority** — Deep Figma expertise: Variables, Dev Mode, Auto Layout, component libraries. Proven at Intouch where he co-led the design system that reduced handoff time and UI bugs.
5. **Cross-functional operator** — Worked directly with PMs, engineers, and executives. Delivered across 3 major markets.

---

## 4. Career Timeline

| Period | Role | Company | Notes |
|--------|------|---------|-------|
| Aug 2020 – Present | Senior Product Designer (Head of UX) | Intouch, El Gouna | Primary current role |
| Feb 2020 – Oct 2021 | Freelance Senior UX/UI Designer | Nodens, Cairo | Concurrent with Inmobly exit period |
| Aug 2013 – Aug 2020 | Senior UX/UI Designer | Inmobly, Cairo | 7-year tenure |
| Feb 2016 – Oct 2019 | UX/UI Designer | Smardex, Cairo | Concurrent with Inmobly (freelance/part-time) |

**Note on overlapping dates:** Nodens (Feb 2020–Oct 2021) and Smardex (Feb 2016–Oct 2019) are freelance/concurrent roles. This must always be clearly labeled on the CV to avoid appearing inconsistent.

---

## 5. Quantified Achievements

- **+40% user retention** — from cross-functional feature launches at Intouch
- **3 core digital products** — designed and led development, enabling operations across 3 major markets
- **Intouch Live Design System (2025)** — co-built using Figma Variables, reduced handoff friction and UI bugs
- **AFIF child safety app** — full design ownership, freelance, launched on Google Play (2023), ethical design decision to prioritize child transparency over parent secrecy
- **10+ years** of consistent senior-level work with no gaps

---

## 6. Skills Inventory

**Primary Tool:** Figma (expert — Variables, Dev Mode, Auto Layout, component libraries)  
**Other Design Tools:** Sketch, Balsamiq, Zeplin, Notion, Adobe XD  
**Visual & Motion:** Photoshop, Illustrator, After Effects, Lightroom  
**UX Methods:** User Research, Journey Mapping, Wireframes, Interactive Prototyping, Design Systems  
**AI-Assisted Design:** Midjourney, AI prototyping tools, AI-assisted user research synthesis  
**Engineering Foundation:** Electronics & Communications Engineering — informs systems thinking, technical fluency, developer collaboration

---

## 7. The Three Hero Projects

These are the featured case studies for the portfolio and campaign. Never replace them without asking Ahmed.

### 7a. Intouch Live Design System (2025)
- **Type:** Design System, SaaS/OTT
- **Role:** Co-led with one other designer, reporting to CPO
- **Core tension:** Flexibility vs. consistency — building for a fast-scaling team across 3 markets
- **What was built:** Figma variables-based design system + component library
- **Result:** Faster handoff, fewer UI bugs
- **Case study accent color:** `#3B82F6` (blue)
- **Status:** Case study rewritten ✅

### 7b. AFIF Child Safety App (2023)
- **Type:** Mobile app (Android, Google Play), Freelance
- **Role:** Full design ownership (solo designer)
- **Core tension:** Hard ethical decision — transparency vs. secrecy. Designed so children *know* they are being monitored, rather than hiding it from them.
- **Result:** Launched on Google Play 2023
- **What makes it differentiated:** The ethical design decision is the lead, not the UI
- **Case study accent color:** `#52BC9A` (teal)
- **Status:** Case study rewritten ✅

### 7c. Geneina
- **Type:** TBD — needs case study briefing from Ahmed
- **Status:** Case study rewrite PENDING ⏳
- **Case study accent color:** TBD

---

## 8. Portfolio — Technical Spec

**Framework:** Next.js  
**Deployment:** Vercel (portfolio-aa-shour.vercel.app)  
**Development workflow:** Ahmed edits the portfolio via **Claude Code CLI** (Claude Code desktop). All code outputs should be formatted as paste-ready prompts or components for Claude Code CLI.  
**GitHub repo:** aashour-gd/portfolio

### Brand Colors
- Primary blue: `#1B4FD8`
- Accent blue: `#3B82F6`
- Background dark: `#0F172A`
- Text: white on dark backgrounds

### Avatar
Ahmed uses a **custom AI-generated illustrated avatar** (AA monogram style, brand blue palette). He does NOT use a personal photo anywhere in the portfolio. The avatar was built as `AnimatedAvatar.tsx` with:
- Mouse-tracking eye movement
- Float animation
- Random blinking
- **Status: built but not yet wired into the live portfolio** ⏳

### Portfolio Page Structure (Decided)
- **Landing page:** Three featured case study cards (AFIF, Intouch Design System, Geneina) — each links to a full case study
- **Work page:** Broader visual gallery (thumbnails, additional projects)
- **Case study pages:** Dynamic route at `app/case-studies/[slug]/page.tsx`

### Components Already Built
- `FeaturedCaseStudies.tsx` — two-column card layout, per-project accent colors, hover animations, stat panels
- `AnimatedAvatar.tsx` — mouse-tracking, float, blink (not yet wired in)
- Case study page template — hero with brand colors, cover image panel, white body, expandable deep-dive sections, decision callout box, screens grid, result stats, learning quote, next-project footer

---

## 9. CV — Current State

**Format strategy:**
- **DOCX** → for ATS submissions (job boards, email applications)
- **PDF** → for LinkedIn Featured section (preserves formatting)

**Structural decisions already made:**
- Engineering degree appears in subtitle line (not buried at the bottom)
- Subtitle: "Senior Product Designer · Head of UX · Electronics & Communications Engineer"
- Bullets follow **Impact → Action → Context** structure (never responsibility-first)
- AI-Assisted Design has its own skills row
- Figma primitives (Variables, Dev Mode, Auto Layout) named explicitly — not just "Figma"
- No duplicate bullets (old CV had verbatim identical bullets across Nodens and Smardex)
- Freelance/concurrent roles clearly labeled as such
- ATS-optimized keywords embedded throughout

**The CV has been fully rewritten as of June 2026.** The uploaded file in this session is the pre-campaign baseline. The rewritten DOCX is the live version.

---

## 10. LinkedIn — Current State

**Headline (decided):**  
`Senior Product Designer · Design Systems & Mobile UX · Open to opportunities in Saudi, Gulf & Remote Europe`

**About section:** Fully drafted. Opens with a big-picture belief statement, flows into what Ahmed does differently, closes with a CTA for hiring managers.

**Availability badge:** "Open to Senior & Lead design roles" (no geographic restriction on the badge — that goes in the headline)

**Content campaign:** 8-week LinkedIn content plan, story-driven posts recommended for algorithmic reach.

---

## 11. The Inbound Campaign — 8 Weeks

**Goal:** 5+ inbound job offers without actively applying  
**Strategy:** Be found, not found-out. LinkedIn optimization + portfolio discoverability + content visibility.

| Phase | Weeks | Focus | Status |
|-------|-------|-------|--------|
| 1 — Foundation | 1–2 | LinkedIn headline, About, case study rewrites, CV overhaul | ✅ Complete |
| 2 — Visibility Engine | 3–4 | LinkedIn content publishing, recruiter outreach | 🔄 In progress |
| 3 — Magnetic Presence | 5–6 | Deeper content, Dribbble/Behance presence | ⏳ Pending |
| 4 — Offer Conversion | 7–8 | Analytics review, informational calls, warm network activation | ⏳ Pending |

---

## 12. Voice & Tone Rules

### Ahmed's Voice Is:
- **Inspirational and visionary** — zooms out to the big picture before details
- **Casual-professional** — smart colleague, not press release
- **Warm and slightly witty** — doesn't take himself too seriously, takes his *work* seriously
- **Problem-first** — always leads with context, then process, then impact

### Writing Rules:
- First person, active voice: "I built", "we shipped", "I decided"
- Vary sentence length — punchy and layered, not uniform
- Lead with the problem, not the solution
- No buzzword stacking
- UX jargon used sparingly and naturally

### Never Write:
- "I am passionate about UX/design"
- "I am excited/thrilled/honored to share"
- "Results-driven" or "detail-oriented" as openers
- "Pixel-perfect" as a standalone claim
- "I helped the team" (vague contribution)
- "Synergizing cross-functional stakeholder alignment"

### Ahmed Would Say:
- "The real problem wasn't the UI — it was that nobody agreed on the model"
- "We shipped it. Then we learned."
- "Engineering taught me to ask: what breaks this?"
- "Design systems aren't about components. They're about decisions."

---

## 13. Case Study Structure (Always Use This)

Every portfolio case study follows exactly this six-part structure:

1. **Problem** — What was broken, unclear, or missing? Give human/business stakes.
2. **Role** — Specific. Not "I was the designer" but "I co-led this with one other designer while reporting to the CPO."
3. **Hard Decision** — The moment of real design judgment. What trade-off? What did you choose and why? This is the most important section — never skip or make it vague.
4. **What We Built** — Concise, specific, visual where possible.
5. **Result** — Quantified if possible. Honest if not.
6. **Learning** — One genuine insight. Not a platitude.

Target: 2–5 sentences per section.

---

## 14. LinkedIn Post Structure

**Format:** Hook → Story/Insight → Takeaway  
**Length:** 150–400 words  
**Formatting:** Line breaks after every 1–3 sentences  
**Hashtags:** 2–3 max, relevant only  
**Rule:** Never post about being "open to work" — post about *the work*

**Hook types that work for Ahmed:**
- A surprising constraint ("We had 2 weeks to build a design system. From scratch.")
- A belief he holds ("Most design feedback isn't about the design.")
- A story moment ("The PM said: just make it look good. I said: let me show you something first.")

---

## 15. Target Audience Personas

### Persona A: Startup Founder / CPO
- Hiring first or second design leader
- Cares about: Can this person own design end-to-end? Business partner thinking?
- Ahmed's angle: Engineering + 10 years of building = full-picture designer

### Persona B: FAANG / Large Tech Recruiter
- Scanning LinkedIn for keywords, portfolio links, metrics
- Cares about: Years of experience, quantified impact, design systems keywords
- Ahmed's angle: Proven track record, Figma Variables expert, 3 markets delivered

### Persona C: Growth-Stage Startup Hiring Manager (Series A–C)
- Needs someone to elevate UX fast while moving fast
- Cares about: Speed, quality, self-direction
- Ahmed's angle: He's done exactly this — Head of UX at a fast-scaling startup

**Default persona when unknown:** Persona C (growth-stage startup hiring manager)

---

## 16. Decisions That Are Final (Don't Re-debate)

- ✅ Inbound-only strategy — no active applying
- ✅ Engineering degree in subtitle (foregrounded, not buried)
- ✅ Illustrated avatar, not personal photo, on portfolio
- ✅ No superhero/bold personal branding visuals — risk of signaling junior-level for Gulf/European senior roles
- ✅ PDF for LinkedIn Featured, DOCX for ATS
- ✅ Case study walkthrough video first, career story video second (sequenced)
- ✅ Availability badge: "Open to Senior & Lead design roles" (no geo restriction)
- ✅ Featured case studies on landing page (not a thumbnail gallery)

---

## 17. Pending Work (As of June 2026)

**Portfolio:**
- [ ] Wire in `AnimatedAvatar.tsx` to the live portfolio
- [ ] Geneina case study — write brief with Ahmed, then rewrite using 6-part structure
- [ ] Finalize case study page routes in Next.js

**LinkedIn:**
- [ ] Publish Phase 2 content posts (story-driven, 1–2x per week)
- [ ] Begin recruiter outreach (direct messages, connection requests with personalized notes)

**Presence:**
- [ ] Dribbble/Behance setup (Phase 3)

**Video:**
- [ ] Case study walkthrough video (prioritized for near-term recruiter inbound)
- [ ] Career story video (longer-term brand building)

---

## 18. How to Work With Ahmed

- **He uses Claude Code CLI** for all portfolio development — always format code outputs as paste-ready components or CLI prompts
- **He iterates collaboratively** — expects Claude to hold context between tasks, flag decisions that contradict earlier choices, and remember what's been built
- **He's direct and decisive** — once a decision is made, don't re-surface it unless there's a strong reason
- **Communication style:** Smart, casual, slightly witty. Not corporate. Treat him like a sharp colleague, not a client
- **When in doubt about voice:** Read section 12 of this file and ask "would Ahmed actually say this to a hiring manager at a coffee meeting?"

---

## 19. What Claude Should Do at the Start of Every Session

1. Acknowledge this context file is loaded
2. Check if Ahmed mentions any new developments (new role, new portfolio update, new case study draft) and flag if they conflict with anything here
3. Ask what we're working on today — don't assume
4. If writing professional content: run the voice checklist from section 12 before finalizing
5. If writing code: confirm it's formatted as a Claude Code CLI prompt unless told otherwise
