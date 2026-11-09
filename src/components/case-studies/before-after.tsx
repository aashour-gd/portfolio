"use client";

// Before/after comparison: two screens in one frame, a draggable divider, and numbered notes.
// Used from case-study markdown via a ```compare fenced block (see markdown-case-study.tsx).
import { useCallback, useEffect, useRef, useState } from "react";

export type CompareNote = {
  side: "before" | "after";
  /** Short marker shown on the pin and beside the note, e.g. "A" or "1". */
  id: string;
  /** Pin position as a percentage of the frame (0–100). */
  x: number;
  y: number;
  title: string;
  text: string;
};

export type CompareSpec = {
  title?: string;
  before: { src: string; label: string; alt?: string };
  after: { src: string; label: string; alt?: string };
  notes?: CompareNote[];
  /** Divider start position in % (default 50). */
  start?: number;
  caption?: string;
  /** Text for the two toggle buttons (default "Before" / "After"). */
  toggleLabels?: { before: string; after: string };
};

const clamp = (v: number) => Math.min(100, Math.max(0, v));

export default function BeforeAfter({ spec, width, height }: { spec: CompareSpec; width: number; height: number }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [pos, setPos] = useState(clamp(spec.start ?? 50));
  const [animate, setAnimate] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const notes = spec.notes ?? [];
  const beforeNotes = notes.filter((n) => n.side === "before");
  const afterNotes = notes.filter((n) => n.side === "after");

  const posFromEvent = useCallback((clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => dragging.current && posFromEvent(e.clientX);
    const up = () => (dragging.current = false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [posFromEvent]);

  // Jump the divider to show one side fully (from the toggle buttons or a note), with a short glide.
  const reveal = (side: "before" | "after") => {
    setAnimate(true);
    setPos(side === "before" ? 100 : 0);
    window.setTimeout(() => setAnimate(false), 450);
  };

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    const keys: Record<string, number> = {
      ArrowLeft: pos - step, ArrowDown: pos - step, ArrowRight: pos + step, ArrowUp: pos + step, Home: 0, End: 100,
    };
    if (e.key in keys) {
      e.preventDefault();
      setPos(clamp(keys[e.key]));
    }
  };

  const glide = animate ? "transition-[clip-path,left] duration-[400ms] ease-out motion-reduce:transition-none" : "";

  const Pin = ({ n }: { n: CompareNote }) => (
    <span
      aria-hidden
      className={`absolute -translate-x-1/2 -translate-y-1/2 grid place-items-center w-5 h-5 lg:w-7 lg:h-7 rounded-full border-2 border-white font-body text-[10px] lg:text-xs font-bold text-white shadow-[0_2px_8px_rgba(0,0,0,0.35)] transition-transform duration-200 ${
        n.side === "before" ? "bg-slate-500" : "bg-accent"
      } ${active === n.side + n.id ? "scale-125 ring-4 ring-white/40" : ""}`}
      style={{ left: `${n.x}%`, top: `${n.y}%` }}
    >
      {n.id}
    </span>
  );

  const NoteList = ({ side, items, heading }: { side: "before" | "after"; items: CompareNote[]; heading: string }) =>
    items.length === 0 ? null : (
      <div>
        <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.15em] text-dim">{heading}</p>
        <ul className="flex flex-col gap-1">
          {items.map((n) => (
            <li key={n.id}>
              <button
                type="button"
                onClick={() => reveal(side)}
                onMouseEnter={() => setActive(side + n.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(side + n.id)}
                onBlur={() => setActive(null)}
                className="group w-full text-left flex gap-3 rounded-lg p-2 -mx-2 hover:bg-white/[0.04] focus-visible:bg-white/[0.04] focus-visible:outline-none transition-colors cursor-pointer"
              >
                <span
                  className={`mt-0.5 grid place-items-center shrink-0 w-6 h-6 rounded-full font-body text-[11px] font-bold text-white ${
                    side === "before" ? "bg-slate-500" : "bg-accent"
                  }`}
                >
                  {n.id}
                </span>
                <span className="font-body text-sm leading-relaxed text-muted">
                  <strong className="font-semibold text-primary">{n.title}</strong> {n.text}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );

  return (
    <figure className="my-10">
      {spec.title && <figcaption className="mb-3 font-display text-lg font-semibold text-primary">{spec.title}</figcaption>}

      {/* Outer layer isn't clipped, so the handle can hang half outside the image at either end */}
      <div
        data-no-lightbox
        className="relative select-none touch-pan-y cursor-ew-resize"
        onPointerDown={(e) => {
          dragging.current = true;
          setAnimate(false);
          posFromEvent(e.clientX);
        }}
      >
      <div
        ref={frameRef}
        className="relative w-full overflow-hidden rounded-xl border border-white/[0.08] bg-surface shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        {/* Before: the base layer */}
        <div className="absolute inset-0">
          <img src={spec.before.src} alt={spec.before.alt ?? spec.before.label} className="w-full h-full object-cover" draggable={false} />
          {beforeNotes.map((n) => <Pin key={n.id} n={n} />)}
        </div>

        {/* After: revealed to the right of the divider */}
        <div className={`absolute inset-0 ${glide}`} style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
          <img src={spec.after.src} alt={spec.after.alt ?? spec.after.label} className="w-full h-full object-cover" draggable={false} />
          {afterNotes.map((n) => <Pin key={n.id} n={n} />)}
        </div>

        {/* Corner labels fade out when their side is mostly hidden */}
        <span
          className="pointer-events-none absolute left-2 bottom-2 lg:left-3 lg:bottom-3 rounded-md bg-black/70 px-1.5 py-0.5 lg:px-2.5 lg:py-1 font-body text-[9px] lg:text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-opacity"
          style={{ opacity: pos > 18 ? 1 : 0 }}
        >
          {spec.before.label}
        </span>
        <span
          className="pointer-events-none absolute right-2 bottom-2 lg:right-3 lg:bottom-3 rounded-md bg-accent/90 px-1.5 py-0.5 lg:px-2.5 lg:py-1 font-body text-[9px] lg:text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-opacity"
          style={{ opacity: pos < 82 ? 1 : 0 }}
        >
          {spec.after.label}
        </span>

        {/* Divider line */}
        <div className={`pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_12px_rgba(0,0,0,0.4)] ${glide}`} style={{ left: `${pos}%` }} />
      </div>
        {/* Handle: centred on the divider, so at 0% and 100% half of it sits outside the image */}
        <div
          role="slider"
          tabIndex={0}
          aria-label={`Compare ${spec.before.label} and ${spec.after.label}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(100 - pos)}% ${spec.after.label} shown`}
          onKeyDown={onKey}
          className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center w-9 h-9 lg:w-11 lg:h-11 rounded-full bg-white text-slate-900 shadow-[0_4px_16px_rgba(0,0,0,0.35)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/60 ${glide}`}
          style={{ left: `${pos}%` }}
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M7 5L2 10l5 5M13 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Toggle buttons: a no-drag way to switch, and the clearest control on touch screens */}
      <div className="mt-3 flex items-center justify-between gap-4">
        <div className="inline-flex rounded-lg border border-white/[0.08] p-1 font-body text-xs">
          <button type="button" onClick={() => reveal("before")} className={`rounded-md px-3 py-1.5 transition-colors cursor-pointer ${pos > 50 ? "bg-white/[0.08] text-primary" : "text-muted hover:text-primary"}`}>
            {spec.toggleLabels?.before ?? "Before"}
          </button>
          <button type="button" onClick={() => reveal("after")} className={`rounded-md px-3 py-1.5 transition-colors cursor-pointer ${pos <= 50 ? "bg-accent text-white" : "text-muted hover:text-primary"}`}>
            {spec.toggleLabels?.after ?? "After"}
          </button>
        </div>
        <span className="hidden sm:block font-body text-xs text-dim">Drag the handle to compare</span>
      </div>

      {notes.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <NoteList side="before" items={beforeNotes} heading="What held it back" />
          <NoteList side="after" items={afterNotes} heading="What changed" />
        </div>
      )}

      {spec.caption && <p className="mt-4 font-body text-xs text-dim">{spec.caption}</p>}
    </figure>
  );
}
