import { ContactRow } from '@/components/ContactRow';
import { ScrollCueIcon } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSmoothScrollTo } from '@/hooks/useSmoothScrollTo';

export function Hero() {
  const scrollTo = useSmoothScrollTo();

  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="profile-banner" />
        <div className="profile-header">
          <Avatar className="profile-avatar">
            <AvatarImage src="/assets/images/profile-photo-alt.jpg" alt="Anthony Romero" />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
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
