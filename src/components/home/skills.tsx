"use client";

import { motion } from "motion/react";
import {
  Layers, Search, PenTool, Cpu, Play, Palette, Share2, BarChart2,
} from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1] as const;

const skills = [
  { label: "Product Design",     icon: Layers,   color: "text-indigo-400" },
  { label: "UX Research",        icon: Search,   color: "text-blue-400"   },
  { label: "UI Design",          icon: PenTool,  color: "text-cyan-400"   },
  { label: "Design Systems",     icon: Cpu,      color: "text-indigo-300" },
  { label: "Motion Design",      icon: Play,     color: "text-amber-400"  },
  { label: "Branding",           icon: Palette,  color: "text-rose-400"   },
  { label: "Social Media",       icon: Share2,   color: "text-cyan-400"   },
  { label: "Data Visualization", icon: BarChart2, color: "text-emerald-400"},
];

export default function Skills() {
  return (
    <section className="py-24 lg:py-32 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-12"
        >
          <span className="block font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
            04 — Skills &amp; Expertise
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-primary">
            What I bring to the table
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {skills.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06, ease }}
                className="group flex flex-col items-start gap-3 p-5 rounded-2xl border border-white/[0.07] bg-card hover:border-white/[0.14] hover:bg-surface transition-[border-color,background-color] duration-200 cursor-default"
              >
                <div className={`p-2 rounded-xl bg-white/[0.04] ${skill.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <span className="font-body text-sm font-medium text-primary leading-snug">
                  {skill.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
