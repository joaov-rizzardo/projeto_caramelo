// Mock data for the site. Replace the photo URLs with the NGO's real photo
// library when available — every image here is a free Unsplash placeholder.
// Helper builds a sized Unsplash URL from a stable photo id.
export const unsplash = (id: string, w = 800, h = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=75`;

// Picsum fallback for a deterministic placeholder if an Unsplash id ever fails.
// e.g. picsum("caramelo", 800, 800)  — kept here for convenience.
export const picsum = (seed: string, w = 800, h = 800) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export type Species = "dog" | "cat";
export type Size = "small" | "medium" | "large";

export interface Animal {
  id: string;
  name: string;
  species: Species;
  age: string; // human-readable, e.g. "2 anos"
  ageMonths: number; // for filtering
  size: Size;
  traits: string[];
  photoId: string;
  bio: string;
}

// TODO: replace with real rescued animals awaiting adoption.
export const animals: Animal[] = [
  {
    id: "caramelo",
    name: "Caramelo",
    species: "dog",
    age: "2 anos",
    ageMonths: 24,
    size: "medium",
    traits: ["Dócil", "Brincalhão"],
    photoId: "photo-1450778869180-41d0601e046e",
    bio: "O clássico vira-lata caramelo. Resgatado na beira da estrada, hoje é pura alegria e adora uma soneca ao sol.",
  },
  {
    id: "amora",
    name: "Amora",
    species: "dog",
    age: "6 meses",
    ageMonths: 6,
    size: "small",
    traits: ["Curiosa", "Carinhosa"],
    photoId: "photo-1543466835-00a7907e9de1",
    bio: "Filhote cheia de energia que descobriu o mundo depois de ser resgatada de uma caixa de papelão na chuva.",
  },
  {
    id: "bento",
    name: "Bento",
    species: "dog",
    age: "4 anos",
    ageMonths: 48,
    size: "large",
    traits: ["Leal", "Protetor"],
    photoId: "photo-1587300003388-59208cc962cb",
    bio: "Grandão de coração mole. Espera pacientemente por alguém que goste de longas caminhadas e cafuné no fim do dia.",
  },
  {
    id: "nina",
    name: "Nina",
    species: "dog",
    age: "1 ano",
    ageMonths: 12,
    size: "medium",
    traits: ["Sociável", "Energética"],
    photoId: "photo-1548199973-03cce0bbc87b",
    bio: "Se dá bem com todo mundo — crianças, gatos e outros cães. Só precisa de um quintal para gastar toda a energia.",
  },
  {
    id: "frajola",
    name: "Frajola",
    species: "cat",
    age: "3 anos",
    ageMonths: 36,
    size: "medium",
    traits: ["Observador", "Independente"],
    photoId: "photo-1514888286974-6c03e2ca1dba",
    bio: "Gato de personalidade forte que escolhe seu humano com calma. Quando confia, vira o companheiro mais fiel da casa.",
  },
  {
    id: "mel",
    name: "Mel",
    species: "cat",
    age: "8 meses",
    ageMonths: 8,
    size: "small",
    traits: ["Meiga", "Dorminhoca"],
    photoId: "photo-1495360010541-f48722b34f7d",
    bio: "Uma bolinha de pelo que ronrona alto e ama colo. Foi resgatada ainda muito pequena e já está pronta para um lar.",
  },
  {
    id: "tom",
    name: "Tom",
    species: "cat",
    age: "2 anos",
    ageMonths: 24,
    size: "medium",
    traits: ["Brincalhão", "Falante"],
    photoId: "photo-1574158622682-e40e69881006",
    bio: "Conversa o dia todo e adora um brinquedo de varinha. Um palhaço nato que vai encher sua casa de miados felizes.",
  },
  {
    id: "aurora",
    name: "Aurora",
    species: "cat",
    age: "5 anos",
    ageMonths: 60,
    size: "large",
    traits: ["Tranquila", "Companheira"],
    photoId: "photo-1573865526739-10659fec78a5",
    bio: "Serena e observadora, prefere uma casa calma. A companhia perfeita para tardes de leitura e chá.",
  },
];

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  photoId: string;
}

// TODO: replace with real quotes and photos from adopters and donors.
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Juliana Prado",
    role: "Adotou a Mel",
    quote:
      "Achei que estava salvando uma vida — na verdade foi ela que salvou a minha. Nossa casa nunca mais foi tão feliz.",
    photoId: "photo-1537151625747-768eb6cf92b2",
  },
  {
    id: "t2",
    name: "Rafael Mendes",
    role: "Doador mensal",
    quote:
      "Doo todo mês pelo Pix. Receber a foto do animal que a minha doação ajudou a tratar não tem preço. Transparência total.",
    photoId: "photo-1594149929911-78975a43d4f5",
  },
  {
    id: "t3",
    name: "Camila e Diego",
    role: "Adotaram o Bento",
    quote:
      "O time do Projeto Caramelo cuidou de cada detalhe da adoção. O Bento chegou saudável, vacinado e cheio de amor pra dar.",
    photoId: "photo-1583337130417-3346a1be7dee",
  },
  {
    id: "t4",
    name: "Beatriz Rocha",
    role: "Voluntária há 2 anos",
    quote:
      "Comecei ajudando num mutirão de castração e não parei mais. Ver um resgate virar adoção é a melhor recompensa do mundo.",
    photoId: "photo-1561037404-61cd46aa615b",
  },
];

// Impact / happy-ending gallery. Reuses the placeholder pool.
// TODO: replace with real "resgatado e feliz" photos.
export const galleryPhotoIds: string[] = [
  "photo-1518717758536-85ae29035b6d",
  "photo-1601758228041-f3b2795255f1",
  "photo-1552053831-71594a27632d",
  "photo-1543466835-00a7907e9de1",
  "photo-1516734212186-a967f81ad0d7",
  "photo-1587300003388-59208cc962cb",
  "photo-1495360010541-f48722b34f7d",
  "photo-1548199973-03cce0bbc87b",
];
