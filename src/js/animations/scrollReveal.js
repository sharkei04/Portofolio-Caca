import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initScrollReveal() {
  const triggers = [];

  // 1. Experience timeline items + popping star markers
  const expArticles = gsap.utils.toArray('#experience-timeline article.reveal');
  expArticles.forEach((article) => {
    const marker = article.querySelector('span[aria-hidden="true"]');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: article,
        start: 'top 85%',
        once: true,
      },
    });

    tl.fromTo(
      article,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      0,
    );

    if (marker) {
      tl.fromTo(
        marker,
        { scale: 0, rotation: -35 },
        { scale: 1, rotation: 0, duration: 0.45, ease: 'back.out(2.2)' },
        0.1,
      );
    }

    if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
  });

  // 2. Other .reveal elements across sections (excluding experience timeline articles)
  const generalReveals = gsap.utils
    .toArray('main section:not(#home) .reveal')
    .filter((el) => !el.closest('#experience-timeline'));

  generalReveals.forEach((el) => {
    const anim = gsap.fromTo(
      el,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      },
    );
    if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
  });

  // 3. Section headings & card tops (scale from 0.9 with pill sliding in)
  const cards = gsap.utils.toArray('main .card-scallop, main .card-scallop-pink');
  cards.forEach((card) => {
    const heading = card.querySelector('h2');
    const pill = card.querySelector('.pill-pink');

    if (heading || pill) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          once: true,
        },
      });

      if (pill) {
        tl.fromTo(
          pill,
          { opacity: 0, x: -25, scale: 0.9 },
          { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: 'back.out(1.5)' },
          0,
        );
      }

      if (heading) {
        tl.fromTo(
          heading,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.55, ease: 'power2.out' },
          0.1,
        );
      }

      if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
    }
  });

  // 4. Experience timeline track vertical line drawing down with scrub
  const timelineTrack = document.querySelector('.timeline-track');
  const experienceSection = document.getElementById('experience-timeline');

  if (timelineTrack && experienceSection) {
    const trackAnim = gsap.fromTo(
      timelineTrack,
      { scaleY: 0, transformOrigin: 'top center' },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: experienceSection,
          start: 'top 80%',
          end: 'bottom 85%',
          scrub: 0.6,
        },
      },
    );
    if (trackAnim.scrollTrigger) triggers.push(trackAnim.scrollTrigger);
  }

  // 5. Batch reveal for gallery grids (docs & certs previews)
  ScrollTrigger.batch('.doc-preview-item, .cert-preview-item', {
    start: 'top 90%',
    once: true,
    onEnter: (batch) => {
      gsap.fromTo(
        batch,
        { opacity: 0, y: 24, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.08,
          duration: 0.5,
          ease: 'power2.out',
        },
      );
    },
  });

  return () => {
    triggers.forEach((st) => st.kill());
  };
}
