import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, FileText } from "lucide-react";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import Tag from "@/components/ui/tag";
import ImageLightbox from "@/components/case-studies/image-lightbox";
import { getPublicImageSize } from "@/lib/case-studies";

const SUMMARY =
  "A design critique tool, its logo, its motion and its design system, built end to end. The product overview. The argument behind it is in the case study.";
const HERO_IMG = "/images/decritiq-cover-v2.png";

export const metadata: Metadata = {
  title: "Decritiq",
  description: SUMMARY,
  openGraph: {
    title: "Decritiq",
    description: SUMMARY,
    images: [HERO_IMG],
  },
  twitter: {
    card: "summary_large_image",
    title: "Decritiq",
    description: SUMMARY,
    images: [HERO_IMG],
  },
};

const TAGS = ["Product Design", "Brand", "Motion", "Design Systems", "AI Tooling"];

const FACTS: [string, string][] = [
  ["What", "A design critique tool with a report you can share"],
  ["Role", "Solo: product, brand, motion, design system, front end"],
  ["Built", "1 to 9 Nov 2026, versions 0.4.0 to 0.11.1"],
  ["Status", "Private local build. Walkthrough on request."],
];

const STEPS: [string, string][] = [
  ["Upload or paste a link.", "A screenshot or a page address."],
  ["Decritiq reads what it is.", "It works out whether this is a dashboard, a web app or a mobile screen."],
  ["A few clickable questions.", "What is the goal? No typing needed."],
  ["Code measures.", "Contrast, blur and alignment come from the pixels."],
  ["The model critiques, then verifies.", "A finding the measurements contradict is removed."],
  [
    "A report with numbered pins.",
    "A plain-language explanation for non-experts, the measured values for people who want them, a follow-up chat, and a way to share it as one HTML file or a PDF.",
  ],
];

// Server-rendered figure: real intrinsic size for next/image, click-to-enlarge via the
// surrounding ImageLightbox (it reads data-full off the <img>).
function Figure({
  src,
  alt,
  caption,
  priority,
  sizes = "(min-width: 896px) 848px, calc(100vw - 3rem)",
}: {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const size = getPublicImageSize(src);
  return (
    <figure className="m-0">
      {size ? (
        <Image
          src={src}
          alt={alt}
          width={size.width}
          height={size.height}
          sizes={sizes}
          priority={priority}
          data-full={src}
          className="w-full h-auto rounded-xl border border-white/[0.06]"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} loading="lazy" className="w-full h-auto rounded-xl border border-white/[0.06]" />
      )}
      {caption && <figcaption className="mt-3 font-body text-sm text-dim">{caption}</figcaption>}
    </figure>
  );
}

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="mt-20 mb-8 pt-10 border-t border-white/[0.06]">
      <span className="block font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">{label}</span>
      <h2 className="font-display text-3xl lg:text-4xl font-semibold text-primary leading-snug">{title}</h2>
    </div>
  );
}

const btnPrimary =
  "inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-body text-sm font-semibold text-white shadow-lg shadow-accent/30 hover:bg-accent/90 transition-colors";
const btnGhost =
  "inline-flex items-center gap-2 rounded-full border border-white/[0.12] px-5 py-2.5 font-body text-sm font-medium text-muted hover:text-primary hover:border-white/[0.24] transition-colors";

export default function DecritiqProjectPage() {
  return (
    <>
      <Nav />
      <main className="pt-[72px]">
        <ImageLightbox>
          {/* Hero */}
          <section className="relative overflow-hidden border-b border-white/[0.06] bg-surface">
            <div className="absolute inset-0 pointer-events-none" aria-hidden>
              <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-teal-500/10 blur-[120px]" />
            </div>
            <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 lg:py-24">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 font-body text-sm text-muted hover:text-primary transition-colors mb-10"
              >
                <ArrowLeft size={16} /> Back to Work
              </Link>

              <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-10 lg:gap-14 items-center">
                <div>
                  <h1 className="font-display text-4xl lg:text-6xl font-bold text-primary leading-tight mb-2">
                    Decritiq
                  </h1>
                  <p className="font-display text-xl lg:text-2xl text-accent-light mb-6">Design feedback, pinned.</p>
                  <p className="font-body text-lg text-muted leading-relaxed mb-8">
                    A tool that looks at a design and shows you what to fix: every finding pinned to a spot on the
                    design, tied to a written rule, and measured by code when it can be. I built the product, the logo,
                    the motion and the design system myself.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mb-8">
                    <Link href="/case-studies/decritiq" className={btnPrimary}>
                      Read the case study <ArrowRight size={16} />
                    </Link>
                    <a href="/decritiq-sample.html" target="_blank" rel="noopener noreferrer" className={btnGhost}>
                      <FileText size={15} /> See a real report
                    </a>
                    <span className="font-body text-sm text-dim">Walkthrough on request</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {TAGS.map((t) => (
                      <Tag key={t} variant="accent">
                        {t}
                      </Tag>
                    ))}
                  </div>
                </div>

                <div>
                  <Figure
                    src={HERO_IMG}
                    alt="Decritiq cover: the logo and tagline beside a report view with numbered pins over a Finaity dashboard design"
                    priority
                    sizes="(min-width: 1024px) 560px, calc(100vw - 3rem)"
                  />
                </div>
              </div>

              {/* Facts — plain two-column list, no header row */}
              <dl className="mt-12 rounded-xl border border-white/[0.08] overflow-hidden">
                {FACTS.map(([k, v], i) => (
                  <div
                    key={k}
                    className={`grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-1 sm:gap-4 px-4 py-3 font-body text-sm ${
                      i < FACTS.length - 1 ? "border-b border-white/[0.06]" : ""
                    }`}
                  >
                    <dt className="font-semibold text-primary">{k}</dt>
                    <dd className="text-muted">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* Body */}
          <div className="max-w-4xl mx-auto px-6 pb-24">
            {/* Why I built it */}
            <SectionHeading label="Why" title="Why I built it" />
            <div className="flex flex-col gap-4 font-body text-base text-muted leading-[1.8]">
              <p>
                It started from a simple idea. Anyone should be able to find out whether a design has a problem, even
                without any UI/UX knowledge. And I wanted to compare a built design against its design file the same way.
              </p>
              <p>
                Most AI feedback on a screenshot sounds sure of itself and can&rsquo;t be checked. It says &ldquo;improve
                contrast&rdquo; without saying where, and quotes ratios it never measured. So the rule I gave Decritiq
                was simple: split who judges what. Code measures what code can measure. The model judges only what needs
                eyes. Every finding names a spot and one of 62 written rules.
              </p>
              <p>
                The full argument, with the numbers and the limits, is in{" "}
                <Link href="/case-studies/decritiq" className="text-accent-light underline underline-offset-2 hover:text-accent">
                  the case study
                </Link>
                .
              </p>
            </div>

            {/* How it works */}
            <SectionHeading label="How it works" title="From a screenshot to a report you can check" />
            <ol className="flex flex-col gap-4 mb-10">
              {STEPS.map(([lead, rest], i) => (
                <li key={i} className="flex gap-4">
                  <span className="shrink-0 grid place-items-center w-8 h-8 rounded-full bg-accent/15 text-accent-light font-body text-sm font-bold">
                    {i + 1}
                  </span>
                  <p className="font-body text-base text-muted leading-[1.7] pt-1">
                    <strong className="font-semibold text-primary">{lead}</strong> {rest}
                  </p>
                </li>
              ))}
            </ol>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Figure
                src="/images/decritiq-desktop-workspace-light.png"
                alt="Decritiq's workspace: the upload and goal-setting step before a critique runs"
                sizes="(min-width: 640px) 420px, calc(100vw - 3rem)"
              />
              <Figure
                src="/images/decritiq-desktop-report-light.png"
                alt="Decritiq's report view with numbered pins and measured values"
                sizes="(min-width: 640px) 420px, calc(100vw - 3rem)"
              />
              <Figure
                src="/images/decritiq-desktop-library-light.png"
                alt="Decritiq's report library: a searchable, filterable list of saved reports"
                sizes="(min-width: 640px) 420px, calc(100vw - 3rem)"
              />
              <Figure
                src="/images/decritiq-compare-mobile-light.png"
                alt="Decritiq on a phone: five nav items collapsed into one menu button and a slide-in side panel"
                caption="Five nav items in a phone-width bar became one menu and a side panel."
                sizes="(min-width: 640px) 420px, calc(100vw - 3rem)"
              />
            </div>

            {/* The logo */}
            <SectionHeading label="Brand" title="The logo" />
            <div className="flex flex-col gap-4 font-body text-base text-muted leading-[1.8]">
              <p className="text-primary font-medium">An eye inside a comment marker, in one teal.</p>
              <p>
                A critique tool needs a mark that says &ldquo;someone is looking at your work&rdquo;. It had to carry
                that in one glance, hold up as a 16px favicon, and not rely on the word beside it to explain itself.
              </p>
              <p>
                <strong className="font-semibold text-primary">The brief was three meanings in one shape:</strong>{" "}
                feedback on a design, looking closely, pointing at a spot. Every sketch had to pass that test.
              </p>
              <p>
                <strong className="font-semibold text-primary">
                  I started with an image generator and moved to hand-built SVG.
                </strong>{" "}
                The first results looked polished and said nothing about critique. In SVG every shape is mine to change,
                so I could compare ten ideas in an afternoon. The final mark was redrawn and refined by me in Figma.
              </p>
              <p>
                <strong className="font-semibold text-primary">Nine sketches in three families.</strong> Comment markers
                (A to C), a magnifier built from the letter D (D1 to D3), and an eye with a handle (E1 to E3).
              </p>
            </div>
            <div className="my-8">
              <Figure
                src="/images/decritiq-logo-sketches.png"
                alt="Nine logo sketches in three families: comment markers, a magnifier from the letter D, and an eye with a handle"
              />
            </div>
            <div className="flex flex-col gap-4 font-body text-base text-muted leading-[1.8]">
              <p>
                <strong className="font-semibold text-primary">The hard decision was to stop adding symbols.</strong>{" "}
                Every round the temptation was one more object: a pin, a magnifier, a handle. Together they made a logo
                that explained itself at 512 px and turned to noise at 32 px. The fix was to let one shape do three
                jobs: the rounded comment marker is a comment, an eye and a pin. That meant dropping the magnifier I
                liked most. It was clever, but the handle and the eye fought each other as soon as I shrank the file.
              </p>
              <p>
                <strong className="font-semibold text-primary">The marker becomes the eye.</strong> Instead of putting
                an eye beside a marker, I made the marker&rsquo;s circle the eye. The one sharp corner at the bottom left
                stays, and that is what makes it a comment and not just a circle.
              </p>
            </div>
            <div className="my-8">
              <Figure
                src="/images/decritiq-logo-converge.png"
                alt="The logo converging: the comment marker's circle becomes the eye, keeping one sharp bottom-left corner"
              />
            </div>
            <div className="flex flex-col gap-4 font-body text-base text-muted leading-[1.8]">
              <p>
                <strong className="font-semibold text-primary">Six colours, one chosen with numbers.</strong> I started
                with indigo because it was the first thing on the page, not because I had checked it. I rendered six
                colours and looked at them at app-icon size, favicon size and on a dark background. Teal won. The deep
                teal (#0F766E, 5.5 to 1 with white) is for buttons and links. The lighter teal (#15A89D, 7.1 to 1 with
                black) is for the logo canvas only.
              </p>
            </div>
            <div className="my-8">
              <Figure
                src="/images/decritiq-logo-colours.png"
                alt="The logo rendered in six candidate colours, compared at app-icon and favicon size and on a dark background"
              />
            </div>
            <div className="flex flex-col gap-4 font-body text-base text-muted leading-[1.8]">
              <p>
                <strong className="font-semibold text-primary">Type.</strong> I compared six typefaces with the final
                mark next to them. The wordmark is Outfit Bold, because its cut-off terminals and tight geometry suit a
                tool that points at things. The tagline, &ldquo;Design feedback, pinned.&rdquo;, is Outfit Medium, sized
                to start and end exactly where the wordmark does.
              </p>
              <p>
                <strong className="font-semibold text-primary">A small system.</strong> The mark, a small version
                without the highlight for 32 px and below, and light and dark lockups, all as SVG with the wordmark
                converted to outlines.
              </p>
            </div>
            <div className="my-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Figure
                src="/images/decritiq-logo-lockup-light.png"
                alt="The Decritiq light lockup: mark and wordmark on a light background"
                sizes="(min-width: 640px) 420px, calc(100vw - 3rem)"
              />
              <Figure
                src="/images/decritiq-logo-lockup-dark.png"
                alt="The Decritiq dark lockup: mark and wordmark on a dark background"
                sizes="(min-width: 640px) 420px, calc(100vw - 3rem)"
              />
            </div>
            <div className="my-8">
              <Figure
                src="/images/decritiq-logo-size-ladder.png"
                alt="The logo size ladder: the mark shown from large down to favicon size, with a simplified small version"
              />
            </div>
            <p className="font-body text-base text-muted leading-[1.8]">
              <strong className="font-semibold text-primary">What I would do differently:</strong> start from the
              favicon and work up. Every idea I dropped looked fine large and fell apart small.
            </p>

            {/* The motion */}
            <SectionHeading label="Motion" title="The motion" />
            <div className="flex flex-col gap-4 font-body text-base text-muted leading-[1.8] mb-8">
              <p className="text-primary font-medium">Two pieces, both made in Figma.</p>
              <p>
                <strong className="font-semibold text-primary">The logo animation.</strong> A 12-second film. The teal
                square becomes a comment marker, then an eye. Panels for the design system, the critique queue,
                typography, colour, spacing and accessibility build around it, and a reference layout turns into an
                optimized one. It ends on the lockup and the tagline.
              </p>
            </div>
            <figure className="m-0">
              <video
                controls
                muted
                playsInline
                preload="metadata"
                poster="/images/decritiq-logo-poster.png"
                className="w-full h-auto rounded-xl border border-white/[0.06] bg-black"
              >
                <source src="/videos/decritiq-logo-animation.mp4" type="video/mp4" />
                Your browser can&rsquo;t play this video. The logo animation shows the teal square becoming a comment
                marker, then an eye, with design-system panels building around it, ending on the lockup and tagline.
              </video>
              <figcaption className="mt-3 font-body text-sm text-dim">
                The logo animation. Designed in Figma, animated in Figma Motion, exported as MP4.
              </figcaption>
            </figure>
            <div className="flex flex-col gap-4 font-body text-base text-muted leading-[1.8] mt-8">
              <p>
                <strong className="font-semibold text-primary">The loading icon.</strong> A separate short loop of the
                mark, which the app plays while it works. I animated it in Figma Motion and exported it as Lottie JSON,
                so it stays small and sharp at any size.
              </p>
              <p>
                <strong className="font-semibold text-primary">How I made it.</strong> I drew the logo in Figma, then
                used Figma Motion with Figma AI. I wrote a motion-designer skill to guide it, built the animation in
                Figma Motion and exported the MP4. The loading icon went through the same route and was exported as
                Lottie JSON.
              </p>
            </div>

            {/* The design system */}
            <SectionHeading label="Design system" title="The design system" />
            <p className="font-body text-base text-muted leading-[1.8] mb-5">
              The product follows my own design-system method, not a template.
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {[
                ["Three token layers", " (primitive, semantic, component) generate the CSS. A drift check fails if they disagree."],
                ["Light and dark", " share the same tokens."],
                ["One icon family", " (Tabler), one stroke weight, checked path by path."],
                ["Type:", " Plus Jakarta Sans for the interface by default, with Manrope or the system font selectable in Settings. JetBrains Mono for measured values. Outfit only in the logo."],
                ["Figma plugins", " regenerate the app screens, light and dark, from the same tokens."],
                ["Every release gets a 13-rule audit,", " and every decision lands in a numbered record (12 so far)."],
              ].map(([lead, rest], i) => (
                <li key={i} className="flex gap-3 font-body text-base text-muted leading-[1.7]">
                  <span className="text-accent mt-[3px] shrink-0">—</span>
                  <span>
                    <strong className="font-semibold text-primary">{lead}</strong>
                    {rest}
                  </span>
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Figure
                src="/images/decritiq-glance-light.png"
                alt="Decritiq at a glance: role, timeline, domain, stack, scale and status"
                sizes="(min-width: 640px) 420px, calc(100vw - 3rem)"
              />
              <Figure
                src="/images/decritiq-desktop-library-dark.png"
                alt="Decritiq's report library in dark mode, generated from the same tokens as the light build"
                sizes="(min-width: 640px) 420px, calc(100vw - 3rem)"
              />
            </div>

            {/* The process */}
            <SectionHeading label="Process" title="The process" />
            <p className="font-body text-base text-muted leading-[1.8] mb-8">
              Frame, Model, Decide, Build, Prove, Ship. Each phase left something you can open and check.
            </p>
            <Figure
              src="/images/decritiq-process-light.png"
              alt="The Decritiq process in six phases: Frame, Model, Decide, Build, Prove, Ship"
            />

            {/* Proof, and the limits */}
            <SectionHeading label="Proof" title="Proof, and the limits" />
            <p className="font-body text-base text-muted leading-[1.8] mb-5">
              Short version here. The full story is in the case study.
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {[
                "Defects large enough to fail a contrast check: 5 of 6 found, 0 of 5 decoys flagged.",
                "Subtle defects: 0 of 6 found. That is the next problem to solve.",
                "Four audits against my own 13 rules, each finding less. In the latest, 0 text-contrast failures in 9,474 elements across 52 states, and all 45 icons match the Tabler set.",
                "I have tested it in meetings with two to four of my colleagues. It is a private build with no public users.",
              ].map((t, i) => (
                <li key={i} className="flex gap-3 font-body text-base text-muted leading-[1.7]">
                  <span className="text-accent mt-[3px] shrink-0">—</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              <Figure
                src="/images/decritiq-defects-light.png"
                alt="A table of injected-defect test results: which defects Decritiq caught, which it missed, and no false alarms on the decoys"
                sizes="(min-width: 640px) 420px, calc(100vw - 3rem)"
              />
              <Figure
                src="/images/decritiq-audits-light.png"
                alt="Decritiq's self-audit history across four rounds: blocker, major and minor issue counts falling to no major issues"
                sizes="(min-width: 640px) 420px, calc(100vw - 3rem)"
              />
            </div>
            <Link href="/case-studies/decritiq" className={btnPrimary}>
              Read the full case study <ArrowRight size={16} />
            </Link>

            {/* Status and next step */}
            <SectionHeading label="Status" title="Status and next step" />
            <p className="font-body text-base text-muted leading-[1.8] mb-8">
              Decritiq is a private local build. I am happy to walk you through it: get in touch.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/contact" className={btnPrimary}>
                Contact me <ArrowRight size={16} />
              </Link>
              <a href="/decritiq-sample.html" target="_blank" rel="noopener noreferrer" className={btnGhost}>
                <ArrowUpRight size={15} /> See a real report
              </a>
            </div>

            <p className="mt-16 pt-10 border-t border-white/[0.06] font-body text-sm text-dim italic">
              Ahmed Ashour is a Senior Product Designer with 10+ years across SaaS, mobile and e-commerce.
            </p>
          </div>
        </ImageLightbox>
      </main>
      <Footer />
    </>
  );
}
