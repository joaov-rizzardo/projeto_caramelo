"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Heart, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { navLinks } from "@/lib/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(navLinks[0].href);

  // Solid cream background once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the link of the section crossing the viewport middle.
  useEffect(() => {
    const targets = navLinks
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream-soft/90 shadow-[0_4px_24px_-12px_rgba(18,41,74,0.3)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative py-2 text-[15px] font-semibold transition-colors ${
                    isActive ? "text-caramel" : "text-navy hover:text-caramel"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-caramel"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#vakinhas"
            className="hidden items-center gap-2 rounded-xl bg-caramel px-6 py-3 font-display text-base font-semibold text-white shadow-md transition-all hover:bg-caramel-600 hover:shadow-lg active:scale-95 sm:inline-flex"
          >
            <Heart className="h-5 w-5" strokeWidth={2.6} aria-hidden />
            Doe Agora
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center rounded-xl text-navy transition-colors hover:bg-navy/10 lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-4 mb-4 overflow-hidden rounded-3xl bg-cream-soft p-4 shadow-xl lg:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-2xl px-4 py-3 text-base font-semibold transition-colors hover:bg-caramel/10 ${
                      active === link.href ? "text-caramel" : "text-navy"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#vakinhas"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-caramel px-5 py-3.5 font-display text-base font-semibold text-white shadow-md active:scale-95"
            >
              <Heart className="h-5 w-5" strokeWidth={2.6} aria-hidden />
              Doe Agora
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
