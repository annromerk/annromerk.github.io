import { RecommendationIcon } from '@/components/icons';
import { recommendation } from '@/content/site';

export function Recommendation() {
  return (
    <section className="section section-alt" id="recommendation">
      <div className="container">
        <h2 className="section-title">
          <RecommendationIcon />
          Recommendation
        </h2>
        <blockquote className="testimonial">
          <p>{recommendation.quote}</p>
          <cite>{recommendation.cite}</cite>
        </blockquote>
      </div>
    </section>
  );
}
