"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { QRCodeSVG } from "qrcode.react";
import { Check, Copy, X } from "lucide-react";
import { brl } from "@/lib/data";
import { pixPayload } from "@/lib/pix";
import { site } from "@/lib/site";

// Same Pix key for every donation; the vakinha title goes in the description
// so the project can tell which campaign each transfer was for.
function pixCode(title: string) {
  return pixPayload({
    key: site.pixKey,
    name: site.pixName,
    city: site.pixCity,
    description: title,
  });
}

// What a donation goes to: a vakinha (photo + progress) or the project itself.
export interface PixTarget {
  title: string;
  photo?: string;
  raised?: number;
  goal?: number;
  description?: string;
}

// Pix QR code + copyable key for a single "vakinha" or a general donation.
export function CampaignModal({
  campaign,
  onClose,
}: {
  campaign: PixTarget | null;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState<"key" | "code" | null>(null);

  // Reset local state whenever a different campaign is opened (adjusting
  // state during render instead of in an effect).
  const [shown, setShown] = useState(campaign);
  if (shown !== campaign) {
    setShown(campaign);
    setCopied(null);
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

  const code = campaign ? pixCode(campaign.title) : "";

  async function copy(what: "key" | "code") {
    try {
      await navigator.clipboard.writeText(what === "key" ? site.pixKey : code);
      setCopied(what);
      setTimeout(() => setCopied(null), 2000);
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
            className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-cream-soft shadow-2xl sm:max-w-md sm:rounded-3xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-navy shadow-md hover:bg-white"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Hidden on phones so the QR code and Pix key fit without scrolling. */}
            {campaign.photo && (
              <div className="relative hidden h-40 sm:block">
                <Image src={campaign.photo} alt={`Foto do animal da campanha ${campaign.title}`} fill sizes="448px" className="object-cover" />
              </div>
            )}

            {/* Without a photo, leave room for the close button. */}
            <div
              className={`text-center ${campaign.photo ? "px-6 pb-5 pt-12 sm:p-6" : "px-6 pb-6 pt-14"}`}
            >
              <div>
                <p className="font-script text-2xl text-caramel">Apoie com Pix</p>
                <h3 className="font-display text-2xl font-bold text-navy">{campaign.title}</h3>
                {campaign.goal !== undefined && (
                  <>
                    <p className="mt-1 text-sm text-navy/70">
                      <strong className="text-navy">
                        {Math.min(100, Math.round(((campaign.raised ?? 0) / campaign.goal) * 100))}%
                      </strong>{" "}
                      arrecadados de {brl(campaign.goal)}
                    </p>
                    <p className="mt-1 text-[10px] leading-tight text-red-600">
                      *Porcentagens atualizadas a cada 24h
                    </p>
                  </>
                )}

                {campaign.description && (
                  <p className="mt-3 whitespace-pre-line text-sm sm:mt-4 leading-relaxed text-navy/85">
                    {campaign.description}
                  </p>
                )}
              </div>

              <div className="mt-4 sm:mt-5">
                <div className="mx-auto w-fit rounded-2xl bg-white p-3 shadow-sm ring-1 ring-navy/10">
                  <QRCodeSVG
                    value={code}
                    size={180}
                    fgColor="#12294a"
                    level="M"
                    className="h-[150px] w-[150px] sm:h-[180px] sm:w-[180px]"
                    aria-label={`QR Code Pix para ${campaign.title}`}
                  />
                </div>

                <p className="mt-4 text-xs font-bold uppercase sm:mt-5 tracking-wide text-navy/60">
                  Chave Pix ({site.pixKeyType})
                </p>
                <p className="mt-1 break-all font-display text-lg font-semibold text-navy">
                  {site.pixKeyLabel}
                </p>

                <div className="mt-3 flex flex-wrap justify-center gap-2 sm:mt-4">
                  <button
                    type="button"
                    onClick={() => copy("key")}
                    className="inline-flex items-center gap-2 rounded-xl bg-caramel px-4 py-3 text-sm font-bold text-white shadow-md sm:px-5 transition-all hover:bg-caramel-600 active:scale-95"
                  >
                    {copied === "key" ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
                    {copied === "key" ? "Copiado!" : "Copiar chave Pix"}
                  </button>
                  <button
                    type="button"
                    onClick={() => copy("code")}
                    className="inline-flex items-center gap-2 rounded-xl border-2 border-caramel px-4 py-3 sm:px-5 text-sm font-bold text-caramel-600 transition-all hover:bg-caramel/10 active:scale-95"
                  >
                    {copied === "code" ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
                    {copied === "code" ? "Copiado!" : "Pix copia e cola"}
                  </button>
                </div>
                <span className="sr-only" role="status" aria-live="polite">
                  {copied === "key" ? "Chave Pix copiada" : copied === "code" ? "Código Pix copiado" : ""}
                </span>

                <p className="mt-3 text-xs text-navy/60 sm:mt-4">
                  Qualquer valor ajuda — você escolhe quanto doar no app do seu banco.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
