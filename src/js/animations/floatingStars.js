import { gsap } from 'gsap';

export function initFloatingStars() {
  const isMobile = window.innerWidth < 768;
  const maxStars = isMobile ? 6 : 14;
  const allStars = Array.from(document.querySelectorAll('.float-star'));
  const activeStars = allStars.slice(0, maxStars);

  const tweens = [];

  activeStars.forEach((star, i) => {
    const duration = 2.0 + (i % 3) * 0.5;
    const yDist = (i % 2 === 0 ? 1 : -1) * (14 + (i % 3) * 6);
    const rotDist = (i % 2 === 0 ? 1 : -1) * (10 + (i % 3) * 8);
    const delay = (i % 4) * 0.2;

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
