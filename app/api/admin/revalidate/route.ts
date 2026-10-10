import { revalidateTag } from "next/cache";
import { verifyAdmin } from "@/lib/firebase/admin";

const tags = ["pets", "vakinhas"];

// Body: { collection } — called by the admin after each change so the public
// site picks it up on the next visit instead of waiting for the cache to expire.
export async function POST(request: Request) {
  if (!(await verifyAdmin(request))) return Response.json({ error: "Não autorizado." }, { status: 401 });
  const { collection } = (await request.json().catch(() => ({}))) as { collection?: unknown };
  if (typeof collection !== "string" || !tags.includes(collection)) {
    return Response.json({ error: "Coleção inválida." }, { status: 400 });
  }
  // Expire immediately so the admin sees the change on the next reload.
  revalidateTag(collection, { expire: 0 });
  return new Response(null, { status: 204 });
}
