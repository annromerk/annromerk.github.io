import { ContactRow } from '@/components/ContactRow';
import { ScrollCueIcon } from '@/components/icons';
import { HeroStat } from '@/components/sections/HeroStat';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { heroStats } from '@/content/site';
import { useSmoothScrollTo } from '@/hooks/useSmoothScrollTo';

export function Hero() {
  const scrollTo = useSmoothScrollTo();

  return (
    <section className="hero">
      <div className="container hero-inner">
        <span className="hero-eyebrow">SYS.01 &mdash; Operator Profile</span>

        <div className="hero-bento">
          <div className="hero-tile hero-profile-tile">
            <div className="hero-identity">
              <Avatar className="hero-avatar">
                <AvatarImage src="/assets/images/profile-photo-alt.jpg" alt="Anthony Romero" />
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
              <div>
                <h1>Anthony Romero</h1>
                <p className="hero-tagline">Mechatronics &amp; Robotics Apprentice Candidate</p>
              </div>
            </div>
            <ContactRow />
          </div>

          {heroStats.map((stat, i) => (
            <HeroStat key={stat.label} index={i + 1} value={stat.value} suffix={stat.suffix} label={stat.label} />
          ))}
        </div>

        <a href="#about" className="scroll-cue" aria-label="Scroll to explore" onClick={scrollTo('about')}>
          <ScrollCueIcon />
        </a>
      </div>
    </section>
  );
}
