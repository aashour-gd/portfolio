"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Menu } from "lucide-react";
import { profile, nav, socials } from "@/data/content";
import Logo from "@/components/ui/logo";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "bg-bg/90 backdrop-blur-xl border-white/[0.06]"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity duration-200"
            aria-label="Ahmed Ashour — Home"
          >
            <Logo size={30} />
            <span className="font-display font-semibold text-base text-primary hidden sm:block tracking-tight">
              {profile.name}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg font-body text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    active
                      ? "text-primary bg-white/[0.06]"
                      : "text-muted hover:text-primary hover:bg-white/[0.04]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-light text-white text-sm font-medium font-body rounded-lg transition-colors duration-200 shadow-lg shadow-accent/20 cursor-pointer"
            >
              Hire Me
            </a>
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-white/[0.08] text-muted hover:text-primary hover:border-white/[0.14] transition-[color,border-color] duration-200 cursor-pointer"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-bg transition-all duration-500 ease-[cubic-bezier(.65,0,.35,1)] md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div className="flex flex-col justify-center flex-1 px-8 pt-[72px]">
          <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-4 border-b border-white/[0.06] font-display text-3xl font-semibold text-muted hover:text-primary transition-colors duration-200 cursor-pointer"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-12 flex flex-col gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="text-sm font-body font-medium text-muted hover:text-primary transition-colors cursor-pointer"
            >
              {profile.email}
            </a>
            <div className="flex gap-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-body text-muted hover:text-primary transition-colors cursor-pointer"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
