"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { HandHeart, Heart, PawPrint, QrCode } from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { SwingArrow } from "./ui/Doodles";
import { CampaignModal, type PixTarget } from "./CampaignModal";
import { brl, type Campaign } from "@/lib/data";
import { site } from "@/lib/site";

export function CampaignsSection({ campaigns }: { campaigns: Campaign[] }) {
  const [selected, setSelected] = useState<PixTarget | null>(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <section id="vaquinhas" className="relative bg-cream-soft px-3 pb-10 pt-6 sm:px-6 sm:pt-10">
      {/* Orange + navy waves peeking out behind the panel */}
      <div className="absolute inset-x-0 bottom-0 top-[calc(100%-9rem)] overflow-hidden sm:top-1/3" aria-hidden>
        <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="h-full w-full">
          <path fill="#f47b20" d="M0 20C300 -10 500 60 760 40s500-50 680 0v360H0z" />
          <path fill="#12294a" d="M0 70C320 40 520 110 780 90s480-50 660-10v330H0z" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl rounded-[2rem] bg-navy px-5 py-10 shadow-2xl sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <Reveal className="max-w-xl">
            <p className="flex items-center gap-2 font-display text-xl font-semibold uppercase text-caramel [font-kerning:none]">
              <Heart className="h-7 w-7" strokeWidth={2.4} aria-hidden />
              Vaquinhas ativas
            </p>
            <h2 className="mt-1 font-display text-3xl font-bold text-cream sm:text-4xl">
              Cada doação <span className="text-caramel">nos ajuda a continuar</span>
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-cream/85">
              Conheça nossas campanhas de arrecadação e ajude a custear
              tratamentos, cirurgias, alimentação e cuidados essenciais para
              nossos resgatados.
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
            <SwingArrow className="mt-1 ml-[88px] h-10 w-10 text-caramel" />
          </div>
        </div>

        {campaigns.length === 0 ? (
          <NoCampaigns onDonate={() => setSelected({ title: site.name })} />
        ) : (
          /* Mobile: swipeable row with the next card peeking in; grid from sm up. */
          <ul className="no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
            {campaigns.map((c, i) => {
              const pct = Math.min(100, Math.round((c.raised / c.goal) * 100));
              return (
                <Reveal
                  as="li"
                  key={c.id}
                  delay={i * 0.06}
                  className="w-[82%] max-w-80 shrink-0 snap-start sm:w-auto sm:max-w-none"
                >
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-offwhite shadow-lg">
                    <div className="relative aspect-[5/3]">
                      <Image
                        src={c.photo}
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
                        <strong className="text-sm text-navy">{pct}%</strong> arrecadados de {brl(c.goal)}
                      </p>
                      <p className="mt-3 whitespace-nowrap text-[9px] leading-tight tracking-tight text-red-600 min-[360px]:text-[10px] min-[360px]:tracking-normal sm:whitespace-normal">
                        *Porcentagens atualizadas a cada 24h
                      </p>

                      <button
                        type="button"
                        onClick={() => setSelected(c)}
                        className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-caramel px-4 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-caramel-600 active:scale-95"
                      >
                        <QrCode className="h-5 w-5" aria-hidden />
                        Doe com QR Code
                      </button>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        )}
      </div>

      <CampaignModal campaign={selected} onClose={close} />
    </section>
  );
}

// Shown when there's no active vakinha: celebrates it and still offers a way
// to give, since day-to-day costs (food, vaccines, neutering) never stop.
function NoCampaigns({ onDonate }: { onDonate: () => void }) {
  return (
    <Reveal className="mt-8">
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-white/5 px-6 py-10 text-center ring-1 ring-cream/15 sm:px-12">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-caramel/15 blur-2xl" aria-hidden />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-sky/15 blur-2xl" aria-hidden />

        <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-caramel shadow-lg shadow-caramel/30">
          <HandHeart className="h-10 w-10 text-white" strokeWidth={2.2} aria-hidden />
        </div>

        <p className="relative mt-5 font-script text-3xl text-caramel">Boa notícia!</p>
        <h3 className="relative mt-1 font-display text-2xl font-bold text-cream sm:text-3xl">
          Nenhuma vaquinha ativa no momento
        </h3>
        <p className="relative mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-cream/80">
          Nossos resgatados estão com os tratamentos em dia. Mas a rotina do abrigo não para: ração,
          vacinas e castrações continuam — e qualquer valor faz diferença.
        </p>

        <button
          type="button"
          onClick={onDonate}
          className="relative mt-7 inline-flex items-center gap-2 rounded-xl bg-caramel px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-caramel-600 active:scale-95"
        >
          <QrCode className="h-5 w-5" aria-hidden />
          Doar para o projeto
        </button>
      </div>
    </Reveal>
  );
}
