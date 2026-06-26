"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Tag from "@/components/ui/tag";
import { getFeaturedProjects, type Project } from "@/data/projects";

const ease = [0.22, 1, 0.36, 1] as const;

function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  const cls = "group relative rounded-2xl border border-white/[0.07] bg-card overflow-hidden cursor-pointer block transition-[transform,border-color] duration-300 hover:border-accent/30 hover:-translate-y-1.5";

  const inner = (
    <>
      {/* Thumbnail */}
      <div className={`relative overflow-hidden ${large ? "aspect-[16/9]" : "aspect-[4/3]"} bg-surface`}>
        {project.cover ? (
          <Image
            src={project.cover}
            alt={project.title}
            fill
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            sizes={large ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-transform duration-500 ease-out group-hover:scale-[1.04]`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

        {/* Hover overlay — "View Project" reveal */}
        <div className="absolute inset-0 flex items-center justify-center bg-bg/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-semibold font-body shadow-lg shadow-accent/30 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
            View Project <ArrowUpRight size={15} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between gap-3 mb-2">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-accent">{project.category}</span>
          <span className="font-body text-xs text-dim shrink-0">{project.year}</span>
        </div>
        <div className="mb-2">
          <h3 className={`font-display font-semibold text-primary leading-snug group-hover:text-accent-light transition-colors duration-300 ${large ? "text-xl" : "text-base"}`}>
            {project.title}
          </h3>
        </div>
        <p className="font-body text-sm text-muted leading-[1.75] mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 2).map((tag) => (
            <Tag key={tag} variant="dim">{tag}</Tag>
          ))}
        </div>
      </div>

      {/* Inset ring on hover */}
      <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-1 ring-accent/25 pointer-events-none transition-[box-shadow] duration-300" />
    </>
  );

  if (project.external) {
    return <a href={project.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>;
  }
  return <Link href={project.href} className={cls}>{inner}</Link>;
}

export default function FeaturedProjects() {
  const projects = getFeaturedProjects();

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="block font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
              02 — Selected Work
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-primary">
              Projects I'm proud of
            </h2>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-body text-sm font-medium text-muted hover:text-primary transition-colors duration-200 cursor-pointer shrink-0 group"
          >
            View All Work
            <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </Link>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => {
            const isFirstLarge = i === 0;
            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08, ease }}
                className={isFirstLarge ? "md:col-span-2 lg:col-span-2" : ""}
              >
                <ProjectCard project={project} large={isFirstLarge} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
