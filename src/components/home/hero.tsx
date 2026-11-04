"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Download, Play, X } from "lucide-react";
import Link from "next/link";
import { profile, stats } from "@/data/content";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const VIDEO_ID = "asXzzDPwHlU";

export default function Hero() {
  const [hovered, setHovered] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    if (!videoOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setVideoOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [videoOpen]);

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
            className="hidden lg:flex items-center justify-center -mt-10 -ml-6"
          >
            <div style={{ animation: "heroFloat 4s ease-in-out infinite" }}>
              <div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => setVideoOpen(true)}
                role="button"
                aria-label="Play my video"
                className="relative cursor-pointer"
                style={{
                  transform: hovered ? "scale(1.03)" : "scale(1)",
                  filter: hovered
                    ? "drop-shadow(0 0 32px rgba(37,99,235,0.45))"
                    : "drop-shadow(0 20px 40px rgba(0,0,0,0.35))",
                  transition: "transform 0.4s ease, filter 0.4s ease",
                }}
              >
                <img
                  src="/images/hero-character.png"
                  alt={profile.name}
                  className="h-[560px] w-auto select-none"
                  draggable={false}
                />

                {/* Play my video — appears on hover */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    opacity: hovered ? 1 : 0,
                    transform: hovered ? "translateY(0)" : "translateY(8px)",
                    transition: "opacity 0.3s ease, transform 0.3s ease",
                    pointerEvents: "none",
                  }}
                >
                  <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent text-white text-sm font-semibold font-body shadow-lg shadow-accent/40">
                    <Play size={16} fill="currentColor" /> Play my video
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Video modal */}
      {videoOpen && (
        <div
          onClick={() => setVideoOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8"
          style={{ background: "rgba(2,6,23,0.88)", backdropFilter: "blur(6px)" }}
        >
          <button
            onClick={() => setVideoOpen(false)}
            aria-label="Close video"
            className="absolute top-5 right-5 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.08] hover:bg-white/[0.16] border border-white/[0.12] text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-white/[0.1] shadow-2xl"
          >
            <iframe
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
              title="Ahmed Ashour — intro video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}

          <style>{`
            @keyframes heroFloat {
              0%   { transform: translateY(0px); }
              50%  { transform: translateY(-10px); }
              100% { transform: translateY(0px); }
            }
            @media (prefers-reduced-motion: reduce) {
              [style*="heroFloat"] { animation: none !important; }
            }
          `}</style>
    </section>
  );
}
