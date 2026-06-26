"use client";

import { useState } from "react";
import { Search, Download } from "lucide-react";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import Tag from "@/components/ui/tag";
import { marketplaceItems, marketplaceCategories, type MarketplaceItem } from "@/data/marketplace";

function ProductCard({ item }: { item: MarketplaceItem }) {
  return (
    <div className="group flex flex-col rounded-2xl border border-white/[0.07] bg-card overflow-hidden hover:border-white/[0.14] transition-[transform,border-color] duration-200 hover:-translate-y-1 cursor-default">
      <div className={`h-48 bg-gradient-to-br ${item.gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium font-body ${
            item.price === "Free"
              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
              : "bg-accent/15 text-accent-light border border-accent/20"
          }`}>
            {item.price}
          </span>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-6">
        <Tag variant="dim">{item.category}</Tag>
        <h3 className="font-display font-semibold text-primary text-base mt-3 mb-2">
          {item.name}
        </h3>
        <p className="font-body text-sm text-muted leading-relaxed flex-1 mb-4">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-body text-xs text-dim flex items-center gap-1.5">
            <Download size={12} /> {item.downloads}
          </span>
          <button
            aria-label={`Download ${item.name}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent/10 hover:bg-accent/20 border border-accent/20 text-xs font-medium font-body text-accent-light transition-colors duration-200 cursor-pointer"
          >
            <Download size={13} />
            {item.price === "Free" ? "Download" : "Buy Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [query, setQuery] = useState("");

  const filtered = marketplaceItems.filter((item) => {
    const matchCat = activeCategory === "All" || item.category === activeCategory;
    const matchQ =
      !query ||
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <>
      <Nav />
      <main className="pt-[72px]">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
          {/* Header */}
          <div className="mb-12">
            <span className="block font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
              Marketplace
            </span>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-primary mb-4">
              Design Resources
            </h1>
            <p className="font-body text-lg text-muted max-w-xl">
              Free and premium UI kits, Figma files, templates, and icon packs to accelerate your design workflow.
            </p>
          </div>

          {/* Search + Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10 pb-8 border-b border-white/[0.06]">
            <div className="relative flex-1 max-w-sm">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dim pointer-events-none" />
              <input
                type="text"
                placeholder="Search resources..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-white/[0.08] bg-surface text-sm font-body text-primary placeholder:text-dim focus:outline-none focus:border-accent/50 transition-colors duration-200"
                aria-label="Search resources"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {marketplaceCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full font-body text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    activeCategory === cat
                      ? "bg-accent text-white shadow-lg shadow-accent/20"
                      : "border border-white/[0.08] text-muted hover:text-primary hover:border-white/[0.14]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.length > 0 ? (
              filtered.map((item) => <ProductCard key={item.id} item={item} />)
            ) : (
              <div className="col-span-3 py-24 text-center">
                <p className="font-body text-muted">No resources match your search.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
