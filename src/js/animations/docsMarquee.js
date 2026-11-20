import { gsap } from 'gsap';

function createTicker(containerId, trackId, duration = 65) {
  const container = document.getElementById(containerId);
  const track = document.getElementById(trackId);
  if (!container || !track) return null;

  const tween = gsap.to(track, {
    xPercent: -50,
    ease: 'none',
    duration,
    repeat: -1,
  });

  container.addEventListener('mouseenter', () => tween.pause());
  container.addEventListener('mouseleave', () => tween.play());

  container.addEventListener('focusin', () => tween.pause());
  container.addEventListener('focusout', () => tween.play());

  const handleVisibility = () => {
    if (document.hidden) {
      tween.pause();
    } else {
      tween.play();
    }
  };
  document.addEventListener('visibilitychange', handleVisibility);

  return tween;
}

let docsTween = null;
let certsTween = null;

export function initDocsMarquee() {
  if (docsTween) {
    docsTween.kill();
  }
  // Slower, smooth speed (duration: 60)
  docsTween = createTicker('docs-ticker-container', 'docs-preview-track', 60);
}

export function initCertsMarquee() {
  if (certsTween) {
    certsTween.kill();
  }
  // Slower, smooth speed for certificates (duration: 75)
  certsTween = createTicker('certs-ticker-container', 'certs-preview-track', 75);
}
