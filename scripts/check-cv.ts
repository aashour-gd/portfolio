// Guards the CV before every build.
//   npm run cv:check         → fails if any ⟪CONFIRM⟫ placeholder is left in cv.json
//   npm run cv:check -- --pdf → also runs the "ATS text test" on the built PDF
import fs from "node:fs";
import path from "node:path";
import { extractText, getDocumentProxy } from "unpdf";
import { cv, CV_PDF_FILENAME } from "../src/data/cv";

const fail = (msg: string) => {
  console.error(`\n✖ CV check failed: ${msg}\n`);
  process.exit(1);
};

// 1. No unanswered placeholders. Shipping "[Case study in portfolio]" is how CVs lose trust.
const json = fs.readFileSync(path.join(process.cwd(), "src/data/cv.json"), "utf8");
const open = json.match(/⟪CONFIRM:[^⟫]*⟫/g) ?? [];
if (open.length) fail(`${open.length} unanswered item(s) in src/data/cv.json:\n  - ${open.join("\n  - ")}`);

// 2. ATS text test: the PDF must have a real text layer, with headings in reading order.
if (process.argv.includes("--pdf")) {
  const file = path.join(process.cwd(), "public", CV_PDF_FILENAME);
  if (!fs.existsSync(file)) fail(`public/${CV_PDF_FILENAME} not found. Run npm run cv:pdf first.`);
  const pdf = await getDocumentProxy(new Uint8Array(fs.readFileSync(file)));
  const { text } = await extractText(pdf, { mergePages: true });
  const flat = text.replace(/\s+/g, " ");

  const mustHave = [cv.basics.name, cv.basics.email, "PROFILE", "EXPERIENCE", "SELECTED WORK", "SKILLS", "EDUCATION", ...cv.work.map((w) => w.name)];
  const missing = mustHave.filter((t) => !flat.includes(t));
  if (missing.length) fail(`PDF text layer is missing: ${missing.join(", ")}`);

  const order = ["PROFILE", "EXPERIENCE", "SELECTED WORK", "SKILLS", "EDUCATION"].map((h) => flat.indexOf(h));
  if (order.some((pos, i) => i > 0 && pos < order[i - 1])) fail("section headings are out of reading order");

  console.log(`✔ ATS text test passed: ${pdf.numPages} page(s), ${flat.length} characters, all sections in order.`);
} else {
  console.log("✔ No unanswered CV placeholders.");
}
