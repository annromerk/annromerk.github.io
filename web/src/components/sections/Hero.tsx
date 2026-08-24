import { ContactRow } from '@/components/ContactRow';
import { ScrollCueIcon } from '@/components/icons';
import { useSmoothScrollTo } from '@/hooks/useSmoothScrollTo';

export function Hero() {
  const scrollTo = useSmoothScrollTo();

  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="profile-banner" />
        <div className="profile-header">
          <img
            className="profile-avatar"
            src="/assets/images/profile-photo-alt.jpg"
            alt="Anthony Romero"
            width={104}
            height={104}
          />
          <div className="profile-headline">
            <h1>Anthony Romero</h1>
            <p className="hero-tagline">Mechatronics &amp; Robotics Apprentice Candidate</p>
          </div>
        </div>
        <ContactRow />
        <a href="#about" className="scroll-cue" aria-label="Scroll to explore" onClick={scrollTo('about')}>
          <ScrollCueIcon />
        </a>
      </div>
    </section>
  );
}
