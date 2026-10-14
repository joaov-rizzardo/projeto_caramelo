import Image from "next/image";
import { PawPrint } from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { HeartOutline, Swoosh } from "./ui/Doodles";
import { photos, unsplash } from "@/lib/data";

const pawTrail = [
  { x: 0, rotate: 20 },
  { x: 34, rotate: 35 },
  { x: 8, rotate: 25 },
  { x: 44, rotate: 40 },
] as const;

export function About() {
  return (
    <section id="sobre" className="relative overflow-hidden bg-cream-soft pb-8 pt-10 sm:pb-16 sm:pt-16 lg:py-20">
      {/* Big faint paws in the background corners */}
      <PawPrint className="pointer-events-none absolute -left-10 bottom-6 h-36 w-36 -rotate-12 text-caramel/10" strokeWidth={1.6} aria-hidden />
      <PawPrint className="pointer-events-none absolute right-[30%] top-6 hidden h-16 w-16 rotate-12 text-caramel/10 lg:block" strokeWidth={1.8} aria-hidden />
      <PawPrint className="pointer-events-none absolute -bottom-6 right-6 h-24 w-24 rotate-[25deg] text-caramel/10" strokeWidth={1.6} aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.4fr_1.25fr]">
          <Reveal>
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold uppercase text-caramel">
              <PawPrint className="h-7 w-7" strokeWidth={2.4} aria-hidden />
              {/* Fredoka's B has open bowls; borrow Nunito's closed one */}
              <span>
                So<span className="font-body font-extrabold">b</span>re nós
              </span>
            </h2>
            <p className="mt-3 font-display text-3xl font-semibold leading-tight text-navy">
              Quem ama
              <br />
              <span className="text-4xl font-bold text-caramel">cuida</span>
            </p>
            <Swoosh className="mt-2 h-5 w-52 text-caramel" />

            {/* Little trail of paw prints walking away under the tagline */}
            <div className="mt-8 hidden flex-col gap-3 pl-6 text-caramel/35 lg:flex" aria-hidden>
              {pawTrail.map(({ x, rotate }, i) => (
                <PawPrint
                  key={i}
                  className="h-7 w-7"
                  style={{ transform: `translateX(${x}px) rotate(${rotate}deg)` }}
                  strokeWidth={2.2}
                />
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="space-y-5 text-[15px] leading-relaxed text-navy/85">
            <p>
              O Projeto Caramelo nasceu do amor pelos animais e do desejo de
              transformar vidas.
            </p>
            <p>
              Somos um projeto independente, formado por voluntários, que se
              dedicam ao resgate, acolhimento e cuidado de cães e gatos em
              situação de abandono em nossa cidade, sem receber apoio
              financeiro público.
            </p>
            <p>
              Acreditamos que todo animal merece respeito, proteção, cuidado e a
              chance de encontrar uma família amorosa. Por isso, trabalhamos
              diariamente, mesmo com recursos limitados, para viabilizar
              resgates, tratamentos, medicações, castrações e adoções
              responsáveis. Cada vida importa, e cada gesto de solidariedade nos
              ajuda a continuar.
            </p>
          </Reveal>

          {/* Stacked layout: leave room above the photo for the handwritten note. */}
          <Reveal from="right" delay={0.12} className="relative mx-auto mt-12 w-full max-w-md self-center lg:mt-0">
            {/* Cream halo: the same blob shape, slightly larger, behind the photo */}
            <div className="relative aspect-[4/3] bg-cream-deep p-2.5 [clip-path:url(#soft-blob)]">
              <div className="relative h-full w-full [clip-path:url(#soft-blob)]">
                <Image
                  src={unsplash(photos.about, 1200, 800)}
                  alt="Filhote de cachorro dourado sorrindo com a língua de fora"
                  fill
                  sizes="(max-width: 1024px) 90vw, 25vw"
                  className="origin-left scale-[1.04] object-cover object-[0%_25%]"
                />
              </div>
            </div>
            <div className="absolute -top-12 right-0 flex rotate-[-10deg] flex-col items-end sm:-right-6">
              <p className="rounded-xl bg-cream-soft/85 px-2 text-right font-script text-2xl leading-tight text-navy">
                Juntos por
                <br />
                um futuro melhor
                <br />
                para eles!
              </p>
              <HeartOutline className="mr-2 mt-1 h-6 w-6 text-caramel" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
