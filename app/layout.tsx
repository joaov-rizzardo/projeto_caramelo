import type { Metadata } from "next";
import { Fredoka, Caveat, Nunito, Montserrat } from "next/font/google";
import "./globals.css";
import { siteUrl } from "@/lib/env";
import { site } from "@/lib/site";

// Display: chunky, rounded, playful headlines.
const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Script: handwritten accent for emotional callouts.
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

// Body: clean, friendly sans-serif.
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Usada só no logo da Vex Software no rodapé.
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "800"],
});

const title = "Projeto Caramelo — Resgate e adoção de cães e gatos em Cachoeira Paulista";
const description =
  "Projeto independente de voluntários que resgata, cuida e encontra lares para cães e gatos abandonados em Cachoeira Paulista (SP). Adote um pet ou apoie nossas vaquinhas via Pix.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: site.name,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${fredoka.variable} ${caveat.variable} ${nunito.variable} ${montserrat.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-cream text-navy">
        {children}
      </body>
    </html>
  );
}
