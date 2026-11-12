'use client';

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Code2, Layers, Sparkles, X } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/Carousel";

export interface SanityProject {
  id: string;
  title: string;
  tagline: string;
  year: string;
  role: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  stack: string[];
  image: string;
  blurDataURL?: string; // Corrigido para satisfazer o TypeScript
  demo: string;
  github: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

function StackChips({ stack, size = "sm" }: { stack: string[]; size?: "sm" | "md" }) {
  if (!stack || !stack.length) return null;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {stack.map((s) => (
        <li
          key={s}
          className={`rounded-full bg-white/10 border border-white/20 font-mono text-white/90 tracking-wide ${
            size === "sm" ? "px-3 py-1 text-[10px] md:text-[11px]" : "px-3.5 py-1.5 text-xs"
          }`}
        >
          {s}
        </li>
      ))}
    </ul>
  );
}

function ProjectCard({
  project,
  index,
  onOpenCase,
}: {
  project: SanityProject;
  index: number;
  onOpenCase: () => void;
}) {
  return (
    <article className="overflow-hidden rounded-3xl border border-white/20 bg-black/40 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.4)] text-white transition-all duration-500 hover:border-white/40 h-full flex flex-col">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={project.image}
          alt={`Tela do projeto ${project.title}`}
          fill
          sizes="(max-width: 768px) 100vw, 896px"
          priority={index === 0}
          placeholder={project.blurDataURL ? "blur" : "empty"}
          blurDataURL={project.blurDataURL}
          draggable={false}
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
        <span className="absolute left-4 top-4 rounded-full bg-black/60 backdrop-blur-md border border-white/30 px-3.5 py-1 font-mono text-[10px] tracking-wider text-white uppercase shadow-lg">
          Nº {String(index + 1).padStart(2, "0")} · {project.year}
        </span>
      </div>

      <div className="space-y-4 p-6 md:p-8 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <p className="font-mono text-[11px] text-brand-red uppercase tracking-widest font-bold">{project.tagline}</p>
          <h3 className="font-black uppercase tracking-tight text-3xl leading-none text-white md:text-4xl">
            {project.title}
          </h3>
          <p className="line-clamp-2 font-serif text-base leading-relaxed text-white/85 italic pt-1">
            {project.description}
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <StackChips stack={project.stack} />

          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-4.5 py-2.5 rounded-xl font-semibold text-xs bg-brand-red text-white hover:bg-[#c92428] transition-all shadow-md gap-2 border border-white/25"
            >
              Ver demo <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-4.5 py-2.5 rounded-xl font-semibold text-xs bg-white/10 border border-white/25 text-white hover:bg-white/20 transition-all shadow-md gap-2"
            >
              <Code2 className="w-3.5 h-3.5" /> GitHub
            </a>
            <button
              onClick={onOpenCase}
              className="ml-auto inline-flex items-center justify-center px-4.5 py-2.5 rounded-xl font-semibold text-xs bg-transparent text-white/90 hover:text-white hover:bg-white/10 transition-all gap-2"
            >
              <Layers className="w-3.5 h-3.5" /> Ver case
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function CaseModal({ project, onClose }: { project: SanityProject | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease }}
            className="relative w-full max-w-2xl max-h-[90svh] overflow-y-auto rounded-3xl border border-white/25 bg-[#0B132B]/95 backdrop-blur-2xl text-white shadow-2xl z-10"
          >
            <button
              onClick={onClose}
              aria-label="Fechar modal"
              className="absolute right-5 top-5 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all backdrop-blur-md border border-white/20"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative aspect-[16/8] overflow-hidden">
              <Image
                src={project.image}
                alt={`Tela do projeto ${project.title}`}
                fill
                sizes="(max-width: 768px) 100vw, 700px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-transparent to-transparent opacity-80" />
            </div>
            
            <div className="space-y-8 p-6 md:p-10">
              <div className="border-b border-white/15 pb-6">
                <p className="font-mono text-[11px] text-brand-red uppercase tracking-widest font-bold">
                  Case Study · {project.year} · {project.role}
                </p>
                <h2 className="mt-2 font-black uppercase tracking-tight text-4xl leading-[0.95] text-white md:text-5xl">
                  {project.title}
                </h2>
                <p className="mt-4 font-serif text-lg leading-relaxed text-white/90">
                  {project.description}
                </p>
              </div>

              {project.challenge && (
                <blockquote className="border-l-4 border-brand-red pl-5 font-serif text-xl italic leading-relaxed text-white/95">
                  “{project.challenge}”
                  <span className="mt-2 block font-mono text-[10px] not-italic text-white/50 uppercase tracking-widest">
                    O desafio técnico
                  </span>
                </blockquote>
              )}

              {project.solution && (
                <div>
                  <p className="font-mono text-[11px] text-brand-red uppercase tracking-widest font-bold">A solução arquitetural</p>
                  <p className="mt-2 font-serif text-base leading-relaxed text-white/90">{project.solution}</p>
                </div>
              )}

              {project.results && project.results.length > 0 && (
                <div>
                  <p className="mb-3 font-mono text-[11px] text-brand-red uppercase tracking-widest font-bold">Resultados e impacto</p>
                  <ul className="grid gap-3 md:grid-cols-3">
                    {project.results.map((r) => (
                      <li
                        key={r}
                        className="flex items-start gap-2.5 rounded-2xl bg-white/5 border border-white/15 p-4 font-serif text-sm text-white shadow-inner"
                      >
                        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" /> {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <StackChips stack={project.stack} size="md" />

              <div className="flex flex-wrap gap-3.5 border-t border-white/15 pt-6">
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold text-xs bg-brand-red text-white hover:bg-[#c92428] transition-all shadow-lg gap-2"
                >
                  Acessar demo <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold text-xs bg-white text-slate-900 hover:bg-slate-100 transition-all shadow-lg gap-2 font-medium"
                >
                  <Code2 className="w-4 h-4" /> Código no GitHub
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

interface ProjectsProps {
  projects: SanityProject[];
}

export function Projects({ projects = [] }: ProjectsProps) {
  const [caseProject, setCaseProject] = useState<SanityProject | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 5000, stopOnMouseEnter: true, stopOnInteraction: false })
  );

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (!projects.length) {
    return (
      <section id="projetos" className="relative pb-24 pt-32 text-center text-white bg-[linear-gradient(180deg,#60A5FA_0%,#1E40AF_50%,#0F172A_100%)]">
        <p className="font-mono text-sm text-white/70 animate-pulse">Sincronizando projetos do Sanity...</p>
      </section>
    );
  }

  return (
    <section 
      id="projetos" 
      className="relative scroll-mt-10 pb-28 pt-28 md:pb-40 md:pt-40 text-white overflow-hidden bg-[linear-gradient(180deg,#60A5FA_0%,#2563EB_35%,#1E3A8A_70%,#0F172A_100%)]"
    >
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:4rem_4rem] h-full w-full [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
        <div className="space-y-3 mb-16">
          <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-white/90 font-bold">
            <span className="text-brand-red bg-white px-2.5 py-0.5 rounded-full shadow-md">02</span> / PROJETOS SELECIONADOS
          </div>
          <h2 className="font-black uppercase tracking-tighter text-4xl sm:text-5xl md:text-6xl text-white drop-shadow-md">
            Trabalhos <span className="text-brand-red">&amp;</span> Cases
          </h2>
          <p className="max-w-xl font-serif text-base sm:text-lg text-white/90 leading-relaxed">
            Projetos sincronizados via Sanity CMS. O carrossel avança a cada 5 segundos e pausa automaticamente ao aproximar o cursor.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto px-12">
          <Carousel
            setApi={setApi}
            plugins={[autoplayPlugin.current]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {projects.map((p, i) => (
                <CarouselItem key={p.id || p.title} className="md:basis-1/1">
                  <div className="p-1">
                    <ProjectCard
                      project={p}
                      index={i}
                      onOpenCase={() => setCaseProject(p)}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-black/50 border-white/20 text-white hover:bg-black/80" />
            <CarouselNext className="bg-black/50 border-white/20 text-white hover:bg-black/80" />
          </Carousel>

          <div className="mt-8 flex items-center justify-center gap-2">
            {projects.map((p, i) => (
              <button
                key={p.id || i}
                onClick={() => api?.scrollTo(i)}
                aria-label={`Ir para ${p.title}`}
                className={`rounded-full transition-all ${
                  i === current
                    ? "h-2.5 w-8 bg-brand-red ring-1 ring-white/50 shadow-md"
                    : "h-2.5 w-2.5 bg-white/30 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <CaseModal project={caseProject} onClose={() => setCaseProject(null)} />
    </section>
  );
}