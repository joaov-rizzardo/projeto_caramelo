"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Heart, PawPrint } from "lucide-react";
import { AnimatedCounter } from "./ui/AnimatedCounter";
import { impactStats } from "@/lib/site";
import { unsplash } from "@/lib/data";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Subtle parallax: heart drifts up, photo sinks slightly on scroll.
  const heartY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pb-24"
    >
      {/* Ambient paw texture wash */}
      <div className="paw-texture pointer-events-none absolute inset-0 opacity-70" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        {/* --- Copy --- */}
        <div className="text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-script text-2xl text-caramel-600 sm:text-3xl"
          >
            Cada focinho merece um lar
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-2 font-display text-4xl font-bold leading-[1.05] tracking-tight text-navy sm:text-5xl lg:text-6xl"
          >
            Resgatamos vidas,{" "}
            <span className="relative whitespace-nowrap text-caramel">
              devolvemos
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
                aria-hidden
              >
                <path
                  d="M2 8C40 3 160 3 198 8"
                  stroke="#e8862e"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            esperança
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-navy/70 lg:mx-0"
          >
            O Projeto Caramelo resgata cães e gatos em situação de abandono,
            cuida da saúde deles e encontra famílias cheias de amor. Faça parte
            dessa corrente do bem.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start"
          >
            <a
              href="#adotar"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-7 py-3.5 text-base font-bold text-cream shadow-lg transition-all hover:bg-navy-700 hover:shadow-xl active:scale-95 sm:w-auto"
            >
              <PawPrint className="h-5 w-5" aria-hidden />
              Quero adotar
            </a>
            <a
              href="#doar"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-caramel px-7 py-3.5 text-base font-bold text-white shadow-lg transition-all hover:bg-caramel-600 hover:shadow-xl active:scale-95 sm:w-auto"
            >
              <Heart className="h-5 w-5 fill-current" aria-hidden />
              Doar via Pix
            </a>
          </motion.div>
        </div>

        {/* --- Hero image with glowing heart + mascots --- */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          {/* Soft glowing heart shape behind the photo */}
          <motion.div
            style={{ y: heartY }}
            className="pointer-events-none absolute -inset-6 -z-10 grid place-items-center"
            aria-hidden
          >
            <svg viewBox="0 0 200 200" className="h-[115%] w-[115%]">
              <defs>
                <radialGradient id="heartGlow" cx="50%" cy="45%" r="60%">
                  <stop offset="0%" stopColor="#f4b878" stopOpacity="0.95" />
                  <stop offset="60%" stopColor="#e8862e" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#e8862e" stopOpacity="0" />
                </radialGradient>
              </defs>
              <path
                d="M100 175S30 130 30 80c0-25 20-42 42-42 15 0 25 9 28 20 3-11 13-20 28-20 22 0 42 17 42 42 0 50-70 95-70 95z"
                fill="url(#heartGlow)"
              />
            </svg>
          </motion.div>

          <motion.div style={{ y: photoY }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border-4 border-white shadow-2xl"
            >
              {/* TODO: replace with a real photo of a rescued Projeto Caramelo animal. */}
              <Image
                src={unsplash("photo-1518717758536-85ae29035b6d", 900, 1100)}
                alt="Cão resgatado olhando para a câmera com expressão dócil"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Floating dashed stat badge — echoes the reference post's boxes */}
          <motion.div
            initial={{ opacity: 0, y: 16, rotate: -6 }}
            animate={{ opacity: 1, y: 0, rotate: -6 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="dashed-card absolute -left-3 top-8 bg-cream-soft px-4 py-2.5 shadow-lg sm:-left-6"
          >
            <p className="font-script text-lg leading-none text-caramel-600">
              já resgatamos
            </p>
            <p className="font-display text-xl font-bold leading-tight text-navy">
              +1.240 amigos
            </p>
          </motion.div>

          {/* Mascot spot — dog + cat.
              TODO: replace these emoji badges with the official 3D mascot artwork. */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
            className="absolute -bottom-4 -right-2 flex sm:-right-5"
            aria-hidden
          >
            <span className="grid h-16 w-16 place-items-center rounded-full border-4 border-white bg-caramel-300 text-3xl shadow-lg">
              🐶
            </span>
            <span className="-ml-4 grid h-16 w-16 place-items-center rounded-full border-4 border-white bg-navy text-3xl shadow-lg">
              🐱
            </span>
          </motion.div>
        </div>
      </div>

      {/* --- Impact counters --- */}
      <div className="relative mx-auto mt-14 max-w-6xl px-4 sm:px-6 lg:mt-20 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {impactStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="dashed-card bg-offwhite px-4 py-5 text-center"
            >
              <div className="font-display text-3xl font-bold text-caramel sm:text-4xl">
                <AnimatedCounter
                  value={stat.value}
                  prefix={"prefix" in stat ? stat.prefix : ""}
                  suffix={"suffix" in stat ? stat.suffix : ""}
                  compact={"compact" in stat ? stat.compact : false}
                />
              </div>
              <p className="mt-1 text-sm font-semibold text-navy/70">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
