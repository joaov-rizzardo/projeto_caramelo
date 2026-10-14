"use client";

import Image from "next/image";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Heart, X } from "lucide-react";
import type { Animal } from "@/lib/data";
import { site } from "@/lib/site";

export function AnimalModal({
  animal,
  onClose,
}: {
  animal: Animal | null;
  onClose: () => void;
}) {
  // Close on Escape + lock body scroll while open.
  useEffect(() => {
    if (!animal) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [animal, onClose]);

  return (
    <AnimatePresence>
      {animal && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Adotar ${animal.name}`}
        >
          <div
            className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ y: 40, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 40, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-cream-soft shadow-2xl sm:rounded-3xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-navy shadow-md transition-colors hover:bg-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid gap-0 sm:grid-cols-2">
              {/* Photos */}
              <div className="relative aspect-[5/3] sm:aspect-auto">
                <Image
                  src={animal.photo}
                  alt={`Foto de ${animal.name}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover sm:rounded-l-3xl"
                />
              </div>

              {/* Details + adoption CTA */}
              <div className="p-6">
                <p className="font-script text-2xl text-caramel-600">
                  Prazer, eu sou
                </p>
                <h3 className="font-display text-3xl font-bold text-navy">
                  {animal.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-navy/60">
                  {animal.species === "dog" ? "Cão" : "Gato"} · {animal.sex} ·{" "}
                  {animal.age} · {animal.size}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-navy/75">
                  {animal.bio}
                </p>

                {/* Adoption interest → WhatsApp conversation with the NGO */}
                <a
                  href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
                    `Olá! Tenho interesse em adotar ${animal.name}. 💛`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-caramel px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-caramel-600 active:scale-95"
                >
                  <Heart className="h-4 w-4 fill-current" aria-hidden />
                  Quero adotar {animal.name}
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
