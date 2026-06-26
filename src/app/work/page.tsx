"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import Tag from "@/components/ui/tag";
import { projects, getProjectsByCategory, type Project } from "@/data/projects";

const ease = [0.25, 0.1, 0.25, 1] as const;

const TABS = [
  "All Work",
  "UI/UX Design",
  "Graphic Design",
  "Motion Design",
  "Social Media",
  "Others",
] as const;

type Tab = (typeof TABS)[number];

const TAB_CATEGORY: Record<Tab, Parameters<typeof getProjectsByCategory>[0]> = {
  "All Work":       "All",
  "UI/UX Design":   "UI/UX Design",
  "Graphic Design": "Graphic Design",
  "Motion Design":  "Motion Design",
  "Social Media":   "Social Media",
  "Others":         "Others",
};

function CardInner({ project, showCategory = true }: { project: Project; showCategory?: boolean }) {
  const cls = "group flex flex-col rounded-2xl border border-white/[0.07] bg-card overflow-hidden hover:border-white/[0.14] transition-[transform,border-color] duration-200 hover:-translate-y-1 cursor-pointer block";
  const inner = (
    <>
      <div className="h-52 relative overflow-hidden bg-surface">
        {project.cover ? (
          <Image
            src={project.cover}
            alt={project.title}
            fill
            className="object-cover object-left-top transition-transform duration-300 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card/70 to-transparent" />
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowUpRight size={14} className="text-primary" />
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between gap-3 mb-2">
          {showCategory
            ? <span className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-accent">{project.category}</span>
            : <span />}
          <span className="font-body text-xs text-dim shrink-0">{project.year}</span>
        </div>
        <div className="mb-2">
          <h3 className="font-display font-semibold text-primary text-lg leading-snug">{project.title}</h3>
        </div>
        <p className="font-body text-sm text-muted leading-relaxed mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => <Tag key={tag} variant="dim">{tag}</Tag>)}
        </div>
      </div>
    </>
  );
  if (project.external) {
    return <a href={project.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>;
  }
  return <Link href={project.href} className={cls}>{inner}</Link>;
}

function WorkCard({ project, i, showCategory }: { project: Project; i: number; showCategory: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.45, delay: i * 0.07, ease }}
    >
      <CardInner project={project} showCategory={showCategory} />
    </motion.div>
  );
}

export default function WorkPage() {
  const [active, setActive] = useState<Tab>("All Work");
  const filtered = getProjectsByCategory(TAB_CATEGORY[active]);
  const showCategory = active === "All Work";

  return (
    <>
      <Nav />
      <main className="pt-[72px]">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
          {/* Header */}
          <div className="mb-12">
            <span className="block font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
              My Work
            </span>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-primary mb-4">
              Selected Projects
            </h1>
            <p className="font-body text-lg text-muted max-w-xl">
              A collection of product design, branding, motion, and creative work across enterprise and consumer products.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-10 pb-6 border-b border-white/[0.06]">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`px-4 py-2 rounded-full font-body text-sm font-medium transition-colors duration-200 cursor-pointer ${
                  active === tab
                    ? "bg-accent text-white shadow-lg shadow-accent/20"
                    : "border border-white/[0.08] text-muted hover:text-primary hover:border-white/[0.14]"
                }`}
              >
                {tab}
                {tab === "All Work" && (
                  <span className="ml-2 text-xs opacity-60">{projects.length}</span>
                )}
              </button>
            ))}
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filtered.length > 0 ? (
                filtered.map((project, i) => (
                  <WorkCard key={project.slug} project={project} i={i} showCategory={showCategory} />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-3 py-24 text-center"
                >
                  <p className="font-body text-muted">No projects in this category yet.</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </>
  );
}
