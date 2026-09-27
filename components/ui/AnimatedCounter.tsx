"use client";

import {
  animate,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Format large numbers compactly, e.g. 148000 -> "148 mil". */
  compact?: boolean;
}

function format(n: number, compact?: boolean) {
  if (compact && n >= 1000) {
    return `${Math.round(n / 1000)} mil`;
  }
  return Math.round(n).toLocaleString("pt-BR");
}

// Counts up from 0 to `value` the first time it scrolls into view.
export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  compact,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <span ref={ref}>
      {prefix}
      {format(display, compact)}
      {suffix}
    </span>
  );
}
