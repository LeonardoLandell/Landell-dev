'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, Copy, Download, Code2, Globe, Mail, MessageSquare, Sparkles, ShieldCheck, X } from "lucide-react";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const email = "leonardolandell2000@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contato" className="relative scroll-mt-10 py-28 md:py-40 text-white overflow-hidden bg-[linear-gradient(180deg,#0F172A_0%,#020617_100%)]">
      {/* Luzes celestes e grid de fundo */}
      <div className="absolute inset-0 pointer-events-none opacity-15">
        <div className="bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:4rem_4rem] h-full w-full [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-brand-red/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
        {/* Cabeçalho */}
        <div className="space-y-3 mb-16">
          <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-white/90 font-bold">
            <span className="text-brand-red bg-white px-2.5 py-0.5 rounded-full shadow-md">04</span> / CONTATO &amp; CONEXÕES
          </div>
          <h2 className="font-black uppercase tracking-tighter text-4xl sm:text-5xl md:text-6xl text-white drop-shadow-md">
            Vamos conversar <span className="text-brand-red">?</span>
          </h2>
          <p className="max-w-xl font-serif text-base sm:text-lg text-white/80 leading-relaxed">
            Disponível para projetos CLT ou PJ através da <strong className="text-white font-mono">Landell.Studio</strong> PRESENCIAL, HIBRIDO OU REMOTO.
          </p>
        </div>

        {/* Bento Grid de Contato */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Chamada Principal */}
          <div className="md:col-span-2 rounded-3xl border border-white/15 bg-white/[0.04] backdrop-blur-xl p-8 flex flex-col justify-between relative overflow-hidden group hover:border-white/30 transition-all duration-500">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 font-mono text-[11px] text-brand-red font-bold">
                <Sparkles className="w-3.5 h-3.5" /> Disponível para contratação
              </span>
              <h3 className="font-black uppercase tracking-tight text-3xl sm:text-4xl text-white leading-none">
                Inicie um novo projeto ou contrate.
              </h3>
              <p className="font-serif text-sm sm:text-base text-white/75 leading-relaxed">
                Foco total em ecossistema React, Next.js, arquitetura limpa e interfaces de alta performance com design editorial refinado.
              </p>
            </div>
            <div className="pt-6">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-xs bg-brand-red text-white hover:bg-[#c92428] transition-all shadow-lg"
              >
                Enviar mensagem direta <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 2: E-mail com Cópia Rápida */}
          <div className="md:col-span-1 lg:col-span-2 rounded-3xl border border-white/15 bg-white/[0.04] backdrop-blur-xl p-8 flex flex-col justify-between hover:border-white/30 transition-all duration-500">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
                <Mail className="w-6 h-6 text-brand-red" />
              </div>
              <h3 className="font-black uppercase tracking-wide text-xl text-white">E-mail Profissional</h3>
              <p className="font-mono text-xs sm:text-sm text-white/80 font-bold bg-black/30 p-3 rounded-xl border border-white/10 select-all">
                {email}
              </p>
            </div>
            <div className="pt-4">
              <button
                onClick={handleCopy}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all shadow-md active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" /> Copiado para a área de transferência!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copiar E-mail
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Card 3: Download de Currículo */}
          <div className="rounded-3xl border border-white/15 bg-white/[0.04] backdrop-blur-xl p-7 flex flex-col justify-between hover:border-white/30 transition-all duration-500 group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="font-black uppercase tracking-wide text-lg text-white">Currículo PDF</h3>
              <p className="font-serif text-xs text-white/70 leading-relaxed">
                Baixe o meu curriculo completo com minha trajetória acadêmica, profissional e stack técnica.
              </p>
            </div>
            <div className="pt-4">
              <a
                href="/curriculo.pdf"
                download
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs bg-white text-slate-950 hover:bg-slate-200 transition-all shadow-md"
              >
                Baixar CV <Download className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 4: GitHub */}
          <div className="rounded-3xl border border-white/15 bg-white/[0.04] backdrop-blur-xl p-7 flex flex-col justify-between hover:border-white/30 transition-all duration-500 group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="font-black uppercase tracking-wide text-lg text-white">GitHub</h3>
              <p className="font-serif text-xs text-white/70 leading-relaxed">
                Explore repositórios de código aberto, códigos fonte de projetos e experimentos em Next.js.
              </p>
            </div>
            <div className="pt-4">
              <a
                href="https://github.com/LeonardoLandell"
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
              >
                Acessar GitHub <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>

          {/* Card 5: LinkedIn */}
          <div className="rounded-3xl border border-white/15 bg-white/[0.04] backdrop-blur-xl p-7 flex flex-col justify-between hover:border-white/30 transition-all duration-500 group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-black uppercase tracking-wide text-lg text-white">LinkedIn</h3>
              <p className="font-serif text-xs text-white/70 leading-relaxed">
                Conecte-se profissionalmente, acompanhe atualizações de carreira e artigos técnicos.
              </p>
            </div>
            <div className="pt-4">
              <a
                href="https://www.linkedin.com/in/leonardo-landell/"
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
              >
                Acessar LinkedIn <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>

          {/* Card 6: WhatsApp */}
          <div className="rounded-3xl border border-white/15 bg-white/[0.04] backdrop-blur-xl p-7 flex flex-col justify-between hover:border-white/30 transition-all duration-500 group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-black uppercase tracking-wide text-lg text-white">WhatsApp</h3>
              <p className="font-serif text-xs text-white/70 leading-relaxed">
                Contato direto e rápido para propostas comerciais e dúvidas urgentes.
              </p>
            </div>
            <div className="pt-4">
              <a
                href="https://wa.me/5511984171590"
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
              >
                Chamar no Chat <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>

        </div>

        {/* Rodapé Legal, Direitos Autorais & LGPD */}
        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-white/50 font-mono text-xs gap-4">
          <p>© {new Date().getFullYear()} Leonardo Landell · Landell.Studio. Todos os direitos reservados.</p>
          
          <div className="flex items-center gap-6">
            <button
              onClick={() => setModalOpen(true)}
              className="hover:text-white transition-colors underline underline-offset-4 flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-brand-red" /> Termos &amp; LGPD
            </button>
            <p className="text-white/40">
              Sky Edition · v2.0
            </p>
          </div>
        </div>
      </div>

      {/* Modal de Privacidade e LGPD */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-3xl border border-white/20 bg-[#0B132B] p-6 md:p-8 text-white shadow-2xl z-10"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute right-5 top-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                aria-label="Fechar"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-5">
                <div className="flex items-center gap-2 text-brand-red font-mono text-xs uppercase tracking-widest font-bold">
                  <ShieldCheck className="w-4 h-4" /> Aviso Legal &amp; Conformidade LGPD
                </div>

                <h3 className="font-black uppercase tracking-tight text-2xl text-white">
                  Privacidade e Direitos Autorais
                </h3>

                <div className="space-y-4 font-serif text-sm text-white/80 leading-relaxed">
                  <div>
                    <strong className="text-white font-mono block mb-1">1. Direitos Autorais (Lei nº 9.610/1998):</strong>
                    Todo o layout, código-fonte autoral, identidade visual ("Sky Edition"), textos, imagens de perfil e marcas associadas ao <strong className="text-white font-mono">Landell.Studio</strong> e a Leonardo Landell são protegidos por leis de propriedade intelectual. A reprodução total ou parcial sem autorização prévia é proibida.
                  </div>

                  <div>
                    <strong className="text-white font-mono block mb-1">2. Proteção de Dados (LGPD - Lei nº 13.709/2018):</strong>
                    Este portfólio tem caráter estritamente profissional e informativo. Nenhuma coleta automatizada de dados pessoais sensíveis é realizada. O contato feito por e-mail, WhatsApp ou redes sociais ocorre por iniciativa do visitante, sendo os dados utilizados exclusivamente para fins de comunicação profissional, sem armazenamento em bancos de dados públicos ou compartilhamento com terceiros.
                  </div>

                  <div>
                    <strong className="text-white font-mono block mb-1">3. Seus Direitos (Titular dos Dados):</strong>
                    Caso tenha entrado em contato e deseje a exclusão de qualquer registro de comunicação prévia, basta solicitar diretamente pelo e-mail <span className="text-white font-mono">{email}</span>.
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end">
                  <button
                    onClick={() => setModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl font-semibold text-xs bg-brand-red text-white hover:bg-[#c92428] transition-all"
                  >
                    Entendido
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}