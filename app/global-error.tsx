"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

// Last resort when the root layout itself fails: it replaces the whole
// document, so it can't rely on the layout's fonts or global styles.
export default function GlobalError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "40px 16px",
          background: "#fbf0de",
          color: "#12294a",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
        }}
      >
        <title>Projeto Caramelo</title>
        <div style={{ maxWidth: 420 }}>
          <h1 style={{ fontSize: 28, margin: 0 }}>Não conseguimos carregar a página</h1>
          <p style={{ marginTop: 12, lineHeight: 1.5, opacity: 0.75 }}>
            Pode ser uma instabilidade momentânea. Tente de novo em alguns instantes.
          </p>
          <button
            type="button"
            onClick={() => retry()}
            style={{
              marginTop: 24,
              padding: "12px 24px",
              border: 0,
              borderRadius: 12,
              background: "#f47b20",
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Tentar novamente
          </button>
        </div>
      </body>
    </html>
  );
}
