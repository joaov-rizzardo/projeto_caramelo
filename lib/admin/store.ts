"use client";

// Admin backend:
//   - signIn / signOut / useSession       → Firebase Auth (email + password)
//   - useCollection / save / remove       → Firestore (one doc per pet / vakinha)
//   - uploadImage / deleteImage           → Cloudinary, signed by /api/admin/images
// Images are owned by their record: replacing a photo, closing a vakinha
// (photo cleared) or deleting a record also deletes the old image.
import { useSyncExternalStore } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { collection, deleteDoc, doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { auth, db } from "@/lib/firebase/client";
import type { Pet, Vakinha } from "./models";

// --- Session -------------------------------------------------------------

// undefined until Firebase restores the persisted session, then email | null.
let session: string | null | undefined;
const sessionListeners = new Set<() => void>();
let stopSession: (() => void) | undefined;

function subscribeSession(listener: () => void) {
  sessionListeners.add(listener);
  stopSession ??= onAuthStateChanged(auth(), (user) => {
    session = user?.email ?? null;
    sessionListeners.forEach((l) => l());
  });
  return () => {
    sessionListeners.delete(listener);
    if (sessionListeners.size === 0) {
      stopSession?.();
      stopSession = undefined;
    }
  };
}

export function useSession() {
  return useSyncExternalStore(
    subscribeSession,
    () => session,
    () => undefined,
  );
}

export async function signIn(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth(), email.trim(), password);
  } catch (e) {
    const code = e instanceof FirebaseError ? e.code : "";
    throw new Error(
      code === "auth/invalid-credential" || code === "auth/wrong-password" || code === "auth/user-not-found"
        ? "E-mail ou senha incorretos."
        : code === "auth/too-many-requests"
          ? "Muitas tentativas. Aguarde alguns minutos e tente de novo."
          : "Não foi possível entrar. Verifique sua conexão.",
    );
  }
}

export function signOut() {
  return firebaseSignOut(auth());
}

// --- Collections ---------------------------------------------------------

type Collections = { pets: Pet; vakinhas: Vakinha };
type Name = keyof Collections;

// One live Firestore listener per collection, shared by every hook using it
// and closed when the last one unmounts. `subscribe` must be a stable function:
// a new one each render makes React resubscribe on every render.
type Live = { items?: unknown[]; listeners: Set<() => void>; stop?: () => void; subscribe: (l: () => void) => () => void };
const live = new Map<Name, Live>();

function entry(name: Name) {
  const existing = live.get(name);
  if (existing) return existing;
  const created: Live = {
    listeners: new Set(),
    subscribe(listener) {
      created.listeners.add(listener);
      created.stop ??= onSnapshot(
        collection(db(), name),
        (snap) => {
          created.items = snap.docs.map((d) => ({ ...d.data(), id: d.id }));
          created.listeners.forEach((l) => l());
        },
        (error) => {
          // The listener is dead after an error; allow a later resubscribe.
          console.error(`Firestore "${name}":`, error);
          created.stop = undefined;
          created.items = [];
          created.listeners.forEach((l) => l());
        },
      );
      return () => {
        created.listeners.delete(listener);
        if (created.listeners.size === 0) {
          created.stop?.();
          created.stop = undefined;
          // Keep the last items so switching tabs doesn't flash "loading";
          // the next snapshot replaces them.
        }
      };
    },
  };
  live.set(name, created);
  return created;
}

// `undefined` while loading (and on the server).
export function useCollection<N extends Name>(name: N) {
  const e = entry(name);
  return useSyncExternalStore(
    e.subscribe,
    () => e.items as Collections[N][] | undefined,
    () => undefined,
  );
}

export async function save<N extends Name>(name: N, item: Collections[N]) {
  const { id, ...data } = item;
  const ref = doc(db(), name, id);
  const previous = (await getDoc(ref)).get("photo") as string | undefined;
  await setDoc(ref, data);
  if (previous && previous !== item.photo) await deleteImage(previous);
}

// Runs a save that follows a fresh upload. If the save fails, the new upload
// is deleted so it doesn't sit orphaned in Cloudinary; on success, `save`
// already deleted the previous photo.
export async function saveWithPhoto(current: string, photo: string, run: () => Promise<void>) {
  try {
    await run();
  } catch (e) {
    if (photo !== current) await deleteImage(photo);
    throw e;
  }
}

export async function remove(name: Name, id: string) {
  const ref = doc(db(), name, id);
  const photo = (await getDoc(ref)).get("photo") as string | undefined;
  await deleteDoc(ref);
  if (photo) await deleteImage(photo);
}

// --- Images --------------------------------------------------------------

async function adminFetch(method: "POST" | "DELETE", body?: unknown) {
  const token = await auth().currentUser?.getIdToken();
  const res = await fetch("/api/admin/images", {
    method,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`/api/admin/images ${method} → ${res.status}`);
  return res;
}

// Uploads the cropped image straight to Cloudinary and returns its URL.
export async function uploadImage(blob: Blob): Promise<string> {
  const sig = (await (await adminFetch("POST")).json()) as {
    cloudName: string;
    apiKey: string;
    folder: string;
    timestamp: number;
    signature: string;
  };
  const form = new FormData();
  form.append("file", blob);
  form.append("api_key", sig.apiKey);
  form.append("folder", sig.folder);
  form.append("timestamp", String(sig.timestamp));
  form.append("signature", sig.signature);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) throw new Error(`Cloudinary upload → ${res.status}`);
  return ((await res.json()) as { secure_url: string }).secure_url;
}

// Best effort: the record change already succeeded, so a failed delete only
// leaves an orphan file behind — log it instead of failing the action.
export async function deleteImage(url: string) {
  if (!url.startsWith("https://res.cloudinary.com/")) return; // e.g. old placeholders
  try {
    await adminFetch("DELETE", { url });
  } catch (e) {
    console.error("Falha ao apagar imagem antiga:", e);
  }
}
