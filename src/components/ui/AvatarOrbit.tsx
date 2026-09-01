"use client";

import { useState } from "react";
import AnimatedAvatar from "@/components/ui/AnimatedAvatar";

interface AvatarOrbitProps {
  src: string;
  size?: number;
}

/** Job-related chips that fan out from behind the avatar on hover.
 *  Offsets are from the avatar centre (px). Balanced around the rim so no
 *  pill is hidden under the circle. Kept outside AnimatedAvatar because that
 *  container is overflow:hidden + border-radius:50%. */
const CHIPS: { label: string; x: number; y: number }[] = [
  { label: "Figma",          x: -155, y: -155 }, // top-left
  { label: "AI Design",      x:  150, y: -160 }, // top-right
  { label: "Design Systems", x: -215, y:   15 }, // left
  { label: "User Research",  x:  185, y:   15 }, // right
  { label: "UX Strategy",    x: -110, y:  170 }, // bottom-left
  { label: "Prototyping",    x:  100, y:  170 }, // bottom-right
];

export default function AvatarOrbit({ src, size = 380 }: AvatarOrbitProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", width: size, height: size }}
    >
      {/* Orbit chips — behind the avatar, emerge from centre */}
      {CHIPS.map((chip, i) => (
        <span
          key={chip.label}
          aria-hidden
          className="avatar-orbit-chip"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            zIndex: 20,
            whiteSpace: "nowrap",
            padding: "7px 14px",
            borderRadius: 9999,
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.01em",
            color: hovered ? "rgba(226,232,240,0.92)" : "rgba(226,232,240,0.9)",
            background: "rgba(255,255,255,0.055)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.28)",
            pointerEvents: "none",
            transform: hovered
              ? `translate(calc(-50% + ${chip.x}px), calc(-50% + ${chip.y}px)) scale(1)`
              : "translate(-50%, -50%) scale(0.5)",
            opacity: hovered ? 1 : 0,
            transition:
              "transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease",
            transitionDelay: hovered ? `${i * 55}ms` : "0ms",
          }}
        >
          {chip.label}
        </span>
      ))}

      {/* Avatar sits above the chips */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <AnimatedAvatar src={src} size={size} />
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .avatar-orbit-chip { transition: none !important; }
        }
      `}</style>
    </div>
  );
}
