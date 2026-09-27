import { HandHeart, Megaphone, PackageOpen, Users } from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const ways = [
  {
    icon: Users,
    title: "Seja voluntário",
    text: "Ajude em resgates, feiras de adoção, transporte e cuidado diário dos animais.",
    cta: "Quero participar",
  },
  {
    icon: HandHeart,
    title: "Apadrinhe um animal",
    text: "Contribua mensalmente com um bichinho específico e acompanhe a evolução dele.",
    cta: "Apadrinhar",
  },
  {
    icon: Megaphone,
    title: "Espalhe a causa",
    text: "Compartilhe nossos resgates e adoções. Um clique pode encontrar um lar.",
    cta: "Compartilhar",
  },
  {
    icon: PackageOpen,
    title: "Doe suprimentos",
    text: "Ração, cobertores, remédios e material de limpeza são sempre bem-vindos.",
    cta: "Ver lista",
  },
];

export function VolunteerSection() {
  return (
    <section
      id="voluntariar"
      className="relative scroll-mt-24 bg-cream-soft py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Além da doação"
          title="Tem muito jeito de ajudar"
          description="Nem toda ajuda cabe num Pix. Escolha o seu jeito de fazer parte dessa corrente do bem."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ways.map((way, i) => (
            <Reveal key={way.title} delay={i * 0.08}>
              <div className="group flex h-full flex-col rounded-3xl bg-offwhite p-6 shadow-sm ring-1 ring-navy/5 transition-all hover:-translate-y-1.5 hover:shadow-lg">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy text-cream transition-transform duration-300 group-hover:-rotate-6 group-hover:bg-caramel">
                  <way.icon className="h-7 w-7" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-navy">
                  {way.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/70">
                  {way.text}
                </p>
                <a
                  href="#contato"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-caramel-600 transition-colors hover:text-caramel"
                >
                  {way.cta}
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
