export type Project = {
  slug: string;
  title: string;
  category: "UI/UX Design" | "Graphic Design" | "Motion Design" | "Social Media" | "Others";
  year: string;
  description: string;
  tags: string[];
  featured: boolean;
  gradient: string;
  cover?: string;
  href: string;
  external?: boolean;
};

export const projects: Project[] = [
  {
    slug: "retail-media-network-portal",
    title: "Retail Media Network Portal",
    category: "UI/UX Design",
    year: "2026",
    description: "A two-sided retail media platform — the retailer's operations console and the advertiser's self-serve portal — designed and built end-to-end in one Angular codebase.",
    tags: ["Product Design", "Design Systems", "Front-end Architecture", "AdTech"],
    featured: true,
    gradient: "from-slate-800/60 via-indigo-900/30 to-transparent",
    cover: "/images/nexa-cover.png",
    href: "/work/retail-media-network-portal",
  },
  {
    slug: "retail-os",
    title: "Retail OS — Modular Retail Platform",
    category: "UI/UX Design",
    year: "2026",
    description: "A four-sided omnichannel platform — customer, retailer, store, brand — sharing one design system, piloted on a 78-year-old wholesaler and pressure-tested against a second retailer.",
    tags: ["Product Design", "UX Strategy", "Design Systems", "Retail Media"],
    featured: true,
    gradient: "from-amber-900/50 via-orange-900/30 to-transparent",
    cover: "/images/retail-os-cover.png",
    href: "/case-studies/retail-os",
  },
  {
    slug: "designguard",
    title: "DesignGuard — AI-Powered Design QA",
    category: "UI/UX Design",
    year: "2025",
    description: "An AI-powered CLI that audits Figma files against design-system rules — catching spacing, color, and typography inconsistencies before they reach the developer.",
    tags: ["AI", "Design QA", "Design Systems", "Developer Tools"],
    featured: true,
    gradient: "from-blue-900/50 via-indigo-900/30 to-transparent",
    cover: "/images/designguard.png",
    href: "/work/designguard",
  },
  {
    slug: "flexible-data-tables",
    title: "Flexible Data Tables for Enterprise Retail Media",
    category: "UI/UX Design",
    year: "2025",
    description: "Configurable table system with saved views, column management, and density control — adapting one dataset to Operations, Finance, and Performance workflows.",
    tags: ["Product Design", "Enterprise UX", "Design Systems", "Data Tables"],
    featured: true,
    gradient: "from-indigo-900/50 via-blue-900/30 to-transparent",
    cover: "/images/nexa-tables-cover.png",
    href: "/work/flexible-data-tables",
  },
  {
    slug: "afif",
    title: "AFIF Mobile App",
    category: "UI/UX Design",
    year: "2023",
    description: "End-to-end UX/UI design for a child safety app — parental monitoring dashboard, dual user flows, logo, and brand identity.",
    tags: ["Mobile Design", "UX Research", "Prototyping"],
    featured: true,
    gradient: "from-teal-900/50 via-emerald-900/30 to-transparent",
    cover: "/assets/afif/Cover.png",
    href: "/work/afif",
  },
  {
    slug: "citydal-app",
    title: "CityDal Brand Identity",
    category: "Graphic Design",
    year: "2023",
    description: "Complete brand identity for CityDal — logo, color system, typography, and visual language brought to life across digital and print.",
    tags: ["Brand Identity", "Logo Design", "Visual System"],
    featured: true,
    gradient: "from-rose-900/50 via-pink-900/30 to-transparent",
    cover: "/assets/citydal/brand_cover.png",
    href: "/work/citydal-app",
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured).slice(0, 6);
}

export function getProjectsByCategory(category: Project["category"] | "All"): Project[] {
  if (category === "All") return projects;
  return projects.filter((p) => p.category === category);
}
