"use client";

import { motion } from "motion/react";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import Tag from "@/components/ui/tag";
import { marketplaceItems } from "@/data/marketplace";

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function MarketplacePreview() {
  const featured = marketplaceItems.filter((i) => i.featured).slice(0, 3);

  return (
    <section className="py-24 lg:py-32 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="block font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
              05 — Marketplace
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-primary">
              Free &amp; premium resources
            </h2>
          </div>
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 font-body text-sm text-muted hover:text-primary transition-colors duration-200 cursor-pointer shrink-0"
          >
            Explore All <ArrowRight size={15} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featured.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1, ease }}
              className="group flex flex-col rounded-2xl border border-white/[0.07] bg-card overflow-hidden hover:border-accent/25 transition-[transform,border-color] duration-200 hover:-translate-y-1 cursor-pointer"
            >
              {/* Cover */}
              <div className={`h-40 bg-gradient-to-br ${item.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium font-body uppercase tracking-wider ${
                    item.price === "Free"
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                      : "bg-accent/15 text-accent-light border border-accent/20"
                  }`}>
                    {item.price}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                <Tag variant="dim">{item.category}</Tag>
                <h3 className="font-display font-semibold text-primary text-base mt-3 mb-2">
                  {item.name}
                </h3>
                <p className="font-body text-xs text-muted leading-[1.7] flex-1 mb-4">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs text-dim">
                    {item.downloads} downloads
                  </span>
                  <button
                    aria-label={`Download ${item.name}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-xs font-medium font-body text-primary transition-all duration-200 cursor-pointer"
                  >
                    <Download size={13} /> Get
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
