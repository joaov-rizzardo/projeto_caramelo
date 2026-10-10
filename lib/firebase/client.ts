// Browser-side Firebase (Auth + Firestore). The config is public by design —
// access is enforced by firestore.rules, not by hiding these values.
// Initialized lazily so prerendering the admin pages doesn't boot Firebase.
import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = () =>
  getApps()[0] ??
  initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  });

export const auth = () => getAuth(app());
export const db = () => getFirestore(app());
