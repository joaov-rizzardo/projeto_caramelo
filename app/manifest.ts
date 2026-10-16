import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Caramelo",
    description: "Resgate, cuidado e adoção de cães e gatos em Cachoeira Paulista.",
    lang: "pt-BR",
    start_url: "/",
    display: "standalone",
    background_color: "#fbf0de",
    theme_color: "#fbf0de",
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
