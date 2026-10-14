"use client";

import { useEffect, useRef } from "react";

// Medidas em px de tela
const FONTE_VEX = 23;
const FONTE_SOFTWARE = 7.5;
const ESPACO_LETRAS = 0.42; // em em
const BLOCO = 1.5; // tamanho do "pixel" da animação
const MARGEM = 10; // folga ao redor das letras para os pixels se espalharem
const SUPERAMOSTRA = 4; // resolução extra das letras para ficarem nítidas
const DURACAO = 1400; // ms para a onda atravessar a palavra
const LARGURA_ONDA = 0.35; // fração da palavra afetada ao mesmo tempo

type Pixel = { x: number; y: number; a: number; dx: number; dy: number; giro: number };

// Logo da Vex desenhado como texto: ao passar o mouse, uma onda atravessa a palavra
// desfazendo as letras em pixels e refazendo-as logo atrás
export function VexLogo() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const letras = useRef<HTMLCanvasElement | null>(null);
  const pixels = useRef<Pixel[]>([]);
  const tamanho = useRef({ w: 0, h: 0, lw: 0, lh: 0 });
  const quadro = useRef(0);

  function preparar(familia: string) {
    const s = (window.devicePixelRatio || 1) * SUPERAMOSTRA;
    const medidor = document.createElement("canvas").getContext("2d")!;
    const fonteVex = `800 ${FONTE_VEX}px ${familia}`;
    const fonteSoft = `600 ${FONTE_SOFTWARE}px ${familia}`;
    const largura = (texto: string, fonte: string, tam: number) => {
      medidor.font = fonte;
      // O espaçamento depois da última letra não conta
      return medidor.measureText(texto).width + tam * ESPACO_LETRAS * (texto.length - 1);
    };
    const lw = Math.ceil(Math.max(largura("VEX", fonteVex, FONTE_VEX), largura("SOFTWARE", fonteSoft, FONTE_SOFTWARE)));
    const altoVex = FONTE_VEX * 0.72; // altura das maiúsculas
    const vao = 8;
    const lh = Math.ceil(altoVex + vao + FONTE_SOFTWARE * 0.72);

    // Letras em alta resolução
    const recorte = document.createElement("canvas");
    recorte.width = Math.ceil(lw * s);
    recorte.height = Math.ceil(lh * s);
    const ctx = recorte.getContext("2d")!;
    ctx.scale(s, s);
    ctx.textBaseline = "alphabetic";
    const escrever = (texto: string, fonte: string, tam: number, y: number, cor: string) => {
      ctx.font = fonte;
      ctx.fillStyle = cor;
      let x = 0;
      for (const letra of texto) {
        ctx.fillText(letra, x, y);
        x += ctx.measureText(letra).width + tam * ESPACO_LETRAS;
      }
    };
    escrever("VEX", fonteVex, FONTE_VEX, altoVex, "#fff");
    escrever("SOFTWARE", fonteSoft, FONTE_SOFTWARE, lh, "rgba(255,255,255,.72)");
    letras.current = recorte;

    // Agrupa em blocos: cada bloco com tinta vira um pixel da animação
    const d = ctx.getImageData(0, 0, recorte.width, recorte.height).data;
    const lista: Pixel[] = [];
    for (let by = 0; by < lh; by += BLOCO) {
      for (let bx = 0; bx < lw; bx += BLOCO) {
        let soma = 0, n = 0;
        const x0 = Math.floor(bx * s), x1 = Math.min(recorte.width, Math.floor((bx + BLOCO) * s));
        const y0 = Math.floor(by * s), y1 = Math.min(recorte.height, Math.floor((by + BLOCO) * s));
        for (let y = y0; y < y1; y++) {
          for (let x = x0; x < x1; x++) {
            soma += d[(y * recorte.width + x) * 4 + 3];
            n++;
          }
        }
        const a = n ? soma / n / 255 : 0;
        if (a < 0.08) continue;
        const ang = Math.random() * Math.PI * 2;
        const dist = 3 + Math.random() * 8;
        lista.push({ x: bx, y: by, a, dx: Math.cos(ang) * dist, dy: Math.sin(ang) * dist, giro: Math.random() * Math.PI * 2 });
      }
    }
    pixels.current = lista;

    const w = lw + MARGEM * 2;
    const h = lh + MARGEM * 2;
    tamanho.current = { w, h, lw, lh };
    const c = canvas.current!;
    const dpr = window.devicePixelRatio || 1;
    c.width = Math.ceil(w * dpr);
    c.height = Math.ceil(h * dpr);
    c.style.width = `${w}px`;
    c.style.height = `${h}px`;
  }

  // t < 0 ou > 1: letras nítidas; entre 0 e 1: posição da onda
  function desenhar(t: number) {
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    const img = letras.current;
    if (!c || !ctx || !img) return;
    const { w, h, lw, lh } = tamanho.current;
    const dpr = c.width / w;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, MARGEM, MARGEM, lw, lh);
    if (t < 0 || t > 1) return;

    // A frente da onda vai de antes da primeira letra até depois da última.
    // Fora da faixa da onda as letras ficam nítidas; dentro dela viram pixels
    const frente = -LARGURA_ONDA + t * (1 + LARGURA_ONDA * 2);
    const ini = Math.max(0, Math.floor(((frente - LARGURA_ONDA) * lw) / BLOCO) * BLOCO);
    const fim = Math.min(lw, Math.ceil(((frente + LARGURA_ONDA) * lw) / BLOCO) * BLOCO);
    if (fim > ini) ctx.clearRect(MARGEM + ini, MARGEM - 1, fim - ini, lh + 2);
    ctx.fillStyle = "#fff";
    for (const p of pixels.current) {
      if (p.x < ini || p.x >= fim) continue;
      const fase = (p.x / lw - frente) / LARGURA_ONDA; // -1..1 dentro da onda
      const k = Math.abs(fase) < 1 ? Math.cos((fase * Math.PI) / 2) ** 2 : 0;
      const ondula = Math.sin(fase * Math.PI * 2 + p.giro) * 4;
      const tam = BLOCO * (1 - 0.35 * k);
      ctx.globalAlpha = p.a * (1 - 0.3 * k);
      ctx.fillRect(
        MARGEM + p.x + k * p.dx + (BLOCO - tam) / 2,
        MARGEM + p.y + k * (p.dy + ondula) + (BLOCO - tam) / 2,
        tam,
        tam,
      );
    }
    ctx.globalAlpha = 1;
  }

  function animar() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cancelAnimationFrame(quadro.current);
    const inicio = performance.now();
    const passo = (agora: number) => {
      const t = (agora - inicio) / DURACAO;
      desenhar(t);
      if (t <= 1) quadro.current = requestAnimationFrame(passo);
    };
    quadro.current = requestAnimationFrame(passo);
  }

  useEffect(() => {
    const familia = getComputedStyle(document.documentElement).getPropertyValue("--font-montserrat").trim() || "sans-serif";
    let ativo = true;
    Promise.all([
      document.fonts.load(`800 ${FONTE_VEX}px ${familia}`),
      document.fonts.load(`600 ${FONTE_SOFTWARE}px ${familia}`),
    ]).finally(() => {
      if (!ativo) return;
      preparar(familia);
      desenhar(-1);
    });
    return () => {
      ativo = false;
      cancelAnimationFrame(quadro.current);
    };
  }, []);

  return (
    <a
      className="-m-2.5 block rounded leading-none focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-caramel"
      href="https://vexsoftware.com.br"
      target="_blank"
      rel="noopener"
      aria-label="Vex Software (abre em nova aba)"
      onMouseEnter={animar}
      onFocus={animar}
    >
      <canvas ref={canvas} className="block" aria-hidden="true" />
    </a>
  );
}
