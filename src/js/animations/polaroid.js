import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initPolaroid() {
  const figure = document.querySelector('#about figure');
  if (!figure) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReduced) {
    gsap.fromTo(
      figure,
      { y: -60, rotation: -4, opacity: 0 },
      {
        y: 0,
        rotation: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: figure,
          start: 'top 85%',
          once: true,
        },
      },
    );
  }

  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouch) return;

  figure.addEventListener('mouseenter', () => {
    gsap.to(figure, { rotation: 2, duration: 0.3, ease: 'power2.out' });
  });
  figure.addEventListener('mouseleave', () => {
    gsap.to(figure, { rotation: 0, duration: 0.3, ease: 'power2.out' });
  });
}
