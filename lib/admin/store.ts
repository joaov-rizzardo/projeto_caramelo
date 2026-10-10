"use client";

// PROTOTYPE backend: everything is persisted in the browser's localStorage.
// Each exported function is a seam for the real stack:
//   - signIn / signOut      → Firebase Auth (email + password)
//   - useCollection / save / remove → Firestore collections
//   - uploadImage           → Cloudinary upload (returns the hosted URL)
import { useSyncExternalStore } from "react";
import { seedPets, seedVakinhas, type Pet, type Vakinha } from "./models";

const PREFIX = "caramelo-admin:";
const listeners = new Set<() => void>();
const cache = new Map<string, unknown>();

function read<T>(key: string, fallback: () => T): T {
  if (cache.has(key)) return cache.get(key) as T;
  let value: T;
  try {
    const raw = localStorage.getItem(PREFIX + key);
    value = raw === null ? fallback() : (JSON.parse(raw) as T);
  } catch {
    value = fallback();
  }
  cache.set(key, value);
  return value;
}

function write<T>(key: string, value: T) {
  // Throws QuotaExceededError when the browser storage is full (mostly images);
  // callers surface that to the user.
  localStorage.setItem(PREFIX + key, JSON.stringify(value));
  cache.set(key, value);
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// `undefined` while rendering on the server / before hydration.
function useStored<T>(key: string, fallback: () => T): T | undefined {
  return useSyncExternalStore(
    subscribe,
    () => read(key, fallback),
    () => undefined,
  );
}

// --- Session -------------------------------------------------------------

// Demo credentials shown on the login screen while this is a prototype.
export const DEMO_LOGIN = { email: "admin@projetocaramelo.org.br", password: "caramelo123" };

export function useSession() {
  return useStored<string | null>("session", () => null);
}

export async function signIn(email: string, password: string) {
  await new Promise((r) => setTimeout(r, 400)); // feel of a network call
  if (email.trim().toLowerCase() !== DEMO_LOGIN.email || password !== DEMO_LOGIN.password) {
    throw new Error("E-mail ou senha incorretos.");
  }
  write("session", DEMO_LOGIN.email);
}

export function signOut() {
  write("session", null);
}

// --- Collections ---------------------------------------------------------

const collections = { pets: seedPets, vakinhas: seedVakinhas };
type Collections = { pets: Pet; vakinhas: Vakinha };
type Name = keyof Collections;

export function useCollection<N extends Name>(name: N) {
  return useStored<Collections[N][]>(name, collections[name] as () => Collections[N][]);
}

export async function save<N extends Name>(name: N, item: Collections[N]) {
  const items = read<Collections[N][]>(name, collections[name] as () => Collections[N][]);
  const exists = items.some((i) => i.id === item.id);
  write(name, exists ? items.map((i) => (i.id === item.id ? item : i)) : [item, ...items]);
}

export async function remove(name: Name, id: string) {
  const items = read<{ id: string }[]>(name, collections[name]);
  write(name, items.filter((i) => i.id !== id));
}

// --- Images --------------------------------------------------------------

// Prototype: inline the cropped image as a data URL. With Cloudinary this
// POSTs the blob to the upload endpoint and returns `secure_url`.
export function uploadImage(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}
