"use client";

import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  accent: string;
}

export default function CoverImage({ src, alt, accent }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="flex flex-col items-center justify-center gap-3 rounded-xl"
        style={{
          minHeight: "240px",
          border: `2px dashed ${accent}40`,
          background: `${accent}08`,
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: `${accent}60` }}
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-5-5L5 21" />
        </svg>
        <span className="text-xs font-medium" style={{ color: `${accent}80` }}>
          Your screenshot goes here
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden">
      <img
        src={src}
        alt={alt}
        onError={() => setFailed(true)}
        style={{ width: "100%", height: "auto", display: "block" }}
      />
    </div>
  );
}
