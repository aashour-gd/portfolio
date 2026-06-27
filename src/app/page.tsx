import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import Hero from "@/components/home/hero";
import FeaturedCaseStudies from "@/components/home/featured-case-studies";
import AboutPreview from "@/components/home/about-preview";
import Skills from "@/components/home/skills";
import MarketplacePreview from "@/components/home/marketplace-preview";
import ContactCta from "@/components/home/contact-cta";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <FeaturedCaseStudies />
        <AboutPreview />
        <Skills />
        <MarketplacePreview />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
