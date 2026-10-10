"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { Eye, HandCoins, Pencil, Plus } from "lucide-react";
import { useCollection } from "@/lib/admin/store";
import { formatDate, money, raisedOf, type Vakinha } from "@/lib/admin/models";
import { VakinhaForm } from "@/components/admin/VakinhaForm";
import { ClosedVakinha, VakinhaDonations } from "@/components/admin/VakinhaDonations";
import { Button, Dialog, EmptyState } from "@/components/admin/ui";

type Panel = { kind: "new" } | { kind: "edit" | "donations" | "view"; id: string };

export default function VakinhasPage() {
  const vakinhas = useCollection("vakinhas");
  const [panel, setPanel] = useState<Panel | null>(null);
  const close = useCallback(() => setPanel(null), []);

  const [open, closed] = useMemo(() => {
    const all = [...(vakinhas ?? [])];
    return [
      all.filter((v) => !v.closedAt).sort((a, b) => b.createdAt - a.createdAt),
      all.filter((v) => v.closedAt).sort((a, b) => b.closedAt!.localeCompare(a.closedAt!)),
    ];
  }, [vakinhas]);
  // Look the item up live so donations added in the dialog show immediately.
  const current =
    panel && panel.kind !== "new" ? vakinhas?.find((v) => v.id === panel.id) : undefined;
  const totalActive = open.reduce((sum, v) => sum + raisedOf(v), 0);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-navy">Vakinhas</h1>
          <p className="mt-1 text-sm text-navy/65">
            {vakinhas
              ? `${open.length} ${open.length === 1 ? "ativa" : "ativas"} · ${money(totalActive)} arrecadados`
              : "…"}
          </p>
        </div>
        <Button onClick={() => setPanel({ kind: "new" })}>
          <Plus className="h-4 w-4" aria-hidden />
          Nova vakinha
        </Button>
      </div>

      <div className="mt-6">
        {vakinhas && open.length === 0 ? (
          <EmptyState>Nenhuma vakinha ativa.</EmptyState>
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {open.map((v, i) => (
              <li key={v.id}>
                <VakinhaCard
                  vakinha={v}
                  eager={i < 3}
                  onDonations={() => setPanel({ kind: "donations", id: v.id })}
                  onEdit={() => setPanel({ kind: "edit", id: v.id })}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      {closed.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-xl font-bold text-navy/70">Encerradas</h2>
          <ul className="mt-3 divide-y divide-navy/10 overflow-hidden rounded-2xl bg-offwhite shadow-sm">
            {closed.map((v) => (
              <li key={v.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-navy">{v.title}</p>
                  <p className="text-xs text-navy/60">
                    {v.category} · encerrada em {formatDate(v.closedAt!)}
                  </p>
                </div>
                <p className="text-sm text-navy/70">
                  <strong className="text-navy">{money(raisedOf(v))}</strong> de {money(v.goal)}
                </p>
                <Button
                  variant="ghost"
                  className="px-3 py-1.5"
                  onClick={() => setPanel({ kind: "view", id: v.id })}
                >
                  <Eye className="h-4 w-4" aria-hidden />
                  Ver detalhes
                </Button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <Dialog
        open={panel?.kind === "new" || panel?.kind === "edit"}
        title={panel?.kind === "new" ? "Nova vakinha" : "Editar vakinha"}
        onClose={close}
        wide
      >
        {panel?.kind === "new" && <VakinhaForm vakinha={null} onDone={close} />}
        {panel?.kind === "edit" && current && (
          <VakinhaForm key={current.id} vakinha={current} onDone={close} />
        )}
      </Dialog>

      <Dialog
        open={panel?.kind === "donations"}
        title={current ? `Doações · ${current.title}` : "Doações"}
        onClose={close}
      >
        {panel?.kind === "donations" && current && <VakinhaDonations vakinha={current} />}
      </Dialog>

      <Dialog open={panel?.kind === "view"} title="Vakinha encerrada" onClose={close}>
        {panel?.kind === "view" && current && <ClosedVakinha vakinha={current} onDone={close} />}
      </Dialog>
    </>
  );
}

function VakinhaCard({
  vakinha: v,
  eager,
  onDonations,
  onEdit,
}: {
  vakinha: Vakinha;
  eager: boolean; // first row is above the fold
  onDonations: () => void;
  onEdit: () => void;
}) {
  const raised = raisedOf(v);
  const pct = Math.min(100, Math.round((raised / v.goal) * 100));

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-offwhite shadow-md">
      <div className="relative aspect-[5/3] bg-cream-deep">
        {v.photo && (
          <Image
            src={v.photo}
            alt=""
            fill
            unoptimized
            sizes="400px"
            loading={eager ? "eager" : "lazy"}
            className="object-cover"
          />
        )}
        <span className="absolute right-3 top-3 rounded-full bg-caramel px-3 py-1 text-xs font-bold text-white shadow">
          {v.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h2 className="font-display text-lg font-bold text-navy">{v.title}</h2>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-navy/10">
          <div className="h-full rounded-full bg-caramel" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-2 flex-1 text-xs text-navy/70">
          <strong className="text-sm text-navy">{money(raised)}</strong> de {money(v.goal)} · {pct}%
        </p>
        <div className="mt-4 flex flex-col gap-2">
          <Button onClick={onDonations}>
            <HandCoins className="h-4 w-4" aria-hidden />
            Gerenciar doações
          </Button>
          <Button variant="ghost" onClick={onEdit}>
            <Pencil className="h-4 w-4" aria-hidden />
            Editar vakinha
          </Button>
        </div>
      </div>
    </article>
  );
}
