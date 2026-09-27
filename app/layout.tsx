import type { Metadata } from "next";
import { Fredoka, Caveat, Nunito } from "next/font/google";
import "./globals.css";

// Display: chunky, rounded, playful — mimics the hand-lettered "Muito
// obrigado!" of the reference post.
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

export const metadata: Metadata = {
  title: "Projeto Caramelo — Quem ama cuida",
  description:
    "ONG brasileira de resgate animal. Ajude a resgatar, cuidar e encontrar lares para cães e gatos. Doe via Pix, adote e seja voluntário.",
  openGraph: {
    title: "Projeto Caramelo — Quem ama cuida",
    description:
      "Resgatamos, cuidamos e encontramos lares para animais. Cada focinho merece um lar.",
    type: "website",
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
      className={`${fredoka.variable} ${caveat.variable} ${nunito.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-cream text-navy">
        {children}
      </body>
    </html>
  );
}
