"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { profile, expertise } from "@/data/content";

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function AboutPreview() {
  return (
    <section className="py-24 lg:py-32 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="block font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              03 — About Me
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-primary leading-tight mb-6">
              Designer who thinks in{" "}
              <span className="text-gradient">systems</span>.
            </h2>
            <p className="font-body text-lg text-muted leading-[1.75] mb-4">
              {profile.bio}
            </p>
            <p className="font-body text-base text-muted/80 leading-[1.75] mb-8">
              I believe great design is invisible — it removes friction, builds trust,
              and makes complex things feel inevitable. Every decision is intentional.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-body text-sm font-medium text-primary hover:text-accent-light transition-colors duration-200 cursor-pointer group"
            >
              Learn More
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>

          {/* Right — expertise grid */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {expertise.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05, ease }}
                className="flex gap-3 p-5 rounded-2xl border border-white/[0.07] bg-card hover:border-accent/20 hover:bg-surface transition-[border-color,background-color] duration-200 group cursor-default"
              >
                <div className="w-0.5 rounded-full bg-accent/30 group-hover:bg-accent transition-colors duration-300 shrink-0 self-stretch" />
                <div>
                  <h3 className="font-display font-semibold text-sm text-primary mb-1.5 group-hover:text-accent-light transition-colors duration-300">
                    {item.label}
                  </h3>
                  <p className="font-body text-xs text-muted leading-[1.7]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
