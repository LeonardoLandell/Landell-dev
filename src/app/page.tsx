// src/app/page.tsx
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import Projects from "@/components/Projects";
import { client } from "@/sanity/lib/client";
import { projectsQuery } from "@/sanity/lib/queries";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { MotionProvider } from "@/components/MotionProvider";

export const revalidate = 60; 

export default async function Home() {

  const sanityProjects = await client.fetch(projectsQuery);

  return (
    <MotionProvider>
      <main className="relative min-h-screen">
        <Navbar />
        <Hero />
        <Projects projects={sanityProjects} />
        <About />
        <Contact />
      </main>
    </MotionProvider>
  );
}
