import { gsap } from 'gsap';

export function animateFolderClick(btn, onComplete) {
  const frontFlap = btn.querySelector('.folder-wrap svg path:nth-child(2)');
  const peek = btn.querySelector('.folder-peek');

  const tl = gsap.timeline({
    onComplete: () => {
      if (onComplete) onComplete();
      gsap.delayedCall(0.35, () => {
        gsap.set([frontFlap, peek], { clearProps: 'all' });
      });
    },
  });

  if (frontFlap) {
    tl.to(frontFlap, {
      scaleY: 0.15,
      transformOrigin: 'bottom center',
      duration: 0.22,
      ease: 'power2.in',
    }, 0);
  }

  if (peek) {
    tl.fromTo(
      peek,
      { y: 0, opacity: 1, scale: 0.85, rotation: -4 },
      {
        y: -44,
        rotation: 12,
        scale: 1.15,
        opacity: 1,
        duration: 0.32,
        ease: 'back.out(1.8)',
      },
      0.04,
    );
  } else {
    tl.to(btn, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 }, 0);
  }

  return tl;
}

export function animateDialogOpen(dialog, openerEl) {
  const contentBox = dialog.querySelector('.bg-white');
  const items = dialog.querySelectorAll('#folder-dialog-body > div > *');

  if (!contentBox) return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.fromTo(
    dialog,
    { opacity: 0 },
    { opacity: 1, duration: 0.25 },
    0,
  );

  tl.fromTo(
    contentBox,
    { scale: 0.88, opacity: 0, y: 20 },
    { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.5)' },
    0.05,
  );

  if (items.length) {
    tl.fromTo(
      items,
      { opacity: 0, y: 20, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.35, stagger: 0.06, ease: 'power2.out' },
      0.15,
    );
  }

  return tl;
}

export function animateDialogClose(dialog, onComplete) {
  const contentBox = dialog.querySelector('.bg-white');
  if (!contentBox) {
    if (onComplete) onComplete();
    return;
  }

  gsap.to(contentBox, {
    scale: 0.92,
    opacity: 0,
    y: 15,
    duration: 0.2,
    ease: 'power2.in',
    onComplete: () => {
      gsap.to(dialog, {
        opacity: 0,
        duration: 0.1,
        onComplete,
      });
    },
  });
}

export function initFolderTransitions() {
  const folderBtns = document.querySelectorAll('.folder-btn');

  folderBtns.forEach((btn) => {
    const svgPaths = btn.querySelectorAll('svg path');
    const flap = svgPaths[1];

    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, { y: -6, duration: 0.25, ease: 'power2.out' });
      if (flap) {
        gsap.to(flap, { scaleY: 0.85, transformOrigin: 'bottom center', duration: 0.25 });
      }
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { y: 0, duration: 0.25, ease: 'power2.out' });
      if (flap) {
        gsap.to(flap, { scaleY: 1, duration: 0.25 });
      }
    });

    btn.addEventListener('focus', () => {
      gsap.to(btn, { y: -4, duration: 0.2, ease: 'power2.out' });
    });

    btn.addEventListener('blur', () => {
      gsap.to(btn, { y: 0, duration: 0.2, ease: 'power2.out' });
    });
  });
}
