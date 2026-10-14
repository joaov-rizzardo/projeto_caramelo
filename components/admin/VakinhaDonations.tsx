"use client";

import { useState } from "react";
import { Archive, Plus, Trash2 } from "lucide-react";
import { remove, save } from "@/lib/admin/store";
import { formatDate, money, newId, raisedOf, today, type Vakinha } from "@/lib/admin/models";
import { Button, Field, Input, MoneyInput } from "./ui";

// Ledger of received donations; the raised total shown on the site is its sum.
// Each entry is persisted as soon as it's added or removed.
export function VakinhaDonations({
  vakinha,
  readOnly = false,
}: {
  vakinha: Vakinha; // live record
  readOnly?: boolean;
}) {
  const [amount, setAmount] = useState<number | null>(null);
  const [date, setDate] = useState(today);
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);

  const raised = raisedOf(vakinha);
  const pct = Math.min(100, Math.round((raised / vakinha.goal) * 100));
  const entries = [...vakinha.donations].sort((a, b) => b.date.localeCompare(a.date));

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!amount) return setError("Informe um valor válido.");
    setError(null);
    await save("vakinhas", {
      ...vakinha,
      donations: [...vakinha.donations, { id: newId(), amount, date, note: note.trim() }],
    });
    setAmount(null);
    setNote("");
  }

  const removeEntry = (id: string) =>
    save("vakinhas", { ...vakinha, donations: vakinha.donations.filter((d) => d.id !== id) });

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-2">
        <p className="text-sm text-navy/70">
          <strong className="font-display text-2xl text-navy">{money(raised)}</strong> de{" "}
          {money(vakinha.goal)}
        </p>
        <p className="text-sm font-bold text-caramel-600">{pct}% da meta</p>
      </div>
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-navy/10">
        <div className="h-full rounded-full bg-caramel transition-[width]" style={{ width: `${pct}%` }} />
      </div>

      {!readOnly && (
        <form
          onSubmit={add}
          className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-white p-3"
        >
          <Field label="Valor">
            <MoneyInput required placeholder="R$ 50,00" value={amount} onChange={setAmount} />
          </Field>
          <Field label="Data">
            <Input type="date" required value={date} max={today()} onChange={(e) => setDate(e.target.value)} />
          </Field>
          <Field label="Observação" className="col-span-2">
            <Input placeholder="ex.: Pix Maria, bazar…" value={note} onChange={(e) => setNote(e.target.value)} />
          </Field>
          <Button type="submit" className="col-span-2">
            <Plus className="h-4 w-4" aria-hidden />
            Lançar doação
          </Button>
          {error && (
            <p role="alert" className="col-span-full text-sm font-semibold text-red-700">
              {error}
            </p>
          )}
        </form>
      )}

      <h3 className="mt-6 text-xs font-bold uppercase tracking-wide text-navy/60">
        Histórico ({entries.length})
      </h3>
      {entries.length === 0 ? (
        <p className="mt-2 rounded-2xl bg-white p-4 text-sm text-navy/60">Nenhuma doação lançada.</p>
      ) : (
        <ul className="mt-2 divide-y divide-navy/10 rounded-2xl bg-white">
          {entries.map((d) => (
            <li key={d.id} className="flex items-center gap-3 px-4 py-2.5 text-sm">
              <span className="w-20 shrink-0 text-navy/60">{formatDate(d.date)}</span>
              <span className="min-w-0 flex-1 truncate text-navy/75">{d.note || "—"}</span>
              <strong className="shrink-0 text-navy">{money(d.amount)}</strong>
              {!readOnly && (
                <button
                  type="button"
                  onClick={() => removeEntry(d.id)}
                  aria-label={`Remover doação de ${money(d.amount)}`}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-navy/40 hover:bg-red-50 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Read-only record of a closed vakinha: details + final donation ledger.
export function ClosedVakinha({ vakinha, onDone }: { vakinha: Vakinha; onDone: () => void }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/10 px-3 py-1 text-xs font-bold text-navy/70">
          <Archive className="h-3.5 w-3.5" aria-hidden />
          Encerrada em {formatDate(vakinha.closedAt!)}
        </span>
        <h3 className="mt-3 font-display text-2xl font-bold text-navy">{vakinha.title}</h3>
        <p className="mt-1 text-sm font-semibold text-navy/60">{vakinha.category}</p>
        <p className="mt-3 text-sm leading-relaxed text-navy/75">{vakinha.description}</p>
      </div>

      <section className="border-t border-navy/10 pt-5">
        <VakinhaDonations vakinha={vakinha} readOnly />
      </section>

      <div className="flex flex-wrap items-center gap-2 border-t border-navy/10 pt-4">
        {confirmDelete ? (
          <span className="flex flex-wrap items-center gap-2 text-sm text-navy/70">
            Excluir o registro desta vaquinha?
            <Button
              variant="danger"
              onClick={async () => {
                await remove("vakinhas", vakinha.id);
                onDone();
              }}
            >
              Sim, excluir
            </Button>
            <Button variant="ghost" onClick={() => setConfirmDelete(false)}>
              Não
            </Button>
          </span>
        ) : (
          <Button variant="danger" onClick={() => setConfirmDelete(true)}>
            <Trash2 className="h-4 w-4" aria-hidden />
            Excluir registro
          </Button>
        )}
        <Button variant="ghost" className="ml-auto" onClick={onDone}>
          Fechar
        </Button>
      </div>
    </div>
  );
}
