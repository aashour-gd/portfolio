"use client";

import { useEffect, useRef, useState } from "react";

// The CityDal prototype, embedded as an iframe. Set NEXT_PUBLIC_CITYDAL_URL to the deployed app;
// without it the embed points at the local dev server (npm run dev in the CityDal folder, port 8093).
const BASE = process.env.NEXT_PUBLIC_CITYDAL_URL ?? "http://localhost:8093";
// ?embed=1 makes the app use the site's dark background behind the phone.
const SRC = `${BASE}${BASE.includes("?") ? "&" : "?"}embed=1`;

type Theme = "light" | "dark";
type Lang = "en" | "ar";
const ORIGIN = (() => { try { return new URL(BASE).origin; } catch { return "*"; } })();

export default function CityDalEmbed() {
  const frame = useRef<HTMLIFrameElement>(null);
  const [theme, setTheme] = useState<Theme | null>(null);
  const [lang, setLang] = useState<Lang | null>(null);

  // The app reports its current theme on load and whenever it changes (also when the visitor uses its own Appearance setting).
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.source !== frame.current?.contentWindow) return;
      if (e.data?.type === "citydal:theme" && (e.data.theme === "light" || e.data.theme === "dark")) setTheme(e.data.theme);
      if (e.data?.type === "citydal:lang" && (e.data.lang === "en" || e.data.lang === "ar")) setLang(e.data.lang);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const chooseLang = (l: Lang) => {
    setLang(l);
    frame.current?.contentWindow?.postMessage({ type: "citydal:set-lang", lang: l }, ORIGIN);
  };

  const choose = (t: Theme) => {
    setTheme(t);
    frame.current?.contentWindow?.postMessage({ type: "citydal:set-theme", theme: t }, ORIGIN);
  };

  if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_CITYDAL_URL) {
    return (
      <p className="rounded-xl border border-white/[0.08] p-6 text-center text-sm text-white/60">
        The live prototype is not connected yet.
      </p>
    );
  }
  return (
    <div className="mx-auto w-full max-w-[720px]">
      <div className="mb-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        <Segmented label="Appearance" value={theme} onChange={choose} options={[["light", "Light"], ["dark", "Dark"]]} />
        <Segmented label="Language" value={lang} onChange={chooseLang} options={[["en", "English"], ["ar", "العربية"]]} />
      </div>
      <iframe
        ref={frame}
        src={SRC}
        title="CityDal prototype"
        allow="geolocation"
        loading="lazy"
        className="block h-[940px] w-full border-0 bg-[#09090b]"
      />
      <p className="mt-3 text-center text-sm text-white/50">
        A working prototype, not screenshots.{" "}
        <a href={BASE} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-white">
          Open it full screen
        </a>
        .
      </p>
    </div>
  );
}

function Segmented<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T | null;
  onChange: (v: T) => void;
  options: [T, string][];
}) {
  return (
    <div role="group" aria-label={`Prototype ${label.toLowerCase()}`} className="flex items-center gap-3">
      <span className="font-body text-sm text-white/50">{label}</span>
      <div className="inline-flex rounded-full border border-white/[0.12] bg-white/[0.06] p-1">
        {options.map(([v, text]) => (
          <button
            key={v}
            type="button"
            aria-pressed={value === v}
            lang={v === "ar" ? "ar" : undefined}
            onClick={() => onChange(v)}
            className={`min-h-11 rounded-full px-5 font-body text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-light ${
              value === v ? "bg-white text-[#09090b]" : "text-white/70 hover:text-white"
            }`}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}
