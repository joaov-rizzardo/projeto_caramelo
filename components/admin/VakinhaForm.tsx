"use client";

import { useRef, useState } from "react";
import { Archive, Loader2, Save, Trash2 } from "lucide-react";
import { remove, save, saveWithPhoto } from "@/lib/admin/store";
import {
  imageSpecs,
  newId,
  today,
  vakinhaCategories,
  type Vakinha,
} from "@/lib/admin/models";
import { ImageCropField, MissingPhoto, type ImageCropHandle } from "./ImageCropField";
import { Button, Field, Input, MoneyInput, Select, Textarea } from "./ui";

const blank = (): Vakinha => ({
  id: newId(),
  title: "",
  category: vakinhaCategories[0],
  description: "",
  goal: 0,
  photo: "",
  closedAt: null,
  donations: [],
  createdAt: Date.now(),
});

// Details of an active vakinha (donations have their own dialog).
export function VakinhaForm({
  vakinha,
  onDone,
}: {
  vakinha: Vakinha | null; // live record; null when creating
  onDone: () => void;
}) {
  const [draft, setDraft] = useState<Vakinha>(() => vakinha ?? blank());
  const [goal, setGoal] = useState<number | null>(() => vakinha?.goal ?? null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<"close" | "delete" | null>(null);
  const photoRef = useRef<ImageCropHandle>(null);

  const set = <K extends keyof Vakinha>(key: K, value: Vakinha[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  async function run(action: () => Promise<void>) {
    setBusy(true);
    setError(null);
    try {
      await action();
      onDone();
    } catch (e) {
      if (!(e instanceof MissingPhoto)) console.error(e);
      setError(
        e instanceof MissingPhoto
          ? "Adicione uma foto para a vaquinha."
          : "Não foi possível salvar. Verifique sua conexão e tente novamente.",
      );
      setBusy(false);
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!goal) return setError("Informe uma meta válida.");
    run(async () => {
      const photo = await photoRef.current!.resolve();
      if (!photo) throw new MissingPhoto();
      await saveWithPhoto(draft.photo, photo, () =>
        save("vakinhas", {
          ...draft,
          title: draft.title.trim(),
          goal,
          photo,
          // Donations are saved from their own dialog — keep the latest.
          donations: vakinha?.donations ?? [],
        }),
      );
    });
  }

  return (
    <form onSubmit={submit} className="grid gap-5 md:grid-cols-[1fr_1.1fr]">
      <ImageCropField ref={photoRef} value={draft.photo} spec={imageSpecs.vakinha} />

      <div className="space-y-4">
        <Field label="Título">
          <Input
            required
            placeholder="ex.: Cirurgia do Thor"
            value={draft.title}
            onChange={(e) => set("title", e.target.value)}
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Categoria">
            <Select value={draft.category} onChange={(e) => set("category", e.target.value)}>
              {vakinhaCategories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Select>
          </Field>
          <Field label="Meta">
            <MoneyInput required placeholder="R$ 3.000,00" value={goal} onChange={setGoal} />
          </Field>
        </div>
        <Field label="Descrição" hint={`${draft.description.length}/220`}>
          <Textarea
            required
            maxLength={220}
            value={draft.description}
            onChange={(e) => set("description", e.target.value)}
          />
        </Field>
      </div>

      {error && (
        <p role="alert" className="rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 md:col-span-2">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-2 md:col-span-2">
        <Button variant="ghost" onClick={onDone}>
          Cancelar
        </Button>
        <Button type="submit" disabled={busy}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {vakinha ? "Salvar" : "Criar vaquinha"}
        </Button>
      </div>

      {vakinha && (
        <section className="space-y-3 border-t border-navy/10 pt-5 md:col-span-2">
          {confirm === null && (
            <>
              <p className="text-sm text-navy/70">
                Campanha finalizada? Encerre a vaquinha para tirá-la do site. A foto é removida e os
                dados ficam disponíveis só para consulta.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="ghost" onClick={() => setConfirm("close")}>
                  <Archive className="h-4 w-4" aria-hidden />
                  Encerrar vaquinha
                </Button>
                <Button variant="danger" onClick={() => setConfirm("delete")}>
                  <Trash2 className="h-4 w-4" aria-hidden />
                  Excluir
                </Button>
              </div>
            </>
          )}

          {confirm === "close" && (
            <div className="rounded-2xl bg-white p-4 text-sm text-navy/75">
              <p>
                <strong className="text-navy">Encerrar “{vakinha.title}”?</strong> Não dá para reabrir
                depois.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  disabled={busy}
                  // Uses the stored record: unsaved edits above are discarded.
                  onClick={() =>
                    run(() => save("vakinhas", { ...vakinha, photo: "", closedAt: today() }))
                  }
                >
                  <Archive className="h-4 w-4" aria-hidden />
                  Sim, encerrar
                </Button>
                <Button variant="ghost" onClick={() => setConfirm(null)}>
                  Voltar
                </Button>
              </div>
            </div>
          )}

          {confirm === "delete" && (
            <div className="rounded-2xl bg-white p-4 text-sm text-navy/75">
              <p>
                <strong className="text-navy">Excluir “{vakinha.title}”?</strong> Todos os dados e
                doações lançadas serão apagados.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  variant="danger"
                  disabled={busy}
                  onClick={() => run(() => remove("vakinhas", vakinha.id))}
                >
                  <Trash2 className="h-4 w-4" aria-hidden />
                  Sim, excluir
                </Button>
                <Button variant="ghost" onClick={() => setConfirm(null)}>
                  Voltar
                </Button>
              </div>
            </div>
          )}
        </section>
      )}
    </form>
  );
}
