"use client";

// Small set of form + layout primitives for the admin screens, styled to match
// the public site's inputs (AnimalModal) so the brand feels continuous.
import { useEffect, type ComponentProps, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

const fieldClass =
  "mt-1 w-full rounded-xl border-2 border-navy/10 bg-white px-3 py-2 text-sm text-navy outline-none transition-colors focus:border-caramel";

export function Field({
  label,
  hint,
  className = "",
  children,
}: {
  label: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-bold uppercase tracking-wide text-navy/60">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-navy/50">{hint}</span>}
    </label>
  );
}

export const Input = (props: ComponentProps<"input">) => (
  <input {...props} className={`${fieldClass} ${props.className ?? ""}`} />
);

export const Textarea = (props: ComponentProps<"textarea">) => (
  <textarea rows={4} {...props} className={`${fieldClass} resize-y ${props.className ?? ""}`} />
);

export const Select = (props: ComponentProps<"select">) => (
  <select {...props} className={`${fieldClass} ${props.className ?? ""}`} />
);

type Variant = "primary" | "ghost" | "danger";
const variants: Record<Variant, string> = {
  primary: "bg-caramel text-white shadow-md hover:bg-caramel-600",
  ghost: "border-2 border-navy/15 text-navy hover:border-navy/30 hover:bg-white",
  danger: "text-red-700 hover:bg-red-50",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return (
    <button
      type="button"
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all active:scale-95 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${className}`}
    />
  );
}

// Bottom sheet on mobile, centered card from sm up — same pattern as the
// public modals.
export function Dialog({
  open,
  title,
  onClose,
  children,
  wide = false,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`relative max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-cream-soft shadow-2xl sm:rounded-3xl ${
              wide ? "sm:max-w-3xl" : "sm:max-w-lg"
            }`}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-navy/10 bg-cream-soft/95 px-5 py-4 backdrop-blur sm:px-6">
              <h2 className="font-display text-xl font-bold text-navy">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-navy shadow-sm hover:bg-cream"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-5 sm:p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-2xl border-2 border-dashed border-navy/15 p-10 text-center text-sm text-navy/60">
      {children}
    </p>
  );
}
