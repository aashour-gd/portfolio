import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aashour.com"),
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
    <html lang="en" className={`${GeistSans.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
