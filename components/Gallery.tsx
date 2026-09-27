import Image from "next/image";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { galleryPhotoIds, unsplash } from "@/lib/data";

// Bento layout: a few tiles span two columns/rows for a lively rhythm.
const spans = [
  "sm:col-span-2 sm:row-span-2",
  "",
  "",
  "sm:row-span-2",
  "sm:col-span-2",
  "",
  "",
  "",
];

export function Gallery() {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Antes e depois"
          title="Resgatados e felizes para sempre"
          description="Cada foto aqui já foi um dia difícil. Hoje é só rabo abanando e ronrom."
        />

        <Reveal className="mt-12">
          <div className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[180px] sm:grid-cols-4">
            {galleryPhotoIds.map((id, i) => (
              <div
                key={id}
                className={`group relative overflow-hidden rounded-2xl ${spans[i] ?? ""}`}
              >
                {/* TODO: replace with real "resgatado e feliz" photos. */}
                <Image
                  src={unsplash(id, 600, 600)}
                  alt="Animal resgatado pelo Projeto Caramelo"
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-navy/0 transition-colors duration-300 group-hover:bg-navy/15" />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
