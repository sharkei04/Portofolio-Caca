import { gsap } from 'gsap';

export function initCardWiggle() {
  const cards = document.querySelectorAll('.card-scallop, .card-scallop-pink');
  if (!cards.length) return;

  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        rotation: gsap.utils.random(-1.5, 1.5),
        duration: 0.25,
        ease: 'power2.out',
      });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotation: 0, duration: 0.3, ease: 'power2.out' });
    });
  });
}
