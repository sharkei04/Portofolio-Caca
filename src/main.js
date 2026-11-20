import './styles/main.css';
import { initAnimations }         from './js/animations/index.js';
import { init as initHero }       from './js/hero.js';
import { init as initAbout }      from './js/about.js';
import { init as initExperience } from './js/experience.js';
import { init as initSkills }     from './js/skills.js';
import { init as initFolders }    from './js/folders.js';
import { init as initLightbox }   from './js/lightbox.js';
import { init as initNavSpy }     from './js/navSpy.js';

function initNav() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', String(!open));
    menu.classList.toggle('hidden');
    btn.setAttribute('aria-expanded', String(!open));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.setAttribute('aria-expanded', 'false');
      menu.classList.add('hidden');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}

function bootstrap() {
  initNav();
  initHero();
  initAbout();
  initExperience();
  initSkills();
  initFolders();
  initLightbox();
  initNavSpy();
  document.querySelector('footer a[href="#home"]')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  initAnimations();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
