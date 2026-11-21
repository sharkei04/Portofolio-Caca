import { gsap } from 'gsap';

export function initMusicPlayer() {
  const player        = document.getElementById('music-player');
  const audio         = document.getElementById('bg-music');
  const toggle        = document.getElementById('music-toggle');
  const disc          = document.getElementById('music-disc');
  const iconPlay      = document.getElementById('icon-play');
  const iconPause     = document.getElementById('icon-pause');
  const volBtn        = document.getElementById('music-volume-btn');
  const volSlider     = document.getElementById('music-volume-slider');
  const iconVolHigh   = document.getElementById('icon-vol-high');
  const iconVolMute   = document.getElementById('icon-vol-mute');

  if (!player || !audio || !toggle) return;

  /* Default comfortable background music volume (25%) */
  audio.volume = 0.25;
  let lastVolume = 0.25;

  function updateVolumeUI(val) {
    if (volSlider) volSlider.value = val;
    if (val <= 0.02) {
      iconVolHigh?.classList.add('hidden');
      iconVolMute?.classList.remove('hidden');
      volBtn?.setAttribute('aria-label', 'Unmute background music');
    } else {
      iconVolHigh?.classList.remove('hidden');
      iconVolMute?.classList.add('hidden');
      volBtn?.setAttribute('aria-label', 'Mute background music');
    }
  }

  if (volSlider) {
    volSlider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      audio.volume = val;
      if (val > 0.02) {
        lastVolume = val;
      }
      updateVolumeUI(val);
    });
  }

  if (volBtn) {
    volBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (audio.volume > 0.02) {
        lastVolume = audio.volume;
        audio.volume = 0;
        updateVolumeUI(0);
      } else {
        const restore = lastVolume > 0.02 ? lastVolume : 0.7;
        audio.volume = restore;
        updateVolumeUI(restore);
      }
    });
  }

  /* Spinning disc tween — always spinning, speed up when playing */
  let discTween = null;
  if (disc) {
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
}
