import type { Metadata } from "next";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import CityDalEmbed from "@/components/citydal/citydal-embed";

// Temporary test page for the CityDal embed. Not linked anywhere and hidden from search engines.
export const metadata: Metadata = {
  title: "CityDal prototype (test)",
  robots: { index: false, follow: false },
};

export default function CityDalTestPage() {
  return (
    <>
      <Nav />
      <main className="pt-[72px]">
        <section className="mx-auto max-w-5xl px-6 py-10">
          <h1 className="mb-6 text-center text-2xl font-semibold">CityDal prototype</h1>
          <CityDalEmbed />
        </section>
      </main>
      <Footer />
    </>
  );
}
