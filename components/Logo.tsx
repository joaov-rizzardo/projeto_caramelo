import Image from "next/image";

// Wordmark: mascot badge (everything above the circle's midline — dog's head, thumbs-up,
// cat's head and ears — breaks out of it for a 3D pop-out effect), two-tone name and
// handwritten tagline.
export function Logo({
  className = "",
  tone = "navy",
}: {
  className?: string;
  tone?: "navy" | "cream";
}) {
  const firstColor = tone === "cream" ? "text-cream" : "text-navy";
  const tagColor = tone === "cream" ? "text-cream/80" : "text-navy";

  return (
    <a href="#inicio" className={`group flex items-center gap-2.5 ${className}`}>
      <Image
        src="/logo-badge.png"
        alt=""
        width={900}
        height={742}
        priority
        className="h-16 w-auto shrink-0 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105 sm:h-[4.5rem]"
      />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-lg font-semibold leading-none ${firstColor} sm:text-xl`}>
          Projeto
        </span>
        <span className="-mt-0.5 font-display text-2xl font-bold leading-none text-caramel sm:text-3xl">
          Caramelo
        </span>
        <span className={`font-script text-sm leading-none ${tagColor} sm:text-base`}>
          Quem ama cuida
        </span>
      </span>
    </a>
  );
}
