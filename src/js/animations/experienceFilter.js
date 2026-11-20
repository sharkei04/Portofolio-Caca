import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';

export function animateFilterTransition(container, renderCallback) {
  if (!container || !renderCallback) {
    if (renderCallback) renderCallback();
    return;
  }

  const oldItems = container.querySelectorAll('.reveal');
  if (!oldItems.length) {
    renderCallback();
    return;
  }

  const state = Flip.getState(oldItems);

  renderCallback();

  const newItems = container.querySelectorAll('.reveal');

  Flip.from(state, {
    targets: newItems,
    duration: 0.6,
    ease: 'power3.out',
    stagger: 0.04,
    absolute: true,
    fade: true,
    onEnter: (elements) =>
      gsap.fromTo(elements, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.04 }),
    onLeave: (elements) =>
      gsap.to(elements, { opacity: 0, y: -10, duration: 0.3 }),
  });
}
