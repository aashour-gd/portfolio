export type MarketplaceItem = {
  id: string;
  name: string;
  description: string;
  category: "UI Kit" | "Design System" | "Figma File" | "Template" | "Icon Pack";
  price: "Free" | string;
  downloads: string;
  gradient: string;
  featured: boolean;
};

export const marketplaceItems: MarketplaceItem[] = [
  {
    id: "enterprise-dashboard-kit",
    name: "Enterprise Dashboard UI Kit",
    description: "300+ components for data-dense enterprise interfaces. Tables, charts, filters, and more.",
    category: "UI Kit",
    price: "Free",
    downloads: "2.4k",
    gradient: "from-violet-800/40 to-indigo-900/40",
    featured: true,
  },
  {
    id: "design-token-system",
    name: "Design Token System",
    description: "Production-ready token architecture for light and dark mode, with semantic naming convention.",
    category: "Design System",
    price: "$19",
    downloads: "1.1k",
    gradient: "from-purple-800/40 to-violet-900/40",
    featured: true,
  },
  {
    id: "figma-component-library",
    name: "Figma Component Library",
    description: "Fully documented component library with auto-layout, variants, and interactive states.",
    category: "Figma File",
    price: "$29",
    downloads: "890",
    gradient: "from-indigo-800/40 to-blue-900/40",
    featured: true,
  },
  {
    id: "pitch-deck-template",
    name: "Pitch Deck Template",
    description: "20-slide presentation template for product designers presenting their work and process.",
    category: "Template",
    price: "Free",
    downloads: "3.2k",
    gradient: "from-blue-800/40 to-cyan-900/40",
    featured: false,
  },
  {
    id: "ui-icon-pack",
    name: "Product UI Icon Pack",
    description: "500+ consistent stroke icons for product and SaaS interfaces.",
    category: "Icon Pack",
    price: "$9",
    downloads: "1.8k",
    gradient: "from-rose-800/40 to-pink-900/40",
    featured: false,
  },
  {
    id: "case-study-template",
    name: "Case Study Template",
    description: "Structured Figma template for presenting product design case studies professionally.",
    category: "Template",
    price: "Free",
    downloads: "4.1k",
    gradient: "from-amber-800/40 to-orange-900/40",
    featured: false,
  },
];

export const marketplaceCategories = ["All", "UI Kit", "Design System", "Figma File", "Template", "Icon Pack"] as const;
