import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import Tag from "@/components/ui/tag";
import ImageLightbox from "./image-lightbox";
import { getCaseStudy, getPublicImageSize, type MdCaseStudy } from "@/lib/case-studies";

// Images break out of the text column to 1100px on desktop; full column width on mobile.
const imageFrame =
  "block my-8 lg:relative lg:left-1/2 lg:-translate-x-1/2 lg:w-[min(1100px,calc(100vw-4rem))]";
const imageClass = "w-full h-auto rounded-xl border border-white/[0.06]";

function CaseStudyImage({ src, alt, eager }: { src: string; alt: string; eager: boolean }) {
  const size = getPublicImageSize(src);
  if (!size) {
    return (
      <span className={imageFrame}>
        <img src={src} alt={alt} className={imageClass} loading={eager ? "eager" : "lazy"} />
      </span>
    );
  }
  return (
    <span className={imageFrame}>
      <Image
        src={src}
        alt={alt}
        width={size.width}
        height={size.height}
        sizes="(min-width: 1024px) min(1100px, calc(100vw - 4rem)), calc(100vw - 3rem)"
        className={imageClass}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        data-full={src}
      />
    </span>
  );
}

const md: Components = {
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
  a: ({ href, children }) => {
    const isInternal = typeof href === "string" && href.startsWith("/");
    return (
      <a
        href={href}
        className="text-accent-light underline underline-offset-2 hover:text-accent transition-colors"
        {...(isInternal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      >
        {children}
      </a>
    );
  },
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-2 border-accent/40 pl-4 font-body text-muted italic [&_p]:mb-0">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-t border-white/[0.08]" />,
  code: ({ children }) => (
    <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.85em] text-accent-light">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded-xl border border-white/[0.08] bg-black/30 p-4 font-mono text-sm text-muted [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-muted">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="my-8 overflow-x-auto rounded-xl border border-white/[0.08]">
      <table className="w-full border-collapse text-left font-body text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-white/[0.03]">{children}</thead>,
  th: ({ children }) => (
    <th className="border-b border-white/[0.1] px-4 py-3 align-top font-semibold text-primary">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-white/[0.05] px-4 py-3 align-top text-muted [&>span]:my-0">
      {children}
    </td>
  ),
};

type NavItem = { slug: string; title: string };

export default function MarkdownCaseStudy({
  cs,
  prev,
  next,
  basePath,
  backLabel,
}: {
  cs: MdCaseStudy;
  prev?: NavItem;
  next?: NavItem;
  basePath: string;
  backLabel: string;
}) {
  // The first image is above the fold: load it eagerly, lazy-load the rest.
  const parent = cs.parent ? getCaseStudy(cs.parent) : undefined;
  const firstImage = cs.content.match(/!\[[^\]]*\]\(([^)\s]+)/)?.[1];
  const components: Components = {
    ...md,
    img: ({ src, alt }) =>
      typeof src === "string" ? (
        <CaseStudyImage src={src} alt={alt ?? ""} eager={src === firstImage} />
      ) : null,
  };

  return (
    <article>
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/[0.06] bg-surface">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 lg:py-28">
          <Link
            href={basePath}
            className="inline-flex items-center gap-2 font-body text-sm text-muted hover:text-primary transition-colors duration-200 cursor-pointer mb-10"
          >
            <ArrowLeft size={16} /> {backLabel}
          </Link>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {cs.index}
            </span>
            <span className="text-dim text-xs">—</span>
            <span className="font-body text-xs text-dim">{cs.product}</span>
          </div>
          {parent && (
            <Link
              href={`/work/${parent.slug}`}
              className="inline-flex items-center gap-1.5 mb-3 font-body text-sm text-accent-light hover:text-accent transition-colors duration-200"
            >
              Part of: {parent.title} <ArrowRight size={14} />
            </Link>
          )}
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
        <ImageLightbox>
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{cs.content}</ReactMarkdown>
        </ImageLightbox>
      </div>

      {/* Next/Prev */}
      <div className="border-t border-white/[0.06] bg-surface">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {prev ? (
            <Link
              href={`${basePath}/${prev.slug}`}
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
              href={`${basePath}/${next.slug}`}
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
  );
}
