import { gsap } from 'gsap';

export function initEqualizer() {
  const player = document.getElementById('music-player');
  const audio = document.getElementById('bg-music');
  const titleWrap = player?.querySelector('#music-info .flex');
  if (!player || !audio || !titleWrap) return;

  const noteEl = titleWrap.querySelector('.music-note');
  if (noteEl) noteEl.remove();

  const eq = document.createElement('span');
  eq.className = 'eq-bars';
  eq.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 4; i++) {
    const bar = document.createElement('span');
    bar.className = 'eq-bar';
    eq.appendChild(bar);
  }

  titleWrap.prepend(eq);

  const bars = eq.querySelectorAll('.eq-bar');
  const tweens = [];

  bars.forEach((bar, i) => {
    const t = gsap.to(bar, {
      scaleY: gsap.utils.random(0.3, 1),
      duration: gsap.utils.random(0.3, 0.5),
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: i * 0.08,
      paused: true,
    });
    tweens.push(t);
  });

  function sync() {
    const playing = !audio.paused;
    tweens.forEach((t) => {
      if (playing) t.play();
      else t.pause();
    });
    eq.classList.toggle('eq-paused', !playing);
  }

  audio.addEventListener('play', sync);
  audio.addEventListener('pause', sync);
  audio.addEventListener('ended', sync);
  sync();
}
