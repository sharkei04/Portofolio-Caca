import { gsap } from 'gsap';

export function initParallax() {
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouch) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const hero = document.getElementById('home');
  if (!hero) return;

  const layers = [
    { sel: '.float-star', depth: 0.03 },
    { sel: '#hero-bg-star', depth: 0.015 },
    { sel: '#hero-cursor', depth: 0.04 },
    { sel: '#hero-crosshair', depth: 0.025 },
  ];

  const targets = [];
  layers.forEach(({ sel, depth }) => {
    hero.querySelectorAll(sel).forEach((el) => {
      targets.push({ el, depth });
    });
  });

  if (!targets.length) return;

  let cx = window.innerWidth / 2;
  let cy = window.innerHeight / 2;

  const onMove = (e) => {
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    targets.forEach(({ el, depth }) => {
      gsap.to(el, {
        x: dx * depth * -100,
        y: dy * depth * -100,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    });
  };

  const onResize = () => {
    cx = window.innerWidth / 2;
    cy = window.innerHeight / 2;
  };

  hero.addEventListener('mousemove', onMove);
  window.addEventListener('resize', onResize);

  return () => {
    hero.removeEventListener('mousemove', onMove);
    window.removeEventListener('resize', onResize);
  };
}
