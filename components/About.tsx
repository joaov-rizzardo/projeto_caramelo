import Image from "next/image";
import { HandHeart, Home, ShieldCheck, Sparkles } from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { unsplash } from "@/lib/data";

const values = [
  {
    icon: ShieldCheck,
    title: "Transparência",
    text: "Prestamos contas de cada real. Você acompanha para onde vai a sua doação.",
  },
  {
    icon: HandHeart,
    title: "Cuidado",
    text: "Cada animal recebe atenção veterinária, carinho e tempo para se recuperar.",
  },
  {
    icon: Home,
    title: "Adoção responsável",
    text: "Encontramos o lar certo para cada personalidade — sem pressa, com afeto.",
  },
  {
    icon: Sparkles,
    title: "Comunidade",
    text: "Voluntários, doadores e adotantes: somos uma corrente do bem que não para.",
  },
];

// Alternating image/text rows telling the NGO's story.
const story = [
  {
    photoId: "photo-1601758228041-f3b2795255f1",
    tag: "Nossa história",
    heading: "Começou com um caramelo na chuva",
    text: "Em 2018, um grupo de amigos resgatou um vira-lata caramelo tremendo de frio embaixo de uma marquise. Aquele focinho virou o símbolo de tudo o que fazemos hoje: acolher quem ninguém viu.",
  },
  {
    photoId: "photo-1561037404-61cd46aa615b",
    tag: "Nossa missão",
    heading: "Resgatar, cuidar e reencontrar o amor",
    text: "Tiramos das ruas animais feridos e abandonados, tratamos cada um até a plena recuperação e trabalhamos, dia após dia, para colocá-los em famílias que vão amá-los para sempre.",
    reverse: true,
  },
];

export function About() {
  return (
    <section id="sobre" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Quem somos"
          title="Uma ONG movida a focinhos e boa vontade"
          description="Somos pessoas comuns unidas por uma missão: garantir que nenhum cão ou gato passe fome, frio ou medo nas ruas do Brasil."
        />

        {/* Zig-zag story rows */}
        <div className="mt-16 space-y-16 lg:space-y-24">
          {story.map((row) => (
            <div
              key={row.heading}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
            >
              <Reveal
                from={row.reverse ? "right" : "left"}
                className={row.reverse ? "lg:order-2" : ""}
              >
                <div className="relative">
                  <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] border-4 border-white shadow-xl">
                    {/* TODO: replace with real Projeto Caramelo photos. */}
                    <Image
                      src={unsplash(row.photoId, 800, 640)}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 90vw, 45vw"
                      className="object-cover"
                    />
                  </div>
                  <span className="heart-texture absolute -bottom-4 -z-10 h-24 w-40 rounded-3xl bg-caramel/20 blur-sm" />
                </div>
              </Reveal>

              <Reveal
                from={row.reverse ? "left" : "right"}
                className={row.reverse ? "lg:order-1" : ""}
              >
                <p className="font-script text-2xl text-caramel-600">
                  {row.tag}
                </p>
                <h3 className="mt-1 font-display text-2xl font-bold text-navy sm:text-3xl">
                  {row.heading}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-navy/70">
                  {row.text}
                </p>
              </Reveal>
            </div>
          ))}
        </div>

        {/* Values grid */}
        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.08}>
              <div className="h-full rounded-3xl bg-offwhite p-6 shadow-sm ring-1 ring-navy/5 transition-all hover:-translate-y-1 hover:shadow-md">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-caramel/15 text-caramel-600">
                  <value.icon className="h-6 w-6" aria-hidden />
                </span>
                <h4 className="mt-4 font-display text-lg font-bold text-navy">
                  {value.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">
                  {value.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
