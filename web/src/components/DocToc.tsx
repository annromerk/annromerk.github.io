import { tocItems } from '@/content/site';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useSmoothScrollTo } from '@/hooks/useSmoothScrollTo';

const ids = tocItems.map((item) => item.id);

export function DocToc() {
  const activeId = useScrollSpy(ids);
  const scrollTo = useSmoothScrollTo();

  return (
    <nav className="doc-toc" aria-label="Table of contents">
      <span className="doc-toc-eyebrow">Contents</span>
      {tocItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          data-doc-target={item.id}
          className={activeId === item.id ? 'is-active' : undefined}
          aria-current={activeId === item.id ? 'location' : undefined}
          onClick={scrollTo(item.id)}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
