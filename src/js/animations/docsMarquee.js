import { gsap } from 'gsap';

let tween = null;

export function initDocsMarquee() {
  const container = document.getElementById('docs-ticker-container');
  const track = document.getElementById('docs-preview-track');
  if (!container || !track) return;

  if (tween) {
    tween.kill();
  }

  tween = gsap.to(track, {
    xPercent: -50,
    ease: 'none',
    duration: 25,
    repeat: -1,
  });

  container.addEventListener('mouseenter', () => tween?.pause());
  container.addEventListener('mouseleave', () => tween?.play());

  container.addEventListener('focusin', () => tween?.pause());
  container.addEventListener('focusout', () => tween?.play());

  const handleVisibility = () => {
    if (document.hidden) {
      tween?.pause();
    } else {
      tween?.play();
    }
  };
  document.addEventListener('visibilitychange', handleVisibility);

  return () => {
    tween?.kill();
    document.removeEventListener('visibilitychange', handleVisibility);
  };
}
