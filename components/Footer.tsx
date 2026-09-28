import { Heart, PawPrint } from "lucide-react";
import type { SVGProps } from "react";
import { Logo } from "./Logo";
import { site } from "@/lib/site";

// Brand glyphs as inline SVGs — this lucide-react version no longer ships
// social/brand icons.
function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  );
}
function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.77-1.77C19.34 5.1 12 5.1 12 5.1s-7.34 0-8.83.43A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.77 1.77C4.66 18.9 12 18.9 12 18.9s7.34 0 8.83-.43a2.5 2.5 0 0 0 1.77-1.77C23 15.2 23 12 23 12ZM9.75 15.02V8.98L15.5 12l-5.75 3.02Z" />
    </svg>
  );
}

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
