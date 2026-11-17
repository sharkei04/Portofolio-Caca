import { gsap } from 'gsap';

export function initMarquee() {
  const strip = document.getElementById('marquee-strip');
  const track = strip?.querySelector('.marquee-track');
  if (!strip || !track) return;

  // Clone children to ensure seamless continuous loop
  const content = track.innerHTML;
  track.innerHTML = content + content;

  const tween = gsap.to(track, {
    xPercent: -50,
    ease: 'none',
    duration: 24,
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
