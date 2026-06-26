---
title: "Intouch Live — Retail Media Network Platform"
summary: "A unified platform that replaced 4+ fragmented legacy systems for retailers managing digital signage advertising networks, reducing creative approval time by 40%."
tags: ["Product Design", "Enterprise UX", "Design Systems", "Retail Media"]
product: "Intouch Live (TBS)"
---

# Intouch Live — Designing a Unified Retail Media Network Platform

## Context

Retailers managing digital signage across multiple store locations relied on a fragmented, disconnected set of tools to run their advertising networks. Spreadsheets, email threads, and legacy systems were stitched together to handle operations that demanded precision and speed.

Intouch Live is a retail media network platform designed to replace all of that with a single, cohesive product. As Lead Product Designer from 2021 to present, I led the UX and design system work end to end — from early discovery through component-level execution.

## The Problem

Retailers were relying on outdated tools — spreadsheets, emails, and disconnected systems — to manage complex screen-based advertising operations.

The core pain points:

- **No unified platform** for managing screen networks and physical locations
- **No efficient way** to create or schedule targeted campaigns
- **No centralized workflow** for creative review and approval
- **No real-time visibility** into screen health or campaign performance

Operations teams were context-switching constantly, and errors were frequent because there was no single source of truth.

## Design Strategy

The UX strategy centered on four goals:

1. **Minimize cognitive load** through clear layouts and persistent status indicators
2. **Handle complexity** using progressive disclosure and editable data tables
3. **Enable collaboration** through structured approval workflows and a notifications center
4. **Ensure visibility** via dashboards and real-time health signals

A modular, component-based approach was essential — not just for scalability across the product, but to support a small design team working across multiple surfaces simultaneously.

## What I Designed

### Campaign Management
End-to-end campaign scheduling flow with visibility into timing, site availability, and assigned creatives. Designed for media planners who need to book campaigns across dozens of retail locations simultaneously.

### Targeting Profiles
A reusable profile builder combining site rules, screen types, and audience segments. What used to require coordination across systems was reduced to a configurable, saved template.

### Creative Review & Approval
Centralized approval workflows with version control and inline commenting — replacing email chains with a structured, trackable process.

### Media Network Browser
Browse and filter screens by location, status, or type. Built for operations and technical teams who need a ground-level view of the network.

### Notifications Center
A centralized inbox for approvals, alerts, and campaign status changes — making it possible for different user types (planners, retailers, technicians) to stay coordinated without constant check-ins.

### Network Health Dashboard
Surface-level visibility into offline or underperforming screens, with status tags and color coding designed for quick decision-making under time pressure.

## The DIESL Design System

Running alongside the product work, I built DIESL — the design system powering every surface of Intouch Live. Built on an 8-point grid with a 12-column layout and 8px baseline, DIESL standardized spacing, typography (Poppins for web, SF for iOS, Roboto for Android), and icon usage (Feather icon library) across the entire platform.

A design system at this scale isn't just a component library — it's a shared language between design and engineering. DIESL reduced design-to-development handoff friction significantly and made it possible for a lean team to ship features faster without consistency breaking down.

## UX Decisions Worth Noting

- **Designed for multiple user types**: media planners, retailers, and technicians use the same platform differently. We used role-aware defaults and progressive disclosure to prevent cognitive overload for each persona.
- **Smart defaults over manual configuration**: recurring patterns were pre-configured where possible, so users weren't starting from scratch on every campaign.
- **Modular tables with bulk actions**: sorting, filtering, and bulk operations were critical for power users managing large networks.
- **Status-first design**: color coding and status tags were applied consistently so users could parse the state of any item at a glance.

## Results

The platform launched in pilot with measurable results:

- **Replaced 4+ legacy systems** with one cohesive platform
- **40% reduction in creative approval time**
- **Improved campaign scheduling accuracy** and reduced errors from cross-system handoffs
- **Scalable design system** reused across all modules, reducing build time for new features

## What I Learned

Designing for complexity means making powerful tools feel simple without hiding the complexity users actually need. The hardest part of this project wasn't designing individual screens — it was understanding how different user types move through the same system with completely different mental models, and making sure the design served all of them without compromising any one experience.
