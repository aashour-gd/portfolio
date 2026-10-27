// Single source of truth for the CV. Edit cv.json, never this file.
// Feeds: /cv page, /about timeline, and the PDF built by scripts/build-cv-pdf.tsx.
import raw from "./cv.json";

export type CvWork = {
  name: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  highlights: string[];
};

export type Cv = {
  basics: {
    name: string;
    label: string;
    headline: string;
    email: string;
    phone?: string;
    url: string;
    summary: string;
    location: { city: string; countryCode: string; region: string };
    profiles: { network: string; username: string; url: string }[];
    availability: string;
    targets: string;
  };
  work: CvWork[];
  projects: { name: string; description: string; url: string }[];
  skills: { name: string; keywords: string[] }[];
  education: { institution: string; studyType: string; area: string; endDate: string }[];
  certificates: { name: string; issuer: string; date?: string }[];
};

export const cv = raw as Cv;

export const CV_PDF_FILENAME = "Ahmed-Ashour-Senior-Product-Designer-CV.pdf";
export const CV_PDF_URL = `/${CV_PDF_FILENAME}`;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2020-08" → "Aug 2020"; "2014" → "2014"; undefined → "Present". */
export function formatCvDate(date?: string): string {
  if (!date) return "Present";
  const [year, month] = date.split("-");
  return month ? `${MONTHS[Number(month) - 1]} ${year}` : year;
}

export function formatCvRange(start: string, end?: string): string {
  return `${formatCvDate(start)} – ${formatCvDate(end)}`;
}

/** Strips "https://www." for display. */
export function displayUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}
