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
    slug: "configurable-data-table",
    title: "Flexible Data Tables for Enterprise Retail Media",
    category: "UI/UX Design",
    year: "2025",
    description: "Configurable table system with saved views, column management, and density control — adapting one dataset to Operations, Finance, and Performance workflows.",
    tags: ["Product Design", "Enterprise UX", "Design Systems", "Data Tables"],
    featured: true,
    gradient: "from-indigo-900/50 via-blue-900/30 to-transparent",
    cover: "/assets/case-study-1.png",
    href: "/work/configurable-data-table",
  },
  {
    slug: "campaign-intelligence-dashboard",
    title: "Campaign Intelligence Dashboard",
    category: "UI/UX Design",
    year: "2025",
    description: "Triage-first dashboard translating raw campaign data into health signals, ranked recommendations, and cross-tab workspaces.",
    tags: ["Dashboard Design", "Data Visualization", "Information Architecture"],
    featured: true,
    gradient: "from-indigo-900/50 via-blue-900/30 to-transparent",
    href: "/work/campaign-intelligence-dashboard",
  },
  {
    slug: "dual-mode-design-tokens",
    title: "Dual-Mode Design Token System",
    category: "UI/UX Design",
    year: "2024",
    description: "Theming architecture and accessibility audit fixing dark-mode contrast failures across a mature component library.",
    tags: ["Design Tokens", "Accessibility", "Theming"],
    featured: true,
    gradient: "from-blue-900/50 via-indigo-900/30 to-transparent",
    href: "/work/dual-mode-design-tokens",
  },
  {
    slug: "bulk-campaign-builder",
    title: "Bulk Campaign Builder",
    category: "UI/UX Design",
    year: "2024",
    description: "Spreadsheet-style bulk editor balancing power-user density with sticky orientation cues and shared selection patterns.",
    tags: ["Power-User Tools", "Data Grids", "Interaction Design"],
    featured: true,
    gradient: "from-blue-900/50 via-cyan-900/30 to-transparent",
    href: "/work/bulk-campaign-builder",
  },
  {
    slug: "intouch-live",
    title: "Intouch Live Platform",
    category: "UI/UX Design",
    year: "2025",
    description: "A unified retail media network platform that replaced 4+ legacy systems — cutting creative approval time by 40% and scaling to enterprise retailers across the region.",
    tags: ["Product Design", "Enterprise UX", "Design Systems"],
    featured: true,
    gradient: "from-slate-800/60 via-violet-900/30 to-transparent",
    href: "/work/intouch-live",
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
  {
    slug: "geneina",
    title: "Geneina",
    category: "UI/UX Design",
    year: "2025",
    description: "Product design for Geneina — translating complex user needs into clear, accessible digital experiences.",
    tags: ["Product Design", "UX/UI"],
    featured: false,
    gradient: "from-green-900/50 via-teal-900/30 to-transparent",
    href: "#",
    external: true,
  },
  {
    slug: "nodens-system",
    title: "Nodens Pharmacy System",
    category: "UI/UX Design",
    year: "2020",
    description: "Pharmacy management system designed to reduce pharmacist stress — user interviews revealed the real problem wasn't information overload but workflow friction.",
    tags: ["UX Research", "Healthcare", "Dashboard"],
    featured: false,
    gradient: "from-emerald-900/50 via-green-900/30 to-transparent",
    href: "#",
    external: true,
  },
  {
    slug: "wegather-app",
    title: "Wegather Mobile App",
    category: "UI/UX Design",
    year: "2018",
    description: "Mobile application design for a social gathering platform — one of the early projects that shaped my approach to user-centered design.",
    tags: ["Mobile Design", "Social", "UX/UI"],
    featured: false,
    gradient: "from-sky-900/50 via-blue-900/30 to-transparent",
    href: "#",
    external: true,
  },
  {
    slug: "intouch-live-design-system",
    title: "Intouch Live Design System",
    category: "UI/UX Design",
    year: "2025",
    description: "A comprehensive design system built on an 8-point grid, Poppins/SF/Roboto type stack, and Feather icons — enabling consistent, scalable UI across web, iOS, and Android.",
    tags: ["Design Systems", "Component Library", "Accessibility", "Responsive Design"],
    featured: false,
    gradient: "from-violet-900/50 via-purple-900/30 to-transparent",
    href: "#",
    external: true,
  },
  {
    slug: "capsulah",
    title: "Capsulah Mobile App & Dashboard",
    category: "UI/UX Design",
    year: "2018",
    description: "Health and medicine app with location-based pharmacy discovery, medication reminders, and medicine package scanning with safety verification.",
    tags: ["Mobile Design", "Healthcare", "Dashboard", "UX/UI"],
    featured: false,
    gradient: "from-cyan-900/50 via-teal-900/30 to-transparent",
    href: "#",
    external: true,
  },
  {
    slug: "football-app",
    title: "Football Mobile App",
    category: "UI/UX Design",
    year: "2018",
    description: "Mobile app mockup for Teletica Football — covering live match streams, video highlights, and a gameday section.",
    tags: ["Mobile Design", "Sports", "UI Mockup"],
    featured: false,
    gradient: "from-orange-900/50 via-amber-900/30 to-transparent",
    href: "#",
    external: true,
  },
  {
    slug: "social-media-system",
    title: "Social Media Design System",
    category: "Social Media",
    year: "2023",
    description: "A templated content design system enabling a team to produce consistent, on-brand social assets at scale.",
    tags: ["Content Design", "Templates", "Brand"],
    featured: false,
    gradient: "from-cyan-900/50 via-blue-900/30 to-transparent",
    href: "#",
    external: true,
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured).slice(0, 6);
}

export function getProjectsByCategory(category: Project["category"] | "All"): Project[] {
  if (category === "All") return projects;
  return projects.filter((p) => p.category === category);
}
