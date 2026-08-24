import { DocProgressBar } from '@/components/DocProgressBar';
import { DocToc } from '@/components/DocToc';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/Reveal';
import { About } from '@/components/sections/About';
import { Certifications } from '@/components/sections/Certifications';
import { Experience } from '@/components/sections/Experience';
import { Faq } from '@/components/sections/Faq';
import { Hero } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/Projects';
import { Recommendation } from '@/components/sections/Recommendation';
import { Skills } from '@/components/sections/Skills';

export function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <DocProgressBar />
      <DocToc />

      <main id="main-content">
        <Hero />
        <Reveal>
          <About />
        </Reveal>
        <Reveal>
          <Projects />
        </Reveal>
        <Reveal>
          <Recommendation />
        </Reveal>
        <Reveal>
          <Experience />
        </Reveal>
        <Reveal>
          <Skills />
        </Reveal>
        <Reveal>
          <Certifications />
        </Reveal>
        <Reveal>
          <Faq />
        </Reveal>
      </main>

      <Footer />
    </>
  );
}
