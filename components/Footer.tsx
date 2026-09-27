import { BadgeCheck, Mail, MapPin, Phone } from "lucide-react";
import type { SVGProps } from "react";
import { Logo } from "./Logo";
import { navLinks, site } from "@/lib/site";

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
    <footer
      id="contato"
      className="relative scroll-mt-24 overflow-hidden bg-navy pt-16 text-cream"
    >
      <div className="paw-texture pointer-events-none absolute inset-0 opacity-30 invert" />

      {/* Mascots near the closing branding.
          TODO: replace these emoji badges with official 3D mascot artwork. */}
      <div
        className="relative mx-auto mb-4 flex max-w-7xl justify-center px-4"
        aria-hidden
      >
        <span className="grid h-16 w-16 place-items-center rounded-full border-4 border-navy bg-caramel-300 text-3xl shadow-lg">
          🐶
        </span>
        <span className="-ml-4 grid h-16 w-16 place-items-center rounded-full border-4 border-navy bg-caramel text-3xl shadow-lg">
          🐱
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-b border-cream/15 pb-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Logo tone="cream" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/70">
              Resgatamos, cuidamos e encontramos lares para cães e gatos em
              situação de abandono. Quem ama, cuida — e você pode fazer parte
              disso.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-cream/10 px-3 py-1.5 text-xs font-bold text-cream ring-1 ring-cream/20">
              <BadgeCheck className="h-4 w-4 text-caramel-300" aria-hidden />
              ONG verificada {/* TODO: link real verification/certificate */}
            </span>
          </div>

          {/* Quick links */}
          <nav aria-label="Links rápidos">
            <h3 className="font-display text-lg font-bold text-cream">
              Navegação
            </h3>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-cream/70 transition-colors hover:text-caramel-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-bold text-cream">
              Contato
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-cream/70">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-caramel-300" aria-hidden />
                {site.address}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-caramel-300" aria-hidden />
                <a href={`tel:${site.phone}`} className="hover:text-caramel-300">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-caramel-300" aria-hidden />
                <a
                  href={`mailto:${site.email}`}
                  className="break-all hover:text-caramel-300"
                >
                  {site.email}
                </a>
              </li>
            </ul>

            <div className="mt-5 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-caramel hover:text-white"
                >
                  <s.icon className="h-5 w-5" aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. Feito com 💛 para quem não
            tem voz.
          </p>
          <p>CNPJ {site.cnpj} {/* placeholder */}</p>
        </div>
      </div>
    </footer>
  );
}
