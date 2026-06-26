import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CASE_STUDIES_DIR = path.join(process.cwd(), "content/case-studies");

export type CaseStudy = {
  slug: string;
  index: string;
  title: string;
  summary: string;
  tags: string[];
  product: string;
  content: string;
};

function readCaseStudyFile(filename: string): CaseStudy {
  const match = filename.match(/^case-study-(\d+)-(.+)\.md$/);
  if (!match) {
    throw new Error(`Unexpected case study filename: ${filename}`);
  }
  const [, order, slug] = match;

  const raw = fs.readFileSync(path.join(CASE_STUDIES_DIR, filename), "utf8");
  const { data, content } = matter(raw);

  // Strip the leading H1 — the title is shown separately via frontmatter.
  const body = content.trim().replace(/^#\s+.+/, "").trim();

  return {
    slug,
    index: order.padStart(2, "0"),
    title: data.title,
    summary: data.summary,
    tags: data.tags ?? [],
    product: data.product ?? "",
    content: body,
  };
}

export function getAllCaseStudies(): CaseStudy[] {
  return fs
    .readdirSync(CASE_STUDIES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(readCaseStudyFile)
    .sort((a, b) => a.index.localeCompare(b.index));
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return getAllCaseStudies().find((c) => c.slug === slug);
}
