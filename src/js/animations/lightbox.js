import { gsap } from 'gsap';

export function animateLightboxOpen(imgEl) {
  if (!imgEl) return;
  gsap.fromTo(
    imgEl,
    { scale: 0.85, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.4)' },
  );
}

export function animateLightboxChange(imgEl, callback, direction = 1) {
  if (!imgEl) {
    if (callback) callback();
    return;
  }
  gsap.to(imgEl, {
    opacity: 0,
    x: direction * -60,
    duration: 0.2,
    ease: 'power2.in',
    onComplete: () => {
      if (callback) callback();
      gsap.fromTo(
        imgEl,
        { opacity: 0, x: direction * 60 },
        { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' },
      );
    },
  });
}
