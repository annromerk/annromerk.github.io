// EXPERIMENTAL — document-mode reading progress + table-of-contents scrollspy.
// Isolated: remove the <script> tag and this file to fully revert.

(function () {
  const progressBar = document.getElementById('doc-progress-bar');
  const tocLinks = document.querySelectorAll('.doc-toc a[data-doc-target]');
  if (!progressBar && tocLinks.length === 0) return;

  // Reading progress bar
  if (progressBar) {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      progressBar.style.width = pct + '%';
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
  }

  // Scrollspy: highlight the current section in the TOC
  if (tocLinks.length > 0 && 'IntersectionObserver' in window) {
    const sections = Array.from(tocLinks)
      .map((link) => document.getElementById(link.dataset.docTarget))
      .filter(Boolean);

    const setActive = (id) => {
      tocLinks.forEach((link) => {
        link.classList.toggle('is-active', link.dataset.docTarget === id);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  // In-page section links (TOC + hero scroll cue) scroll smoothly without
  // ever writing a #hash into the address bar, so reloading or sharing the
  // plain URL always lands on the hero, not mid-page.
  const inPageLinks = document.querySelectorAll('.doc-toc a[data-doc-target], .scroll-cue');
  inPageLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.dataset.docTarget || link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
