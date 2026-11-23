"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

// Spec for a ```stage block: steps on the left, a sticky stage on the right that
// follows the step you are reading (scroll) or click. Below `lg` each stage sits
// under its own step, so nothing depends on scroll position.
export type StageContent =
  | { kind: "table"; head?: [string, string]; rows: [string, string][]; chips?: { text: string; tone?: "ok" | "warn" }[] }
  | {
      kind: "runway";
      todayAt: number;
      startLabel?: string;
      endLabel?: string;
      bills: { name: string; due: string; amount: string; at: number }[];
    }
  | { kind: "text"; lines: string[] };

export type StageSpec = {
  caption?: string;
  steps: { title: string; blurb: string; stage: StageContent }[];
};

function Runway({ stage }: { stage: Extract<StageContent, { kind: "runway" }> }) {
  const [sel, setSel] = useState(0);
  const bill = stage.bills[sel];
  return (
    <div className="flex flex-col gap-6">
      <p className="font-body text-sm text-muted">Runs from the last income to the next one. Tap a bill.</p>
      <div className="relative mx-3 h-24">
        <div className="absolute inset-x-0 top-11 h-1.5 rounded-full bg-white/[0.1]" />
        <div className="absolute left-0 top-11 h-1.5 rounded-full bg-accent-light" style={{ width: `${stage.todayAt}%` }} />
        <div className="absolute top-8 h-9 w-0.5 bg-accent-light" style={{ left: `${stage.todayAt}%` }} />
        <span
          className="absolute top-1 -translate-x-1/2 font-body text-[11px] font-semibold uppercase tracking-wider text-accent-light"
          style={{ left: `${stage.todayAt}%` }}
        >
          Today
        </span>
        {stage.bills.map((b, i) => (
          <button
            key={b.name}
            type="button"
            onClick={() => setSel(i)}
            aria-label={`${b.name}, ${b.due}, ${b.amount}`}
            aria-pressed={sel === i}
            className="absolute top-[34px] flex size-11 -translate-x-1/2 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-accent-light"
            style={{ left: `${b.at}%` }}
          >
            <span
              className={`size-4 rounded-full border-[3px] border-card transition-colors duration-200 ${
                sel === i ? "bg-red-400" : "bg-muted"
              }`}
            />
          </button>
        ))}
        <span className="absolute left-0 top-[76px] font-body text-[11px] text-dim">{stage.startLabel ?? "Last income"}</span>
        <span className="absolute right-0 top-[76px] font-body text-[11px] text-dim">{stage.endLabel ?? "Next income"}</span>
      </div>
      {bill && (
        <div className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-bg px-5 py-4">
          <div>
            <p className="font-body text-sm font-semibold text-primary">{bill.name}</p>
            <p className="font-body text-xs text-muted">{bill.due}</p>
          </div>
          <p className="font-display text-xl font-semibold text-primary [font-variant-numeric:tabular-nums]">{bill.amount}</p>
        </div>
      )}
    </div>
  );
}

function Stage({ content }: { content: StageContent }) {
  if (content.kind === "runway") return <Runway stage={content} />;
  if (content.kind === "text") {
    return (
      <div className="flex flex-col gap-3">
        {content.lines.map((l) => (
          <p key={l} className="font-body text-sm leading-relaxed text-muted">{l}</p>
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-5">
      <div className="overflow-hidden rounded-xl border border-white/[0.08] font-body text-sm [font-variant-numeric:tabular-nums]">
        {content.head && (
          <div className="flex bg-white/[0.03] px-4 py-2.5 text-[11px] uppercase tracking-wider text-dim">
            <span className="flex-1">{content.head[0]}</span>
            <span className="flex-1 text-right">{content.head[1]}</span>
          </div>
        )}
        {content.rows.map(([a, b]) => (
          <div key={a} className="flex border-t border-white/[0.06] px-4 py-3.5 text-primary first:border-t-0">
            <span className="flex-1">{a}</span>
            <span className="flex-1 text-right font-medium">{b}</span>
          </div>
        ))}
      </div>
      {content.chips && (
        <div className="flex flex-wrap gap-2">
          {content.chips.map((c) => (
            <span
              key={c.text}
              className={`rounded-full px-3 py-1.5 font-body text-xs font-medium ${
                c.tone === "warn" ? "border border-red-400/60 text-red-300" : "bg-accent/15 text-accent-light"
              }`}
            >
              {c.text}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ScrollStage({ spec }: { spec: StageSpec }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  // The step crossing the middle band of the viewport becomes active.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = refs.current.indexOf(e.target as HTMLLIElement);
            if (i >= 0) setActive(i);
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [spec.steps.length]);

  const go = (i: number) => {
    setActive(i);
    refs.current[i]?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  };

  return (
    <div className="my-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-10">
        <ol className="m-0 flex list-none flex-col gap-4 p-0 lg:gap-0">
          {spec.steps.map((s, i) => (
            <li
              key={s.title}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="lg:flex lg:min-h-[48vh] lg:items-center"
            >
              <div className="w-full">
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-current={active === i ? "step" : undefined}
                  className={`flex min-h-11 w-full flex-col gap-1 rounded-2xl border p-5 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-light ${
                    active === i ? "border-accent-light bg-accent/10" : "border-white/[0.08] bg-card hover:border-white/[0.2]"
                  }`}
                >
                  <span className="font-body text-xs text-dim">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-lg font-semibold text-primary">{s.title}</span>
                  <span className="font-body text-sm leading-relaxed text-muted">{s.blurb}</span>
                </button>
                <div className="mt-4 rounded-2xl border border-white/[0.08] bg-card p-5 lg:hidden">
                  <Stage content={s.stage} />
                </div>
              </div>
            </li>
          ))}
        </ol>
        <div className="hidden lg:block">
          <div className="sticky top-28 min-h-[360px] rounded-3xl border border-white/[0.08] bg-card p-7">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <Stage content={spec.steps[active].stage} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      {spec.caption && <p className="mt-4 font-body text-xs text-dim">{spec.caption}</p>}
    </div>
  );
}
