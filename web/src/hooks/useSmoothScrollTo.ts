import { useCallback } from 'react';

// Ports the hash-free smooth-scroll click handling from
// js/experiment-document.js — scrolling to an in-page section must never
// write a #hash into the URL (a stale hash previously caused reloads to
// skip the hero).
export function useSmoothScrollTo() {
  return useCallback((id: string) => (e: React.MouseEvent) => {
    const target = document.getElementById(id);
    if (!target || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' });
  }, []);
}
