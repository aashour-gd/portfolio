"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  buttonText: string;
  accent: string;
  children: React.ReactNode;
}

export default function ExpandableSection({ buttonText, accent, children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-5">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 text-sm font-medium transition-opacity duration-200 hover:opacity-80"
        style={{ color: accent }}
      >
        <span className="text-base leading-none select-none">{open ? "－" : "＋"}</span>
        {open ? "Read less" : buttonText}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div
              className="mt-4 rounded-xl p-5 text-sm leading-[1.75]"
              style={{
                background: `${accent}12`,
                borderLeft: `3px solid ${accent}`,
                color: "#CBD5E1",
              }}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
