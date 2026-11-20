import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initNavPill() {
  const nav = document.querySelector('header nav[aria-label="Main navigation"] ul');
  if (!nav) return;

  const links = nav.querySelectorAll('a[href^="#"]');
  if (!links.length) return;

  const pill = document.createElement('span');
  pill.className = 'nav-pill-indicator';
  pill.setAttribute('aria-hidden', 'true');
  nav.style.position = 'relative';
  nav.appendChild(pill);

  function movePill(link) {
    const rect = link.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();

    gsap.to(pill, {
      x: rect.left - navRect.left - 8,
      width: rect.width + 16,
      opacity: 1,
      duration: 0.35,
      ease: 'power3.out',
    });
  }

  const sections = document.querySelectorAll('main section[id]');
  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 35%',
      end: 'bottom 35%',
      onEnter: () => {
        const link = nav.querySelector(`a[href="#${section.id}"]`);
        if (link) movePill(link);
      },
      onEnterBack: () => {
        const link = nav.querySelector(`a[href="#${section.id}"]`);
        if (link) movePill(link);
      },
    });
  });

  links.forEach((link) => {
    link.addEventListener('click', () => movePill(link));
  });

  window.addEventListener('resize', () => {
    const active = nav.querySelector('a.nav-active') || links[0];
    if (active) movePill(active);
  });

  const firstActive = nav.querySelector('.nav-active') || links[0];
  if (firstActive) {
    requestAnimationFrame(() => movePill(firstActive));
  }
}
