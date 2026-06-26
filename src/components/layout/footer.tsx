import Link from "next/link";
import { profile, nav, socials } from "@/data/content";
import Logo from "@/components/ui/logo";

const footerLinks = [
  { heading: "Navigation", links: nav },
  {
    heading: "Connect",
    links: [
      { label: "Email", href: `mailto:${profile.email}` },
      ...socials,
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-surface">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4 hover:opacity-70 transition-opacity duration-200">
              <Logo size={28} variant="white" />
              <span className="font-display font-semibold text-base text-primary tracking-tight">
                {profile.name}
              </span>
            </Link>
            <p className="text-sm font-body text-muted leading-relaxed max-w-xs">
              Senior Product Designer crafting systems and experiences that solve real problems.
            </p>
          </div>
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-body font-semibold uppercase tracking-widest text-dim mb-4">
                {col.heading}
              </p>
              <div className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm font-body text-muted hover:text-primary transition-colors duration-200 cursor-pointer w-fit"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-white/[0.06]">
          <p className="text-xs font-body text-dim">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="text-xs font-body text-dim">
            {profile.location} — {profile.role}
          </p>
        </div>
      </div>
    </footer>
  );
}
