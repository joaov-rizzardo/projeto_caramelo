import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Card shown when the site is shared (WhatsApp, Instagram, Facebook…).
// Also used as the Twitter/X image (twitter-image falls back to it).
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/logo-badge.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 56,
          padding: "0 80px",
          background: "#fbf0de",
          color: "#12294a",
        }}
      >
        <img src={logoSrc} width={420} height={346} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 600 }}>Projeto</div>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 800, color: "#f47b20", lineHeight: 1 }}>
            Caramelo
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 34, lineHeight: 1.3, maxWidth: 560 }}>
            Resgate, cuidado e adoção de cães e gatos
          </div>
          <div style={{ display: "flex", marginTop: 16, fontSize: 28, color: "#2f6594" }}>
            Cachoeira Paulista · SP
          </div>
        </div>
      </div>
    ),
    size,
  );
}
