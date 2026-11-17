import { content } from '../data/content.js';
import { Icons } from './icons.js';

const TYPE_ICON_COLOR = {
  event:        '#F9A94B',
  organization: '#F58BBE',
  internship:   '#9CC8F0',
  competition:  '#FFD95A',
  freelance:    '#FFD95A',
};

function renderEntry(entry, index) {
  const starColor = TYPE_ICON_COLOR[entry.type] ?? '#FFD95A';
  
  let bodyContent = '';
  if (entry.description) {
    bodyContent = `<p class="text-xs md:text-sm text-[var(--color-body-green)] leading-relaxed mt-1">${entry.description}</p>`;
  } else if (entry.items && entry.items.length) {
    bodyContent = `<ul class="space-y-1 text-xs text-[var(--color-body-green)] mt-1">
      ${entry.items.map((item) => `<li class="flex gap-2 items-start"><span class="mt-1 shrink-0 text-[var(--color-pink-hot)]">›</span><span>${item}</span></li>`).join('')}
    </ul>`;
  }

  return `
    <div class="relative pl-10 reveal" data-index="${index}">
      <span class="absolute left-0 top-1 w-6 h-6 flex items-center justify-center" aria-hidden="true">
        ${Icons.star5(starColor, 'w-5 h-5')}
      </span>
      <span class="pill-yellow !text-[0.68rem] !py-0.5 !px-2.5 inline-block mb-1">${entry.year}</span>
      <h3 class="font-pixel text-sm md:text-base font-semibold text-[var(--color-year-green)] leading-snug mt-0.5">${entry.title}</h3>
      <p class="text-xs font-semibold text-[var(--color-body-green)] opacity-80 mt-0.5 mb-1">${entry.organization}</p>
      ${bodyContent}
    </div>`;
}

export function init() {
  const { experience, experienceIntro } = content;

  const introEl = document.getElementById('experience-intro');
  if (introEl && experienceIntro) {
    introEl.textContent = experienceIntro;
  }

  const timelineEl = document.getElementById('experience-timeline');
  if (!timelineEl) return;

  timelineEl.innerHTML = experience.map(renderEntry).join('');
}
