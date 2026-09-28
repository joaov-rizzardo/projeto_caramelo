// Mock data for the site. Replace the photo URLs with the NGO's real photo
// library when available — every image here is a free Unsplash placeholder.
// Helper builds a sized Unsplash URL from a stable photo id.
export const unsplash = (id: string, w = 800, h = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=75`;

export const photos = {
  hero: "photo-1623387641168-d9803ddd3f35", // cat + puppy on the grass
  about: "photo-1516734212186-a967f81ad0d7", // hand petting a golden dog
} as const;

export const brl = (value: number) => `R$ ${value.toLocaleString("pt-BR")}`;

export interface Campaign {
  id: string;
  title: string;
  category: string;
  description: string;
  raised: number;
  goal: number;
  photoId: string;
}

// "Vakinhas" — active fundraising campaigns.
// TODO: replace with the NGO's real campaigns.
export const campaigns: Campaign[] = [
  {
    id: "thor",
    title: "Cirurgia do Thor",
    category: "Tratamento",
    description:
      "O Thor precisa de uma cirurgia para tratar uma fratura na pata. Sua ajuda é essencial!",
    raised: 1240,
    goal: 3000,
    photoId: "photo-1594149929911-78975a43d4f5",
  },
  {
    id: "nina",
    title: "Cuidando da Nina",
    category: "Alimentação",
    description:
      "A Nina está em tratamento e precisa de ração especial e suplementos para se recuperar.",
    raised: 680,
    goal: 2000,
    photoId: "photo-1529778873920-4da4926a72c2",
  },
  {
    id: "lupi",
    title: "Raio-X para o Lupi",
    category: "Tratamento",
    description:
      "O Lupi sofreu um acidente e precisa de exames de imagem para um diagnóstico preciso.",
    raised: 1850,
    goal: 5000,
    photoId: "photo-1518717758536-85ae29035b6d",
  },
  {
    id: "mel",
    title: "Tratamento da Mel",
    category: "Medicamento",
    description:
      "A Mel precisa de medicação contínua para o tratamento de uma doença crônica.",
    raised: 920,
    goal: 2500,
    photoId: "photo-1573865526739-10659fec78a5",
  },
];

export type Species = "dog" | "cat";

export interface Animal {
  id: string;
  name: string;
  species: Species;
  sex: "Macho" | "Fêmea";
  age: string; // human-readable, e.g. "2 anos"
  size: string; // e.g. "Médio porte"
  photoId: string;
  bio: string;
}

// TODO: replace with real rescued animals awaiting adoption.
export const animals: Animal[] = [
  {
    id: "thor",
    name: "Thor",
    species: "dog",
    sex: "Macho",
    age: "2 anos",
    size: "Médio porte",
    photoId: "photo-1543466835-00a7907e9de1",
    bio: "Carinhoso, brincalhão e ama passear. Está pronto para um novo lar!",
  },
  {
    id: "luna-cao",
    name: "Luna",
    species: "dog",
    sex: "Fêmea",
    age: "3 anos",
    size: "Médio porte",
    photoId: "photo-1477884213360-7e9d7dcc1e48",
    bio: "Dócil, inteligente e adora companhia. Vai se dar bem em qualquer família.",
  },
  {
    id: "bento",
    name: "Bento",
    species: "cat",
    sex: "Macho",
    age: "1 ano",
    size: "Pequeno porte",
    photoId: "photo-1596854407944-bf87f6fdd49e",
    bio: "Calmo e muito carinhoso. Já passou por muito e agora só quer um lar.",
  },
  {
    id: "mingau",
    name: "Mingau",
    species: "cat",
    sex: "Macho",
    age: "1 ano",
    size: "Pequeno porte",
    photoId: "photo-1514888286974-6c03e2ca1dba",
    bio: "Brincalhão, curioso e gosta de um colo quentinho.",
  },
  {
    id: "luna-gata",
    name: "Luna",
    species: "cat",
    sex: "Fêmea",
    age: "2 anos",
    size: "Pequeno porte",
    photoId: "photo-1574158622682-e40e69881006",
    bio: "Tranquila, carinhosa e gosta de sonecas. Vai te conquistar!",
  },
];
