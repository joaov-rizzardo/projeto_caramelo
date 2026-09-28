import Image from "next/image";
import { Heart, House, PawPrint, Users } from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { CurvedArrow, HeartOutline } from "./ui/Doodles";
import { BlobClipPaths } from "./ui/BlobClipPaths";
import { photos, unsplash } from "@/lib/data";

const pillars = [
  { icon: PawPrint, label: ["Resgate", "e cuidado"] },
  { icon: House, label: ["Adoção", "responsável"] },
  { icon: Heart, label: ["Mais saúde", "e bem-estar"] },
  { icon: Users, label: ["Uma cidade", "mais humana"] },
] as const;

export function Hero() {
  return (
    <section id="inicio" className="paw-texture relative overflow-hidden pt-28 lg:pt-32">
      <BlobClipPaths />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8 lg:pb-28">
        <Reveal>
          <p className="font-script text-3xl text-caramel">Projeto Caramelo</p>
          <h1 className="mt-1 font-display text-4xl font-bold leading-[1.05] text-navy sm:text-5xl lg:text-[3.4rem]">
            Mais do que resgatar animais, é sobre{" "}
            <span className="whitespace-nowrap text-caramel">
              reconstruir vidas.
              <HeartOutline className="ml-2 inline-block h-9 w-9 -translate-y-4 text-caramel sm:h-10 sm:w-10" />
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-navy/85">
            O Projeto Caramelo é uma ONG que atua no resgate, acolhimento e
            cuidado de cães e gatos em situação de abandono, promovendo adoção
            responsável e conscientização na nossa cidade.
          </p>

          <ul className="mt-9 grid max-w-xl grid-cols-2 gap-y-6 sm:grid-cols-4">
            {pillars.map(({ icon: Icon, label }, i) => (
              <li
                key={label[0]}
                className={`sm:border-navy/15 sm:px-4 sm:first:pl-0 ${i > 0 ? "sm:border-l" : ""}`}
              >
                <Icon className="h-9 w-9 text-caramel" strokeWidth={2.2} aria-hidden />
                <p className="mt-3 text-sm font-medium leading-snug text-navy">
                  {label[0]}
                  <br />
                  {label[1]}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal from="right" delay={0.1} className="relative mx-auto w-full max-w-xl lg:-mr-6 lg:max-w-none">
          {/* Orange hand-drawn strokes hugging the photo */}
          <svg
            viewBox="0 0 300 200"
            preserveAspectRatio="none"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            className="pointer-events-none absolute -inset-4 z-10 h-[calc(100%+2rem)] w-[calc(100%+2rem)] text-caramel"
            aria-hidden
          >
            <path d="M34 6C18 14 8 30 5 50" vectorEffect="non-scaling-stroke" />
            <path d="M296 118c2 32-10 60-36 78" vectorEffect="non-scaling-stroke" />
          </svg>

          {/* drop-shadow on the wrapper, since clip-path would clip a box-shadow */}
          <div className="drop-shadow-[0_24px_30px_rgba(18,41,74,0.3)]">
            <div className="relative aspect-[3/2] [clip-path:url(#hero-blob)]">
              <Image
                src={unsplash(photos.hero, 1200, 800)}
                alt="Um cachorro e um gato deitados juntos na grama"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="absolute -top-6 right-0 z-10 flex rotate-[-10deg] flex-col items-end sm:-right-2 lg:-top-8">
            <p className="rounded-2xl bg-cream-soft/85 px-3 py-1 text-right font-script text-2xl leading-tight text-navy backdrop-blur-sm sm:text-[1.7rem]">
              Eles também
              <br />
              fazem parte
              <br />
              da nossa cidade!
            </p>
            <div className="mr-10 flex items-center gap-1">
              <HeartOutline className="h-6 w-6 text-caramel" />
              <CurvedArrow className="h-10 w-16 -scale-x-100 text-caramel" />
            </div>
          </div>
        </Reveal>
      </div>

      {/* Soft wave into the next section */}
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-12 w-full text-cream-soft sm:h-16"
        aria-hidden
      >
        <path fill="currentColor" d="M0 40C240 80 480 0 720 24s480 56 720 16v40H0z" />
      </svg>
    </section>
  );
}
