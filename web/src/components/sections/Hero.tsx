import { ContactRow } from '@/components/ContactRow';
import { HeroStat } from '@/components/sections/HeroStat';
import { heroStats } from '@/content/site';

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <h1>Anthony Romero</h1>
        <p className="hero-tagline">Mechatronics &amp; Robotics Apprentice, Amazon RME</p>
        <p className="hero-start-date">Starts August 27, 2026</p>
        <ContactRow />

        <ul className="hero-stats">
          {heroStats.map((stat) => (
            <HeroStat key={stat.label} {...stat} />
          ))}
        </ul>
      </div>
    </section>
  );
}
