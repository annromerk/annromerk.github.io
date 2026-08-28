import { RecommendationIcon } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { recommendations } from '@/content/site';

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
          Recommendations
        </h2>
        <div className="testimonial-stack">
          {recommendations.map((rec) => (
            <Card className="testimonial-card" key={rec.name}>
              <CardContent className="testimonial-quote">
                <p>{rec.quote}</p>
              </CardContent>
              <CardFooter className="testimonial-footer">
                <Avatar className="testimonial-avatar">
                  {rec.avatarSrc && <AvatarImage src={rec.avatarSrc} alt={rec.name} />}
                  <AvatarFallback className="bg-[var(--accent-soft)] text-[var(--accent-dark)] font-bold">
                    {initials(rec.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="testimonial-name">{rec.name}</CardTitle>
                  <CardDescription className="testimonial-role">{rec.role}</CardDescription>
                  <CardDescription className="testimonial-context">{rec.context}</CardDescription>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
