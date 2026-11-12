'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { label: '// Início', href: '#top' },
  { label: '// Projetos', href: '#projetos' },
  { label: '// Sobre', href: '#sobre' },
  { label: '// Contato', href: '#contato' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <nav
          className={`flex items-center justify-between px-5 py-2.5 rounded-2xl transition-all duration-500 ${
            scrolled
              ? 'bg-black/30 backdrop-blur-xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.25)]'
              : 'bg-white/5 backdrop-blur-md border border-white/10'
          }`}
        >
          {/* Logo / Nome */}
          <a
            href="#top"
            className="group flex items-center gap-1 font-mono text-sm uppercase tracking-widest text-white font-bold"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
              Landell
            </span>
            <span className="text-brand-red font-black text-base transition-transform duration-300 group-hover:scale-150 group-hover:rotate-12">
              .
            </span>
          </a>

          {/* Links Centrais (Desktop com Animação de Hover Pill) */}
          <div
            className="hidden md:flex items-center gap-1 relative px-2 py-1 rounded-full bg-black/10 border border-white/5"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {navLinks.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHoveredIndex(idx)}
                className="relative px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-white/80 hover:text-white transition-colors z-10"
              >
                {hoveredIndex === idx && (
                  <motion.div
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 bg-white/15 rounded-full z-[-1]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                {link.label}
              </a>
            ))}
          </div>

          {/* Lado Direito: Status + CTA */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 font-mono text-[11px] backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Disponível</span>
            </div>

            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href="#contato"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-brand-red text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#c92428] transition-all shadow-lg shadow-brand-red/20 border border-white/20"
            >
              <span>Contato</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.a>
          </div>

          {/* Botão Menu Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menu"
            className="md:hidden p-2.5 rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 transition-all"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </div>

      {/* Menu Mobile Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="absolute top-full inset-x-4 mt-3 p-6 rounded-3xl bg-black/80 backdrop-blur-2xl border border-white/20 shadow-2xl md:hidden flex flex-col gap-4 text-white z-50"
          >
            {navLinks.map((link, i) => (
              <motion.a
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono text-base text-white/80 hover:text-white hover:text-brand-red transition-colors py-2 border-b border-white/10 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-brand-red opacity-60" />
              </motion.a>
            ))}

            <div className="pt-2 flex items-center justify-between">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 font-mono text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Disponível para novos projetos</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
} 