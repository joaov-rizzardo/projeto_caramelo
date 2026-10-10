"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { PawPrint, Pencil, Plus, Search, SearchX } from "lucide-react";
import { useCollection } from "@/lib/admin/store";
import type { Pet } from "@/lib/admin/models";
import { PetForm } from "@/components/admin/PetForm";
import { Button, Dialog, EmptyState, Input } from "@/components/admin/ui";

export default function PetsPage() {
  const pets = useCollection("pets");
  const [editing, setEditing] = useState<Pet | "new" | null>(null);
  const [query, setQuery] = useState("");
  const close = useCallback(() => setEditing(null), []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (pets ?? [])
      .filter((p) => !q || p.name.toLowerCase().includes(q))
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [pets, query]);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-navy">Pets para adoção</h1>
          <p className="mt-1 text-sm text-navy/65">
            {pets ? `${pets.length} ${pets.length === 1 ? "pet disponível" : "pets disponíveis"}` : "…"}
          </p>
        </div>
        <Button onClick={() => setEditing("new")}>
          <Plus className="h-4 w-4" aria-hidden />
          Cadastrar pet
        </Button>
      </div>

      <div className="mt-6 flex">
        <label className="relative w-full sm:ml-auto sm:w-64">
          <span className="sr-only">Buscar por nome</span>
          <Search className="pointer-events-none absolute left-3 top-[calc(50%+2px)] h-4 w-4 -translate-y-1/2 text-navy/40" />
          <Input
            type="search"
            placeholder="Buscar por nome"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </label>
      </div>

      <div className="mt-6">
        {pets?.length === 0 ? (
          <EmptyState
            icon={PawPrint}
            title="Nenhum pet para adoção"
            action={
              <Button onClick={() => setEditing("new")}>
                <Plus className="h-4 w-4" aria-hidden />
                Cadastrar o primeiro pet
              </Button>
            }
          >
            Os pets cadastrados aqui aparecem na seção de adoção do site.
          </EmptyState>
        ) : pets && visible.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title="Nenhum pet encontrado"
            action={
              <Button variant="ghost" onClick={() => setQuery("")}>
                Limpar busca
              </Button>
            }
          >
            Nenhum nome corresponde a “{query.trim()}”.
          </EmptyState>
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p, i) => (
              <li key={p.id} className="h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-offwhite shadow-md">
                  <div className="relative aspect-[4/3] bg-cream-deep">
                    {p.photo && (
                      <Image
                        src={p.photo}
                        alt=""
                        fill
                        unoptimized
                        sizes="400px"
                        loading={i < 3 ? "eager" : "lazy"} // first row is above the fold
                        className="object-cover"
                      />
                    )}
                    <span
                      className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold text-white shadow ${
                        p.species === "dog" ? "bg-caramel" : "bg-sky"
                      }`}
                    >
                      {p.species === "dog" ? "Cão" : "Gato"}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h2 className="font-display text-lg font-bold text-navy">{p.name}</h2>
                    <p className="mt-1 flex-1 text-xs text-navy/70">
                      {p.sex} · {p.age} · {p.size}
                    </p>
                    <Button variant="ghost" className="mt-4" onClick={() => setEditing(p)}>
                      <Pencil className="h-4 w-4" aria-hidden />
                      Editar pet
                    </Button>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Dialog
        open={editing !== null}
        title={editing === "new" ? "Cadastrar pet" : "Editar pet"}
        onClose={close}
        wide
      >
        {editing !== null && (
          <PetForm key={editing === "new" ? "new" : editing.id} pet={editing === "new" ? null : editing} onDone={close} />
        )}
      </Dialog>
    </>
  );
}
