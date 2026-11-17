import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(ScrollTrigger, Draggable);

import { initMarquee } from './marquee.js';
import { initHeroIntro } from './heroIntro.js';
import { initFloatingStars } from './floatingStars.js';
import { initScrollReveal } from './scrollReveal.js';
import { initFolderTransitions } from './folders.js';
import { initStickers } from './stickers.js';

let mm = null;

export function initAnimations() {
  if (mm) mm.revert();
  mm = gsap.matchMedia();

  // Full motion when user has no preference for reduced motion
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    initMarquee();
    initHeroIntro();
    initFloatingStars();
    initScrollReveal();
    initFolderTransitions();
    initStickers();
  });

  // Safe fallback for reduced-motion users
  mm.add('(prefers-reduced-motion: reduce)', () => {
    gsap.set('.reveal, .hero-letter, .float-star, .selection-frame, .selection-handle', {
      clearProps: 'all',
      opacity: 1,
      visibility: 'visible',
      scale: 1,
      x: 0,
      y: 0,
    });
  });

  // Refresh ScrollTrigger when web fonts and assets finish loading
  if (document.fonts) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
}
