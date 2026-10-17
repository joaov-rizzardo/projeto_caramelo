"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import { signIn, useSession } from "@/lib/admin/store";
import { Button, Field, Input } from "@/components/admin/ui";

export default function LoginPage() {
  const router = useRouter();
  const session = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Already signed in (or just signed in) → straight to the panel.
  useEffect(() => {
    if (session) router.replace("/admin/pets");
  }, [session, router]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await signIn(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível entrar.");
      setBusy(false);
    }
  }

  return (
    <main className="paw-texture grid min-h-screen place-items-center bg-cream px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          <Image src="/logo-badge.png" alt="" width={600} height={495} priority className="h-24 w-auto" />
          <h1 className="mt-3 font-display text-3xl font-bold text-navy">
            Área de <span className="text-caramel">gestão</span>
          </h1>
          <p className="mt-1 font-script text-2xl text-navy/70">Quem ama cuida</p>
        </div>

        <form onSubmit={submit} className="mt-6 space-y-4 rounded-3xl bg-offwhite p-6 shadow-xl">
          <Field label="E-mail">
            <Input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field label="Senha">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                className="absolute right-2 top-[calc(50%+2px)] grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-navy/50 hover:text-navy"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </Field>

          {error && (
            <p role="alert" className="rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
              {error}
            </p>
          )}

          <Button type="submit" disabled={busy} className="w-full py-3">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
            Entrar
          </Button>
        </form>
      </div>
    </main>
  );
}
