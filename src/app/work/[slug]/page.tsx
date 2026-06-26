import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ReactMarkdown, { type Components } from "react-markdown";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import Tag from "@/components/ui/tag";
import { getAllCaseStudies, getCaseStudy } from "@/lib/case-studies";

export function generateStaticParams() {
  return getAllCaseStudies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: cs.title,
    description: cs.summary,
  };
}

const md: Components = {
  img: ({ src, alt }) => (
    <span className="block my-8">
      <img
        src={src}
        alt={alt ?? ""}
        className="w-full rounded-xl border border-white/[0.06]"
        loading="lazy"
      />
    </span>
  ),
  h2: ({ children }) => (
    <h2 className="mt-16 mb-5 pt-10 border-t border-white/[0.06] font-display text-2xl lg:text-3xl font-semibold text-primary first:mt-0 first:border-t-0 first:pt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 mb-3 font-display text-lg font-semibold text-accent-light">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-4 font-body text-base text-muted leading-[1.8]">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-5 flex flex-col gap-2 font-body text-sm text-muted leading-relaxed">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-5 flex flex-col gap-2 font-body text-sm text-muted leading-relaxed list-decimal ml-5">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="flex gap-3">
      <span className="text-accent mt-[3px] shrink-0">—</span>
      <span>{children}</span>
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-primary">{children}</strong>
  ),
  em: ({ children }) => <em className="italic text-primary/80">{children}</em>,
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-accent-light underline underline-offset-2 hover:text-accent transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
};

export default async function CaseStudyPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const all = getAllCaseStudies();
  const idx = all.findIndex((c) => c.slug === slug);
  const prev = all[idx - 1];
  const next = all[(idx + 1) % all.length];

  return (
    <>
      <Nav />
      <main className="pt-[72px]">
        <article>
          {/* Hero */}
          <div className="relative overflow-hidden border-b border-white/[0.06] bg-surface">
            <div className="absolute inset-0 pointer-events-none" aria-hidden>
              <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px]" />
            </div>
            <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 lg:py-28">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 font-body text-sm text-muted hover:text-primary transition-colors duration-200 cursor-pointer mb-10"
              >
                <ArrowLeft size={16} /> Back to Work
              </Link>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  {cs.index}
                </span>
                <span className="text-dim text-xs">—</span>
                <span className="font-body text-xs text-dim">{cs.product}</span>
              </div>
              <h1 className="font-display text-4xl lg:text-6xl font-bold text-primary leading-tight mb-6">
                {cs.title}
              </h1>
              <p className="font-body text-xl text-muted leading-relaxed max-w-2xl mb-8">
                {cs.summary}
              </p>
              <div className="flex flex-wrap gap-2">
                {cs.tags.map((tag) => (
                  <Tag key={tag} variant="accent">{tag}</Tag>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-3xl mx-auto px-6 py-16 lg:py-24">
            <ReactMarkdown components={md}>{cs.content}</ReactMarkdown>
          </div>

          {/* Next/Prev */}
          <div className="border-t border-white/[0.06] bg-surface">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {prev ? (
                <Link
                  href={`/work/${prev.slug}`}
                  className="group flex flex-col gap-1.5 p-6 rounded-2xl border border-white/[0.07] hover:border-white/[0.14] hover:bg-card transition-[border-color,background-color] duration-200 cursor-pointer"
                >
                  <span className="font-body text-xs text-dim uppercase tracking-wider flex items-center gap-2">
                    <ArrowLeft size={13} /> Previous
                  </span>
                  <span className="font-display font-semibold text-primary group-hover:text-accent-light transition-colors duration-200">
                    {prev.title}
                  </span>
                </Link>
              ) : <div />}
              {next && (
                <Link
                  href={`/work/${next.slug}`}
                  className="group flex flex-col gap-1.5 p-6 rounded-2xl border border-white/[0.07] hover:border-white/[0.14] hover:bg-card transition-[border-color,background-color] duration-200 cursor-pointer sm:items-end text-left sm:text-right"
                >
                  <span className="font-body text-xs text-dim uppercase tracking-wider flex items-center gap-2 sm:flex-row-reverse">
                    <ArrowRight size={13} /> Next
                  </span>
                  <span className="font-display font-semibold text-primary group-hover:text-accent-light transition-colors duration-200">
                    {next.title}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
