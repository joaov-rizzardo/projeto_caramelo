"use client";

// Admin backend:
//   - signIn / signOut / useSession       → Firebase Auth (email + password)
//   - useCollection / save / remove       → Firestore (one doc per pet / vakinha)
//     A vakinha's donations live apart, in the admin-only "vakinhaDonations"
//     collection (same id), since "vakinhas" is world-readable; the public doc
//     only carries the `raised` total. Both are joined back here, so the rest
//     of the admin keeps working with a plain `Vakinha`.
//   - uploadImage / deleteImage           → Cloudinary, signed by /api/admin/images
// Every save/remove also asks /api/admin/revalidate to refresh the public site.
// Images are owned by their record: replacing a photo, closing a vakinha
// (photo cleared) or deleting a record also deletes the old image.
import { useSyncExternalStore } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  writeBatch,
  type FirestoreError,
} from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { auth, db } from "@/lib/firebase/client";
import { raisedOf, type Donation, type Pet, type Vakinha } from "./models";

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
      const onItems = (items: unknown[]) => {
        created.items = items;
        created.listeners.forEach((l) => l());
      };
      const onError = (error: FirestoreError) => {
        // The listener is dead after an error; allow a later resubscribe.
        console.error(`Firestore "${name}":`, error);
        created.stop?.();
        created.stop = undefined;
        onItems([]);
      };
      created.stop ??=
        name === "vakinhas"
          ? listenVakinhas(onItems, onError)
          : onSnapshot(
              collection(db(), name),
              (snap) => onItems(snap.docs.map((d) => ({ ...d.data(), id: d.id }))),
              onError,
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

const DONATIONS = "vakinhaDonations";

// Live vakinhas = public docs + their donations, emitted once both have loaded.
function listenVakinhas(onItems: (items: Vakinha[]) => void, onError: (e: FirestoreError) => void) {
  let docs: { id: string; data: Record<string, unknown> }[] | undefined;
  let donations: Map<string, Donation[]> | undefined;
  const emit = () => {
    if (!docs || !donations) return;
    const known = donations;
    onItems(
      docs.map(({ id, data }) => {
        const legacy = data.donations as Donation[] | undefined;
        return { ...publicFields(data), id, donations: known.get(id) ?? legacy ?? [] } as Vakinha;
      }),
    );
    migrateLegacy(docs, known);
  };
  const stopDocs = onSnapshot(
    collection(db(), "vakinhas"),
    (snap) => {
      docs = snap.docs.map((d) => ({ id: d.id, data: d.data() }));
      emit();
    },
    onError,
  );
  const stopDonations = onSnapshot(
    collection(db(), DONATIONS),
    (snap) => {
      donations = new Map(snap.docs.map((d) => [d.id, (d.get("donations") as Donation[]) ?? []]));
      emit();
    },
    onError,
  );
  return () => {
    stopDocs();
    stopDonations();
  };
}

// A public vakinha doc minus what's derived from (or joined with) donations.
function publicFields(data: Record<string, unknown>) {
  const rest = { ...data };
  delete rest.raised;
  delete rest.donations;
  return rest;
}

// Vakinhas saved before donations moved out still have them in the public doc.
// The first time the admin loads them, rewrite each one in the new layout.
const migrating = new Set<string>();
function migrateLegacy(docs: { id: string; data: Record<string, unknown> }[], donations: Map<string, Donation[]>) {
  for (const { id, data } of docs) {
    if (!("donations" in data) || migrating.has(id)) continue;
    migrating.add(id);
    const legacy = data.donations as Donation[] | undefined;
    writeVakinha({ ...publicFields(data), id, donations: donations.get(id) ?? legacy ?? [] } as Vakinha)
      .catch((e) => console.error(`Falha ao migrar a vaquinha ${id}:`, e))
      .finally(() => migrating.delete(id));
  }
}

// Public doc (with the raised total) and private donations, written together.
function writeVakinha({ id, donations, ...data }: Vakinha) {
  const batch = writeBatch(db());
  batch.set(doc(db(), "vakinhas", id), { ...data, raised: raisedOf({ donations } as Vakinha) });
  batch.set(doc(db(), DONATIONS, id), { donations });
  return batch.commit();
}

export async function save<N extends Name>(name: N, item: Collections[N]) {
  const { id, ...data } = item;
  const ref = doc(db(), name, id);
  const previous = (await getDoc(ref)).get("photo") as string | undefined;
  if (name === "vakinhas") await writeVakinha(item as Vakinha);
  else await setDoc(ref, data);
  if (previous && previous !== item.photo) await deleteImage(previous);
  await refreshSite(name);
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
  if (name === "vakinhas") {
    const batch = writeBatch(db());
    batch.delete(ref);
    batch.delete(doc(db(), DONATIONS, id));
    await batch.commit();
  } else {
    await deleteDoc(ref);
  }
  if (photo) await deleteImage(photo);
  await refreshSite(name);
}

// Best effort: tells the public site its cached copy of `name` is stale.
// If it fails, the site still catches up when its cache expires (~5 min).
async function refreshSite(name: Name) {
  try {
    await adminFetch("/api/admin/revalidate", "POST", { collection: name });
  } catch (e) {
    console.error("Falha ao atualizar o site:", e);
  }
}

// --- Images --------------------------------------------------------------

async function adminFetch(path: string, method: "POST" | "DELETE", body?: unknown) {
  const token = await auth().currentUser?.getIdToken();
  const res = await fetch(path, {
    method,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${path} ${method} → ${res.status}`);
  return res;
}

// Uploads the cropped image straight to Cloudinary and returns its URL.
export async function uploadImage(blob: Blob): Promise<string> {
  const sig = (await (await adminFetch("/api/admin/images", "POST")).json()) as {
    cloudName: string;
    params: Record<string, string | number>; // signed upload fields, sent as-is
  };
  const form = new FormData();
  form.append("file", blob);
  for (const [key, value] of Object.entries(sig.params)) form.append(key, String(value));
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
    await adminFetch("/api/admin/images", "DELETE", { url });
  } catch (e) {
    console.error("Falha ao apagar imagem antiga:", e);
  }
}
