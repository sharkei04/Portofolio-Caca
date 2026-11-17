import { content } from '../data/content.js';

function starsSVG(rating, max = 5) {
  return Array.from({ length: max }, (_, i) => {
    const filled = i < rating;
    return `<svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
      <polygon
        points="10,1 12.6,7.3 19.5,8.1 14.5,13 16.2,19.9 10,16.7 3.8,19.9 5.5,13 0.5,8.1 7.4,7.3"
        fill="${filled ? '#FFD95A' : '#e5e7eb'}"
      />
    </svg>`;
  }).join('');
}

export function init() {
  const aside = document.getElementById('experience-aside');
  if (!aside) return;

  aside.classList.remove('hidden');
  aside.innerHTML = `
    <div class="w-full space-y-7">
      <div>
        <span class="font-script text-2xl text-[var(--color-magenta)]">Tools &amp; Tech</span>
        <div class="mt-3 space-y-3" role="list" aria-label="Technical skills">
          ${content.techSkills
            .map(
              (skill) => `
            <div class="flex items-center justify-between gap-3" role="listitem">
              <div class="flex items-center gap-2 min-w-0">
                <span
                  class="w-2.5 h-2.5 rounded-full shrink-0"
                  style="background:${skill.color}"
                  aria-hidden="true"
                ></span>
                <span class="text-sm text-[var(--color-body-green)] font-medium truncate">${skill.name}</span>
              </div>
              <div
                class="flex gap-0.5 shrink-0"
                role="img"
                aria-label="${skill.name}: ${skill.rating} out of 5"
              >
                ${starsSVG(skill.rating)}
              </div>
            </div>`,
            )
            .join('')}
        </div>
      </div>

      <div>
        <span class="font-script text-2xl text-[var(--color-magenta)]">What I've Gained</span>
        <ul class="mt-3 space-y-2" aria-label="Soft skills">
          ${content.softSkills
            .map(
              (skill) => `
            <li class="flex items-center gap-2 text-sm text-[var(--color-body-green)]">
              <span
                class="w-2 h-2 rounded-full bg-[var(--color-pink-hot)] shrink-0"
                aria-hidden="true"
              ></span>
              ${skill}
            </li>`,
            )
            .join('')}
        </ul>
      </div>
    </div>`;
}
