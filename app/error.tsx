"use client"; // Error boundaries must be Client Components

import Image from "next/image";
import { useEffect } from "react";
import { RotateCw } from "lucide-react";

// Shown when a page fails to render (e.g. Firestore unreachable on a cold cache).
export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="paw-texture grid min-h-screen place-items-center bg-cream px-4 py-10 text-center">
      <div className="max-w-md">
        <Image src="/logo-badge.png" alt="" width={900} height={742} priority className="mx-auto h-28 w-auto" />
        <p className="mt-4 font-script text-3xl text-caramel-600">Algo deu errado</p>
        <h1 className="mt-1 font-display text-3xl font-bold text-navy">Não conseguimos carregar a página</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-navy/75">
          Pode ser uma instabilidade momentânea. Tente de novo em alguns instantes.
        </p>
        <button
          type="button"
          onClick={() => retry()}
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-caramel px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-caramel-600 active:scale-95"
        >
          <RotateCw className="h-4 w-4" aria-hidden />
          Tentar novamente
        </button>
      </div>
    </main>
  );
}
