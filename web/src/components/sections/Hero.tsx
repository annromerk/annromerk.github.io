import { ContactRow } from '@/components/ContactRow';

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <h1>Anthony Romero</h1>
        <p className="hero-tagline">Mechatronic Apprentice I, Amazon RME</p>
        <p className="hero-start-date">
          In RME since <time dateTime="2026-09-27">September 27, 2026</time>
          <br />
          With Amazon since <time dateTime="2024-11-06">November 6, 2024</time>
        </p>
        <ContactRow />
      </div>
    </section>
  );
}
