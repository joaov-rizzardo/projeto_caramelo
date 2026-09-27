import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string; // handwritten script accent
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  tone?: "navy" | "cream";
}

// Consistent section header: script eyebrow + chunky display title.
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "navy",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const titleColor = tone === "cream" ? "text-cream" : "text-navy";
  const descColor = tone === "cream" ? "text-cream/80" : "text-navy/70";

  return (
    <Reveal
      className={`max-w-2xl ${isCenter ? "mx-auto text-center" : "text-left"}`}
    >
      <p className="font-script text-2xl text-caramel-600 sm:text-3xl">
        {eyebrow}
      </p>
      <h2
        className={`mt-1 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] ${titleColor}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-lg leading-relaxed ${descColor}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
