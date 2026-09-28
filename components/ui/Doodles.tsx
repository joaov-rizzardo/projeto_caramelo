import type { SVGProps } from "react";

// Hand-drawn accents (arrows, swooshes, outline heart) used next to the
// script callouts. They inherit `currentColor`, so tint them with text-*.

export function CurvedArrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 80 50" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M72 6c2 20-18 36-52 34" />
      <path d="M28 30l-10 10 12 6" />
    </svg>
  );
}

export function Swoosh(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 24" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" aria-hidden preserveAspectRatio="none" {...props}>
      <path d="M4 18C60 6 130 2 196 8" />
    </svg>
  );
}

export function HeartOutline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 30" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M16 27S3 19 3 10.5C3 6 6.5 3 10.2 3c2.7 0 4.7 1.6 5.8 3.6C17.1 4.6 19.1 3 21.8 3 25.5 3 29 6 29 10.5 29 19 16 27 16 27z" />
    </svg>
  );
}

// Two short swinging strokes, like the ones framing "Cada doação salva vidas!".
export function SwingArrows(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 40" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M8 10c6 16 22 22 40 18" />
      <path d="M40 22l8 6-8 6" />
      <path d="M112 4c-2 16-14 26-30 26" />
      <path d="M90 22l-8 8 9 4" />
    </svg>
  );
}
