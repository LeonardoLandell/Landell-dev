'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/Carousel';

interface Project {
  _id: string;
  title: string;
  description: string;
  slug?: { current: string };
  mainImage?: {
    asset?: {
      url?: string;
    };
  };
  liveUrl?: string;
  githubUrl?: string;
  tags?: string[];
}

interface ProjectsProps {
  projects?: Project[];
}

export default function Projects({ projects = [] }: ProjectsProps) {
  const defaultProjects: Project[] = [
    {
      _id: '1',
      title: 'Maison Noire',
      description: 'Campanha digital de alta costura inspirada na estética editorial italiana, construída com Next.js e Framer Motion.',
      tags: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
      liveUrl: 'https://maison-noire.vercel.app',
      githubUrl: 'https://github.com/LeonardoLandell'
    },
    {
      _id: '2',
      title: 'Lumos Workspace',
      description: 'Suíte de produtividade para desenvolvedores com quadros Kanban, painéis unificados e gráficos interativos em Canvas.',
      tags: ['React', 'TypeScript', 'Zustand'],
      liveUrl: 'https://lumos-workspace.vercel.app',
      githubUrl: 'https://github.com/LeonardoLandell'
    }
  ];

  const displayProjects = projects.length > 0 ? projects : defaultProjects;

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Projetos em Destaque
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-base">
            Soluções de engenharia frontend de alta performance desenvolvidas com foco em design editorial e arquitetura limpa.
          </p>
        </motion.div>

        <div className="relative px-4 md:px-12">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {displayProjects.map((project, index) => (
                <CarouselItem key={project._id || index} className="pl-4 md:basis-1/2 lg:basis-1/2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex flex-col justify-between h-full bg-neutral-900/80 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:border-[#0099FF]/50 transition-all group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono uppercase tracking-widest text-[#0099FF]">
                          Autoral / Client
                        </span>
                        <div className="flex items-center gap-3 text-neutral-400">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-white transition-colors"
                              aria-label="GitHub Repository"
                            >
                              <Code className="w-5 h-5" />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-white transition-colors"
                              aria-label="Live Preview"
                            >
                              <ExternalLink className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-[#0099FF] transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-full py-3 px-4 rounded-xl bg-white text-black font-medium hover:bg-neutral-200 transition-colors text-sm"
                        >
                          Acessar Projeto <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-white bg-black/60 border-white/20 hover:bg-black" />
            <CarouselNext className="text-white bg-black/60 border-white/20 hover:bg-black" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}