"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

type Stat = { value: string; label: string };

type CaseStudy = {
  index: string;
  slug: string;
  title: string;
  category: string;
  hook: string;
  summary: string;
  tags: string[];
  accent: string;
  panelBg: string;
  imageSrc: string;
  href: string;
  stats?: Stat[];
  comingSoon?: boolean;
};

const CASE_STUDIES: CaseStudy[] = [
  {
    index: "01",
    slug: "afif",
    title: "AFIF Mobile App",
    category: "Mobile Design · UX Research",
    hook: "Designing safety into every interaction for families.",
    summary:
      "End-to-end UX/UI design for a child safety app — parental monitoring dashboard, dual user flows, logo, and brand identity.",
    tags: ["Mobile Design", "UX Research", "Prototyping"],
    accent: "#52BC9A",
    panelBg: "#012A2E",
    imageSrc: "/images/afif-cover.png",
    href: "/case-studies/afif",
    stats: [
      { value: "2", label: "Apps" },
      { value: "Live", label: "Google Play" },
      { value: "100%", label: "Ownership" },
    ],
  },
  {
    index: "02",
    slug: "intouch",
    title: "Intouch Live Platform",
    category: "Product Design · Enterprise UX",
    hook: "Replacing 4+ legacy systems with one unified platform.",
    summary:
      "A unified retail media network platform that replaced 4+ legacy systems — cutting creative approval time by 40% and scaling to enterprise retailers across the region.",
    tags: ["Product Design", "Enterprise UX", "Design Systems"],
    accent: "#3B82F6",
    panelBg: "#0A1628",
    imageSrc: "/images/intouch-cover.png",
    href: "/work/intouch-live",
    stats: [
      { value: "3", label: "Markets" },
      { value: "40%", label: "Faster handoff" },
      { value: "4+", label: "Years" },
    ],
  },
  {
    index: "03",
    slug: "geneina",
    title: "Geneina",
    category: "Product Design · UX/UI",
    hook: "Translating complex needs into accessible experiences.",
    summary:
      "Product design for Geneina — translating complex user needs into clear, accessible digital experiences.",
    tags: ["Product Design", "UX/UI"],
    accent: "#475569",
    panelBg: "#0F172A",
    imageSrc: "/images/geneina-cover.png",
    href: "#",
    comingSoon: true,
  },
];

function CaseStudyCard({ cs, i }: { cs: CaseStudy; i: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: i * 0.1, ease }}
      onMouseEnter={() => !cs.comingSoon && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: hovered ? "#161F35" : "#111827",
        borderColor: hovered ? `${cs.accent}66` : "#1E293B",
        opacity: cs.comingSoon ? 0.4 : 1,
        pointerEvents: cs.comingSoon ? "none" : "auto",
        transition: "background-color 0.3s ease, border-color 0.3s ease",
      }}
      className="relative rounded-2xl border overflow-hidden"
    >
      {/* Top accent gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] z-10"
        style={{
          background: `linear-gradient(90deg, ${cs.accent}, transparent)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Two-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr]">

        {/* Left — text content */}
        <div
          className="flex flex-col gap-4"
          style={{ padding: "36px 36px 36px 40px" }}
        >
          {/* Meta row */}
          <div className="flex items-center gap-3">
            <span
              className="font-mono text-sm font-semibold tabular-nums"
              style={{ color: cs.accent }}
            >
              {cs.index}
            </span>
            <span className="block w-px h-3.5 shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.18)" }} />
            <span
              className="text-xs font-medium uppercase tracking-[0.12em]"
              style={{ color: "#64748B" }}
            >
              {cs.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display text-2xl lg:text-[1.75rem] font-bold text-white leading-snug">
            {cs.title}
          </h3>

          {/* Hook */}
          <p
            className="text-[13px] italic leading-relaxed"
            style={{ color: cs.accent }}
          >
            {cs.hook}
          </p>

          {/* Summary */}
          <p
            className="text-[13px] leading-[1.7]"
            style={{ color: "#94A3B8" }}
          >
            {cs.summary}
          </p>

          {/* Bottom row — tags + CTA */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-auto pt-2">
            <div className="flex flex-wrap gap-1.5">
              {cs.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-[11px] font-medium"
                  style={{
                    backgroundColor: "#0F172A",
                    border: "1px solid #1E293B",
                    color: "#94A3B8",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {cs.comingSoon ? (
              <span className="text-sm font-medium shrink-0" style={{ color: "#475569" }}>
                Coming soon
              </span>
            ) : (
              <Link
                href={cs.href}
                className="inline-flex items-center gap-1.5 text-sm font-medium shrink-0"
                style={{
                  color: hovered ? cs.accent : "#94A3B8",
                  transition: "color 0.2s ease",
                }}
              >
                Read case study
                <ArrowRight
                  size={14}
                  style={{
                    transform: hovered ? "translateX(3px)" : "translateX(0)",
                    transition: "transform 0.2s ease",
                  }}
                />
              </Link>
            )}
          </div>
        </div>

        {/* Right — image panel */}
        <div
          className="relative flex flex-col overflow-hidden border-t lg:border-t-0 lg:border-l"
          style={{
            backgroundColor: cs.panelBg,
            borderColor: "#1E293B",
            minHeight: "280px",
          }}
        >
          {cs.comingSoon ? (
            /* Dashed circle placeholder for coming-soon */
            <div className="flex-1 flex items-center justify-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  border: `2px dashed ${cs.accent}`,
                }}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: cs.accent }}
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
            </div>
          ) : (
            /* Cover image */
            <div className="flex-1 relative" style={{ minHeight: "200px" }}>
              <img
                src={cs.imageSrc}
                alt={cs.title}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          )}

          {/* Stats row */}
          {cs.stats && cs.stats.length > 0 && (
            <div
              className="flex items-center justify-around py-4 px-5"
              style={{ borderTop: "1px solid #1E293B" }}
            >
              {cs.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-sm font-bold text-white leading-none">
                    {stat.value}
                  </div>
                  <div
                    className="text-[10px] font-medium mt-1"
                    style={{ color: "#64748B" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedCaseStudies() {
  return (
    <section style={{ paddingTop: "80px", paddingBottom: "100px" }}>
      <div
        className="mx-auto"
        style={{ maxWidth: "1100px", paddingLeft: "28px", paddingRight: "28px" }}
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span
              className="block font-body text-xs font-semibold uppercase tracking-[0.2em] mb-3"
              style={{ color: "#3B82F6" }}
            >
              Selected work
            </span>
            <h2 className="font-display text-3xl lg:text-[2.6rem] font-bold text-white leading-snug">
              Case studies that show{" "}
              <span style={{ color: "#3B82F6" }}>how I think</span>,
              <br className="hidden sm:block" />{" "}
              not just what I made.
            </h2>
          </div>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 font-body text-sm font-medium shrink-0 group"
            style={{ color: "#94A3B8", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#94A3B8")}
          >
            View all case studies
            <ArrowRight
              size={14}
              className="group-hover:translate-x-0.5 transition-transform duration-200"
            />
          </Link>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col gap-4">
          {CASE_STUDIES.map((cs, i) => (
            <CaseStudyCard key={cs.slug} cs={cs} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
