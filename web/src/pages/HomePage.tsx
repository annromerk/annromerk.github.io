import { useRef } from 'react';
import { DocProgressBar } from '@/components/DocProgressBar';
import { DocToc } from '@/components/DocToc';
import { Footer } from '@/components/Footer';
import { About } from '@/components/sections/About';
import { Certifications } from '@/components/sections/Certifications';
import { Experience } from '@/components/sections/Experience';
import { Faq } from '@/components/sections/Faq';
import { Hero } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/Projects';
import { Recommendation } from '@/components/sections/Recommendation';
import { Skills } from '@/components/sections/Skills';
import { useReveal } from '@/hooks/useReveal';

export function HomePage() {
  const mainRef = useRef<HTMLElement>(null);
  useReveal(mainRef);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <DocProgressBar />
      <DocToc />

      <main id="main-content" ref={mainRef}>
        <Hero />
        <About />
        <Projects />
        <Recommendation />
        <Experience />
        <Skills />
        <Certifications />
        <Faq />
      </main>

      <Footer />
    </>
  );
}
