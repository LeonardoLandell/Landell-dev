    import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/lib/schemaTypes'; // Ajuste o caminho para onde estão seus schemas

export default defineConfig({
  name: 'default',
  title: 'Landell Studio CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'seu_project_id_aqui',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio', // Essencial para o Next.js abrir o painel na rota /studio
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});