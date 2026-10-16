import { Fragment } from "react";
import Image from "next/image";
import { Heart, House, PawPrint, Users } from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { CurvedArrow, HeartOutline } from "./ui/Doodles";
import { BlobClipPaths } from "./ui/BlobClipPaths";
import { photos } from "@/lib/data";

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
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] items-center gap-12 px-4 pb-14 sm:px-6 sm:pb-20 lg:grid-cols-[1fr_1.2fr] lg:px-8 lg:pb-28">
        <Reveal>
          <p className="font-script text-3xl text-caramel">Projeto Caramelo</p>
          <h1 className="mt-1 font-display text-[2rem] font-bold leading-[1.05] text-navy min-[380px]:text-4xl sm:text-5xl lg:text-[3.4rem]">
            Mais do que resgatar animais, é sobre{" "}
            <span className="text-caramel">
              reconstruir{" "}
              <span className="whitespace-nowrap">
                vidas.
                <HeartOutline className="ml-2 inline-block h-8 w-8 -translate-y-1.5 text-caramel sm:h-10 sm:w-10 sm:-translate-y-4" />
              </span>
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-navy/85">
            O Projeto Caramelo se dedica ao resgate e acolhimento de cães e
            gatos abandonados, oferecendo cuidados, castração e a oportunidade
            de um novo lar por meio da adoção responsável, além de promover a
            conscientização e o bem-estar animal em nossa cidade Cachoeira
            Paulista.
          </p>

          {/* justify-between keeps the gap on both sides of every divider equal */}
          <ul className="mb-2 mt-9 flex max-w-xl justify-between lg:mb-0">
            {pillars.map(({ icon: Icon, label }, i) => (
              <Fragment key={label[0]}>
                {i > 0 && <li aria-hidden className="w-px self-stretch bg-navy/15" />}
                <li className="whitespace-nowrap">
                  <Icon className="h-7 w-7 text-caramel sm:h-9 sm:w-9" strokeWidth={2.2} aria-hidden />
                  <p className="mt-2 text-[10px] font-medium leading-snug text-navy min-[360px]:text-[11px] min-[400px]:text-xs sm:mt-3 sm:text-sm">
                    {label[0]}
                    <br />
                    {label[1]}
                  </p>
                </li>
              </Fragment>
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
            className="pointer-events-none absolute -inset-2 z-10 h-[calc(100%+1rem)] w-[calc(100%+1rem)] text-caramel sm:-inset-4 sm:h-[calc(100%+2rem)] sm:w-[calc(100%+2rem)]"
            aria-hidden
          >
            <path d="M34 6C18 14 8 30 5 50" vectorEffect="non-scaling-stroke" />
            <path d="M296 118c2 32-10 60-36 78" vectorEffect="non-scaling-stroke" />
          </svg>

          {/* drop-shadow on the wrapper, since clip-path would clip a box-shadow */}
          <div className="drop-shadow-[0_24px_30px_rgba(18,41,74,0.3)]">
            <div className="relative aspect-[3/2] [clip-path:url(#hero-blob)]">
              <Image
                src={photos.hero}
                alt="Um cachorro e um gato deitados juntos na grama"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="absolute -top-8 right-0 z-10 flex rotate-[-10deg] flex-col items-end sm:-right-2 lg:-top-8">
            <p className="rounded-2xl bg-cream-soft/85 px-3 py-1 text-right font-script text-xl leading-tight text-navy backdrop-blur-sm min-[380px]:text-2xl sm:text-[1.7rem]">
              Eles também
              <br />
              fazem parte
              <br />
              da nossa cidade!
            </p>
            <div className="mr-10 flex items-center gap-1">
              <HeartOutline className="h-6 w-6 text-caramel" />
              <CurvedArrow className="h-10 w-16 text-caramel" />
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
