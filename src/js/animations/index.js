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
  if (mm) {
    try { mm.revert(); } catch (_) {}
  }
  mm = gsap.matchMedia();

  // Primary animation activation
  initMarquee();
  initHeroIntro();
  initFloatingStars();
  initScrollReveal();
  initFolderTransitions();
  initStickers();

  // ScrollTrigger refresh on fonts ready and window load
  if (document.fonts) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
  if (document.readyState === 'complete') {
    ScrollTrigger.refresh();
  } else {
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  }
}
