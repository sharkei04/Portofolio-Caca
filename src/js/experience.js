import { content } from '../data/content.js';
import { Icons } from './icons.js';

let activeFilter = 'all';
let isExpanded = false;

function getStarColor(tags = []) {
  if (tags.includes('organization') && tags.includes('event')) return '#F9A94B';
  if (tags.includes('organization')) return '#F58BBE';
  if (tags.includes('event')) return '#9CC8F0';
  return '#FFD95A';
}

function renderEntry(entry, index) {
  const starColor = getStarColor(entry.tags);

  let rolesHtml = '';
  if (entry.roles && entry.roles.length) {
    rolesHtml = `
      <ul class="mt-2 space-y-1 text-xs text-[var(--color-body-green)]" aria-label="Roles">
        ${entry.roles
          .map(
            (role) => `
          <li class="flex gap-2 items-start">
            <span class="mt-0.5 shrink-0 text-[var(--color-pink-hot)] font-bold" aria-hidden="true">›</span>
            <span>${role}</span>
          </li>`,
          )
          .join('')}
      </ul>`;
  }

  let descHtml = '';
  if (entry.description) {
    descHtml = `<p class="text-xs md:text-sm text-[var(--color-body-green)] leading-relaxed mt-2 italic opacity-90">${entry.description}</p>`;
  }

  return `
    <article class="relative pl-10 reveal" data-index="${index}" id="${entry.id}">
      <span class="absolute left-0 top-1 w-6 h-6 flex items-center justify-center" aria-hidden="true">
        ${Icons.star5(starColor, 'w-5 h-5')}
      </span>
      <span class="pill-yellow !text-[0.68rem] !py-0.5 !px-2.5 font-bold inline-block mb-1">${entry.period}</span>
      <h3 class="font-pixel text-sm md:text-base font-semibold text-[var(--color-year-green)] leading-snug mt-0.5">${entry.title}</h3>
      <p class="text-xs font-semibold text-[var(--color-magenta)] mt-0.5">${entry.org}</p>
      ${rolesHtml}
      ${descHtml}
    </article>`;
}

function getFilteredList() {
  return content.experience.filter((entry) => {
    if (activeFilter === 'all') return true;
    return entry.tags && entry.tags.includes(activeFilter);
  });
}

function updateTimeline() {
  const timelineEl = document.getElementById('experience-timeline');
  const toggleBtn = document.getElementById('experience-toggle-btn');
  const liveStatus = document.getElementById('experience-live-status');
  if (!timelineEl) return;

  const filtered = getFilteredList();
  const visible = isExpanded ? filtered : filtered.slice(0, 5);

  timelineEl.innerHTML = visible.map(renderEntry).join('');

  if (toggleBtn) {
    if (filtered.length <= 5) {
      toggleBtn.classList.add('hidden');
    } else {
      toggleBtn.classList.remove('hidden');
      if (isExpanded) {
        toggleBtn.textContent = 'Show less \u2191';
        toggleBtn.setAttribute('aria-expanded', 'true');
      } else {
        const remaining = filtered.length - 5;
        toggleBtn.textContent = `Show more (${remaining}) \u2193`;
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    }
  }

  if (liveStatus) {
    liveStatus.textContent = `Showing ${visible.length} of ${filtered.length} experiences.`;
  }
}

function initFilters() {
  const filterBtns = document.querySelectorAll('[data-filter]');
  if (!filterBtns.length) return;

  filterBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      if (filter === activeFilter) return;

      activeFilter = filter;
      isExpanded = false;

      filterBtns.forEach((b) => {
        const isActive = b === btn;
        b.setAttribute('aria-selected', String(isActive));
        b.className = isActive ? 'pill-filter-active' : 'pill-filter-inactive';
      });

      updateTimeline();
    });

    btn.addEventListener('keydown', (e) => {
      let targetIdx = null;
      if (e.key === 'ArrowRight') {
        targetIdx = (idx + 1) % filterBtns.length;
      } else if (e.key === 'ArrowLeft') {
        targetIdx = (idx - 1 + filterBtns.length) % filterBtns.length;
      }

      if (targetIdx !== null) {
        e.preventDefault();
        filterBtns[targetIdx].focus();
        filterBtns[targetIdx].click();
      }
    });
  });
}

function initToggle() {
  const toggleBtn = document.getElementById('experience-toggle-btn');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    isExpanded = !isExpanded;
    updateTimeline();
  });
}

export function init() {
  const { experienceIntro } = content;

  const introEl = document.getElementById('experience-intro');
  if (introEl && experienceIntro) {
    introEl.textContent = experienceIntro;
  }

  initFilters();
  initToggle();
  updateTimeline();
}
