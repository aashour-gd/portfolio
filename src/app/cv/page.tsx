import type { Metadata } from "next";
import { Download } from "lucide-react";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { cv, CV_PDF_URL, displayUrl, formatCvDate, formatCvRange } from "@/data/cv";

export const metadata: Metadata = {
  title: `CV: ${cv.basics.name}, ${cv.basics.label}`,
  description: cv.basics.headline,
  alternates: { canonical: "/cv" },
};

// Structured data so search engines and AI recruiting agents read this page as a person profile.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: cv.basics.name,
  jobTitle: cv.basics.label,
  description: cv.basics.headline,
  email: `mailto:${cv.basics.email}`,
  url: cv.basics.url,
  address: { "@type": "PostalAddress", addressLocality: cv.basics.location.city, addressCountry: cv.basics.location.countryCode },
  sameAs: cv.basics.profiles.map((p) => p.url),
  alumniOf: cv.education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.institution })),
  knowsAbout: cv.skills.flatMap((g) => g.keywords),
};

const Heading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-6 pb-2 border-b border-white/[0.06]">
    {children}
  </h2>
);

export default function CvPage() {
  const { basics } = cv;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <Nav />
      <main className="pt-[72px]">
        <article className="max-w-3xl mx-auto px-6 py-16 lg:py-24">
          {/* Header */}
          <header className="mb-14">
            <h1 className="font-display text-5xl font-bold text-primary">{basics.name}</h1>
            <p className="font-display text-xl font-semibold text-accent-light mt-2">{basics.label}</p>
            <p className="font-body text-base text-muted mt-3">{basics.headline}</p>
            <p className="font-body text-sm text-muted mt-4">
              {basics.location.city}, {basics.location.region} · {basics.availability}
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 font-body text-sm">
              <a href={`mailto:${basics.email}`} className="text-primary hover:text-accent-light">{basics.email}</a>
              {basics.profiles.map((p) => (
                <a key={p.network} href={p.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent-light">
                  {p.network}
                </a>
              ))}
            </div>
            {/* Phone stays in the PDF only: a public web page is scraped by spam bots. */}
            <a
              href={CV_PDF_URL}
              download
              className="mt-8 inline-flex items-center gap-2 px-5 py-3 bg-accent hover:bg-accent-light text-white text-sm font-medium font-body rounded-lg transition-colors duration-200 shadow-lg shadow-accent/20"
            >
              <Download size={16} aria-hidden /> Download PDF
            </a>
          </header>

          <section className="mb-14">
            <Heading>Profile</Heading>
            <p className="font-body text-base text-muted leading-relaxed">{basics.summary}</p>
          </section>

          <section className="mb-14">
            <Heading>Experience</Heading>
            <div className="flex flex-col gap-10">
              {cv.work.map((job) => (
                <div key={job.name + job.startDate}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <h3 className="font-display font-semibold text-primary">
                      {job.position} <span className="text-accent-light">· {job.name}</span>
                    </h3>
                    <span className="font-body text-xs text-dim shrink-0">{formatCvRange(job.startDate, job.endDate)}</span>
                  </div>
                  {job.location && <p className="font-body text-xs text-dim mt-1">{job.location}</p>}
                  {job.summary && <p className="font-body text-sm text-muted mt-2">{job.summary}</p>}
                  <ul className="font-body text-sm text-muted leading-relaxed list-disc pl-5 mt-3 space-y-1.5">
                    {job.highlights.map((h) => <li key={h}>{h}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-14">
            <Heading>Selected work</Heading>
            <ul className="flex flex-col gap-4">
              {cv.projects.map((p) => (
                <li key={p.name}>
                  <a href={p.url} className="font-display font-semibold text-primary hover:text-accent-light">{p.name}</a>
                  <p className="font-body text-sm text-muted mt-1">{p.description}</p>
                  <p className="font-body text-xs text-dim mt-0.5">{displayUrl(p.url)}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-14">
            <Heading>Skills</Heading>
            <dl className="flex flex-col gap-3">
              {cv.skills.map((g) => (
                <div key={g.name} className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4">
                  <dt className="font-body text-sm font-semibold text-primary">{g.name}</dt>
                  <dd className="font-body text-sm text-muted">{g.keywords.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <Heading>Education</Heading>
            <ul className="flex flex-col gap-3 font-body text-sm">
              {cv.education.map((e) => (
                <li key={e.area}>
                  <span className="font-semibold text-primary">{e.studyType}, {e.area}</span>
                  <span className="text-muted"> · {e.institution}, {formatCvDate(e.endDate)}</span>
                </li>
              ))}
              {cv.certificates.map((c) => (
                <li key={c.name}>
                  <span className="font-semibold text-primary">{c.name}</span>
                  <span className="text-muted"> · {c.issuer}{c.date ? `, ${formatCvDate(c.date)}` : ""}</span>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
