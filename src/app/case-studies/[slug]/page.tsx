import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ExpandableSection from "@/components/case-studies/expandable-section";
import CoverImage from "@/components/case-studies/cover-image";
import {
  getRichCaseStudy,
  getRichCaseStudySlugs,
  type CaseStudy,
} from "@/lib/case-studies";

export function generateStaticParams() {
  return getRichCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getRichCaseStudy(slug);
  if (!cs) return {};
  return {
    title: `${cs.title} — Case Study`,
    description: cs.hook,
  };
}

// ─── Section wrapper ────────────────────────────────────────────────────────────

function SectionLabel({
  number,
  text,
  color,
}: {
  number: string;
  text: string;
  color: string;
}) {
  return (
    <p
      className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-4"
      style={{ color }}
    >
      {number} — {text}
    </p>
  );
}

// ─── Screen card ────────────────────────────────────────────────────────────────

function ScreenCard({
  screen,
  accent,
}: {
  screen: CaseStudy["sections"]["built"]["screens"][number];
  accent: string;
}) {
  return (
    <div
      className="rounded-xl overflow-hidden border"
      style={{ borderColor: "#1E293B", background: "#111827" }}
    >
      <div
        className="relative"
        style={{ minHeight: "180px", background: `${accent}10` }}
      >
        <CoverImage src={screen.placeholder} alt={screen.title} accent={accent} />
      </div>
      <div className="p-3.5" style={{ borderTop: "1px solid #1E293B" }}>
        <p className="text-sm font-semibold mb-1" style={{ color: "#F1F5F9" }}>{screen.title}</p>
        <p className="text-xs leading-relaxed" style={{ color: "#64748B" }}>
          {screen.caption}
        </p>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────────

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getRichCaseStudy(slug);
  if (!cs) notFound();

  const { brand, sections } = cs;

  return (
    <div className="min-h-screen" style={{ background: "#fff" }}>

      {/* ─── 1. Sticky Nav ──────────────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{
          background: `${brand.bg}F0`,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderColor: `${brand.accent}20`,
        }}
      >
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-medium transition-opacity duration-200 hover:opacity-70"
            style={{ color: brand.accent }}
          >
            <ArrowLeft size={15} />
            Back to case studies
          </Link>

          {/* Chips — hidden on mobile */}
          <div className="hidden md:flex items-center gap-2">
            {[cs.category, cs.type, cs.year].map((chip) => (
              <span
                key={chip}
                className="px-2.5 py-1 rounded-full text-[11px] font-medium"
                style={{
                  border: `1px solid ${brand.accent}40`,
                  color: brand.accent,
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </nav>

      {/* ─── 2. Hero ────────────────────────────────────────────────────────── */}
      <section
        className="pt-16 pb-14 lg:pt-20 lg:pb-16"
        style={{ background: brand.bg }}
      >
        <div className="max-w-5xl mx-auto px-6">
          {/* Eyebrow */}
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-5"
            style={{ color: brand.accent }}
          >
            {cs.subtitle}
          </p>

          {/* Title */}
          <h1
            className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] tracking-tight mb-6"
            style={{ color: brand.text }}
          >
            {cs.title}
          </h1>

          {/* Hook */}
          <p
            className="text-lg italic leading-[1.7] mb-10"
            style={{ color: brand.accentLight, maxWidth: "600px" }}
          >
            {cs.hook}
          </p>

          {/* Stats row */}
          <div
            className="flex flex-wrap items-start gap-8 pt-8"
            style={{ borderTop: `1px solid ${brand.accent}30` }}
          >
            {cs.stats.map((stat, i) => (
              <div key={stat.label} className="flex items-start gap-8">
                {i > 0 && (
                  <div
                    className="w-px h-8 shrink-0 hidden sm:block"
                    style={{ background: `${brand.accent}25` }}
                  />
                )}
                <div>
                  <p
                    className="text-2xl font-bold leading-none mb-1"
                    style={{ color: brand.accent }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-[11px] uppercase tracking-[0.12em]"
                    style={{ color: `${brand.text}70` }}
                  >
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. Cover Images ────────────────────────────────────────────────── */}
      <section
        className="py-10 lg:py-14"
        style={{ background: brand.surface }}
      >
        <div className="max-w-5xl mx-auto px-6">
          {cs.coverImages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cs.coverImages.map((src, i) => (
                <CoverImage key={i} src={src} alt={`${cs.title} screen ${i + 1}`} accent={brand.accent} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((n) => (
                <div
                  key={n}
                  className="flex flex-col items-center justify-center gap-3 rounded-xl"
                  style={{
                    minHeight: "240px",
                    border: `2px dashed ${brand.accent}40`,
                    background: `${brand.accent}08`,
                  }}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: `${brand.accent}60` }}
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-5-5L5 21" />
                  </svg>
                  <span
                    className="text-xs font-medium"
                    style={{ color: `${brand.accent}80` }}
                  >
                    Your screenshot goes here
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── 4. Body ────────────────────────────────────────────────────────── */}
      <div style={{ background: "#09090b" }}>
        <div
          className="mx-auto px-6"
          style={{ maxWidth: "720px", paddingTop: "72px", paddingBottom: "80px" }}
        >

          {/* 01 — Problem */}
          <section className="pb-12 mb-12" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <SectionLabel number="01" text="The problem" color={brand.accent} />
            <h2 className="text-2xl font-bold leading-snug mb-4" style={{ color: "#F1F5F9" }}>
              {sections.problem.title}
            </h2>
            <p className="text-[15px] leading-[1.8]" style={{ color: "#94A3B8" }}>
              {sections.problem.body}
            </p>
            {sections.problem.expanded && (
              <ExpandableSection
                buttonText="Read full context"
                accent={brand.accent}
              >
                {sections.problem.expanded}
              </ExpandableSection>
            )}
          </section>

          {/* 02 — Role */}
          <section className="pb-12 mb-12" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <SectionLabel number="02" text="My role" color={brand.accent} />
            <h2 className="text-2xl font-bold leading-snug mb-4" style={{ color: "#F1F5F9" }}>
              {sections.role.title}
            </h2>
            <p className="text-[15px] leading-[1.8]" style={{ color: "#94A3B8" }}>
              {sections.role.body}
            </p>
          </section>

          {/* 03 — Decision */}
          <section className="pb-12 mb-12" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <SectionLabel number="03" text="The hard decision" color={brand.accent} />
            <h2 className="text-2xl font-bold leading-snug mb-5" style={{ color: "#F1F5F9" }}>
              {sections.decision.title}
            </h2>

            {/* Decision callout box */}
            <div
              className="rounded-xl p-5 mb-4"
              style={{
                background: "rgba(251,146,60,0.07)",
                border: "1px solid rgba(254,215,170,0.15)",
              }}
            >
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.15em] mb-3"
                style={{ color: "#FB923C" }}
              >
                The moment
              </p>
              <p className="text-[15px] leading-[1.8]" style={{ color: "#FED7AA" }}>
                {sections.decision.body}
              </p>
            </div>

            {sections.decision.expanded && (
              <ExpandableSection
                buttonText="Read the full reasoning"
                accent={brand.accent}
              >
                {sections.decision.expanded}
              </ExpandableSection>
            )}
          </section>

          {/* 04 — What we built */}
          <section className="pb-12 mb-12" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <SectionLabel number="04" text="What we built" color={brand.accent} />
            <h2 className="text-2xl font-bold leading-snug mb-4" style={{ color: "#F1F5F9" }}>
              {sections.built.title}
            </h2>
            <p className="text-[15px] leading-[1.8] mb-7" style={{ color: "#94A3B8" }}>
              {sections.built.body}
            </p>

            {/* Screens grid */}
            {sections.built.screens.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                {sections.built.screens.map((screen) => (
                  <ScreenCard key={screen.title} screen={screen} accent={brand.accent} />
                ))}
              </div>
            )}

            {sections.built.expanded && (
              <ExpandableSection
                buttonText="See all screens"
                accent={brand.accent}
              >
                {sections.built.expanded}
              </ExpandableSection>
            )}
          </section>

          {/* 05 — Result */}
          <section className="pb-12 mb-12" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <SectionLabel number="05" text="The result" color={brand.accent} />
            <h2 className="text-2xl font-bold leading-snug mb-7" style={{ color: "#F1F5F9" }}>
              {sections.result.title}
            </h2>

            {sections.result.stats.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {sections.result.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl p-5 text-center"
                    style={{
                      background: `${brand.accent}10`,
                      border: `1px solid ${brand.accent}25`,
                    }}
                  >
                    <p className="text-2xl font-bold leading-none mb-2" style={{ color: "#F1F5F9" }}>
                      {stat.value}
                    </p>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ color: "#64748B" }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 06 — Learning */}
          <section>
            <SectionLabel number="06" text="What I learned" color={brand.accent} />
            <h2 className="text-2xl font-bold leading-snug mb-6" style={{ color: "#F1F5F9" }}>
              {sections.learning.title}
            </h2>

            {/* Quote box */}
            <blockquote
              className="rounded-xl p-6"
              style={{
                background: "rgba(59,130,246,0.07)",
                borderLeft: "3px solid #3B82F6",
              }}
            >
              <p
                className="text-[15px] italic leading-[1.8]"
                style={{ color: "#93C5FD" }}
              >
                &ldquo;{sections.learning.quote}&rdquo;
              </p>
            </blockquote>
          </section>

        </div>
      </div>

      {/* ─── 5. Next Project Footer ─────────────────────────────────────────── */}
      <footer
        className="py-14 lg:py-16"
        style={{ background: brand.bg }}
      >
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em] mb-2"
              style={{ color: `${brand.text}60` }}
            >
              Next case study
            </p>
            <p
              className="text-xl font-bold"
              style={{ color: brand.text }}
            >
              {cs.next.title}
            </p>
          </div>

          <Link
            href={`/case-studies/${cs.next.slug}`}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg text-sm font-semibold transition-opacity duration-200 hover:opacity-80"
            style={{
              background: brand.accent,
              color: brand.bg,
            }}
          >
            Read next
            <ArrowRight size={15} />
          </Link>
        </div>
      </footer>

    </div>
  );
}
