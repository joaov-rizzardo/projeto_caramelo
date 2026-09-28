"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { QRCodeSVG } from "qrcode.react";
import { Check, Copy, X } from "lucide-react";
import { brl, unsplash, type Campaign } from "@/lib/data";
import { site } from "@/lib/site";

// Pix QR code + copyable key for a single "vakinha".
export function CampaignModal({
  campaign,
  onClose,
}: {
  campaign: Campaign | null;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  // Reset local state whenever a different campaign is opened (adjusting
  // state during render instead of in an effect).
  const [shown, setShown] = useState(campaign);
  if (shown !== campaign) {
    setShown(campaign);
    setCopied(false);
  }

  // Close on Escape + lock body scroll while open.
  useEffect(() => {
    if (!campaign) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [campaign, onClose]);

  async function copyKey() {
    try {
      await navigator.clipboard.writeText(site.pixKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (e.g. insecure context) — the key stays selectable.
    }
  }

  return (
    <AnimatePresence>
      {campaign && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Apoiar: ${campaign.title}`}
        >
          <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-cream-soft shadow-2xl sm:rounded-3xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-navy shadow-md hover:bg-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative h-40">
              <Image
                src={unsplash(campaign.photoId, 600, 320)}
                alt=""
                fill
                sizes="448px"
                className="object-cover"
              />
            </div>

            <div className="p-6 text-center">
              <p className="font-script text-2xl text-caramel">Apoie com Pix</p>
              <h3 className="font-display text-2xl font-bold text-navy">{campaign.title}</h3>
              <p className="mt-1 text-sm text-navy/70">
                <strong className="text-navy">{brl(campaign.raised)}</strong> arrecadados de{" "}
                {brl(campaign.goal)}
              </p>

              {/* TODO: replace with the campaign's real Pix "copia e cola"
                  (BR Code/EMV) payload. For now it encodes the Pix key. */}
              <div className="mx-auto mt-5 w-fit rounded-2xl bg-white p-3 shadow-sm ring-1 ring-navy/10">
                <QRCodeSVG
                  value={site.pixKey}
                  size={180}
                  fgColor="#12294a"
                  level="M"
                  aria-label={`QR Code Pix para ${campaign.title}`}
                />
              </div>

              <p className="mt-5 text-xs font-bold uppercase tracking-wide text-navy/60">
                Chave Pix ({site.pixKeyType})
              </p>
              <p className="mt-1 break-all font-display text-lg font-semibold text-navy">
                {site.pixKey}
              </p>

              <button
                type="button"
                onClick={copyKey}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-caramel px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-caramel-600 active:scale-95"
              >
                {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
                {copied ? "Copiado!" : "Copiar chave Pix"}
              </button>
              <span className="sr-only" role="status" aria-live="polite">
                {copied ? "Chave Pix copiada" : ""}
              </span>

              <p className="mt-4 text-xs text-navy/60">
                Qualquer valor ajuda — você escolhe quanto doar no app do seu banco.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
