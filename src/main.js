import './styles/main.css';
import { initAnimations }         from './js/animations/index.js';
import { init as initHero }       from './js/hero.js';
import { init as initAbout }      from './js/about.js';
import { init as initExperience } from './js/experience.js';
import { init as initSkills }     from './js/skills.js';
import { init as initFolders }    from './js/folders.js';
import { init as initLightbox }   from './js/lightbox.js';
import { init as initNavSpy }     from './js/navSpy.js';
import { initMusicPlayer }        from './js/musicPlayer.js';

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
  /* Back to top is now a fixed floating button — see animations/backToTop.js */
  initAnimations();
  initMusicPlayer();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
