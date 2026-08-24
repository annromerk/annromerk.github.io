import { RichText } from '@/components/RichText';
import { AmazonBadgeIcon, ExperienceIcon } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { timeline, type TimelineItem } from '@/content/site';

function OrgBadge({ badge, org }: { badge: TimelineItem['badge']; org: string }) {
  if (badge.kind === 'amazon') {
    return (
      <div className="org-badge org-badge--icon" title="Amazon">
        <AmazonBadgeIcon />
      </div>
    );
  }
  if (badge.kind === 'image') {
    return (
      <div className="org-badge org-badge--icon" title={org}>
        <img src={badge.src} alt={badge.alt} width={200} height={200} loading="lazy" />
      </div>
    );
  }
  return <div className="org-badge">{badge.text}</div>;
}

export function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <h2 className="section-title">
          <ExperienceIcon />
          Experience
        </h2>
        <ol className="timeline">
          {timeline.map((item) => (
            <li className="timeline-item" key={item.org + item.date}>
              <div className="timeline-when">
                <span className="timeline-date">{item.date}</span>
                {item.date.endsWith('Present') && (
                  <Badge variant="default" className="ml-2 h-auto px-2 py-0.5 text-[0.68rem] font-mono uppercase tracking-wider">
                    Current
                  </Badge>
                )}
              </div>
              <div className="timeline-body">
                <div className="timeline-heading">
                  <OrgBadge badge={item.badge} org={item.org} />
                  <div>
                    <h3>
                      {item.title} {item.titleDim && <span className="dim">{item.titleDim}</span>}
                    </h3>
                    <p className="timeline-org">{item.org}</p>
                  </div>
                </div>
                <ul>
                  {item.bullets.map((b) => (
                    <li key={b.slice(0, 24)}>
                      <RichText text={b} />
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
