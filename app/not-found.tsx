import Image from "next/image";
import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="paw-texture grid min-h-screen place-items-center bg-cream px-4 py-10 text-center">
      <div className="max-w-md">
        <Image src="/logo-badge.png" alt="" width={600} height={495} priority className="mx-auto h-28 w-auto" />
        <p className="mt-4 font-script text-3xl text-caramel-600">Ops! Esse caminho não existe</p>
        <h1 className="mt-1 font-display text-3xl font-bold text-navy">Página não encontrada</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-navy/75">
          O link pode estar errado ou a página foi removida. Mas tem muito focinho esperando por
          você na página inicial!
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-caramel px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-caramel-600 active:scale-95"
        >
          <Home className="h-4 w-4" aria-hidden />
          Voltar para o início
        </Link>
      </div>
    </main>
  );
}
