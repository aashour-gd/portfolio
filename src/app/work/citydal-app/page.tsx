import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import Tag from "@/components/ui/tag";
import ImageLightbox from "@/components/case-studies/image-lightbox";
import CityDalEmbed from "@/components/citydal/citydal-embed";
import { getPublicImageSize } from "@/lib/case-studies";

const SUMMARY =
  "One city guide in two apps: one for people finding places and deals, one for the businesses they look for. The 2023 product, and the 2026 redesign you can try here.";
const HERO_IMG = "/assets/citydal/brand_cover.png";
// Update this line whenever the prototype changes (see the sync map in the project docs).
const PROTOTYPE_UPDATED = "21 Nov 2026";

export const metadata: Metadata = {
  title: "CityDal",
  description: SUMMARY,
  openGraph: { title: "CityDal", description: SUMMARY, images: [HERO_IMG] },
  twitter: { card: "summary_large_image", title: "CityDal", description: SUMMARY, images: [HERO_IMG] },
};

const TAGS = ["Product Design", "Brand Identity", "Mobile", "Arabic / RTL"];

const FACTS: [string, string][] = [
  ["What", "A city-discovery product for Qatar: a user app and a provider app, CityDal Business"],
  ["2023", "Version 1. The first version: brand identity, user app, provider app"],
  ["2026", "Version 2. A redesign of the user app, built as a working prototype"],
  ["Role", "Design, end to end: brand, both apps, and the v2 prototype"],
];

const VERSIONS = [
  {
    label: "2023 · Version 1",
    title: "The first version",
    body: [
      "The product as it first shipped. I designed the brand identity, the user app (about 87 screens) and the provider app, CityDal Business (about 100 screens).",
      "It ran for about six months before the client discontinued it. I am showing the design work and what I learned, not business results I cannot verify.",
    ],
  },
  {
    label: "2026 · Version 2",
    title: "The redesign",
    body: [
      "A redesign of the user app, built as a working prototype rather than a set of screens. Fresh coral and ocean palette, Plus Jakarta Sans with IBM Plex Sans Arabic, the whole app translated to Arabic with right-to-left layout and Eastern numerals, dark mode, and motion with a reduced-motion fallback.",
      "The logo stays. Its coral #F0544F is fixed, and everything else in the system is built around it.",
    ],
  },
];

const CASE_STUDIES: [string, string, string, string?][] = [
  ["Brand", "A logo that says the name and shows the idea", "Read", "/case-studies/citydal-logo"],
  ["Both apps · v2", "I fixed the flows that stopped people, in both apps", "Draft", "/case-studies/citydal-v2"],
  ["Website and landing page", "How the app introduces itself", "Coming soon"],
];

function Figure({ src, alt, caption, sizes = "(min-width: 896px) 420px, calc(100vw - 3rem)" }: { src: string; alt: string; caption?: string; sizes?: string }) {
  const size = getPublicImageSize(src);
  return (
    <figure className="m-0">
      {size ? (
        <Image src={src} alt={alt} width={size.width} height={size.height} sizes={sizes} data-full={src} className="w-full h-auto rounded-xl border border-white/[0.06]" />
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

export default function CityDalProjectPage() {
  return (
    <>
      <Nav />
      <main className="pt-[72px]">
        <ImageLightbox>
          <section className="relative overflow-hidden border-b border-white/[0.06] bg-surface">
            <div className="absolute inset-0 pointer-events-none" aria-hidden>
              <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-rose-500/10 blur-[120px]" />
            </div>
            <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 lg:py-24">
              <Link href="/work" className="inline-flex items-center gap-2 font-body text-sm text-muted hover:text-primary transition-colors mb-10">
                <ArrowLeft size={16} /> Back to Work
              </Link>
              <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-10 lg:gap-14 items-center">
                <div>
                  <h1 className="font-display text-4xl lg:text-6xl font-bold text-primary leading-tight mb-2">CityDal</h1>
                  <p className="font-display text-xl lg:text-2xl text-accent-light mb-6">One city guide, two apps.</p>
                  <p className="font-body text-lg text-muted leading-relaxed mb-8">
                    People find places, events and deals near them. Businesses publish services and see who looked.
                    I designed the brand and both apps in 2023, then redesigned the user app in 2026 as a prototype you
                    can use below.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {TAGS.map((t) => (
                      <Tag key={t} variant="accent">{t}</Tag>
                    ))}
                  </div>
                </div>
                <Figure
                  src={HERO_IMG}
                  alt="CityDal brand guidelines cover: the wordmark and tagline beside an oversized version of the logo mark"
                  sizes="(min-width: 1024px) 560px, calc(100vw - 3rem)"
                />
              </div>
            </div>
          </section>

          <div className="max-w-4xl mx-auto px-6 pb-24">
            <dl className="mt-12 rounded-xl border border-white/[0.08] overflow-hidden">
              {FACTS.map(([k, v], i) => (
                <div key={k} className={`grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-1 sm:gap-4 px-4 py-3 font-body text-sm ${i < FACTS.length - 1 ? "border-b border-white/[0.06]" : ""}`}>
                  <dt className="font-semibold text-primary">{k}</dt>
                  <dd className="text-muted">{v}</dd>
                </div>
              ))}
            </dl>

            <SectionHeading label="Two versions" title="Version 1 in 2023, version 2 in 2026" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {VERSIONS.map((v) => (
                <div key={v.label} className="rounded-xl border border-white/[0.08] p-6">
                  <span className="block font-body text-xs font-semibold uppercase tracking-[0.15em] text-accent mb-2">{v.label}</span>
                  <h3 className="font-display text-xl font-semibold text-primary mb-3">{v.title}</h3>
                  <div className="flex flex-col gap-3 font-body text-sm text-muted leading-[1.75]">
                    {v.body.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <SectionHeading label="Try it" title="Version 2, working" />
            <p className="font-body text-base text-muted leading-[1.8] mb-8">
              This is the 2026 prototype, running live, not screenshots. Switch the language to Arabic, try dark mode,
              open a place from the map. Last updated {PROTOTYPE_UPDATED}.
            </p>
            <CityDalEmbed />

            <SectionHeading label="Brand" title="The logo, from 2023" />
            <div className="flex flex-col gap-4 font-body text-base text-muted leading-[1.8] mb-8">
              <p>
                The mark fuses a C, a d and a map pin into one shape, so it reads as a letter and as a place at once. The
                provider app adds a small &ldquo;Business&rdquo; label to the same mark, so the logo changes with the app a
                person opens. Version 2 keeps the mark and reinterprets the colour and type around it.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Figure src="/assets/citydal/citydal-11.png" alt="The CityDal horizontal logo: the logomark paired with the wordmark and tagline" caption="The 2023 logo lockup." />
              <Figure src="/assets/citydal/citydal-26.png" alt="The 2023 CityDal colour palette: two primaries, four secondary colours and four neutrals" caption="The 2023 palette. Version 2 uses its own." />
            </div>

            <SectionHeading label="Case studies" title="The thinking behind it" />
            <ul className="flex flex-col gap-3">
              {CASE_STUDIES.map(([kind, title, status, href]) => {
                const row = (
                  <>
                    <div>
                      <span className="block font-body text-xs font-semibold uppercase tracking-[0.15em] text-dim">{kind}</span>
                      <span className="font-display text-lg text-primary">{title}</span>
                    </div>
                    <Tag variant="dim">{status}</Tag>
                  </>
                );
                return (
                  <li key={title}>
                    {href ? (
                      <Link href={href} className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.08] px-5 py-4 transition-colors hover:border-white/20">
                        {row}
                      </Link>
                    ) : (
                      <div className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.08] px-5 py-4">{row}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </ImageLightbox>
      </main>
      <Footer />
    </>
  );
}
