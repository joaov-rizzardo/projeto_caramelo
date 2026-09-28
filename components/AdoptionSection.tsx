"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { ArrowRight, PawPrint } from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { AnimalModal } from "./AnimalModal";
import { animals, unsplash, type Animal } from "@/lib/data";

export function AdoptionSection() {
  const [selected, setSelected] = useState<Animal | null>(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <section id="adocao" className="paw-texture relative bg-cream py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <p className="flex items-center gap-2 font-display text-xl font-semibold uppercase text-caramel">
              <PawPrint className="h-7 w-7" strokeWidth={2.4} aria-hidden />
              Adoção
            </p>
            <h2 className="mt-1 font-display text-3xl font-bold text-navy sm:text-4xl">
              Encontre seu novo melhor amigo
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-navy/85">
              Dê uma chance a um pet que só precisa de amor, cuidado e um lar.
              <br className="hidden sm:block" /> Cada adoção transforma duas
              vidas: a do animal e a sua!
            </p>
          </Reveal>
          {/* TODO: point to the full adoption listing once it exists. */}
          <a
            href="#adocao"
            className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-caramel px-5 py-2.5 text-sm font-bold text-caramel transition-colors hover:bg-caramel hover:text-white"
          >
            Ver todos os animais
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>

        {/* Mobile: swipeable row with the next card peeking in; grid from sm up. */}
        <ul className="no-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:mt-10 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 md:grid-cols-3 lg:grid-cols-5">
          {animals.map((a, i) => (
            <Reveal
              as="li"
              key={a.id}
              delay={i * 0.05}
              className="w-[72%] max-w-72 shrink-0 snap-start sm:w-auto sm:max-w-none"
            >
              <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-offwhite shadow-lg">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={unsplash(a.photoId, 480, 360)}
                    alt={`Foto de ${a.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover"
                  />
                  <span
                    className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold text-white shadow ${
                      a.species === "dog" ? "bg-caramel" : "bg-sky"
                    }`}
                  >
                    {a.species === "dog" ? "Cão" : "Gato"}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-display text-xl font-bold text-navy">{a.name}</h3>
                  <p className="mt-1 flex items-center gap-x-1 whitespace-nowrap text-[11px] text-navy/70">
                    <PawPrint className="h-3.5 w-3.5 text-navy" aria-hidden />
                    {a.sex}
                    <span className="text-caramel">|</span>
                    {a.age}
                    <span className="text-caramel">|</span>
                    {a.size}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-snug text-navy/85">{a.bio}</p>
                  <button
                    type="button"
                    onClick={() => setSelected(a)}
                    className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-caramel px-4 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-caramel-600 active:scale-95"
                  >
                    <PawPrint className="h-4 w-4" aria-hidden />
                    Quero adotar
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>

      <AnimalModal animal={selected} onClose={close} />
    </section>
  );
}
