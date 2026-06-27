"use client";

import { motion } from "motion/react";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import { profile, stats } from "@/data/content";
import AnimatedAvatar from "@/components/ui/AnimatedAvatar";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-[72px]">
      {/* Atmospheric orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[80px]" />
        <div className="absolute bottom-0 -left-10 w-[420px] h-[420px] rounded-full bg-cyan-700/6 blur-[75px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 items-center">

          {/* Left — content */}
          <motion.div variants={container} initial="hidden" animate="show">

            {/* Available badge */}
            <motion.div variants={item} className="flex items-center gap-2.5 mb-8">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="font-body text-sm font-medium text-muted">
                Open to Senior &amp; Lead design roles
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="font-display font-bold leading-[1.02] tracking-tight text-primary mb-8 text-[2.6rem] sm:text-[3.6rem] lg:text-[4.4rem] xl:text-[5rem]"
            >
              I make{" "}
              <span className="text-gradient">products</span>
              {" "}people<br className="hidden sm:block" />{" "}
              <span className="text-gradient">enjoy</span>{" "}using.
            </motion.h1>

            {/* Bio */}
            <motion.p
              variants={item}
              className="font-body text-lg text-muted leading-[1.75] max-w-[48ch] mb-10"
            >
              Senior Product Designer with 10+ years — from early-stage startups
              to multi-market platforms.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap gap-3 mb-14">
              <Link
                href="/work"
                className="inline-flex items-center gap-2.5 px-9 py-[18px] bg-accent hover:bg-accent-light text-white text-base font-semibold font-body rounded-lg transition-colors duration-200 shadow-lg shadow-accent/30 cursor-pointer"
              >
                View My Work <ArrowRight size={17} />
              </Link>
              <a
                href={profile.resumeUrl}
                className="inline-flex items-center gap-2.5 px-7 py-4 border border-white/[0.10] hover:border-white/[0.20] text-muted hover:text-primary text-sm font-medium font-body rounded-lg transition-colors duration-200 cursor-pointer opacity-70 hover:opacity-100"
              >
                <Download size={15} /> Download CV
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div variants={item} className="flex flex-wrap gap-x-8 gap-y-5">
              {stats.map((s, i) => (
                <div key={s.label} className="flex items-start gap-4">
                  {i > 0 && (
                    <div className="w-px h-10 bg-white/[0.08] shrink-0 mt-0.5 hidden sm:block" />
                  )}
                  <div>
                    <div className="font-display text-3xl lg:text-4xl font-bold text-primary leading-none mb-1.5">
                      {s.value}
                    </div>
                    <div className="font-body text-[11px] text-dim uppercase tracking-[0.15em]">
                      {s.label}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

          </motion.div>

          {/* Right — animated avatar */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease }}
            className="hidden lg:flex items-center justify-center -mt-20 -ml-6"
          >
            <AnimatedAvatar src="/assets/avatar.png" size={380} />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
