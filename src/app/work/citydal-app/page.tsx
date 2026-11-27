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
const HERO_IMG = "/assets/citydal-v2/citydal-v2-cover.png";
// Update this line whenever the prototype changes (see the sync map in the project docs).
const PROTOTYPE_UPDATED = "23 Nov 2026";

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

const WIDE = "(min-width: 896px) 832px, calc(100vw - 3rem)";

const SWATCHES: [string, string, string][] = [
  ["#F0544F", "Coral", "Brand colour. Fills, buttons, active chips."],
  ["#14688C", "Ocean", "Confirmations and links on light."],
  ["#14202B", "Ink", "Text on light."],
  ["#F3EEE8", "Sand", "Muted surfaces."],
  ["#0C1318", "Night", "Dark mode base."],
];

const DECISIONS: [string, string][] = [
  ["Owners write both languages", "A business types its name and description in English and Arabic itself. Nothing is auto-translated, so an owner never meets a wrong translation of their own shop."],
  ["A place shows its deals", "In version 1 people could not connect a place with its deals. In version 2 a place page lists the deals available there, and a deal opens straight into booking."],
  ["Small text never sits on coral", "White on the brand coral is 3.45:1, so only large bold text goes on it. Small text next to coral is ink, which keeps the brand colour and stays readable."],
];

const CASE_STUDIES: [string, string, string, string?][] = [
  ["Brand", "A logo that says the name and shows the idea", "Read", "/case-studies/citydal-logo"],
  ["Both apps · v2", "I fixed the flows that stopped people, in both apps", "Read", "/case-studies/citydal-v2"],
  ["Website and landing page", "I sold the live prototype instead of a download button", "Read", "/case-studies/citydal-website"],
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

/** A wide strip of phone screens: full width on desktop, swipes sideways on a phone so the screens stay readable. */
function Strip(props: { src: string; alt: string; caption: string }) {
  return (
    <div className="-mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
      <div className="min-w-[720px] sm:min-w-0">
        <Figure {...props} sizes={WIDE} />
      </div>
    </div>
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
                  alt="CityDal: the logo and the line Discover the city, run a business in it, beside the user app and CityDal Business"
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

            <SectionHeading label="What it does" title="Two apps, one loop" />
            <p className="font-body text-base text-muted leading-[1.8] mb-8">
              A business publishes a service or a deal in CityDal Business. A person finds it in the user app, books a time
              and chats with the business. The business sees the booking, confirms it and sees who looked.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              <div className="rounded-xl border border-white/[0.08] p-6">
                <span className="block font-body text-xs font-semibold uppercase tracking-[0.15em] text-accent mb-2">User app</span>
                <ul className="flex flex-col gap-2 font-body text-sm text-muted leading-[1.75] list-disc pl-5">
                  <li>Find places, events and deals near you, as a list or on a map</li>
                  <li>Open a place to see its deals, hours, reviews and a call, directions, chat or save shortcut</li>
                  <li>Book a day and a time, add a note, get a confirmation ticket</li>
                  <li>Chat with a business and keep your bookings in one place</li>
                </ul>
              </div>
              <div className="rounded-xl border border-white/[0.08] p-6">
                <span className="block font-body text-xs font-semibold uppercase tracking-[0.15em] text-accent mb-2">CityDal Business</span>
                <ul className="flex flex-col gap-2 font-body text-sm text-muted leading-[1.75] list-disc pl-5">
                  <li>Set up a business with a logo, photos, hours and a bilingual description</li>
                  <li>Publish services and deals in English and Arabic</li>
                  <li>Confirm or decline booking requests and answer customers in chat</li>
                  <li>See page views, favourites, rating and redeemed deals at a glance</li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <Strip src="/assets/citydal-v2/citydal-v2-people.webp" alt="The user app: Home, the Nearby map, and a place page with its available deals" caption="User app: Home, the Nearby map, and a place with its deals." />
              <Strip src="/assets/citydal-v2/citydal-v2-business.webp" alt="CityDal Business: the dashboard, the Publish a deal form with English and Arabic fields, and the bookings list with Confirm and Decline" caption="CityDal Business: the dashboard, publishing a bilingual deal, and bookings to confirm." />
            </div>

            <SectionHeading label="Try it" title="Version 2, working" />
            <p className="font-body text-base text-muted leading-[1.8] mb-8">
              This is the 2026 prototype, running live, not screenshots. Switch the language to Arabic, try dark mode,
              open a place from the map. Last updated {PROTOTYPE_UPDATED}.
            </p>
            <CityDalEmbed />

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



            <SectionHeading label="What changed" title="Before and after, three flows" />
            <p className="font-body text-base text-muted leading-[1.8] mb-8">
              I rebuilt the flows where people got stuck: booking, finding a place with its deals, and chat. The 2023
              screens are on the left and the 2026 ones on the right. The{" "}
              <Link href="/case-studies/citydal-v2" className="text-accent-light underline underline-offset-4 hover:text-primary">case study</Link>{" "}
              has the reasoning.
            </p>
            <Figure src="/assets/citydal-v2/citydal-v2-case-study-cover.png" alt="Three flows before (2023) and after (2026): booking, place and deals, chat" sizes={WIDE} />

            <SectionHeading label="The system" title="One system for both apps" />
            <p className="font-body text-base text-muted leading-[1.8] mb-8">
              Both apps share one set of colours, type, components and spacing, so a business owner and a customer are
              looking at the same product. The whole system works in English and Arabic, in light and dark.
            </p>
            <ul className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
              {SWATCHES.map(([hex, name, use]) => (
                <li key={name} className="rounded-xl border border-white/[0.08] overflow-hidden">
                  <div className="h-16" style={{ background: hex }} aria-hidden />
                  <div className="p-3">
                    <span className="block font-display text-sm text-primary">{name}</span>
                    <span className="block font-body text-xs text-dim">{hex}</span>
                    <span className="block mt-1 font-body text-xs text-muted leading-[1.5]">{use}</span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="font-body text-sm text-muted leading-[1.75] mb-8">
              Type is Plus Jakarta Sans for English and IBM Plex Sans Arabic for Arabic. Arabic uses right-to-left layout
              and Eastern numerals. Motion has a reduced-motion fallback.
            </p>
            <Strip src="/assets/citydal-v2/citydal-v2-arabic-dark-both.webp" alt="Arabic right-to-left Home, dark mode Home, and the dark mode business dashboard" caption="Arabic right-to-left, dark mode, and the Business app in dark." />

            <SectionHeading label="Decisions" title="Three choices that shaped it" />
            <ol className="flex flex-col gap-4">
              {DECISIONS.map(([title, body], i) => (
                <li key={title} className="rounded-xl border border-white/[0.08] p-5 grid grid-cols-[32px_1fr] gap-3">
                  <span className="font-display text-xl text-accent">{i + 1}</span>
                  <div>
                    <h3 className="font-display text-lg text-primary mb-1">{title}</h3>
                    <p className="font-body text-sm text-muted leading-[1.75]">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-4 font-body text-sm text-muted">
              More in the{" "}
              <Link href="/case-studies/citydal-v2" className="text-accent-light underline underline-offset-4 hover:text-primary">case study</Link>.
            </p>

            <SectionHeading label="Brand" title="The logo, from 2023" />
            <div className="flex flex-col gap-4 font-body text-base text-muted leading-[1.8] mb-8">
              <p>
                The mark fuses a C, a d and a map pin into one shape, so it reads as a letter and as a place at once. The
                provider app adds a small &ldquo;Business&rdquo; label to the same mark, so the logo changes with the app a
                person opens. Version 2 keeps the mark and reinterprets the colour and type around it.
              </p>
            </div>
            <div className="mb-5">
              <Figure src="/assets/citydal/brand_cover.png" alt="The 2023 CityDal brand guidelines cover: the wordmark and tagline beside an oversized version of the logo mark" caption="The 2023 brand guidelines." sizes={WIDE} />
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
