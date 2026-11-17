import { Draggable } from 'gsap/Draggable';

export function initStickers() {
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
  if (!hasFinePointer) return;

  const draggables = [];

  const homeStars = document.querySelectorAll('#home .float-star');
  if (homeStars.length) {
    const dHome = Draggable.create(homeStars, {
      bounds: '#home',
      edgeResistance: 0.65,
      type: 'x,y',
      cursor: 'grab',
      activeCursor: 'grabbing',
      inertia: false,
    });
    draggables.push(...dHome);
  }

  const aboutStars = document.querySelectorAll('#about .float-star');
  if (aboutStars.length) {
    const dAbout = Draggable.create(aboutStars, {
      bounds: '#about',
      edgeResistance: 0.65,
      type: 'x,y',
      cursor: 'grab',
      activeCursor: 'grabbing',
      inertia: false,
    });
    draggables.push(...dAbout);
  }

  return () => {
    draggables.forEach((d) => d.kill());
  };
}
