import "server-only";
import type { Donation } from "@/lib/admin/models";
import type { Animal, Campaign } from "@/lib/data";
import { env } from "@/lib/env";

// Public site content, read from Firestore's REST API (pets / vakinhas are
// publicly readable per firestore.rules, so no credentials are needed).
// Responses are cached and tagged with the collection name: the admin calls
// /api/admin/revalidate after every change, and REVALIDATE is the fallback.
const REVALIDATE = 300;
const base = () =>
  `https://firestore.googleapis.com/v1/projects/${env("NEXT_PUBLIC_FIREBASE_PROJECT_ID")}/databases/(default)/documents`;

type Value =
  | { stringValue: string }
  | { integerValue: string }
  | { doubleValue: number }
  | { booleanValue: boolean }
  | { nullValue: null }
  | { arrayValue: { values?: Value[] } }
  | { mapValue: { fields?: Record<string, Value> } };

function decode(v: Value): unknown {
  if ("stringValue" in v) return v.stringValue;
  if ("integerValue" in v) return Number(v.integerValue);
  if ("doubleValue" in v) return v.doubleValue;
  if ("booleanValue" in v) return v.booleanValue;
  if ("arrayValue" in v) return (v.arrayValue.values ?? []).map(decode);
  if ("mapValue" in v) return decodeFields(v.mapValue.fields);
  return null;
}

const decodeFields = (fields: Record<string, Value> = {}) =>
  Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, decode(v)]));

// Throws on failure so a Firestore hiccup keeps serving the last good page
// instead of caching an empty one.
async function list(collection: "pets" | "vakinhas") {
  const items: Record<string, unknown>[] = [];
  let pageToken = "";
  do {
    const res = await fetch(`${base()}/${collection}?pageSize=300&pageToken=${pageToken}`, {
      next: { tags: [collection], revalidate: REVALIDATE },
    });
    if (!res.ok) throw new Error(`Firestore ${collection} → ${res.status}: ${await res.text()}`);
    const data = (await res.json()) as {
      documents?: { name: string; fields?: Record<string, Value> }[];
      nextPageToken?: string;
    };
    for (const d of data.documents ?? []) {
      items.push({ ...decodeFields(d.fields), id: d.name.split("/").pop()! });
    }
    pageToken = data.nextPageToken ?? "";
  } while (pageToken);
  return items;
}

// Documents are only written by the admin, but a half-filled or hand-edited
// one shouldn't break the page: anything missing what a card needs is skipped.
const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : 0);
const isPhoto = (v: unknown) => typeof v === "string" && v.startsWith("https://");

export async function getAnimals(): Promise<Animal[]> {
  const pets = await list("pets");
  return pets
    .filter((p) => text(p.name) && isPhoto(p.photo) && (p.species === "dog" || p.species === "cat"))
    .sort((a, b) => num(b.createdAt) - num(a.createdAt))
    .map((p) => ({
      id: p.id as string,
      name: text(p.name),
      species: p.species as Animal["species"],
      sex: p.sex === "Fêmea" ? "Fêmea" : "Macho",
      age: text(p.age),
      size: text(p.size),
      bio: text(p.bio),
      photo: p.photo as string,
    }));
}

// Only active vakinhas are public; closed ones live on in the admin.
// `raised` is kept up to date by the admin; vakinhas saved before it existed
// still carry their donations inline, so fall back to summing those.
export async function getCampaigns(): Promise<Campaign[]> {
  const vakinhas = await list("vakinhas");
  return vakinhas
    .filter((v) => !v.closedAt && text(v.title) && isPhoto(v.photo) && num(v.goal) > 0)
    .sort((a, b) => num(b.createdAt) - num(a.createdAt))
    .map((v) => ({
      id: v.id as string,
      title: text(v.title),
      category: text(v.category),
      description: text(v.description),
      goal: num(v.goal),
      photo: v.photo as string,
      raised:
        typeof v.raised === "number"
          ? num(v.raised)
          : ((v.donations as Donation[] | undefined) ?? []).reduce((sum, d) => sum + num(d.amount), 0),
    }));
}
