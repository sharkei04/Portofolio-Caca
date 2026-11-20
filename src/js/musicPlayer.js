import { gsap } from 'gsap';

export function initMusicPlayer() {
  const player  = document.getElementById('music-player');
  const audio   = document.getElementById('bg-music');
  const toggle  = document.getElementById('music-toggle');
  const title   = document.getElementById('music-title');
  const disc    = document.getElementById('music-disc');
  const iconPlay  = document.getElementById('icon-play');
  const iconPause = document.getElementById('icon-pause');

  if (!player || !audio || !toggle) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Spinning disc tween — always spinning, speed up when playing */
  let discTween = null;
  if (!prefersReduced && disc) {
    discTween = gsap.to(disc, {
      rotation: 360,
      duration: 6,
      repeat: -1,
      ease: 'none',
      transformOrigin: '50% 50%',
    });
  }

  /* Entrance animation for the whole player */
  gsap.fromTo(
    player,
    { y: 80, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.4)', delay: 1.2 }
  );

  function setPlaying(playing) {
    if (playing) {
      iconPlay?.classList.add('hidden');
      iconPause?.classList.remove('hidden');
      toggle.setAttribute('aria-label', 'Pause background music');
      toggle.setAttribute('aria-pressed', 'true');
      player.classList.add('is-playing');
      /* Speed up disc when playing */
      if (discTween) gsap.to(discTween, { timeScale: 2.5, duration: 0.6, ease: 'power2.inOut' });
    } else {
      iconPlay?.classList.remove('hidden');
      iconPause?.classList.add('hidden');
      toggle.setAttribute('aria-label', 'Play background music');
      toggle.setAttribute('aria-pressed', 'false');
      player.classList.remove('is-playing');
      /* Slow down disc when paused */
      if (discTween) gsap.to(discTween, { timeScale: 0.3, duration: 0.8, ease: 'power2.inOut' });
    }
  }

  toggle.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setPlaying(false);
    }
  });

  audio.addEventListener('play',  () => setPlaying(true));
  audio.addEventListener('pause', () => setPlaying(false));
  audio.addEventListener('ended', () => setPlaying(false));

  /* Update song title from metadata if available */
  audio.addEventListener('loadedmetadata', () => {
    if (title && audio.title) title.textContent = audio.title;
  });
}
