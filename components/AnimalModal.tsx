"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Heart, X } from "lucide-react";
import type { Animal } from "@/lib/data";
import { unsplash } from "@/lib/data";

export function AnimalModal({
  animal,
  onClose,
}: {
  animal: Animal | null;
  onClose: () => void;
}) {
  const [sent, setSent] = useState(false);

  // Reset local state whenever a different animal is opened (adjusting
  // state during render instead of in an effect).
  const [shown, setShown] = useState(animal);
  if (shown !== animal) {
    setShown(animal);
    setSent(false);
  }

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
              <div className="relative aspect-square sm:aspect-auto">
                <Image
                  src={unsplash(animal.photoId, 700, 700)}
                  alt={`Foto de ${animal.name}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover sm:rounded-l-3xl"
                />
              </div>

              {/* Details + form */}
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

                {/* Adoption interest form */}
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="sent"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 flex items-center gap-3 rounded-2xl bg-leaf/15 p-4"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-leaf text-white">
                        <Check className="h-5 w-5" />
                      </span>
                      <p className="text-sm font-semibold text-navy">
                        Recebemos seu interesse em adotar {animal.name}! Nossa equipe
                        vai entrar em contato em breve. 💛
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={(e) => {
                        e.preventDefault();
                        // TODO: wire to the NGO's real adoption CRM / e-mail.
                        setSent(true);
                      }}
                      className="mt-6 space-y-3"
                    >
                      <label className="block">
                        <span className="text-xs font-bold uppercase tracking-wide text-navy/60">
                          Seu nome
                        </span>
                        <input
                          required
                          type="text"
                          autoComplete="name"
                          className="mt-1 w-full rounded-xl border-2 border-navy/10 bg-white px-3 py-2 text-sm text-navy outline-none focus:border-caramel"
                        />
                      </label>
                      <label className="block">
                        <span className="text-xs font-bold uppercase tracking-wide text-navy/60">
                          E-mail ou WhatsApp
                        </span>
                        <input
                          required
                          type="text"
                          className="mt-1 w-full rounded-xl border-2 border-navy/10 bg-white px-3 py-2 text-sm text-navy outline-none focus:border-caramel"
                        />
                      </label>
                      <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 rounded-full bg-caramel px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-caramel-600 active:scale-95"
                      >
                        <Heart className="h-4 w-4 fill-current" aria-hidden />
                        Quero adotar {animal.name}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
