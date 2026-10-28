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

  const every = getAllCaseStudies();
  const all = every.filter((c) => !c.unlisted || c.slug === slug);
  const idx = all.findIndex((c) => c.slug === slug);
  // An explicit next: chain (e.g. a hub series) wins over file order, even through unlisted pages.
  const prev = every.find((c) => c.next === slug) ?? all[idx - 1];
  const next = every.find((c) => c.slug === cs.next) ?? all[(idx + 1) % all.length];

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
