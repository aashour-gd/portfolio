"use client";

import { motion } from "motion/react";
import { Mail, ExternalLink } from "lucide-react";
import { profile, socials } from "@/data/content";

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function ContactCta() {
  const linkedin = socials.find((s) => s.label === "LinkedIn");

  return (
    <section className="py-24 lg:py-40 border-t border-white/[0.06] relative overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-indigo-700/10 blur-[120px]" />
        <div className="absolute -bottom-20 right-0 w-[400px] h-[400px] rounded-full bg-indigo-700/10 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="block font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-6">
            06 — Contact
          </span>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-primary leading-[1.05] mb-6">
            Let's build something{" "}
            <span className="text-gradient">meaningful</span>{" "}
            together.
          </h2>
          <p className="font-body text-lg text-muted leading-relaxed mb-10 max-w-xl mx-auto">
            I'm open to senior product design roles, design systems work, and select
            freelance projects. Let's talk.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2.5 px-7 py-4 bg-accent hover:bg-accent-light text-white font-medium font-body rounded-lg transition-colors duration-200 shadow-lg shadow-accent/25 cursor-pointer text-base"
            >
              <Mail size={18} /> Email Me
            </a>
            {linkedin && (
              <a
                href={linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-4 border border-white/[0.1] hover:border-white/[0.2] hover:bg-white/[0.04] text-primary font-medium font-body rounded-lg transition-colors duration-200 cursor-pointer text-base"
              >
                <ExternalLink size={18} /> LinkedIn
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
