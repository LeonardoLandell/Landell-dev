'use client';

import { useRef, type ReactNode, type PointerEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight, FileDown } from "lucide-react";

const spring = { stiffness: 90, damping: 18, mass: 0.6 };
const ease = [0.22, 1, 0.36, 1] as const;

function Layer({
  mx,
  my,
  depth,
  className,
  children,
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  depth: number;
  className?: string;
  children: ReactNode;
}) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
}

function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 14 });
  const y = useSpring(0, { stiffness: 200, damping: 14 });
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

const chips = [
  { label: "React", pos: "left-[5%] top-[12%]", depth: 60, delay: 0 },
  { label: "TypeScript", pos: "right-[6%] top-[11%]", depth: -50, delay: 0.6 },
  { label: "Tailwind", pos: "right-[4%] top-[44%] hidden md:block", depth: -70, delay: 1.2 },
  { label: "Next.js", pos: "left-[48%] top-[10%] hidden lg:block", depth: 35, delay: 0.9 },
];

const stackChips = [
  "Git",
  "Framer Motion",
  "Next.js 16",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Sanity CMS",
];

const letters = (word: string, offset = 0) =>
  word.split("").map((ch, i) => (
    <motion.span
      key={`${ch}-${i}`}
      className="inline-block"
      initial={{ y: "110%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.9, delay: 0.15 + (i + offset) * 0.045, ease }}
      whileHover={{ y: -14, transition: { duration: 0.2 } }}
    >
      {ch}
    </motion.span>
  ));

const toc = [
  { n: "02", label: "Projetos selecionados", href: "#projetos" },
  { n: "03", label: "Sobre & contato", href: "#contato" },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, spring);
  const my = useSpring(rawY, spring);

  const spotX = useMotionValue(50);
  const spotY = useMotionValue(35);
  const spotlight = useMotionTemplate`radial-gradient(560px circle at ${spotX}% ${spotY}%, color-mix(in oklab, var(--paper) 28%, transparent), transparent 65%)`;

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const yGrid = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const yBack = useTransform(scrollYProgress, [0, 1], ["0%", "90%"]);
  const yTitle = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const yChips = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    rawX.set(px - 0.5);
    rawY.set(py - 0.5);
    spotX.set(px * 100);
    spotY.set(py * 100);
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      onPointerMove={onMove}
      onPointerLeave={() => {
        rawX.set(0);
        rawY.set(0);
      }}
      className="relative flex min-h-[100svh] items-center overflow-hidden text-brand-white selection:bg-brand-red selection:text-brand-white bg-[linear-gradient(180deg,#0099FF_0%,#3B82F6_50%,#93C5FD_100%)]"
    >
      {/* Grid em branco suave com fade */}
      <motion.div style={{ y: yGrid }} className="absolute inset-0 -top-20">
        <Layer mx={mx} my={my} depth={-18} className="absolute inset-[-10%]">
          <div className="bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:4rem_4rem] h-full w-full [mask-image:linear-gradient(to_bottom,black_40%,transparent_80%)]" />
        </Layer>
      </motion.div>

      {/* Spotlight + glows */}
      <motion.div style={{ background: spotlight }} className="pointer-events-none absolute inset-0" />
      <Layer mx={mx} my={my} depth={-90} className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-brand-red/25 blur-[120px] md:h-[26rem] md:w-[26rem]" />
        <div className="absolute -left-20 top-1/3 h-64 w-64 rounded-full bg-white/20 blur-[110px] md:h-96 md:w-96" />
      </Layer>

      {/* Giant outline word "Portfólio" */}
      <motion.div
        style={{ y: yBack }}
        className="pointer-events-none absolute inset-x-0 top-[14%] select-none md:top-[8%]"
      >
        <Layer mx={mx} my={my} depth={-35} className="flex justify-center">
          <span className="text-black/20 whitespace-nowrap font-black uppercase tracking-tight text-[32vw] leading-none md:text-[14vw] drop-shadow-md">
            Portfólio
          </span>
        </Layer>
      </motion.div>

      {/* Cama de Nuvens Reais / Orgânicas na Base */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden z-10 h-44 md:h-56">
        <Layer mx={mx} my={my} depth={60} className="absolute -bottom-10 inset-x-0 flex justify-between items-end w-full">
          <div className="flex w-full justify-around items-end opacity-90">
            <div className="relative -left-12 flex items-end">
              <div className="w-56 h-32 bg-white rounded-full blur-[2px] opacity-85" />
              <div className="w-72 h-44 bg-white rounded-full blur-[1px] -ml-28 opacity-90 shadow-[0_-15px_40px_rgba(255,255,255,0.6)]" />
              <div className="w-48 h-32 bg-white rounded-full blur-[2px] -ml-24 opacity-85" />
            </div>

            <div className="relative flex items-end -mb-4">
              <div className="w-64 h-36 bg-white rounded-full blur-[1px] opacity-90" />
              <div className="w-80 h-48 bg-white rounded-full blur-[1px] -ml-32 opacity-95 shadow-[0_-20px_50px_rgba(255,255,255,0.7)]" />
              <div className="w-60 h-36 bg-white rounded-full blur-[1px] -ml-28 opacity-90" />
            </div>

            <div className="relative -right-12 flex items-end">
              <div className="w-48 h-32 bg-white rounded-full blur-[2px] opacity-85" />
              <div className="w-72 h-44 bg-white rounded-full blur-[1px] -ml-24 opacity-90 shadow-[0_-15px_40px_rgba(255,255,255,0.6)]" />
              <div className="w-60 h-36 bg-white rounded-full blur-[2px] -ml-28 opacity-85" />
            </div>
          </div>
        </Layer>
      </div>

      {/* Floating chips + code card */}
      <motion.div style={{ y: yChips, opacity: fade }} className="pointer-events-none absolute inset-0">
        {chips.map((c) => (
          <Layer key={c.label} mx={mx} my={my} depth={c.depth} className={`absolute ${c.pos}`}>
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
              transition={{
                opacity: { delay: 0.8 + c.delay * 0.4 },
                scale: { delay: 0.8 + c.delay * 0.4, type: "spring" },
                y: { duration: 4 + c.delay, repeat: Infinity, ease: "easeInOut" },
              }}
              className="inline-block rounded-full bg-white/10 backdrop-blur-md border border-white/25 px-4 py-2 font-mono text-xs text-white shadow-lg md:text-sm"
            >
              <span className="text-brand-red">#</span> {c.label}
            </motion.span>
          </Layer>
        ))}

        <Layer mx={mx} my={my} depth={110} className="absolute right-[6%] top-[56%] hidden lg:block">
          <motion.div
            initial={{ opacity: 0, rotate: 0, y: 40 }}
            animate={{ opacity: 1, rotate: -5, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9, ease }}
            className="rounded-2xl bg-white text-slate-900 p-5 font-mono text-xs leading-relaxed shadow-2xl border border-slate-200"
          >
            <div className="mb-3 flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
            </div>
            <p>
              <span className="text-brand-blue font-bold">const</span> dev = {"{"}
            </p>
            <p className="pl-4">
              nível: <span className="text-brand-red font-bold">&quot;Júnior&quot;</span>,
            </p>
            <p className="pl-4">foco: &quot;UI + motion&quot;,</p>
            <p className="pl-4">
              café: <span className="text-brand-blue font-bold">Infinity</span>,
            </p>
            <p>{"}"}</p>
          </motion.div>
        </Layer>
      </motion.div>

      {/* Cover content */}
      <motion.div
        style={{ y: yTitle, opacity: fade }}
        className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-32 pt-24 md:px-8"
      >
        <Layer mx={mx} my={my} depth={20}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-between border-y border-white/20 py-1 font-mono text-xs text-white/90"
          >
            <span>Desenvolvedor</span>
            <span className="hidden sm:inline">Frontend & Web</span>
            <span>Disponível para novos desafios</span>
            <span>São Paulo - SP, Brasil</span>
          </motion.div>

          <p className="mt-8 font-mono text-xs uppercase tracking-widest text-white/80 md:text-sm font-bold">
            DEV FRONTEND E WEB
          </p>

          <h1 className="mt-2 font-black uppercase tracking-tighter text-[16vw] leading-[0.82] md:text-[10rem]">
            <span className="block overflow-hidden text-white">{letters("Leonardo")}</span>
            <span className="block overflow-hidden text-white">
              {letters("Landell", 8)}
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9, type: "spring", stiffness: 300 }}
                className="inline-block text-brand-red ml-1"
              >
                .
              </motion.span>
            </span>
          </h1>

          <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-[1.3fr_1fr] md:items-end">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.7 }}
                className="max-w-lg text-lg sm:text-xl leading-snug text-white/95 md:text-2xl font-normal"
              >
                Transformo layouts em interfaces{" "}
                <span className="bg-brand-red text-white px-1.5 py-0.5 rounded font-medium">rápidas, acessíveis</span> e cheias de movimento.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.7 }}
                className="mt-7 flex flex-wrap items-center gap-3"
              >
                <Magnetic>
                  <a
                    href="#projetos"
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-semibold text-sm bg-brand-red text-white hover:bg-[#c92428] transition-all shadow-lg gap-2"
                  >
                    Ver projetos <ArrowUpRight className="w-4 h-4" />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href="/curriculo.pdf"
                    download="Leonardo_Landell_CV.pdf"
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-semibold text-sm bg-white text-brand-blue hover:bg-slate-100 transition-all shadow-lg gap-2"
                  >
                    <FileDown className="w-4 h-4" /> Baixar CV
                  </a>
                </Magnetic>
              </motion.div>
            </div>

            <motion.nav
              aria-label="Confira"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.7 }}
              className="hidden md:block"
            >
              <p className="mb-2 font-mono text-[11px] text-white/80 uppercase tracking-widest">Confira</p>
              {toc.map((t) => (
                <a
                  key={t.n}
                  href={t.href}
                  className="group flex items-baseline gap-4 border-t border-white/20 py-3 text-white"
                >
                  <span className="font-bold text-2xl">{t.n}</span>
                  <span className="flex-1 font-serif text-lg italic transition-transform group-hover:translate-x-1">
                    {t.label}
                  </span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45 text-brand-red" />
                </a>
              ))}
            </motion.nav>
          </div>
        </Layer>
      </motion.div>

      {/* Marquee */}
      <div className="absolute inset-x-0 bottom-0 z-20 overflow-hidden border-y border-white/20 bg-black/20 py-3 backdrop-blur">
        <div className="animate-marquee flex w-max gap-10 font-mono text-sm font-bold uppercase md:text-base tracking-widest text-white">
          {[...stackChips, ...stackChips, ...stackChips, ...stackChips].map((s, i) => (
            <span key={i} className="flex items-center gap-10">
              {s} <span className="text-brand-red">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}