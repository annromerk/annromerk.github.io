import { SkillsIcon } from '@/components/icons';
import { skillGroups } from '@/content/site';

export function Skills() {
  return (
    <section className="section section-alt" id="skills">
      <div className="container">
        <h2 className="section-title">
          <SkillsIcon />
          Skills
        </h2>
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <div className="skill-group" key={group.title}>
              <h3>{group.title}</h3>
              <ul className="tag-list">
                {group.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
