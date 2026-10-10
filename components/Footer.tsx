import { Heart, PawPrint } from "lucide-react";
import { Logo } from "./Logo";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "./ui/BrandIcons";
import { site } from "@/lib/site";

const socials = [
  { icon: InstagramIcon, href: site.socials.instagram, label: "Instagram" },
  { icon: FacebookIcon, href: site.socials.facebook, label: "Facebook" },
  { icon: YoutubeIcon, href: site.socials.youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer id="contato" className="relative bg-navy text-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 py-8 text-center md:grid-cols-4 md:divide-x md:divide-cream/15 md:text-left">
          <Logo tone="cream" className="justify-center md:justify-start" />

          <div id="noticias" className="flex flex-col items-center gap-3 md:px-6">
            <p className="text-center text-sm text-cream/85">
              Siga nossas redes e acompanhe
              <br />
              nossas histórias!
            </p>
            <div className="flex gap-3">
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

          <div className="flex flex-col items-center gap-1 md:px-6">
            <p className="text-center font-script text-xl leading-snug text-cream">
              “Adotar é um ato de amor,
              <br />
              mas também é um ato de cidadania.”
            </p>
            <PawPrint className="h-6 w-6 text-caramel" aria-hidden />
          </div>

          <div className="flex justify-center md:justify-end">
            <a
              href="#vakinhas"
              className="inline-flex items-center gap-2 rounded-xl bg-caramel px-8 py-4 font-display text-lg font-semibold text-white shadow-md transition-all hover:bg-caramel-600 active:scale-95"
            >
              <Heart className="h-5 w-5" strokeWidth={2.6} aria-hidden />
              Doe Agora
            </a>
          </div>
        </div>

        <p className="border-t border-cream/15 py-6 text-center text-xs text-cream/75">
          {site.name} • Construindo uma cidade mais justa e humana para todos os
          animais.
        </p>
      </div>
    </footer>
  );
}
