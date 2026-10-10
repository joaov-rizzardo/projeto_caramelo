import "server-only";
import { createHash } from "node:crypto";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME!;
const apiKey = process.env.CLOUDINARY_API_KEY!;
const apiSecret = process.env.CLOUDINARY_API_SECRET!;

// Every admin upload lands here; deletes are refused outside of it so a
// crafted request can't wipe unrelated assets of the account.
export const UPLOAD_FOLDER = "projeto-caramelo";

// Cloudinary signature: sorted "key=value" pairs joined by "&" + API secret, SHA-1.
function sign(params: Record<string, string | number>) {
  const payload = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return createHash("sha1").update(payload + apiSecret).digest("hex");
}

// Parameters the browser sends along with the file to upload it directly.
export function signUpload() {
  const params = { folder: UPLOAD_FOLDER, timestamp: Math.round(Date.now() / 1000) };
  return { ...params, cloudName, apiKey, signature: sign(params) };
}

// https://res.cloudinary.com/<cloud>/image/upload/[<transforms>/][v123/]<folder>/<name>.<ext>
// → "<folder>/<name>". Null for anything that isn't one of our uploads.
export function publicIdFromUrl(url: string) {
  const prefix = `https://res.cloudinary.com/${cloudName}/image/upload/`;
  if (!url.startsWith(prefix)) return null;
  const path = url.slice(prefix.length).split(/[?#]/)[0];
  const start = path.indexOf(`${UPLOAD_FOLDER}/`);
  if (start === -1) return null;
  return decodeURIComponent(path.slice(start).replace(/\.[a-z0-9]+$/i, ""));
}

// Deletes the asset and purges it from the CDN. "not found" counts as done.
export async function destroyImage(publicId: string) {
  const params = { invalidate: "true", public_id: publicId, timestamp: Math.round(Date.now() / 1000) };
  const body = new URLSearchParams({
    ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])),
    api_key: apiKey,
    signature: sign(params),
  });
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
    method: "POST",
    body,
  });
  const data = (await res.json().catch(() => ({}))) as { result?: string };
  if (!res.ok || (data.result !== "ok" && data.result !== "not found")) {
    throw new Error(`Cloudinary destroy failed (${res.status}): ${JSON.stringify(data)}`);
  }
}
