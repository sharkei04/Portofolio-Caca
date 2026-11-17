import { gsap } from 'gsap';

export function animateFilterTransition(container, renderCallback) {
  if (!container || !renderCallback) {
    if (renderCallback) renderCallback();
    return;
  }

  const currentHeight = container.offsetHeight;
  container.style.minHeight = `${currentHeight}px`;

  const oldItems = container.querySelectorAll('.reveal');
  if (!oldItems.length) {
    renderCallback();
    container.style.minHeight = '';
    return;
  }

  const ctx = gsap.context(() => {
    gsap.to(oldItems, {
      opacity: 0,
      y: -8,
      duration: 0.18,
      stagger: 0.02,
      ease: 'power2.in',
      onComplete: () => {
        renderCallback();

        const newItems = container.querySelectorAll('.reveal');
        gsap.fromTo(
          newItems,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.32,
            stagger: 0.04,
            ease: 'power2.out',
            onComplete: () => {
              container.style.minHeight = '';
            },
          },
        );
      },
    });
  }, container);

  return () => ctx.revert();
}
