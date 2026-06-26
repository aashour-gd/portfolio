import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import Tag from "@/components/ui/tag";
import { getAllCaseStudies } from "@/lib/case-studies";

const gradients = [
  "from-indigo-900/50 via-blue-900/30 to-transparent",
  "from-blue-900/50 via-cyan-900/30 to-transparent",
  "from-indigo-800/40 via-blue-900/30 to-transparent",
  "from-cyan-900/40 via-blue-900/30 to-transparent",
];

export const metadata = {
  title: "Case Studies",
  description: "Deep-dive product design case studies covering research, systems thinking, and execution.",
};

export default function CaseStudiesPage() {
  const caseStudies = getAllCaseStudies();
  const [featured, ...rest] = caseStudies;

  return (
    <>
      <Nav />
      <main className="pt-[72px]">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
          {/* Header */}
          <div className="mb-16">
            <span className="block font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
              Case Studies
            </span>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-primary mb-4">
              Deep-dive work
            </h1>
            <p className="font-body text-lg text-muted max-w-xl">
              Detailed breakdowns of complex design problems — from research and strategy through to shipped product.
            </p>
          </div>

          {/* Featured */}
          <Link
            href={`/work/${featured.slug}`}
            className="group block mb-6 rounded-3xl border border-white/[0.08] bg-card overflow-hidden hover:border-white/[0.16] transition-[transform,border-color] duration-200 cursor-pointer"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
              <div className={`min-h-[220px] lg:min-h-full bg-gradient-to-br ${gradients[0]} relative`}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/50 hidden lg:block" />
                <div className="absolute top-6 left-6">
                  <Tag variant="accent">Featured</Tag>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-body text-xs font-semibold text-accent uppercase tracking-widest">
                    {featured.index}
                  </span>
                  <span className="text-dim text-xs">—</span>
                  <span className="font-body text-xs text-dim">{featured.product}</span>
                </div>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary mb-4 group-hover:text-accent-light transition-colors duration-300">
                  {featured.title}
                </h2>
                <p className="font-body text-base text-muted leading-relaxed mb-6">
                  {featured.summary}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {featured.tags.map((tag) => (
                    <Tag key={tag} variant="dim">{tag}</Tag>
                  ))}
                </div>
                <span className="inline-flex items-center gap-2 font-body text-sm font-medium text-primary group-hover:text-accent-light transition-colors duration-200">
                  Read Case Study <ArrowUpRight size={16} />
                </span>
              </div>
            </div>
          </Link>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map((cs, i) => (
              <Link
                key={cs.slug}
                href={`/work/${cs.slug}`}
                className="group flex flex-col rounded-2xl border border-white/[0.07] bg-card overflow-hidden hover:border-white/[0.14] transition-[transform,border-color] duration-200 hover:-translate-y-1 cursor-pointer"
              >
                <div className={`h-48 bg-gradient-to-br ${gradients[(i + 1) % gradients.length]} relative`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="font-body text-xs font-semibold text-accent/80 uppercase tracking-widest">
                      {cs.index}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight size={16} className="text-primary" />
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display font-semibold text-primary text-lg mb-2 group-hover:text-accent-light transition-colors duration-200">
                    {cs.title}
                  </h3>
                  <p className="font-body text-sm text-muted leading-relaxed flex-1 mb-4">
                    {cs.summary}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {cs.tags.slice(0, 2).map((tag) => (
                      <Tag key={tag} variant="dim">{tag}</Tag>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
