"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { testimonials, unsplash } from "@/lib/data";

export function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const count = testimonials.length;
  const active = testimonials[index];

  const go = (step: number) =>
    setState(([i]) => [(i + step + count) % count, step]);

  return (
    <section
      id="depoimentos"
      className="relative scroll-mt-24 overflow-hidden py-20 lg:py-28"
    >
      <div className="heart-texture pointer-events-none absolute inset-0 opacity-70" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Finais felizes"
          title="Histórias que aquecem o coração"
        />

        <div className="mt-12">
          <div className="relative min-h-[19rem] sm:min-h-[15rem]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.figure
                key={active.id}
                custom={dir}
                initial={{ opacity: 0, x: dir >= 0 ? 60 : -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir >= 0 ? -60 : 60 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="dashed-card bg-offwhite p-8 text-center sm:p-10"
              >
                <Quote
                  className="mx-auto h-9 w-9 text-caramel/50"
                  aria-hidden
                />
                <blockquote className="mt-4 font-display text-xl font-medium leading-snug text-navy sm:text-2xl">
                  “{active.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center justify-center gap-3">
                  <span className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-caramel/40">
                    {/* TODO: replace with real adopter/donor photos. */}
                    <Image
                      src={unsplash(active.photoId, 96, 96)}
                      alt={active.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </span>
                  <span className="text-left">
                    <span className="block font-display font-bold text-navy">
                      {active.name}
                    </span>
                    <span className="block text-sm text-caramel-600">
                      {active.role}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Depoimento anterior"
              className="grid h-11 w-11 place-items-center rounded-full bg-navy text-cream shadow-md transition-colors hover:bg-navy-700 active:scale-95"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  aria-label={`Ir para o depoimento ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  className={`h-2.5 rounded-full transition-all ${
                    i === index
                      ? "w-7 bg-caramel"
                      : "w-2.5 bg-navy/20 hover:bg-navy/40"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Próximo depoimento"
              className="grid h-11 w-11 place-items-center rounded-full bg-navy text-cream shadow-md transition-colors hover:bg-navy-700 active:scale-95"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
