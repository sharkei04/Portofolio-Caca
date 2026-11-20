import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(ScrollTrigger, Flip, Draggable);

import { initMarquee } from './marquee.js';
import { initHeroIntro } from './heroIntro.js';
import { initFloatingStars } from './floatingStars.js';
import { initScrollReveal } from './scrollReveal.js';
import { initFolderTransitions } from './folders.js';
import { initStickers } from './stickers.js';
import { initParallax } from './parallax.js';
import { initPolaroid } from './polaroid.js';
import { initBackToTop } from './backToTop.js';
import { initNavPill } from './navPill.js';
import { initCardWiggle } from './cardWiggle.js';
import { initStarCursor } from './starCursor.js';
import { initEqualizer } from './equalizer.js';

export function initAnimations() {
  initMarquee();
  initHeroIntro();
  initFloatingStars();
  initScrollReveal();
  initFolderTransitions();
  initStickers();
  initParallax();
  initPolaroid();
  initBackToTop();
  initNavPill();
  initCardWiggle();
  initStarCursor();
  initEqualizer();

  if (document.fonts) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
  if (document.readyState === 'complete') {
    ScrollTrigger.refresh();
  } else {
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  }
}
