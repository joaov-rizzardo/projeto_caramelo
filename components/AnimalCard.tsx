"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Cat, Dog, Ruler } from "lucide-react";
import type { Animal } from "@/lib/data";
import { unsplash } from "@/lib/data";

const sizeLabel: Record<Animal["size"], string> = {
  small: "Pequeno",
  medium: "Médio",
  large: "Grande",
};

export function AnimalCard({
  animal,
  onOpen,
}: {
  animal: Animal;
  onOpen: (a: Animal) => void;
}) {
  const SpeciesIcon = animal.species === "dog" ? Dog : Cat;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col overflow-hidden rounded-3xl bg-offwhite shadow-sm ring-1 ring-navy/5"
    >
      <div className="relative aspect-square overflow-hidden">
        {/* TODO: replace with real photo of the adoptable animal. */}
        <Image
          src={unsplash(animal.photoId, 500, 500)}
          alt={`Foto de ${animal.name}, ${
            animal.species === "dog" ? "cão" : "gato"
          } para adoção`}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-navy shadow-sm backdrop-blur">
          <SpeciesIcon className="h-3.5 w-3.5 text-caramel-600" aria-hidden />
          {animal.species === "dog" ? "Cão" : "Gato"}
        </span>

        {/* Hover reveal: Meet [name] */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-navy/90 to-transparent p-4 pt-10 transition-transform duration-300 group-hover:translate-y-0">
          <button
            type="button"
            onClick={() => onOpen(animal)}
            className="w-full rounded-full bg-caramel px-4 py-2.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-caramel-600"
          >
            Conhecer {animal.name}
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-xl font-bold text-navy">
            {animal.name}
          </h3>
          <span className="text-sm font-semibold text-navy/60">
            {animal.age}
          </span>
        </div>

        <p className="mt-1 flex items-center gap-1.5 text-sm text-navy/60">
          <Ruler className="h-4 w-4" aria-hidden /> Porte {sizeLabel[animal.size]}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {animal.traits.map((trait) => (
            <span
              key={trait}
              className="rounded-full bg-caramel/10 px-2.5 py-0.5 text-xs font-semibold text-caramel-600"
            >
              {trait}
            </span>
          ))}
        </div>

        {/* Always-available action for keyboard / no-hover users */}
        <button
          type="button"
          onClick={() => onOpen(animal)}
          className="mt-4 rounded-full border-2 border-navy/10 px-4 py-2 text-sm font-bold text-navy transition-colors hover:border-caramel hover:text-caramel-600 lg:hidden"
        >
          Conhecer {animal.name}
        </button>
      </div>
    </motion.article>
  );
}

export function AnimalCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl bg-offwhite shadow-sm ring-1 ring-navy/5">
      <div className="aspect-square animate-pulse bg-cream-deep/60" />
      <div className="space-y-3 p-4">
        <div className="h-5 w-2/3 animate-pulse rounded-full bg-cream-deep/60" />
        <div className="h-4 w-1/2 animate-pulse rounded-full bg-cream-deep/50" />
        <div className="h-8 w-full animate-pulse rounded-full bg-cream-deep/40" />
      </div>
    </div>
  );
}
