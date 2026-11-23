"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

// Spec for a ```decision block. The reader picks an option first and sees what it
// would have meant. Picking the option I shipped also reveals the decision record
// and its cost. `chosen` is the id of the option I shipped.
export type DecisionSpec = {
  question: string;
  intro?: string;
  options: {
    id: string;
    label: string;
    summary: string;
    figure: string;
    figureNote?: string;
    tone: "warn" | "ok";
    body: string;
  }[];
  chosen: string;
  record: string;
  cost: string;
};

export default function DecisionExplorer({ spec }: { spec: DecisionSpec }) {
  const [picked, setPicked] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const current = spec.options.find((o) => o.id === picked);
  const shipped = picked === spec.chosen;

  return (
    <section
      aria-label="Decision explorer"
      className="my-10 rounded-2xl border border-white/[0.08] bg-card p-6 lg:p-8"
    >
      <p className="mb-2 font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
        You choose first
      </p>
      <h3 className="!mt-0 mb-2 font-display text-xl font-semibold text-primary">{spec.question}</h3>
      {spec.intro && <p className="mb-5 font-body text-sm leading-relaxed text-muted">{spec.intro}</p>}

      <div role="group" aria-label="Options" className="grid gap-3 sm:grid-cols-2">
        {spec.options.map((o, i) => {
          const on = picked === o.id;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={on}
              onClick={() => setPicked(o.id)}
              className={`flex min-h-11 flex-col gap-1.5 rounded-xl border p-4 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-light ${
                on ? "border-accent-light bg-accent/10" : "border-white/[0.08] bg-bg hover:border-white/[0.2]"
              }`}
            >
              <span className="font-body text-[11px] uppercase tracking-wider text-dim">
                Option {String.fromCharCode(65 + i)}
              </span>
              <span className="font-display text-base font-semibold text-primary">{o.label}</span>
              <span className="font-body text-sm leading-relaxed text-muted">{o.summary}</span>
            </button>
          );
        })}
      </div>

      <div aria-live="polite" className="mt-5">
        <AnimatePresence mode="wait" initial={false}>
          {!current && (
            <motion.p
              key="empty"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-xl border border-dashed border-white/[0.1] p-5 font-body text-sm text-muted"
            >
              Pick an option to see what the reader would see.
            </motion.p>
          )}
          {current && (
            <motion.div
              key={current.id}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-xl border p-5 ${shipped ? "border-accent-light/60" : "border-white/[0.08]"} bg-bg`}
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
                <div className="sm:w-56 sm:shrink-0">
                  <div
                    className={`font-display text-4xl font-semibold tracking-tight [font-variant-numeric:tabular-nums] ${
                      current.tone === "warn" ? "text-red-400" : "text-primary"
                    }`}
                  >
                    {current.figure}
                  </div>
                  {current.figureNote && (
                    <p className={`mt-1 font-body text-xs ${current.tone === "warn" ? "text-red-300" : "text-muted"}`}>
                      {current.figureNote}
                    </p>
                  )}
                </div>
                <p className="font-body text-sm leading-relaxed text-muted">{current.body}</p>
              </div>

              {shipped ? (
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-white/[0.08] border-l-4 border-l-accent-light bg-card p-4">
                    <p className="font-body text-[11px] font-semibold uppercase tracking-wider text-accent-light">
                      Decision record · what I chose
                    </p>
                    <p className="mt-1.5 font-body text-sm leading-relaxed text-muted">{spec.record}</p>
                  </div>
                  <div className="rounded-lg border border-white/[0.08] border-l-4 border-l-red-400 bg-card p-4">
                    <p className="font-body text-[11px] font-semibold uppercase tracking-wider text-red-300">
                      The cost is real
                    </p>
                    <p className="mt-1.5 font-body text-sm leading-relaxed text-muted">{spec.cost}</p>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setPicked(spec.chosen)}
                  className="mt-5 min-h-11 rounded-full border border-accent-light/60 px-4 font-body text-sm font-medium text-accent-light transition-colors duration-200 hover:bg-accent/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-light"
                >
                  See what I shipped
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
