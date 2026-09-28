"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { Heart, PawPrint, QrCode } from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { SwingArrows } from "./ui/Doodles";
import { CampaignModal } from "./CampaignModal";
import { brl, campaigns, unsplash, type Campaign } from "@/lib/data";

export function CampaignsSection() {
  const [selected, setSelected] = useState<Campaign | null>(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <section id="vakinhas" className="relative bg-cream-soft px-3 py-10 sm:px-6">
      {/* Orange + navy waves peeking out behind the panel */}
      <div className="absolute inset-x-0 bottom-0 top-1/3 overflow-hidden" aria-hidden>
        <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="h-full w-full">
          <path fill="#f47b20" d="M0 20C300 -10 500 60 760 40s500-50 680 0v360H0z" />
          <path fill="#12294a" d="M0 70C320 40 520 110 780 90s480-50 660-10v330H0z" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl rounded-[2rem] bg-navy px-5 py-10 shadow-2xl sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <Reveal className="max-w-xl">
            <p className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wide text-caramel">
              <Heart className="h-7 w-7" strokeWidth={2.4} aria-hidden />
              Vakinhas ativas
            </p>
            <h2 className="mt-1 font-display text-3xl font-bold text-cream sm:text-4xl">
              Juntos podemos <span className="text-caramel">fazer a diferença</span>
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-cream/85">
              Conheça as vakinhas ativas do Projeto Caramelo. São campanhas para
              custear tratamentos, cirurgias, alimentação e outras necessidades
              urgentes dos nossos resgatados.
            </p>
          </Reveal>

          <div className="hidden rotate-[-10deg] flex-col items-center pr-6 pt-2 md:flex">
            <p className="flex items-start gap-2 font-script text-3xl leading-tight text-cream">
              <PawPrint className="mt-2 h-7 w-7 text-caramel" aria-hidden />
              <span>
                Cada doação
                <br />
                salva vidas!
              </span>
            </p>
            <SwingArrows className="mt-1 h-10 w-32 text-caramel" />
          </div>
        </div>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {campaigns.map((c, i) => {
            const pct = Math.min(100, Math.round((c.raised / c.goal) * 100));
            return (
              <Reveal as="li" key={c.id} delay={i * 0.06}>
                <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-offwhite shadow-lg">
                  <div className="relative h-36">
                    <Image
                      src={unsplash(c.photoId, 500, 300)}
                      alt={`Foto do animal da campanha ${c.title}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                    <span className="absolute right-3 top-3 rounded-full bg-caramel px-3 py-1 text-xs font-bold text-white shadow">
                      {c.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="font-display text-lg font-bold text-navy">{c.title}</h3>
                    <p className="mt-1 flex-1 text-sm leading-snug text-navy/75">{c.description}</p>

                    <div
                      className="mt-4 h-2 overflow-hidden rounded-full bg-navy/10"
                      role="progressbar"
                      aria-valuenow={pct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${pct}% da meta arrecadada`}
                    >
                      <div className="h-full rounded-full bg-caramel" style={{ width: `${pct}%` }} />
                    </div>
                    <p className="mt-2 text-xs text-navy/70">
                      <strong className="text-sm text-navy">{brl(c.raised)}</strong> arrecadados de{" "}
                      {brl(c.goal)}
                    </p>

                    <button
                      type="button"
                      onClick={() => setSelected(c)}
                      className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-caramel px-4 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-caramel-600 active:scale-95"
                    >
                      <QrCode className="h-5 w-5" aria-hidden />
                      Apoie com QR Code
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>

      <CampaignModal campaign={selected} onClose={close} />
    </section>
  );
}
