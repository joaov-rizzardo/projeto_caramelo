import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { CampaignsSection } from "@/components/CampaignsSection";
import { AdoptionSection } from "@/components/AdoptionSection";
import { Footer } from "@/components/Footer";
import { getAnimals, getCampaigns } from "@/lib/content";
import { siteUrl } from "@/lib/env";
import { site } from "@/lib/site";

// Structured data so search engines know who runs the site and where.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  slogan: site.tagline,
  url: siteUrl,
  logo: `${siteUrl}/logo-badge.png`,
  description:
    "Projeto independente de voluntários que resgata, cuida e encontra lares para cães e gatos abandonados em Cachoeira Paulista (SP).",
  areaServed: "Cachoeira Paulista, SP",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cachoeira Paulista",
    addressRegion: "SP",
    addressCountry: "BR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: `+${site.whatsapp}`,
    contactType: "customer support",
    availableLanguage: "Portuguese",
  },
  sameAs: Object.values(site.socials),
};

export default async function Home() {
  const [campaigns, animals] = await Promise.all([getCampaigns(), getAnimals()]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
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
