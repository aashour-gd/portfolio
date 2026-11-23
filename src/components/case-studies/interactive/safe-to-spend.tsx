"use client";

import { useId, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Minus, Plus } from "lucide-react";

// Spec for a ```safe-to-spend block. A live component, not a screenshot:
// the reader opens the number to see every line behind it.
export type SafeToSpendSpec = {
  label: string;
  whole: string;
  decimals: string;
  lines: { label: string; value: string }[];
  total: { label: string; value: string };
  note?: string;
};

export default function SafeToSpend({ spec }: { spec: SafeToSpendSpec }) {
  const [open, setOpen] = useState(true);
  const reduce = useReducedMotion();
  const panelId = useId();

  return (
    <div className="my-10 mx-auto w-full max-w-md rounded-[28px] border border-white/[0.08] bg-card p-7">
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="font-body text-sm text-muted">{spec.label}</span>
        <span className="rounded-full bg-accent/15 px-2.5 py-1 font-body text-[11px] font-semibold uppercase tracking-wider text-accent-light">
          Live component
        </span>
      </div>
      <div className="mb-5 font-display text-5xl font-semibold leading-none tracking-tight text-primary [font-variant-numeric:tabular-nums]">
        {spec.whole}
        <span className="text-3xl text-muted">{spec.decimals}</span>
      </div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex min-h-11 w-full items-center justify-between rounded-xl border border-white/[0.08] bg-bg px-4 font-body text-sm font-medium text-primary transition-colors duration-200 hover:border-accent-light/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-light"
      >
        <span>{open ? "Hide how this is calculated" : "Show how this is calculated"}</span>
        {open ? <Minus size={16} className="text-accent-light" aria-hidden /> : <Plus size={16} className="text-accent-light" aria-hidden />}
      </button>
      <div id={panelId}>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="lines"
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-4 overflow-hidden rounded-xl border border-white/[0.08] font-body text-sm [font-variant-numeric:tabular-nums]">
                {spec.lines.map((l) => (
                  <div key={l.label} className="flex justify-between gap-4 border-b border-white/[0.06] px-4 py-3">
                    <span className="text-muted">{l.label}</span>
                    <span className="font-medium text-primary">{l.value}</span>
                  </div>
                ))}
                <div className="flex justify-between gap-4 bg-accent/15 px-4 py-3 font-semibold text-primary">
                  <span>{spec.total.label}</span>
                  <span>{spec.total.value}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {spec.note && <p className="mt-4 font-body text-xs text-dim">{spec.note}</p>}
    </div>
  );
}
