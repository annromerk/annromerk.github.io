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
})();
