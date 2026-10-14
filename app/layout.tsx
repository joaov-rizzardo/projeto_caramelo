import type { Metadata } from "next";
import { Fredoka, Caveat, Nunito, Montserrat } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Projeto Caramelo — Amor que transforma vidas",
  description:
    "ONG que atua no resgate, acolhimento e cuidado de cães e gatos em situação de abandono, promovendo adoção responsável e conscientização.",
  openGraph: {
    title: "Projeto Caramelo — Amor que transforma vidas",
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
      className={`${fredoka.variable} ${caveat.variable} ${nunito.variable} ${montserrat.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-cream text-navy">
        {children}
      </body>
    </html>
  );
}
