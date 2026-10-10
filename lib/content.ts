import "server-only";
import type { Pet, Vakinha } from "@/lib/admin/models";
import type { Animal, Campaign } from "@/lib/data";

// Public site content, read from Firestore's REST API (pets / vakinhas are
// publicly readable per firestore.rules, so no credentials are needed).
// Responses are cached and tagged with the collection name: the admin calls
// /api/admin/revalidate after every change, and REVALIDATE is the fallback.
const REVALIDATE = 300;
const base = `https://firestore.googleapis.com/v1/projects/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/databases/(default)/documents`;

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
async function list<T>(collection: "pets" | "vakinhas"): Promise<T[]> {
  const items: T[] = [];
  let pageToken = "";
  do {
    const res = await fetch(`${base}/${collection}?pageSize=300&pageToken=${pageToken}`, {
      next: { tags: [collection], revalidate: REVALIDATE },
    });
    if (!res.ok) throw new Error(`Firestore ${collection} → ${res.status}: ${await res.text()}`);
    const data = (await res.json()) as {
      documents?: { name: string; fields?: Record<string, Value> }[];
      nextPageToken?: string;
    };
    for (const d of data.documents ?? []) {
      items.push({ ...decodeFields(d.fields), id: d.name.split("/").pop()! } as T);
    }
    pageToken = data.nextPageToken ?? "";
  } while (pageToken);
  return items;
}

export async function getAnimals(): Promise<Animal[]> {
  const pets = await list<Pet>("pets");
  return pets
    .sort((a, b) => b.createdAt - a.createdAt)
    .map(({ id, name, species, sex, age, size, bio, photo }) => ({
      id,
      name,
      species,
      sex,
      age,
      size,
      bio,
      photo,
    }));
}

// Only active vakinhas are public; closed ones live on in the admin.
export async function getCampaigns(): Promise<Campaign[]> {
  const vakinhas = await list<Vakinha>("vakinhas");
  return vakinhas
    .filter((v) => !v.closedAt)
    .sort((a, b) => b.createdAt - a.createdAt)
    .map(({ id, title, category, description, goal, photo, donations }) => ({
      id,
      title,
      category,
      description,
      goal,
      photo,
      raised: (donations ?? []).reduce((sum, d) => sum + d.amount, 0),
    }));
}
