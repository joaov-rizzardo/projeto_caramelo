import { PawPrint } from "lucide-react";
import { site } from "@/lib/site";

// Wordmark: paw badge + name + handwritten tagline.
// TODO: swap the paw badge for the official dog+cat paw logo artwork.
export function Logo({
  className = "",
  tone = "navy",
}: {
  className?: string;
  tone?: "navy" | "cream";
}) {
  const nameColor = tone === "cream" ? "text-cream" : "text-navy";
  const tagColor = tone === "cream" ? "text-caramel-300" : "text-caramel-600";

  return (
    <a href="#home" className={`group flex items-center gap-2.5 ${className}`}>
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-caramel text-white shadow-sm transition-transform duration-300 group-hover:-rotate-6">
        <PawPrint className="h-6 w-6" aria-hidden />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-lg font-bold tracking-tight ${nameColor}`}
        >
          {site.name}
        </span>
        <span className={`font-script text-base ${tagColor} -mt-0.5`}>
          {site.tagline}
        </span>
      </span>
    </a>
  );
}
