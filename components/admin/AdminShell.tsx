"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { ExternalLink, HeartHandshake, Loader2, LogOut, PawPrint } from "lucide-react";
import { signOut, useSession } from "@/lib/admin/store";

const tabs = [
  { href: "/admin/pets", label: "Pets para adoção", icon: PawPrint },
  { href: "/admin/vakinhas", label: "Vaquinhas", icon: HeartHandshake },
];

// Auth gate + chrome for every signed-in admin screen.
export function AdminShell({ children }: { children: ReactNode }) {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (session === null) router.replace("/admin/login");
  }, [session, router]);

  if (!session) {
    return (
      <div className="grid min-h-screen place-items-center">
        <Loader2 className="h-8 w-8 animate-spin text-caramel" aria-label="Carregando" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="sticky top-0 z-40 border-b border-navy/10 bg-cream-soft/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
          <Link href="/admin/pets" className="flex items-center gap-2">
            <Image src="/logo-badge.png" alt="" width={600} height={495} className="h-10 w-auto" />
            <span className="font-display text-lg font-bold leading-none text-navy">
              Gestão <span className="text-caramel">Caramelo</span>
            </span>
          </Link>
          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <span className="hidden text-xs text-navy/60 md:inline">{session}</span>
            <a
              href="/"
              target="_blank"
              className="grid h-9 w-9 place-items-center rounded-full text-navy/70 hover:bg-white hover:text-navy sm:w-auto sm:gap-1.5 sm:px-3 sm:inline-flex sm:text-sm sm:font-bold"
            >
              <ExternalLink className="h-4 w-4" aria-hidden />
              <span className="sr-only sm:not-sr-only">Ver site</span>
            </a>
            <button
              type="button"
              onClick={signOut}
              className="grid h-9 w-9 place-items-center rounded-full text-navy/70 hover:bg-white hover:text-navy sm:w-auto sm:gap-1.5 sm:px-3 sm:inline-flex sm:text-sm sm:font-bold"
            >
              <LogOut className="h-4 w-4" aria-hidden />
              <span className="sr-only sm:not-sr-only">Sair</span>
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 px-4 sm:px-6">
          {tabs.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-2 border-b-[3px] px-3 py-2.5 text-sm font-bold transition-colors ${
                  active
                    ? "border-caramel text-navy"
                    : "border-transparent text-navy/55 hover:text-navy"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
    </div>
  );
}
