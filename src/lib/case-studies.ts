import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CASE_STUDIES_DIR = path.join(process.cwd(), "content/case-studies");

// ─── Markdown-based case studies (used by /work/[slug] and /case-studies) ─────

type MdCaseStudy = {
  slug: string;
  index: string;
  title: string;
  summary: string;
  tags: string[];
  product: string;
  content: string;
};

function readCaseStudyFile(filename: string): MdCaseStudy {
  const match = filename.match(/^case-study-(\d+)-(.+)\.md$/);
  if (!match) throw new Error(`Unexpected case study filename: ${filename}`);
  const [, order, slug] = match;

  const raw = fs.readFileSync(path.join(CASE_STUDIES_DIR, filename), "utf8");
  const { data, content } = matter(raw);
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

export function getAllCaseStudies(): MdCaseStudy[] {
  return fs
    .readdirSync(CASE_STUDIES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(readCaseStudyFile)
    .sort((a, b) => a.index.localeCompare(b.index));
}

export function getCaseStudy(slug: string): MdCaseStudy | undefined {
  return getAllCaseStudies().find((c) => c.slug === slug);
}

// ─── Rich case study pages (used by /case-studies/[slug]) ─────────────────────

export interface CaseStudy {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  hook: string;
  category: string;
  type: string;
  year: string;
  platform: string;
  stats: { value: string; label: string }[];
  coverImages: string[];
  brand: {
    bg: string;
    surface: string;
    accent: string;
    accentLight: string;
    text: string;
  };
  sections: {
    problem: { title: string; body: string; expanded?: string };
    role: { title: string; body: string };
    decision: { title: string; body: string; expanded?: string };
    built: {
      title: string;
      body: string;
      screens: { placeholder: string; title: string; caption: string }[];
      expanded?: string;
    };
    result: { title: string; stats: { value: string; label: string }[] };
    learning: { title: string; quote: string };
  };
  next: { slug: string; title: string };
}

const RICH_PAGES: Record<string, CaseStudy> = {
  afif: {
    slug: "afif",
    index: "01",
    title: "AFIF — Protecting Innocence",
    subtitle: "Case study 01",
    hook: "How do you build a child safety app that children actually trust?",
    category: "Mobile UX",
    type: "Freelance",
    year: "2023",
    platform: "Android",
    stats: [
      { value: "2", label: "Apps designed" },
      { value: "100%", label: "Design ownership" },
      { value: "Live", label: "Google Play" },
      { value: "2023", label: "Launched" },
    ],
    coverImages: ["/images/afif-screen-1.png", "/images/afif-screen-2.png"],
    brand: {
      bg: "#013E43",
      surface: "#012A2E",
      accent: "#52BC9A",
      accentLight: "#E1F5EE",
      text: "#F8FAFC",
    },
    sections: {
      problem: {
        title: "Parents had no middle ground between ban the phone and trust blindly",
        body: "The client came to me with a simple ask: build a parental control app for Mobile experience. When I dug in, the actual problem was different. Parents weren't struggling with technology, they were struggling with trust. The existing apps solved the wrong thing: they gave parents control, but destroyed the parent-child relationship the moment kids discovered them.",
        expanded:
          "I spent time mapping the emotional dynamics at play. In many worldwide households, the conversation about screen time is loaded; it sits at the intersection of protection, authority, and trust. The apps that were failing weren't failing technically. They were failing relationally. That framing shaped every design decision I made from that point on.",
      },
      role: {
        title: "I owned everything — and that was the point",
        body: "This was a freelance engagement with full design ownership. I handled brand identity, logo re-design, information architecture, UX flows, UI design, and the component system — across two separate apps built for entirely different emotional contexts. No handoff to another designer. No design review cycle. Just me, the client, and the problem.",
      },
      decision: {
        title: "I pushed back on the brief — and built two apps instead of one",
        body: "The original brief was one app: for the parent. Most parental control products are built this way & the child never sees them, never consents, and eventually discovers them. I told the client I didn't want to build that. I made the case for transparency: a second app the child uses too, that shows them exactly what their parent can see. The client pushed back on the added scope. I held the position; because I believed the transparency wasn't just an ethical choice, it was the product strategy.",
        expanded:
          "Designing for consent changed everything about the architecture. We now had two distinct users with opposing emotional needs: a parent who needed control and confidence, and a child who needed dignity and honesty. The supervisor app had to feel powerful without feeling punitive. The supervisee app had to feel safe without feeling monitored. Getting that balance right was the hardest design challenge on the project, and the one I'm most proud of solving.",
      },
      built: {
        title: "Two apps. One shared system. Complete transparency by design.",
        body: "The supervisor app gave parents a real-time dashboard: child location, battery level, activity alerts, and content warnings — all designed for quick triage. The supervisee app opened with a transparent onboarding flow that explained, clearly and simply, what the parent could see. No hidden features. No surprises. The child's consent was built into the activation flow.",
        screens: [
          {
            placeholder: "/images/afif-screen-1.png",
            title: "Parent dashboard",
            caption:
              "At-a-glance view of all children — location, battery, warnings, and online status in one screen.",
          },
          {
            placeholder: "/images/afif-screen-2.png",
            title: "Transparent onboarding",
            caption:
              "The child's app explains what the parent can see before activation — consent built into the flow.",
          },
        ],
        expanded:
          "The full scope included a notification system, location tracking view, content filter settings, profile management, and the complete activation flow — all delivered in a single freelance engagement. Each screen had a defined emotional job: the parent-facing screens needed to project calm and confidence, not alarm. The child-facing screens needed to feel respectful, not confrontational. That distinction drove every layout, copy, and color decision.",
      },
      result: {
        title: "Shipped, live on Google Play, and still running",
        stats: [
          { value: "Live", label: "Google Play Store" },
          { value: "2", label: "User types served" },
          { value: "100%", label: "Solo design ownership" },
        ],
      },
      learning: {
        title: "The best design decision I made wasn't about layout or color",
        quote:
          "Pushing back on the brief cost us scope and time. But it gave the product a reason to exist that the competition didn't have. Surveillance tools are a commodity. Trust-building tools are rare. The decision to design for transparency wasn't just ethical — it turned out to be the competitive angle we hadn't planned for.",
      },
    },
    next: { slug: "intouch", title: "Intouch Design System" },
  },

  intouch: {
    slug: "intouch",
    index: "02",
    title: "Intouch Live Platform",
    subtitle: "Case study 02",
    hook: "Replacing 4+ legacy systems with one unified retail media platform.",
    category: "Product Design",
    type: "Full-time",
    year: "2025",
    platform: "Web",
    stats: [
      { value: "3", label: "Markets" },
      { value: "40%", label: "Faster handoff" },
      { value: "4+", label: "Years" },
      { value: "2025", label: "Shipped" },
    ],
    coverImages: ["/images/intouch-cover.png"],
    brand: {
      bg: "#0A1628",
      surface: "#051020",
      accent: "#3B82F6",
      accentLight: "#EFF6FF",
      text: "#F8FAFC",
    },
    sections: {
      problem: {
        title: "Four legacy systems, one broken workflow",
        body: "Coming soon — this case study is currently being written.",
      },
      role: {
        title: "Lead Product Designer",
        body: "Coming soon.",
      },
      decision: {
        title: "Placeholder — coming soon",
        body: "Coming soon.",
      },
      built: {
        title: "Placeholder — coming soon",
        body: "Coming soon.",
        screens: [],
      },
      result: {
        title: "Placeholder",
        stats: [
          { value: "3", label: "Markets" },
          { value: "40%", label: "Faster handoff" },
          { value: "4+", label: "Years" },
        ],
      },
      learning: {
        title: "Placeholder",
        quote: "Coming soon.",
      },
    },
    next: { slug: "geneina", title: "Geneina" },
  },

  geneina: {
    slug: "geneina",
    index: "03",
    title: "Geneina",
    subtitle: "Case study 03",
    hook: "Translating complex user needs into clear, accessible digital experiences.",
    category: "Product Design",
    type: "Freelance",
    year: "2025",
    platform: "Web & Mobile",
    stats: [{ value: "2025", label: "In progress" }],
    coverImages: [],
    brand: {
      bg: "#0F172A",
      surface: "#0B1120",
      accent: "#475569",
      accentLight: "#F1F5F9",
      text: "#F8FAFC",
    },
    sections: {
      problem: {
        title: "Placeholder — coming soon",
        body: "Coming soon — this case study is currently being written.",
      },
      role: {
        title: "Placeholder",
        body: "Coming soon.",
      },
      decision: {
        title: "Placeholder",
        body: "Coming soon.",
      },
      built: {
        title: "Placeholder",
        body: "Coming soon.",
        screens: [],
      },
      result: {
        title: "Placeholder",
        stats: [],
      },
      learning: {
        title: "Placeholder",
        quote: "Coming soon.",
      },
    },
    next: { slug: "afif", title: "AFIF — Protecting Innocence" },
  },
};

export function getRichCaseStudy(slug: string): CaseStudy | undefined {
  return RICH_PAGES[slug];
}

export function getRichCaseStudySlugs(): string[] {
  return Object.keys(RICH_PAGES);
}
