import { RecommendationIcon } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { recommendation } from '@/content/site';

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((word) => word[0])
    .join('');
}

export function Recommendation() {
  return (
    <section className="section section-alt" id="recommendation">
      <div className="container">
        <h2 className="section-title">
          <RecommendationIcon />
          Recommendation
        </h2>
        <Card className="testimonial-card">
          <CardContent className="testimonial-quote">
            <p>{recommendation.quote}</p>
          </CardContent>
          <CardFooter className="testimonial-footer">
            <Avatar className="testimonial-avatar">
              <AvatarImage src={recommendation.avatarSrc} alt={recommendation.name} />
              <AvatarFallback className="bg-[var(--accent-soft)] text-[var(--accent-dark)] font-bold">
                {initials(recommendation.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="testimonial-name">{recommendation.name}</CardTitle>
              <CardDescription className="testimonial-role">{recommendation.role}</CardDescription>
              <CardDescription className="testimonial-context">{recommendation.context}</CardDescription>
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
