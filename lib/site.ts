// Central place for brand copy, contact details and links shown across the
// site. Everything a non-developer at the NGO would want to edit lives here.

export const site = {
  name: "Projeto Caramelo",
  tagline: "Quem ama cuida",
  // TODO: replace with the NGO's real contact details before launch.
  email: "contato@projetocaramelo.org.br",
  // WhatsApp used by the "Quero adotar" button: digits only, with country
  // and area code (e.g. 5511999999999).
  whatsapp: "5512996025508",
  socials: {
    instagram: "https://instagram.com/projeto_caramelo_?vrfl=a3M2Y250eTRsb3Jw",
    facebook: "https://www.facebook.com/share/1Ga41xFdgG/",
  },
  // Pix used by every donation QR code on the site (vakinhas and general
  // donations). The key must be in the official format (+55 for phones).
  pixKey: "+5512996025508",
  pixKeyLabel: "(12) 99602-5508",
  pixKeyType: "Celular",
  pixName: "Projeto Caramelo",
  pixCity: "Cachoeira Paulista",
} as const;

export const navLinks = [
  { href: "#inicio", label: "Início" },
  { href: "#adocao", label: "Adoção" },
  { href: "#vaquinhas", label: "Vaquinhas" },
  { href: "#sobre", label: "Sobre nós" },
] as const;
