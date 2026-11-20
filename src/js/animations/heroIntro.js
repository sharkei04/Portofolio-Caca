import { gsap } from 'gsap';

export function initHeroIntro() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    gsap.set('.selection-frame, .selection-handle, .hero-letter, #hero-name, #hero-year, #hero-role, #hero-tagline, #hero-crosshair, #hero-cursor', {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotation: 0,
    });
    return;
  }

  const bgStar = document.getElementById('hero-bg-star');
  const frame = document.querySelector('.selection-frame');
  const handles = document.querySelectorAll('.selection-handle');
  const letters = document.querySelectorAll('.hero-letter');
  const nameEl = document.getElementById('hero-name');
  const yearPill = document.getElementById('hero-year');
  const rolePill = document.getElementById('hero-role');
  const tagline = document.getElementById('hero-tagline');
  const crosshair = document.getElementById('hero-crosshair');
  const cursor = document.getElementById('hero-cursor');

  if (!frame || !letters.length) return;

  const tl = gsap.timeline({ defaults: { ease: 'power2.out' }, delay: 0.1 });

  if (bgStar) {
    tl.fromTo(
      bgStar,
      { scale: 0.65, rotation: -20, opacity: 0, transformOrigin: 'center center' },
      { scale: 1, rotation: 0, opacity: 0.75, duration: 1.1, ease: 'power2.out' },
      0,
    );
  }

  tl.fromTo(
    frame,
    { scale: 0.9, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.55, ease: 'back.out(1.4)' },
    0.2,
  );

  if (handles.length) {
    tl.fromTo(
      handles,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.25, stagger: 0.05, ease: 'back.out(2)' },
      0.4,
    );
  }

  if (nameEl) {
    tl.fromTo(
      nameEl,
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, duration: 0.35 },
      0.45,
    );
  }

  tl.fromTo(
    letters,
    { y: 35, opacity: 0, scale: 0.75, rotation: (i) => (i % 2 === 0 ? -8 : 8) },
    { y: 0, opacity: 1, scale: 1, rotation: 0, duration: 0.55, stagger: 0.045, ease: 'back.out(1.8)' },
    0.5,
  );

  if (yearPill) {
    tl.fromTo(
      yearPill,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(2)' },
      0.9,
    );
  }

  if (rolePill) {
    tl.fromTo(
      rolePill,
      { scale: 0.8, y: 15, opacity: 0 },
      { scale: 1, y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.6)' },
      1.0,
    );
  }

  if (tagline) {
    tl.fromTo(
      tagline,
      { opacity: 0, y: 8 },
      { opacity: 0.9, y: 0, duration: 0.35 },
      1.15,
    );
  }

  if (crosshair) {
    tl.fromTo(
      crosshair,
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.35 },
      1.1,
    );
  }

  if (cursor) {
    tl.fromTo(
      cursor,
      { x: 25, y: -20, opacity: 0 },
      { x: 0, y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' },
      1.2,
    );
  }

  return tl;
}
