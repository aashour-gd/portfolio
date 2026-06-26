import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Ahmed Ashour — Senior Product Designer",
    template: "%s — Ahmed Ashour",
  },
  description:
    "Senior Product Designer specializing in product design, design systems, and enterprise UX. Turning complex problems into elegant, usable experiences.",
  keywords: ["product design", "UX design", "design systems", "UI design", "portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
