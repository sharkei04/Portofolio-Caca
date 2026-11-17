import './styles/main.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(ScrollTrigger, Draggable);

import { init as initHero }       from './js/hero.js';
import { init as initAbout }      from './js/about.js';
import { init as initExperience } from './js/experience.js';
import { init as initMarquee }    from './js/marquee.js';
import { init as initFolders }    from './js/folders.js';

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

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initHero();
  initAbout();
  initExperience();
  initMarquee();
  initFolders();
});
