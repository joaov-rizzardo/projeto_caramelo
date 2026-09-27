import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { DonationSection } from "@/components/DonationSection";
import { AdoptionSection } from "@/components/AdoptionSection";
import { VolunteerSection } from "@/components/VolunteerSection";
import { Testimonials } from "@/components/Testimonials";
import { Gallery } from "@/components/Gallery";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <AdoptionSection />
        <DonationSection />
        <VolunteerSection />
        <Testimonials />
        <Gallery />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
