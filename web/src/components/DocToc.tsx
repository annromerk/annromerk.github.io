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
      {tocItems.map((item, i) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          data-doc-target={item.id}
          className={activeId === item.id ? 'is-active' : undefined}
          onClick={scrollTo(item.id)}
        >
          <span className="doc-toc-num">{String(i + 1).padStart(2, '0')}</span>
          {item.label}
        </a>
      ))}
    </nav>
  );
}
