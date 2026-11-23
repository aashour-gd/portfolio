"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  animate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { Check } from "lucide-react";

// Spec for a ```story block: one pinned figure that the reader builds up chapter by
// chapter. The chapters scroll on the left; the stage on the right changes with the
// chapter in view. Below `lg` each chapter carries its own stage, so nothing depends
// on scroll position. Hover (or focus) a ledger line for the detail behind it.
export type Scene = {
  /** How many ledger lines are subtracted from the start figure. 0 shows the start figure alone. */
  lines: number;
  /** Ledger line id to highlight. */
  focus?: string;
  /** Show the plan line beside the figure. */
  plan?: boolean;
  /** Show the exchange-rate chips. */
  rates?: boolean;
  /** Switch the stage to light mode. */
  light?: boolean;
  /** Replace the ledger with the audit bars (first run, then latest). */
  audit?: boolean;
  /** Show the "checked" stamp. */
  stamp?: boolean;
  /** Animate the digit spacing from too tight to tested. */
  digits?: boolean;
};

export type StorySpec = {
  start: { label: string; amount: number };
  title: string;
  ledger: { id: string; label: string; amount: number; detail: string }[];
  plan: { label: string; amount: number; warning: string };
  rates: { text: string; tone?: "ok" | "warn" }[];
  audit: { labels: string[]; first: number[]; latest: number[]; note?: string };
  chapters: { kicker: string; title: string; body: string[]; scene: Scene }[];
  caption?: string;
};

const nf = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// **bold** inside chapter text.
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 ? (
          <strong key={i} className="font-semibold text-primary">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function Figure({ value, spacing, className }: { value: number; spacing: string; className: string }) {
  const reduce = useReducedMotion();
  const mv = useMotionValue(value);
  const [shown, setShown] = useState(value);
  useMotionValueEvent(mv, "change", (v) => setShown(v));
  useEffect(() => {
    if (reduce) {
      mv.set(value);
      return;
    }
    const c = animate(mv, value, { duration: 0.9, ease: [0.22, 1, 0.36, 1] });
    return () => c.stop();
  }, [value, reduce, mv]);
  const [whole, dec] = nf.format(shown).split(".");
  return (
    <motion.div
      aria-label={nf.format(value)}
      animate={{ letterSpacing: spacing }}
      transition={{ duration: 0.6 }}
      className={`font-display text-6xl font-semibold leading-none [font-variant-numeric:tabular-nums] ${className}`}
    >
      <span aria-hidden>
        {whole}
        <span className="text-4xl opacity-60">.{dec}</span>
      </span>
    </motion.div>
  );
}

function Bars({ spec, th }: { spec: StorySpec["audit"]; th: Theme }) {
  const [run, setRun] = useState<"first" | "latest">("first");
  useEffect(() => {
    const t = setTimeout(() => setRun("latest"), 900);
    return () => clearTimeout(t);
  }, []);
  const vals = spec[run];
  const cols = ["bg-red-400", "bg-accent-light", th.dim];
  return (
    <div className="flex flex-col gap-4">
      <p className={`font-body text-xs ${th.mute}`}>{run === "first" ? "First run" : "Latest run"}</p>
      {spec.labels.map((l, i) => (
        <div key={l} className="flex flex-col gap-1.5">
          <div className="flex justify-between font-body text-sm">
            <span>{l}</span>
            <span className="font-semibold">{vals[i]}</span>
          </div>
          <div className={`h-3 overflow-hidden rounded-full ${th.track}`}>
            <motion.div
              className={`h-full rounded-full ${cols[i]}`}
              initial={false}
              animate={{ width: `${Math.max(vals[i] / 6, 0.015) * 100}%` }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      ))}
      {spec.note && <p className={`font-body text-xs ${th.mute}`}>{spec.note}</p>}
    </div>
  );
}

type Theme = { card: string; text: string; mute: string; dim: string; row: string; line: string; track: string };
const DARK: Theme = {
  card: "border-white/[0.08] bg-card text-primary",
  text: "text-primary",
  mute: "text-muted",
  dim: "bg-muted",
  row: "bg-white/[0.04] hover:bg-white/[0.08]",
  line: "border-white/[0.08]",
  track: "bg-white/[0.08]",
};
const LIGHT: Theme = {
  card: "border-black/10 bg-[#F6F5F1] text-[#14181B]",
  text: "text-[#14181B]",
  mute: "text-[#565F66]",
  dim: "bg-[#565F66]",
  row: "bg-white hover:bg-white/70",
  line: "border-black/10",
  track: "bg-black/10",
};

function Stage({ spec, scene }: { spec: StorySpec; scene: Scene }) {
  const th = scene.light ? LIGHT : DARK;
  const visible = spec.ledger.slice(0, scene.lines);
  const value = spec.start.amount - visible.reduce((a, l) => a + l.amount, 0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!scene.digits) return;
    const t = setTimeout(() => setDone(true), 900);
    return () => {
      clearTimeout(t);
      setDone(false);
    };
  }, [scene.digits]);
  const fixed = !!scene.digits && done;

  const label = scene.lines === 0 ? spec.start.label : "Safe to spend today";
  const spacing = scene.digits && !fixed ? "-0.09em" : "-0.02em";

  return (
    <div className={`rounded-3xl border p-7 transition-colors duration-500 ${th.card}`}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className={`font-body text-sm ${th.mute}`}>{label}</span>
        <AnimatePresence>
          {scene.stamp && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent-light/20 px-2.5 py-1 font-body text-[11px] font-semibold uppercase tracking-wider text-accent-light"
            >
              <Check size={12} aria-hidden /> Checked by hand
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <Figure value={value} spacing={spacing} className={th.text} />
      {scene.digits && (
        <p className={`mt-3 font-body text-xs ${th.mute}`}>
          {fixed ? "Spacing tested on the real digits." : "Set by theory: two digits merge into one shape."}
        </p>
      )}

      <div className={`mt-6 min-h-[200px] border-t pt-5 ${th.line}`}>
        {scene.audit ? (
          <Bars spec={spec.audit} th={th} />
        ) : (
          <div className="flex flex-col gap-3">
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              <AnimatePresence initial={false}>
                {visible.map((l) => (
                  <motion.li
                    key={l.id}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="group"
                  >
                    <button
                      type="button"
                      aria-describedby={`d-${l.id}`}
                      className={`flex min-h-11 w-full items-center justify-between rounded-xl px-4 text-left font-body text-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-accent-light ${th.row} ${
                        scene.focus === l.id ? "ring-1 ring-accent-light" : ""
                      }`}
                    >
                      <span>{l.label}</span>
                      <span className="shrink-0 whitespace-nowrap pl-3 font-semibold [font-variant-numeric:tabular-nums]">− {nf.format(l.amount)}</span>
                    </button>
                    <p
                      id={`d-${l.id}`}
                      className={`max-h-0 overflow-hidden px-4 font-body text-xs leading-relaxed opacity-0 transition-all duration-300 group-focus-within:max-h-16 group-focus-within:pt-2 group-focus-within:opacity-100 group-hover:max-h-16 group-hover:pt-2 group-hover:opacity-100 ${th.mute}`}
                    >
                      {l.detail}
                    </p>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
            <AnimatePresence>
              {scene.plan && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-xl border border-dashed border-red-400/70 px-4 py-3 font-body text-sm"
                >
                  <div className="flex justify-between">
                    <span>{spec.plan.label}</span>
                    <span className="font-semibold [font-variant-numeric:tabular-nums]">{nf.format(spec.plan.amount)}</span>
                  </div>
                  <p className="mt-1 text-xs text-red-400">▲ {spec.plan.warning}</p>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {scene.rates && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-wrap gap-2"
                >
                  {spec.rates.map((r) => (
                    <span
                      key={r.text}
                      className={`rounded-full px-3 py-1.5 font-body text-xs font-medium ${
                        r.tone === "warn" ? "border border-red-400/60 text-red-400" : "bg-accent-light/15 text-accent-light"
                      }`}
                    >
                      {r.text}
                    </span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            {scene.lines === 0 && (
              <p className={`font-body text-xs ${th.mute}`}>What other apps show. Keep scrolling to take away what is already spoken for.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function NumberStory({ spec }: { spec: StorySpec }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const refs = useRef<(HTMLElement | null)[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = refs.current.indexOf(e.target as HTMLElement);
            if (i >= 0) setActive(i);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [spec.chapters.length]);

  const go = (i: number) => {
    refs.current[i]?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  };

  return (
    <div className="my-12">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
        <div ref={listRef} className="flex flex-col gap-14 lg:gap-0">
          {spec.chapters.map((c, i) => (
            <section
              key={c.kicker}
              ref={(el) => {
                refs.current[i] = el;
              }}
              aria-labelledby={`ch-${i}`}
              className="lg:flex lg:min-h-[85vh] lg:items-center"
            >
              <div className={`transition-opacity duration-500 ${active === i ? "lg:opacity-100" : "lg:opacity-40"}`}>
                <p className="mb-2 font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">{c.kicker}</p>
                <h3 id={`ch-${i}`} className="!mt-0 mb-4 font-display text-2xl font-semibold leading-tight text-primary lg:text-3xl">
                  {c.title}
                </h3>
                {c.body.map((p) => (
                  <p key={p} className="mb-4 font-body text-base leading-[1.8] text-muted">
                    <Rich text={p} />
                  </p>
                ))}
                <div className="mt-6 lg:hidden">
                  <Stage spec={spec} scene={c.scene} />
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-28 flex flex-col gap-4">
            <div className="h-0.5 overflow-hidden rounded-full bg-white/[0.08]" aria-hidden>
              <motion.div className="h-full origin-left bg-accent-light" style={{ scaleX: scrollYProgress }} />
            </div>
            <Stage spec={spec} scene={spec.chapters[active].scene} />
            <div className="flex items-center justify-between gap-2">
              <div className="flex gap-1" role="group" aria-label="Chapters">
                {spec.chapters.map((c, i) => (
                  <button
                    key={c.kicker}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Go to ${c.title}`}
                    aria-current={active === i ? "step" : undefined}
                    className="flex size-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-accent-light"
                  >
                    <span
                      className={`block h-2 rounded-full transition-all duration-300 ${
                        active === i ? "w-6 bg-accent-light" : "w-2 bg-white/20"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="font-body text-xs text-dim">
                {active + 1} / {spec.chapters.length}
              </span>
            </div>
          </div>
        </div>
      </div>
      {spec.caption && <p className="mt-6 font-body text-xs text-dim">{spec.caption}</p>}
    </div>
  );
}
