import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initMarquee() {
  const strip = document.getElementById('marquee-strip');
  const track = strip?.querySelector('.marquee-track');
  if (!strip || !track) return;

  if (!track.dataset.duplicated) {
    track.innerHTML += track.innerHTML;
    track.dataset.duplicated = 'true';
  }

  const baseDuration = 18;
  const tween = gsap.to(track, {
    xPercent: -50,
    ease: 'none',
    duration: baseDuration,
    repeat: -1,
  });

  strip.addEventListener('mouseenter', () => tween.pause());
  strip.addEventListener('mouseleave', () => tween.play());

  const handleVisibility = () => {
    if (document.hidden) tween.pause();
    else tween.play();
  };
  document.addEventListener('visibilitychange', handleVisibility);

  ScrollTrigger.create({
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      const vel = Math.abs(self.getVelocity());
      const boost = gsap.utils.clamp(1, 3, 1 + vel / 2000);
      gsap.to(tween, { timeScale: boost, duration: 0.4, ease: 'power2.out', overwrite: true });
    },
  });

  return () => {
    tween.kill();
    document.removeEventListener('visibilitychange', handleVisibility);
  };
}
