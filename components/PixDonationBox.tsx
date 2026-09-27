"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { QRCodeSVG } from "qrcode.react";
import { Check, Copy, QrCode } from "lucide-react";
import { site, suggestedAmounts } from "@/lib/site";

export function PixDonationBox() {
  const [copied, setCopied] = useState(false);

  async function copyKey() {
    try {
      await navigator.clipboard.writeText(site.pixKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (e.g. insecure context) — select-to-copy fallback.
      setCopied(false);
    }
  }

  return (
    <div className="dashed-card relative overflow-hidden bg-cream-soft p-6 shadow-lg sm:p-8">
      {/* decorative hearts, like the reference post's amount box */}
      <div className="heart-texture pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative">
        <div className="flex items-center gap-2 text-caramel-600">
          <QrCode className="h-5 w-5" aria-hidden />
          <span className="font-script text-2xl">Doe pelo Pix</span>
        </div>

        <div className="mt-5 grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
          {/* QR code.
              TODO: replace with the NGO's real Pix "copia e cola" (BR Code/EMV)
              payload so banking apps read the amount + merchant automatically.
              For now the QR encodes the Pix key string below. */}
          <div className="mx-auto rounded-2xl bg-white p-3 shadow-sm ring-1 ring-navy/10">
            <QRCodeSVG
              value={site.pixKey}
              size={148}
              bgColor="#ffffff"
              fgColor="#1b2a4a"
              level="M"
              aria-label="QR Code Pix do Projeto Caramelo"
            />
          </div>

          {/* Key + copy */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-navy/60">
              Chave Pix ({site.pixKeyType})
            </p>
            <p className="mt-1 break-all font-display text-lg font-bold text-navy sm:text-xl">
              {site.pixKey}
            </p>

            <button
              type="button"
              onClick={copyKey}
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-bold text-cream shadow-md transition-all hover:bg-navy-700 active:scale-95"
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="done"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="inline-flex items-center gap-2"
                  >
                    <Check className="h-4 w-4 text-leaf" aria-hidden />
                    Copiado!
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="inline-flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" aria-hidden />
                    Copiar chave Pix
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            {/* Screen-reader live confirmation */}
            <span className="sr-only" role="status" aria-live="polite">
              {copied ? "Chave Pix copiada" : ""}
            </span>
          </div>
        </div>

        {/* Any amount is welcome */}
        <div className="mt-6 rounded-2xl bg-white/70 p-4">
          <p className="text-center text-sm font-semibold text-navy">
            Qualquer valor é bem-vindo 💛 você digita o quanto quiser no app do
            seu banco.
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {suggestedAmounts.map((amount) => (
              <span
                key={amount}
                className="rounded-full border border-caramel/40 bg-caramel/10 px-3 py-1 text-sm font-bold text-caramel-600"
              >
                {amount}
              </span>
            ))}
            <span className="px-1 py-1 text-sm font-medium text-navy/50">
              …ou o valor que fizer sentido pra você
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
