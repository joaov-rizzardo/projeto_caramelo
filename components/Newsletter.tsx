"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Send } from "lucide-react";

export function Newsletter() {
  const [sent, setSent] = useState(false);

  return (
    <section className="relative py-16 lg:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="dashed-card relative overflow-hidden bg-caramel/12 p-8 text-center sm:p-12">
          <div className="paw-texture pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative mx-auto max-w-xl">
            <p className="font-script text-2xl text-caramel-600 sm:text-3xl">
              Fique por dentro
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold text-navy sm:text-3xl">
              Receba histórias de resgate no seu e-mail
            </h2>
            <p className="mt-3 text-navy/70">
              Sem spam — só finais felizes, mutirões de castração e novos
              focinhos para adoção.
            </p>

            <div className="mt-6">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.p
                    key="ok"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 rounded-full bg-leaf/15 px-5 py-3 font-bold text-navy"
                  >
                    <Check className="h-5 w-5 text-leaf" aria-hidden />
                    Inscrição confirmada! Bem-vindo à corrente do bem. 💛
                  </motion.p>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      // TODO: connect to the NGO's real newsletter provider.
                      setSent(true);
                    }}
                    className="flex flex-col gap-3 sm:flex-row"
                  >
                    <label htmlFor="newsletter-email" className="sr-only">
                      Seu e-mail
                    </label>
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="seu@email.com"
                      className="flex-1 rounded-full border-2 border-navy/10 bg-white px-5 py-3 text-navy outline-none focus:border-caramel"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 font-bold text-cream shadow-md transition-all hover:bg-navy-700 active:scale-95"
                    >
                      <Send className="h-4 w-4" aria-hidden />
                      Inscrever
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
