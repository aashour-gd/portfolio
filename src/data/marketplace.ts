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
];

export const marketplaceCategories = ["All", "Design System", "Icon Pack"] as const;
