// Builds public/Ahmed-Ashour-Senior-Product-Designer-CV.pdf from src/data/cv.json.
// Single column, real text layer, standard headings: built to parse cleanly in any ATS.
// Run: npm run cv:pdf   (also runs automatically before every build)
import path from "node:path";
import React from "react";
import { Document, Font, Link, Page, StyleSheet, Text, View, renderToFile } from "@react-pdf/renderer";
import { cv, CV_PDF_FILENAME, displayUrl, formatCvDate, formatCvRange } from "../src/data/cv";

const fontDir = path.join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans");
Font.register({
  family: "Geist",
  fonts: [
    { src: path.join(fontDir, "Geist-Regular.ttf"), fontWeight: 400 },
    { src: path.join(fontDir, "Geist-Medium.ttf"), fontWeight: 500 },
    { src: path.join(fontDir, "Geist-SemiBold.ttf"), fontWeight: 600 },
    { src: path.join(fontDir, "Geist-Bold.ttf"), fontWeight: 700 },
  ],
});
Font.registerHyphenationCallback((word) => [word]); // never split words: hyphen fragments confuse parsers

const INK = "#0F172A";
const MUTED = "#475569";
const ACCENT = "#1B4FD8";

const s = StyleSheet.create({
  // Ligatures off: Geist's fi/fl/ff glyphs extract as "workfow"/"handof", which breaks ATS keyword matching.
  page: { fontFamily: "Geist", fontSize: 9.5, color: INK, paddingVertical: 36, paddingHorizontal: 44, lineHeight: 1.4, fontFeatureSettings: { liga: false, clig: false } },
  name: { fontSize: 22, fontWeight: 700, lineHeight: 1.15 },
  label: { fontSize: 12, fontWeight: 600, color: ACCENT, marginTop: 2 },
  headline: { fontSize: 9.5, color: MUTED, marginTop: 3 },
  contact: { fontSize: 9, marginTop: 6 },
  link: { color: INK, textDecoration: "none" },
  availability: { fontSize: 9, color: MUTED, marginTop: 2 },
  section: { marginTop: 13 },
  heading: { fontSize: 10, fontWeight: 700, color: ACCENT, borderBottomWidth: 0.75, borderBottomColor: "#CBD5E1", paddingBottom: 2, marginBottom: 6 },
  jobHead: { flexDirection: "row", justifyContent: "space-between", marginTop: 7 },
  jobTitle: { fontSize: 10, fontWeight: 600 },
  dates: { fontSize: 9, color: MUTED },
  jobSummary: { color: MUTED, marginTop: 1, marginBottom: 2 },
  bullet: { flexDirection: "row", marginTop: 2, paddingRight: 8 },
  dot: { width: 10 },
  bulletText: { flex: 1 },
  row: { marginTop: 3 },
  strong: { fontWeight: 600 },
});

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={s.section}>
    <Text style={s.heading}>{title.toUpperCase()}</Text>
    {children}
  </View>
);

const CvDocument = () => {
  const { basics } = cv;
  const linkedin = basics.profiles.find((p) => p.network === "LinkedIn");
  const github = basics.profiles.find((p) => p.network === "GitHub");
  const contact = [
    { text: basics.email, href: `mailto:${basics.email}` },
    ...(basics.phone ? [{ text: basics.phone, href: `tel:${basics.phone.replace(/\s/g, "")}` }] : []),
    { text: displayUrl(basics.url), href: basics.url },
    ...(linkedin ? [{ text: displayUrl(linkedin.url), href: linkedin.url }] : []),
    ...(github ? [{ text: displayUrl(github.url), href: github.url }] : []),
  ];

  return (
    <Document title={`${basics.name}: ${basics.label} CV`} author={basics.name} subject={basics.headline} keywords="Senior Product Designer, Design Systems, Figma Variables, UX, Product Design">
      <Page size="A4" style={s.page}>
        <Text style={s.name}>{basics.name}</Text>
        <Text style={s.label}>{basics.label}</Text>
        <Text style={s.headline}>{basics.headline}</Text>
        <Text style={s.contact}>
          {contact.map((c, i) => (
            <React.Fragment key={c.text}>
              {i > 0 ? "  |  " : ""}
              <Link src={c.href} style={s.link}>{c.text}</Link>
            </React.Fragment>
          ))}
        </Text>
        <Text style={s.availability}>
          {basics.location.city}, {basics.location.region}  ·  {basics.availability}
        </Text>

        <Section title="Profile">
          <Text>{basics.summary}</Text>
        </Section>

        <Section title="Experience">
          {cv.work.map((job) => (
            <View key={job.name + job.startDate} wrap={false}>
              <View style={s.jobHead}>
                <Text style={s.jobTitle}>
                  {job.position}  ·  {job.name}{job.location ? `  ·  ${job.location}` : ""}
                </Text>
                <Text style={s.dates}>{formatCvRange(job.startDate, job.endDate)}</Text>
              </View>
              {job.summary ? <Text style={s.jobSummary}>{job.summary}</Text> : null}
              {job.highlights.map((h) => (
                <View key={h} style={s.bullet}>
                  <Text style={s.dot}>•</Text>
                  <Text style={s.bulletText}>{h}</Text>
                </View>
              ))}
            </View>
          ))}
        </Section>

        <Section title="Selected Work">
          {cv.projects.map((p) => (
            <View key={p.name} style={s.bullet}>
              <Text style={s.dot}>•</Text>
              <Text style={s.bulletText}>
                <Text style={s.strong}>{p.name}</Text>: {p.description}{" "}
                <Link src={p.url} style={{ color: ACCENT, textDecoration: "none" }}>{displayUrl(p.url)}</Link>
              </Text>
            </View>
          ))}
        </Section>

        <Section title="Skills">
          {cv.skills.map((g) => (
            <Text key={g.name} style={s.row}>
              <Text style={s.strong}>{g.name}: </Text>
              {g.keywords.join(", ")}
            </Text>
          ))}
        </Section>

        <Section title="Education">
          {cv.education.map((e) => (
            <Text key={e.area} style={s.row}>
              <Text style={s.strong}>{e.studyType}, {e.area}</Text>  ·  {e.institution}, {formatCvDate(e.endDate)}
            </Text>
          ))}
          {cv.certificates.map((c) => (
            <Text key={c.name} style={s.row}>
              <Text style={s.strong}>{c.name}</Text>  ·  {c.issuer}{c.date ? `, ${formatCvDate(c.date)}` : ""}
            </Text>
          ))}
        </Section>

        <Text style={[s.availability, { marginTop: 14 }]}>Open to {basics.targets}</Text>
      </Page>
    </Document>
  );
};

const out = path.join(process.cwd(), "public", CV_PDF_FILENAME);
renderToFile(<CvDocument />, out).then(() => console.log(`CV PDF written: public/${CV_PDF_FILENAME}`));
