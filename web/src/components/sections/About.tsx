import { AboutIcon } from '@/components/icons';
import { aboutParagraphs } from '@/content/site';

export function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <h2 className="section-title">
          <AboutIcon />
          About
        </h2>
        {aboutParagraphs.map((p) => (
          <p className="about-text" key={p.slice(0, 24)}>
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
