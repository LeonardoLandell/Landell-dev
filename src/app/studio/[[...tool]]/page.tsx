'use client';

import { NextStudio } from 'next-sanity/studio';
import config from "../../../../sanity.config.ts"; // Ajuste os níveis de pastas (../) se o seu sanity.config.ts estiver em outro local

export const dynamic = 'force-static';

export default function StudioPage() {
  return <NextStudio config={config} />;
}