// Data model for the admin area: one Firestore document per pet / vakinha
// (the document id is `id`, the rest of the fields are stored as-is).

export type Species = "dog" | "cat";

export interface Pet {
  id: string;
  name: string;
  species: Species;
  sex: "Macho" | "Fêmea";
  age: string;
  size: string;
  bio: string;
  photo: string; // public image URL
  createdAt: number;
}

export interface Donation {
  id: string;
  amount: number;
  date: string; // YYYY-MM-DD
  note: string;
}

export interface Vakinha {
  id: string;
  title: string;
  category: string;
  description: string;
  goal: number;
  photo: string; // cleared when the vakinha is closed
  closedAt: string | null; // YYYY-MM-DD; closed vakinhas are read-only
  donations: Donation[];
  createdAt: number;
}

// Output size of the cropper for each image slot. Pets show in 4:3 cards
// (adoption section + mobile modal); vakinhas in wide 5:3 card headers.
export const imageSpecs = {
  pet: { aspect: 4 / 3, width: 1200, height: 900, label: "4:3" },
  vakinha: { aspect: 5 / 3, width: 1000, height: 600, label: "5:3" },
} as const;

export type ImageSpec = (typeof imageSpecs)[keyof typeof imageSpecs];

export const petSizes = ["Pequeno porte", "Médio porte", "Grande porte"] as const;
export const vakinhaCategories = [
  "Tratamento",
  "Cirurgia",
  "Medicamento",
  "Alimentação",
  "Abrigo",
  "Outros",
] as const;

export const money = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// Accepts "1.234,56", "1.000", "1234.56", "50" → number (NaN when invalid).
export function parseMoney(raw: string) {
  const s = raw.replace(/[R$\s]/g, "");
  if (s.includes(",")) return Number(s.replace(/\./g, "").replace(",", "."));
  // Without a comma, dots followed by 3 digits are thousand separators.
  return Number(/^\d{1,3}(\.\d{3})+$/.test(s) ? s.replace(/\./g, "") : s);
}

export const raisedOf = (v: Vakinha) => v.donations.reduce((sum, d) => sum + d.amount, 0);

// crypto.randomUUID only exists in secure contexts (https / localhost), so it
// breaks when the dev server is opened over the LAN IP. getRandomValues doesn't.
export const newId = () =>
  Array.from(crypto.getRandomValues(new Uint8Array(12)), (b) => b.toString(16).padStart(2, "0")).join("");
// Local calendar date as YYYY-MM-DD (toISOString would shift to UTC).
export const today = () => new Date().toLocaleDateString("sv-SE");
export const formatDate = (ymd: string) => new Date(`${ymd}T12:00`).toLocaleDateString("pt-BR");
