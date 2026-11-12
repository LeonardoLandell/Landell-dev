'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Database, Layout, Sparkles } from "lucide-react";

export function About() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePosition({ x: x * 0.1, y: y * 0.1 });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const stackCategories = [
    {
      title: "Core & Frontend",
      icon: <Layout className="w-5 h-5 text-brand-red" />,
      items: ["React", "Next.js 16", "TypeScript", "JavaScript (ES6+)", "HTML5 / CSS3"],
    },
    {
      title: "Styling & Motion",
      icon: <Sparkles className="w-5 h-5 text-blue-400" />,
      items: ["Tailwind CSS v4", "Framer Motion", "CSS Modules", "shadcn/ui", "GSAP"],
    },
    {
      title: "Backend & Systems",
      icon: <Database className="w-5 h-5 text-emerald-400" />,
      items: ["Node.js", "C# (Básico)", ".NET", "Sanity CMS", "MySQL", "PostgreSQL"],
    },
  ];

  return (
    <section id="sobre" className="relative scroll-mt-10 py-28 md:py-40 text-white overflow-hidden bg-[linear-gradient(180deg,#0F172A_0%,#1E3A8A_50%,#0F172A_100%)]">
      {/* Grid e atmosfera de fundo */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:4rem_4rem] h-full w-full [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
        {/* Cabeçalho */}
        <div className="space-y-3 mb-16">
          <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-white/90 font-bold">
            <span className="text-brand-red bg-white px-2.5 py-0.5 rounded-full shadow-md">03</span> / SOBRE MIM
          </div>
          <h2 className="font-black uppercase tracking-tighter text-4xl sm:text-5xl md:text-6xl text-white drop-shadow-md">
            Trajetória <span className="text-brand-red">&amp;</span> Domínio
          </h2>
        </div>

        {/* História + Foto Magnética */}
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
          
          {/* Texto de história e trajetória */}
          <div className="space-y-6">
            <p className="font-serif text-xl sm:text-2xl leading-relaxed text-white/95 italic">
              “Desenvolvedor Frontend especializado em construir interfaces de alta performance, onde rigor técnico e acabamento estético caminham juntos.”
            </p>

            <div className="space-y-4 font-serif text-base sm:text-lg leading-relaxed text-white/80">
              <p>
                Minha jornada no desenvolvimento começou em 2021, impulsionada pelo fascínio de transformar linhas de código em experiências visuais interativas. Desde então, venho aprofundando minha atuação no ecossistema JavaScript/TypeScript, com foco total em React, Next.js e animações fluidas.
              </p>
              <p>
                Atualmente cursando Análise e Desenvolvimento de Sistemas, também opero meus projetos autorais e comerciais sob a chancela do <strong className="text-white font-mono font-semibold">Landell.Studio</strong> — aplicando arquitetura limpa, código escalável e design editorial em cada aplicação entregue, com familiaridade em conceitos de backend e C#.
              </p>
            </div>

            <div className="pt-3 flex items-center gap-3 font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              Disponível para posições de Frontend &amp; Projetos
            </div>
          </div>

          {/* Foto de Perfil Interativa com Efeito Magnético */}
          <div className="flex justify-center lg:justify-end">
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{ x: mousePosition.x, y: mousePosition.y }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              className="relative group cursor-pointer"
            >
              {/* Brilho ao redor da moldura */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-brand-red via-blue-500 to-white/30 opacity-40 blur-xl group-hover:opacity-75 transition-all duration-700" />
              
              <div className="relative w-[280px] sm:w-[320px] aspect-[4/5] rounded-3xl overflow-hidden border border-white/25 bg-black/40 backdrop-blur-2xl shadow-2xl p-2">
                <div className="relative h-full w-full rounded-2xl overflow-hidden">
                  <img
                    src="/images/perfil.jpg"
                    alt="Leonardo Landell"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20 text-white text-center shadow-lg">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-brand-red font-bold">Frontend Developer</p>
                    <p className="font-black text-sm uppercase tracking-tight">Leonardo Landell</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Bento Grid com Stacks */}
        <div className="mt-20">
          <p className="mb-6 font-mono text-xs uppercase tracking-widest text-white/60">Tecnologias &amp; Ferramentas</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stackCategories.map((cat) => (
              <div
                key={cat.title}
                className="rounded-3xl border border-white/15 bg-white/[0.04] backdrop-blur-xl p-7 hover:border-white/30 transition-all duration-500 space-y-4 group"
              >
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <div className="p-2.5 rounded-xl bg-white/10 border border-white/15 group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </div>
                  <h3 className="font-black uppercase tracking-wide text-lg text-white">{cat.title}</h3>
                </div>

                <ul className="flex flex-wrap gap-2 pt-1">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-white/10 border border-white/20 px-3 py-1 font-mono text-xs text-white/90 group-hover:bg-white/15 transition-all"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}