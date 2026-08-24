import type { ComponentType } from 'react';
import { MicrosoftOfficeChipIcon, SkillsIcon } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { skillGroups } from '@/content/site';

const TAG_ICONS: Record<string, ComponentType> = {
  'Microsoft Office (Word, Excel, Outlook)': MicrosoftOfficeChipIcon,
};

export function Skills() {
  return (
    <section className="section section-alt" id="skills">
      <div className="container">
        <h2 className="section-title">
          <SkillsIcon />
          Skills
        </h2>
        <div className="skills-grid">
          {skillGroups.map((group, i) => (
            <div className="skill-group" key={group.title}>
              <span className="skill-eyebrow">{`// 0${i + 1}`}</span>
              <h3>{group.title}</h3>
              <ul className="tag-list">
                {group.tags.map((tag) => {
                  const TagIcon = TAG_ICONS[tag];
                  return (
                    <Badge
                      variant="outline"
                      render={<li />}
                      className="h-auto max-w-full items-start gap-1.5 overflow-visible px-3 py-1.5 text-[0.85rem] font-normal whitespace-normal"
                      key={tag}
                    >
                      {TagIcon && <TagIcon />}
                      {tag}
                    </Badge>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
