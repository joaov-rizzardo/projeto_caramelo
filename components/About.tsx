import Image from "next/image";
import { PawPrint } from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { HeartOutline, Swoosh } from "./ui/Doodles";
import { photos, unsplash } from "@/lib/data";

export function About() {
  return (
    <section id="sobre" className="relative bg-cream-soft pb-8 pt-10 sm:pb-16 sm:pt-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="flex items-center gap-3 font-display text-3xl font-bold text-navy">
            <PawPrint className="h-8 w-8 text-caramel" strokeWidth={2.4} aria-hidden />
            Sobre nós
          </h2>
        </Reveal>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-[0.8fr_1.5fr_1fr]">
          <Reveal>
            <p className="font-display text-3xl font-semibold leading-tight text-navy">
              Uma ONG movida a
              <br />
              <span className="text-4xl font-bold text-caramel">fazer o bem</span>
            </p>
            <Swoosh className="mt-2 h-5 w-52 text-caramel" />
          </Reveal>

          <Reveal delay={0.08} className="space-y-5 text-[15px] leading-relaxed text-navy/85">
            <p>
              O Projeto Caramelo nasceu do amor pelos animais e da vontade de
              transformar realidades. Somos uma ONG independente, formada por
              voluntários, que atua no resgate, acolhimento e cuidado de cães e
              gatos em situação de abandono na nossa cidade.
            </p>
            <p>
              Acreditamos que todo animal merece respeito, proteção e uma
              família. Trabalhamos diariamente para promover a adoção
              responsável, a saúde animal e a conscientização da comunidade
              sobre o bem-estar dos pets.
            </p>
          </Reveal>

          {/* Stacked layout: leave room above the photo for the handwritten note. */}
          <Reveal from="right" delay={0.12} className="relative mx-auto mt-12 w-full max-w-sm lg:mt-0">
            {/* Cream halo: the same blob shape, slightly larger, behind the photo */}
            <div className="relative aspect-[4/3] bg-cream-deep p-2.5 [clip-path:url(#soft-blob)]">
              <div className="relative h-full w-full [clip-path:url(#soft-blob)]">
                <Image
                  src={unsplash(photos.about, 1200, 800)}
                  alt="Mão fazendo carinho em um cachorro dourado"
                  fill
                  sizes="(max-width: 1024px) 90vw, 25vw"
                  className="object-cover object-[70%_40%]"
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
