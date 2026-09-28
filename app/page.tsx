import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { CampaignsSection } from "@/components/CampaignsSection";
import { AdoptionSection } from "@/components/AdoptionSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <CampaignsSection />
        <AdoptionSection />
      </main>
      <Footer />
    </>
  );
}
