import { gsap } from 'gsap';

export function initStarCursor() {
  const hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!hasMouse) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const cursor = document.createElement('div');
  cursor.className = 'custom-star-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.innerHTML = `<svg viewBox="0 0 100 100" width="18" height="18">
    <polygon points="50,4 60,40 96,50 60,60 50,96 40,60 4,50 40,40" fill="#F0508F"/>
  </svg>`;
  document.body.appendChild(cursor);

  const TRAIL_COUNT = 6;
  const trails = [];
  for (let i = 0; i < TRAIL_COUNT; i++) {
    const dot = document.createElement('div');
    dot.className = 'star-trail-dot';
    dot.setAttribute('aria-hidden', 'true');
    document.body.appendChild(dot);
    trails.push(dot);
  }

  let mouseX = -100;
  let mouseY = -100;

  const positions = Array.from({ length: TRAIL_COUNT }, () => ({ x: -100, y: -100 }));

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  gsap.ticker.add(() => {
    gsap.set(cursor, { x: mouseX - 9, y: mouseY - 9 });

    let prevX = mouseX;
    let prevY = mouseY;

    for (let i = 0; i < TRAIL_COUNT; i++) {
      positions[i].x += (prevX - positions[i].x) * 0.3;
      positions[i].y += (prevY - positions[i].y) * 0.3;

      const opacity = 0.4 - i * (0.4 / TRAIL_COUNT);
      const scale = 1 - i * (0.7 / TRAIL_COUNT);

      gsap.set(trails[i], {
        x: positions[i].x - 4,
        y: positions[i].y - 4,
        opacity,
        scale,
      });

      prevX = positions[i].x;
      prevY = positions[i].y;
    }
  });
}
