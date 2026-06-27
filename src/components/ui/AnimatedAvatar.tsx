"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedAvatarProps {
  src: string;
  alt?: string;
  size?: number;
}

export default function AnimatedAvatar({
  src,
  alt = "Ahmed Ashour",
  size = 400,
}: AnimatedAvatarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // --- Eye tracking ---
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const angle = Math.atan2(dy, dx);
      const distance = Math.min(Math.hypot(dx, dy), 300);
      const strength = (distance / 300) * 5; // max 5px shift
      setEyeOffset({
        x: Math.cos(angle) * strength,
        y: Math.sin(angle) * strength,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // --- Random blink ---
  useEffect(() => {
    const scheduleBlink = () => {
      const delay = 2500 + Math.random() * 4000; // blink every 2.5–6.5s
      return setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
        blinkTimer.current = scheduleBlink();
      }, delay);
    };
    const blinkTimer = { current: scheduleBlink() };
    return () => clearTimeout(blinkTimer.current);
  }, []);

  const eyes = [
    { x: 0.4, y: 0.472 }, // left eye (inside left lens)
    { x: 0.61, y: 0.472 }, // right eye (inside right lens)
  ];

  const eyeRx = size * 0.05;
  const eyeRy = size * 0.035;
  const irisRadius = size * 0.035;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setEyeOffset({ x: 1, y: 0 });
      }}
      style={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        // Float animation
        animation: "avatarFloat 4s ease-in-out infinite",
        cursor: "pointer",
        // Subtle scale on hover
        transform: isHovered ? "scale(1.03)" : "scale(1)",
        transition: "transform 0.4s ease",
        // Glow on hover
        boxShadow: isHovered
          ? "0 0 40px rgba(37, 99, 235, 0.35), 0 20px 60px rgba(0,0,0,0.4)"
          : "0 20px 60px rgba(0,0,0,0.3)",
      }}
    >
      {/* Base avatar image */}
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          borderRadius: "50%",
        }}
        draggable={false}
      />

      {/* Eye tracking overlay — SVG layer on top of image */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          borderRadius: "50%",
        }}
        viewBox={`0 0 ${size} ${size}`}
      >
        {eyes.map((eye, i) => {
          const cx = eye.x * size;
          const cy = eye.y * size;
          return (
            <g key={i}>
              {/* Sclera (white of eye) */}
              <ellipse cx={cx} cy={cy} rx={eyeRx} ry={eyeRy} fill="white" stroke="black" strokeWidth={size * 0.005} />

              {/* Eyelid blink — covers sclera with skin tone */}
              {isBlinking && (
                <ellipse cx={cx} cy={cy} rx={eyeRx} ry={eyeRy} fill="#D4865A" />
              )}

              {/* Iris */}
              {!isBlinking && (
                <circle
                  cx={cx + eyeOffset.x}
                  cy={cy + eyeOffset.y}
                  r={irisRadius}
                  fill="rgba(60, 30, 10, 0.9)"
                />
              )}
              {/* Pupil */}
              {!isBlinking && (
                <circle
                  cx={cx + eyeOffset.x}
                  cy={cy + eyeOffset.y}
                  r={irisRadius * 0.52}
                  fill="rgba(10, 5, 0, 0.95)"
                />
              )}
              {/* Eye shine */}
              {!isBlinking && (
                <circle
                  cx={cx + eyeOffset.x + irisRadius * 0.3}
                  cy={cy + eyeOffset.y - irisRadius * 0.35}
                  r={irisRadius * 0.22}
                  fill="rgba(255,255,255,0.9)"
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Float keyframe — inject once */}
      <style>{`
        @keyframes avatarFloat {
          0%   { transform: translateY(0px); }
          50%  { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="avatarFloat"] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
