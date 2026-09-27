"use client";

import { motion } from "motion/react";
import { HeartHandshake } from "lucide-react";
import { PixDonationBox } from "./PixDonationBox";
import { Reveal } from "./ui/Reveal";
import { allocation, thankYous } from "@/lib/site";

export function DonationSection() {
  return (
    <section
      id="doar"
      className="relative scroll-mt-24 overflow-hidden bg-navy py-20 text-cream lg:py-28"
    >
      <div className="paw-texture pointer-events-none absolute inset-0 opacity-40 invert" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-script text-2xl text-caramel-300 sm:text-3xl">
            Sua ajuda salva vidas
          </p>
          <h2 className="mt-1 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            Ajude a gente a salvar mais uma vida
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-cream/80">
            Cada doação vira ração no pote, vacina na carteirinha, cirurgia que
            salva e um resgate a mais. Doar pelo Pix leva menos de um minuto — e
            faz diferença pra sempre.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Pix box (signature element) */}
          <Reveal from="left">
            <PixDonationBox />
          </Reveal>

          {/* Transparency: where your money goes */}
          <Reveal from="right">
            <div>
              <h3 className="font-display text-xl font-bold text-cream">
                Veja para onde vai a sua doação
              </h3>
              <p className="mt-1 text-sm text-cream/70">
                Uma média de como cada real doado é aplicado ao longo do ano.
              </p>

              {/* stacked proportion bar */}
              <div className="mt-5 flex h-4 w-full overflow-hidden rounded-full ring-1 ring-cream/20">
                {allocation.map((a) => (
                  <motion.div
                    key={a.label}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${a.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    style={{ backgroundColor: a.color }}
                  />
                ))}
              </div>

              <ul className="mt-5 space-y-3">
                {allocation.map((a, i) => (
                  <motion.li
                    key={a.label}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3"
                  >
                    <span
                      className="h-3.5 w-3.5 shrink-0 rounded-full"
                      style={{ backgroundColor: a.color }}
                    />
                    <span className="flex-1 text-sm font-medium text-cream/90">
                      {a.label}
                    </span>
                    <span className="font-display font-bold text-cream">
                      {a.pct}%
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* Real example, like the reference post's vet-cost callout */}
              <div className="dashed-card mt-6 bg-navy-700/60 p-4">
                <p className="text-sm text-cream/80">
                  <span className="font-display text-xl font-bold text-caramel-300">
                    R$ 2.121,00
                  </span>{" "}
                  foi o custo total para cobrir a recuperação da{" "}
                  <strong className="text-cream">Estrela</strong> após um
                  atropelamento. Doações como a sua tornaram isso possível.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Recent thank-yous */}
        <div className="mt-16">
          <div className="flex items-center gap-2 text-caramel-300">
            <HeartHandshake className="h-5 w-5" aria-hidden />
            <h3 className="font-display text-xl font-bold text-cream">
              Obrigado! Veja o que as doações fizeram
            </h3>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {thankYous.map((t, i) => (
              <Reveal key={t.animal} delay={i * 0.08}>
                <div className="h-full rounded-3xl bg-cream/10 p-5 ring-1 ring-cream/15 backdrop-blur-sm">
                  <p className="font-script text-2xl text-caramel-300">
                    Muito obrigado!
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-cream/85">
                    <span className="font-display font-bold text-cream">
                      {t.amount}
                    </span>{" "}
                    {t.story}
                  </p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-caramel-300">
                    Pela {t.animal}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
