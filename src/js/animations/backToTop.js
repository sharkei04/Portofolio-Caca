import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initBackToTop() {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Back to top');
  btn.className = 'back-to-top-btn';
  btn.innerHTML = `<svg viewBox="0 0 100 100" width="22" height="22" aria-hidden="true">
    <polygon points="50,5 60.6,35.4 92.8,36.1 67.1,55.6 76.4,86.4 50,68 23.6,86.4 32.9,55.6 7.2,36.1 39.4,35.4" fill="currentColor"/>
  </svg>
  <span class="btt-arrow">↑</span>`;

  document.body.appendChild(btn);

  gsap.set(btn, { scale: 0, opacity: 0 });

  let visible = false;

  ScrollTrigger.create({
    trigger: '#home',
    start: 'bottom top',
    onEnter: () => {
      if (visible) return;
      visible = true;
      gsap.to(btn, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' });
    },
    onLeaveBack: () => {
      if (!visible) return;
      visible = false;
      gsap.to(btn, { scale: 0, opacity: 0, duration: 0.3, ease: 'power2.in' });
    },
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
