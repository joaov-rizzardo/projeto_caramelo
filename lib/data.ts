// Shared site data. Pets and vakinhas come from Firestore (lib/content.ts).
// Hero/About photos live in public/images (originally from Unsplash).
export const photos = {
  hero: "/images/hero.jpg", // cat + puppy on the grass
  about: "/images/sobre.jpg", // smiling golden puppy
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
