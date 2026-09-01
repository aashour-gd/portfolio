import { notFound } from "next/navigation";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import MarkdownCaseStudy from "@/components/case-studies/markdown-case-study";
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
        <MarkdownCaseStudy
          cs={cs}
          prev={prev}
          next={next}
          basePath="/work"
          backLabel="Back to Work"
        />
      </main>
      <Footer />
    </>
  );
}
