// Central place for brand copy, contact details and links shown across the
// site. Everything a non-developer at the NGO would want to edit lives here.

export const site = {
  name: "Projeto Caramelo",
  tagline: "Amor que transforma vidas",
  // TODO: replace with the NGO's real contact details before launch.
  email: "contato@projetocaramelo.org.br",
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
  },
  // Real Pix key goes here — the QR code modal displays and copies it.
  pixKey: "contato@projetocaramelo.org.br", // TODO: replace with real Pix key
  pixKeyType: "E-mail",
} as const;

export const navLinks = [
  { href: "#inicio", label: "Início" },
  { href: "#adocao", label: "Adoção" },
  { href: "#vakinhas", label: "Vakinhas" },
  { href: "#sobre", label: "Sobre nós" },
  { href: "#noticias", label: "Notícias" },
  { href: "#contato", label: "Contato" },
] as const;
