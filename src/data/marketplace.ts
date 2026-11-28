export type MarketplaceItem = {
  id: string;
  name: string;
  description: string;
  category: "UI Kit" | "Design System" | "Figma File" | "Template" | "Icon Pack";
  price: "Free" | string;
  gradient: string;
  featured: boolean;
  url?: string;
  cover?: string;
};

export const marketplaceItems: MarketplaceItem[] = [
  {
    id: "medu-design-system",
    name: "Medu Design System",
    description: "A free, production-ready Figma design system — components, styles, and tokens you can drop straight into your product work.",
    category: "Design System",
    price: "Free",
    gradient: "from-purple-800/40 to-violet-900/40",
    featured: true,
    url: "https://www.figma.com/community/file/1677113048340520722/medu-design-system",
    cover: "/images/medu-cover.png",
  },
  {
    id: "finaity-finance-dashboard",
    name: "Personal Finance Dashboard UI Kit – Finaity",
    description: "A clean, free personal-finance dashboard UI kit — balance, cash flow, budgets, goals, and investment views ready to adapt for any fintech product.",
    category: "UI Kit",
    price: "Free",
    gradient: "from-indigo-800/40 to-violet-900/40",
    featured: true,
    url: "https://www.figma.com/community/file/1699564495019965862",
    cover: "/images/finaity-cover.png",
  },
  {
    id: "pillow-icons",
    name: "Pillow Icons",
    description: "100 soft, rounded product icons in outline and filled styles, ready to drop into your Figma files.",
    category: "Icon Pack",
    price: "Free",
    gradient: "from-orange-800/40 to-violet-900/40",
    featured: true,
    url: "https://www.figma.com/community/file/1696980963052003898",
    cover: "/images/pillow-icons-cover.png",
  },
  {
    id: "text-animation-kit",
    name: "Text Animation Kit – Figma Motion",
    description: "42 ready-made text animations for Figma Motion, built as cards you can duplicate. Fade-ups, typewriters, tracking, scramble, karaoke captions, counters and more.",
    category: "Template",
    price: "Free",
    gradient: "from-blue-800/40 to-slate-900/40",
    featured: true,
    url: "https://www.figma.com/community/file/1704841647788626531",
    cover: "/images/text-animation-cover.png",
  },
];

export const marketplaceCategories = ["All", "UI Kit", "Design System", "Icon Pack", "Template"] as const;
