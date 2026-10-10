import { verifyAdmin } from "@/lib/firebase/admin";
import { destroyImage, publicIdFromUrl, signUpload } from "@/lib/cloudinary";

const unauthorized = () => Response.json({ error: "Não autorizado." }, { status: 401 });

// Signs a direct browser → Cloudinary upload, so the API secret stays here.
export async function POST(request: Request) {
  if (!(await verifyAdmin(request))) return unauthorized();
  return Response.json(signUpload());
}

// Body: { url } — the hosted image URL stored on a pet / vakinha.
export async function DELETE(request: Request) {
  if (!(await verifyAdmin(request))) return unauthorized();
  const { url } = (await request.json().catch(() => ({}))) as { url?: unknown };
  const publicId = typeof url === "string" ? publicIdFromUrl(url) : null;
  if (!publicId) return Response.json({ error: "URL de imagem inválida." }, { status: 400 });
  try {
    await destroyImage(publicId);
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Falha ao apagar a imagem." }, { status: 502 });
  }
  return new Response(null, { status: 204 });
}
