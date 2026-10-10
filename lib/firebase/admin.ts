import "server-only";
import { getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

// Verifying ID tokens only needs the project id (Google's public keys are
// fetched on demand), so no service account is required.
const app =
  getApps()[0] ?? initializeApp({ projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID });

const admins = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

// Returns the admin's e-mail when the request carries a valid Firebase ID
// token ("Authorization: Bearer <token>") for an allowed account, else null.
export async function verifyAdmin(request: Request) {
  const token = request.headers.get("authorization")?.match(/^Bearer (.+)$/)?.[1];
  if (!token) return null;
  try {
    const { email } = await getAuth(app).verifyIdToken(token);
    return email && admins.includes(email.toLowerCase()) ? email : null;
  } catch {
    return null;
  }
}
