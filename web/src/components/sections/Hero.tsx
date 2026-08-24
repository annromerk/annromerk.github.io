import { m, type Variants } from 'motion/react';
import { ContactRow } from '@/components/ContactRow';
import { ScrollCueIcon } from '@/components/icons';
import { HeroStat } from '@/components/sections/HeroStat';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { heroStats } from '@/content/site';
import { useSmoothScrollTo } from '@/hooks/useSmoothScrollTo';

const bentoContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const bentoItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  const scrollTo = useSmoothScrollTo();

  return (
    <section className="hero">
      <div className="container hero-inner">
        <m.span
          className="hero-eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          SYS.01 &mdash; Operator Profile
        </m.span>

        <m.div className="hero-bento" variants={bentoContainer} initial="hidden" animate="show">
          <m.div className="hero-tile hero-profile-tile" variants={bentoItem}>
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
          </m.div>

          {heroStats.map((stat, i) => (
            <HeroStat
              key={stat.label}
              index={i + 1}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              variants={bentoItem}
            />
          ))}
        </m.div>

        <m.a
          href="#about"
          className="scroll-cue"
          aria-label="Scroll to explore"
          onClick={scrollTo('about')}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ScrollCueIcon />
        </m.a>
      </div>
    </section>
  );
}
