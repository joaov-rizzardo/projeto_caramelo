import type { Area } from "react-easy-crop";
import type { ImageSpec } from "./models";

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Não foi possível abrir a imagem."));
    img.src = src;
  });
}

// Draws the selected area onto a canvas at the slot's exact output size and
// encodes it as WebP (JPEG fallback for browsers that can't encode WebP).
export async function cropImage(src: string, area: Area, spec: ImageSpec): Promise<Blob> {
  const img = await loadImage(src);
  const canvas = document.createElement("canvas");
  canvas.width = spec.width;
  canvas.height = spec.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas indisponível.");
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, area.x, area.y, area.width, area.height, 0, 0, spec.width, spec.height);

  const encode = (type: string) =>
    new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, 0.82));
  // Unsupported types silently fall back to (huge) PNG, so check the result.
  const webp = await encode("image/webp");
  const blob = webp?.type === "image/webp" ? webp : await encode("image/jpeg");
  if (!blob) throw new Error("Falha ao gerar a imagem recortada.");
  return blob;
}
