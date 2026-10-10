"use client";

import { useRef, useState } from "react";
import { Loader2, Save, Trash2 } from "lucide-react";
import { remove, save } from "@/lib/admin/store";
import { imageSpecs, newId, petSizes, type Pet } from "@/lib/admin/models";
import { ImageCropField, MissingPhoto, type ImageCropHandle } from "./ImageCropField";
import { Button, Field, Input, Select, Textarea } from "./ui";

const blank = (): Pet => ({
  id: newId(),
  name: "",
  species: "dog",
  sex: "Macho",
  age: "",
  size: petSizes[1],
  bio: "",
  photo: "",
  createdAt: Date.now(),
});

export function PetForm({ pet, onDone }: { pet: Pet | null; onDone: () => void }) {
  const [draft, setDraft] = useState<Pet>(() => pet ?? blank());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const photoRef = useRef<ImageCropHandle>(null);

  const set = <K extends keyof Pet>(key: K, value: Pet[K]) => setDraft((d) => ({ ...d, [key]: value }));

  async function run(action: () => Promise<void>) {
    setBusy(true);
    setError(null);
    try {
      await action();
      onDone();
    } catch (e) {
      setError(
        e instanceof MissingPhoto
          ? "Adicione uma foto do pet."
          : "Não foi possível salvar. Tente uma foto menor ou remova cadastros antigos.",
      );
      setBusy(false);
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    run(async () => {
      const photo = await photoRef.current!.resolve();
      if (!photo) throw new MissingPhoto();
      await save("pets", { ...draft, name: draft.name.trim(), photo });
    });
  }

  return (
    <form onSubmit={submit} className="grid gap-5 md:grid-cols-[1fr_1.1fr]">
      <ImageCropField ref={photoRef} value={draft.photo} spec={imageSpecs.pet} />

      <div className="space-y-4">
        <Field label="Nome">
          <Input required value={draft.name} onChange={(e) => set("name", e.target.value)} />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Espécie">
            <Select value={draft.species} onChange={(e) => set("species", e.target.value as Pet["species"])}>
              <option value="dog">Cão</option>
              <option value="cat">Gato</option>
            </Select>
          </Field>
          <Field label="Sexo">
            <Select value={draft.sex} onChange={(e) => set("sex", e.target.value as Pet["sex"])}>
              <option>Macho</option>
              <option>Fêmea</option>
            </Select>
          </Field>
          <Field label="Idade">
            <Input
              required
              placeholder="ex.: 2 anos"
              value={draft.age}
              onChange={(e) => set("age", e.target.value)}
            />
          </Field>
          <Field label="Porte">
            <Select value={draft.size} onChange={(e) => set("size", e.target.value)}>
              {petSizes.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Select>
          </Field>
        </div>

        <Field label="Sobre o pet" hint={`${draft.bio.length}/220 — aparece no card do site`}>
          <Textarea
            required
            maxLength={220}
            value={draft.bio}
            onChange={(e) => set("bio", e.target.value)}
          />
        </Field>

      </div>

      {error && (
        <p role="alert" className="rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 md:col-span-2">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-2 border-t border-navy/10 pt-4 md:col-span-2">
        {pet &&
          (confirmDelete ? (
            <span className="flex flex-wrap items-center gap-2 text-sm text-navy/70">
              Excluir {pet.name}? Ele sairá do site.
              <Button variant="danger" disabled={busy} onClick={() => run(() => remove("pets", pet.id))}>
                Sim, excluir
              </Button>
              <Button variant="ghost" onClick={() => setConfirmDelete(false)}>
                Não
              </Button>
            </span>
          ) : (
            <Button variant="danger" onClick={() => setConfirmDelete(true)}>
              <Trash2 className="h-4 w-4" aria-hidden />
              Excluir (foi adotado)
            </Button>
          ))}
        <div className="ml-auto flex gap-2">
          <Button variant="ghost" onClick={onDone}>
            Cancelar
          </Button>
          <Button type="submit" disabled={busy}>
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Salvar
          </Button>
        </div>
      </div>
    </form>
  );
}
