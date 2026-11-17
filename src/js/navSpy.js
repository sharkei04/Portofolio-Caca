export function init() {
  const sections  = document.querySelectorAll('main section[id]');
  const allLinks  = document.querySelectorAll('nav a[href^="#"], #mobile-menu a[href^="#"]');

  if (!sections.length || !allLinks.length) return;

  const setActive = (id) => {
    allLinks.forEach((link) => {
      const active = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('nav-active', active);
      link.setAttribute('aria-current', active ? 'page' : 'false');
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
  );

  sections.forEach((s) => observer.observe(s));
}
