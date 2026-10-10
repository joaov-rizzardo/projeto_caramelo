import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { CampaignsSection } from "@/components/CampaignsSection";
import { AdoptionSection } from "@/components/AdoptionSection";
import { Footer } from "@/components/Footer";
import { getAnimals, getCampaigns } from "@/lib/content";

export default async function Home() {
  const [campaigns, animals] = await Promise.all([getCampaigns(), getAnimals()]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <CampaignsSection campaigns={campaigns} />
        <AdoptionSection animals={animals} />
      </main>
      <Footer />
    </>
  );
}
