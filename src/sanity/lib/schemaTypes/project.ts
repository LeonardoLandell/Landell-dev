export const projectType = {
  name: 'project',
  title: 'Projetos',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título do Projeto',
      type: 'string',
    },
    {
      name: 'tagline',
      title: 'Tagline (Ex: Next.js 16 / SaaS Dashboard)',
      type: 'string',
    },
    {
      name: 'year',
      title: 'Ano',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Papel (Ex: Lead Frontend Developer)',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Descrição Curta',
      type: 'text',
    },
    {
      name: 'challenge',
      title: 'O Desafio Técnico',
      type: 'text',
    },
    {
      name: 'solution',
      title: 'A Solução Arquitetural',
      type: 'text',
    },
    {
      name: 'results',
      title: 'Resultados / Impactos (Lista)',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'stack',
      title: 'Stack Tecnológica',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'image',
      title: 'Imagem de Capa',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'demo',
      title: 'Link da Demo (URL)',
      type: 'url',
    },
    {
      name: 'github',
      title: 'Link do GitHub (URL)',
      type: 'url',
    },
  ],
};