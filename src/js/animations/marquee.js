import { gsap } from 'gsap';

export function initMarquee() {
  const strip = document.getElementById('marquee-strip');
  const track = strip?.querySelector('.marquee-track');
  if (!strip || !track) return;

  if (!track.dataset.duplicated) {
    track.innerHTML += track.innerHTML;
    track.dataset.duplicated = 'true';
  }

  const tween = gsap.to(track, {
    xPercent: -50,
    ease: 'none',
    duration: 18,
    repeat: -1,
  });

  strip.addEventListener('mouseenter', () => tween.pause());
  strip.addEventListener('mouseleave', () => tween.play());

  const handleVisibility = () => {
    if (document.hidden) {
      tween.pause();
    } else {
      tween.play();
    }
  };

  document.addEventListener('visibilitychange', handleVisibility);

  return () => {
    tween.kill();
    document.removeEventListener('visibilitychange', handleVisibility);
  };
}
