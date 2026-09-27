// Central place for brand copy, contact details and the figures shown across
// the site. Everything a non-developer at the NGO would want to edit lives here.

export const site = {
  name: "Projeto Caramelo",
  tagline: "Quem ama cuida",
  // TODO: replace with the NGO's real contact details before launch.
  email: "contato@projetocaramelo.org.br",
  phone: "(11) 99999-0000",
  cnpj: "00.000.000/0001-00", // placeholder
  city: "São Paulo — SP",
  address: "Rua dos Vira-latas, 123 — São Paulo/SP",
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
  },
  // Real Pix key goes here — the box is built to display and copy this string.
  pixKey: "contato@projetocaramelo.org.br", // TODO: replace with real Pix key
  pixKeyType: "E-mail",
} as const;

export const navLinks = [
  { href: "#home", label: "Início" },
  { href: "#sobre", label: "Sobre" },
  { href: "#adotar", label: "Adotar" },
  { href: "#doar", label: "Doar" },
  { href: "#voluntariar", label: "Voluntariar" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#contato", label: "Contato" },
] as const;

// Hero counters — animate up when scrolled into view.
export const impactStats = [
  { label: "Animais resgatados", value: 1240, suffix: "+" },
  { label: "Adoções felizes", value: 870, suffix: "+" },
  { label: "Doadores ativos", value: 320, suffix: "" },
  { label: "Arrecadado (R$)", value: 148000, prefix: "R$ ", compact: true },
] as const;

// Where each R$1 of donation goes — shown in the transparency block.
export const allocation = [
  { label: "Cuidados veterinários", pct: 45, color: "#e8862e" },
  { label: "Alimentação", pct: 30, color: "#5b8f6f" },
  { label: "Resgates e transporte", pct: 15, color: "#1b2a4a" },
  { label: "Castração", pct: 10, color: "#e8624a" },
] as const;

// "Recent thank-yous" — concrete examples of what donations funded, echoing
// the reference Instagram post ("R$ 2.121,00 para a recuperação da Estrela").
export const thankYous = [
  {
    animal: "Estrela",
    amount: "R$ 2.121,00",
    story: "cobriu toda a cirurgia e recuperação após um atropelamento.",
  },
  {
    animal: "Thor",
    amount: "R$ 640,00",
    story: "pagou o tratamento contra leishmaniose e três meses de ração.",
  },
  {
    animal: "Mel",
    amount: "R$ 380,00",
    story: "custeou a castração e as vacinas antes da adoção.",
  },
] as const;

// Suggested amounts — inspiration only. With Pix the donor types any value in
// their own banking app, so these are intentionally not clickable buttons.
export const suggestedAmounts = ["R$ 20", "R$ 50", "R$ 100", "R$ 200"] as const;
