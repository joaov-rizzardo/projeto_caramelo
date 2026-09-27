"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SectionHeading } from "./ui/SectionHeading";
import { AnimalCard, AnimalCardSkeleton } from "./AnimalCard";
import { AnimalModal } from "./AnimalModal";
import { animals, type Animal, type Size, type Species } from "@/lib/data";

type SpeciesFilter = "all" | Species;
type SizeFilter = "all" | Size;
type AgeFilter = "all" | "puppy" | "adult"; // puppy = < 12 meses

const speciesFilters: { value: SpeciesFilter; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "dog", label: "Cães" },
  { value: "cat", label: "Gatos" },
];
const sizeFilters: { value: SizeFilter; label: string }[] = [
  { value: "all", label: "Qualquer porte" },
  { value: "small", label: "Pequeno" },
  { value: "medium", label: "Médio" },
  { value: "large", label: "Grande" },
];
const ageFilters: { value: AgeFilter; label: string }[] = [
  { value: "all", label: "Qualquer idade" },
  { value: "puppy", label: "Filhote" },
  { value: "adult", label: "Adulto" },
];

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
        active
          ? "bg-navy text-cream shadow-md"
          : "bg-offwhite text-navy/70 ring-1 ring-navy/10 hover:bg-caramel/10 hover:text-navy"
      }`}
    >
      {children}
    </button>
  );
}

export function AdoptionSection() {
  const [species, setSpecies] = useState<SpeciesFilter>("all");
  const [size, setSize] = useState<SizeFilter>("all");
  const [age, setAge] = useState<AgeFilter>("all");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Animal | null>(null);

  // Simulate mock data "loading" so skeletons are visible on first paint.
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(
    () =>
      animals.filter((a) => {
        if (species !== "all" && a.species !== species) return false;
        if (size !== "all" && a.size !== size) return false;
        if (age === "puppy" && a.ageMonths >= 12) return false;
        if (age === "adult" && a.ageMonths < 12) return false;
        return true;
      }),
    [species, size, age],
  );

  return (
    <section id="adotar" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Adote um amigo"
          title="Eles estão só esperando por você"
          description="Todos os nossos animais são resgatados, vacinados, vermifugados e castrados. Use os filtros e encontre o companheiro perfeito."
        />

        {/* Filters */}
        <div className="mt-10 space-y-3">
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            {speciesFilters.map((f) => (
              <Chip
                key={f.value}
                active={species === f.value}
                onClick={() => setSpecies(f.value)}
              >
                {f.label}
              </Chip>
            ))}
          </div>
          <div className="no-scrollbar flex flex-wrap gap-2 overflow-x-auto pb-1">
            {sizeFilters.map((f) => (
              <Chip
                key={f.value}
                active={size === f.value}
                onClick={() => setSize(f.value)}
              >
                {f.label}
              </Chip>
            ))}
            {ageFilters.slice(1).map((f) => (
              <Chip
                key={f.value}
                active={age === f.value}
                onClick={() => setAge(age === f.value ? "all" : f.value)}
              >
                {f.label}
              </Chip>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <AnimalCardSkeleton key={i} />
            ))
          ) : (
            <AnimatePresence initial={false}>
              {filtered.map((animal) => (
                <AnimalCard
                  key={animal.id}
                  animal={animal}
                  onOpen={setSelected}
                />
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-center text-lg font-semibold text-navy/60"
          >
            Nenhum focinho com esses filtros agora — tente ampliar a busca. 🐾
          </motion.p>
        )}
      </div>

      <AnimalModal animal={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
