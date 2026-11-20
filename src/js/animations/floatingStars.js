import { gsap } from 'gsap';

export function initFloatingStars() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return () => {};

  const isMobile = window.innerWidth < 768;
  const maxStars = isMobile ? 6 : 14;
  const allStars = Array.from(document.querySelectorAll('.float-star'));
  const activeStars = allStars.slice(0, maxStars);

  const tweens = [];

  activeStars.forEach((star, i) => {
    const duration = 2.4 + (i % 3) * 0.6;
    const yDist = (i % 2 === 0 ? 1 : -1) * (12 + (i % 3) * 5);
    const rotDist = (i % 2 === 0 ? 1 : -1) * (8 + (i % 3) * 6);
    const delay = Math.random() * 1.5;

    const t = gsap.to(star, {
      y: yDist,
      rotation: rotDist,
      duration,
      delay,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
    tweens.push(t);

    const wobble = () => {
      gsap.to(star, {
        scale: 1.3,
        rotation: '+=25',
        duration: 0.25,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      });
    };

    star.addEventListener('mouseenter', wobble);
    star.addEventListener('touchstart', wobble, { passive: true });
  });

  return () => {
    tweens.forEach((t) => t.kill());
  };
}
