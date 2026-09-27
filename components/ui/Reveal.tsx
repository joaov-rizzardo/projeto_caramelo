"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Direction the element slides in from. */
  from?: "up" | "left" | "right";
  as?: "div" | "section" | "li" | "article";
}

// Scroll-triggered fade + slide reveal used across every section.
// Honours prefers-reduced-motion by rendering a plain fade with no transform.
export function Reveal({
  children,
  className,
  delay = 0,
  from = "up",
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const offset = 28;
  const initial = reduce
    ? { opacity: 0 }
    : {
        opacity: 0,
        y: from === "up" ? offset : 0,
        x: from === "left" ? -offset : from === "right" ? offset : 0,
      };

  const variants: Variants = {
    hidden: initial,
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </MotionTag>
  );
}
