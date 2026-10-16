import { PawPrint } from "lucide-react";
import { Logo } from "./Logo";
import { VexLogo } from "./VexLogo";
import { FacebookIcon, InstagramIcon } from "./ui/BrandIcons";
import { CurvedArrow } from "./ui/Doodles";
import { site } from "@/lib/site";

const socials = [
  { icon: InstagramIcon, href: site.socials.instagram, label: "Instagram" },
  { icon: FacebookIcon, href: site.socials.facebook, label: "Facebook" },
];

export function Footer() {
  return (
    <footer id="contato" className="relative bg-navy text-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-4 py-6 text-center md:grid-cols-3 md:gap-8 md:divide-x md:divide-cream/15 md:py-8 md:text-left">
          {/* zoom (not scale) so the layout box shrinks too */}
          <Logo tone="cream" priority={false} className="justify-center max-md:[zoom:0.65] md:justify-start" />

          <div id="noticias" className="flex flex-col items-center gap-3 md:px-6">
            <p className="text-center font-script text-2xl leading-tight text-white">
              Nos acompanhe nas redes sociais
            </p>
            <div className="relative flex gap-3">
              <CurvedArrow className="absolute -top-5 left-full ml-1 h-9 w-14 text-caramel" />
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full border-2 border-cream/80 text-cream transition-colors hover:border-caramel hover:bg-caramel hover:text-white"
                >
                  <s.icon className="h-5 w-5" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <div className="hidden flex-col items-center gap-1 md:flex md:px-6">
            <p className="text-center font-script text-2xl leading-snug text-cream">
              Quem ama cuida
            </p>
            <PawPrint className="h-6 w-6 text-caramel" aria-hidden />
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 border-t border-cream/15 py-4 text-xs md:py-6 tracking-wide text-cream/75">
          <span>Desenvolvido por</span>
          <VexLogo />
        </div>
      </div>
    </footer>
  );
}
