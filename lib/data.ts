// Shared site data. Pets and vakinhas come from Firestore (lib/content.ts);
// the Hero/About photos below are still Unsplash placeholders.
// Helper builds a sized Unsplash URL from a stable photo id.
export const unsplash = (id: string, w = 800, h = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=75`;

export const photos = {
  hero: "photo-1623387641168-d9803ddd3f35", // cat + puppy on the grass
  about: "photo-1562176566-e9afd27531d4", // smiling golden puppy
} as const;

export const brl = (value: number) => `R$ ${value.toLocaleString("pt-BR")}`;

// Public view of an active vakinha (raised = sum of its donations).
export interface Campaign {
  id: string;
  title: string;
  category: string;
  description: string;  raised: number;
  goal: number;
  photo: string; // hosted image URL
}

export type Species = "dog" | "cat";

export interface Animal {
  id: string;
  name: string;
  species: Species;
  sex: "Macho" | "Fêmea";
  age: string; // human-readable, e.g. "2 anos"
  size: string; // e.g. "Médio porte"
  photo: string; // hosted image URL
  bio: string;
}
