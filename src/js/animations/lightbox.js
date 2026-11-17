import { gsap } from 'gsap';

export function animateLightboxOpen(imgEl) {
  if (!imgEl) return;
  gsap.fromTo(
    imgEl,
    { scale: 0.85, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.4)' },
  );
}

export function animateLightboxChange(imgEl, callback) {
  if (!imgEl) {
    if (callback) callback();
    return;
  }
  gsap.to(imgEl, {
    opacity: 0,
    scale: 0.95,
    duration: 0.15,
    ease: 'power2.in',
    onComplete: () => {
      if (callback) callback();
      gsap.to(imgEl, {
        opacity: 1,
        scale: 1,
        duration: 0.25,
        ease: 'power2.out',
      });
    },
  });
}
