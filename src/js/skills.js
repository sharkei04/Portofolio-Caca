import { content } from '../data/content.js';

export function init() {
  const aside = document.getElementById('experience-aside');
  if (!aside) return;

  aside.classList.remove('hidden');
  aside.innerHTML = `
    <div class="w-full space-y-7">
      <div>
        <span class="font-script text-2xl text-[var(--color-magenta)]">Tools &amp; Tech</span>
        <div class="mt-3 space-y-2.5" role="list" aria-label="Technical skills">
          ${content.techSkills
            .map(
              (skill) => `
            <div class="flex items-center gap-2.5 py-1 px-2.5 rounded-lg hover:bg-white/60 transition-colors" role="listitem">
              <span
                class="w-2.5 h-2.5 rounded-full shrink-0"
                style="background:${skill.color}"
                aria-hidden="true"
              ></span>
              <span class="text-sm text-[var(--color-body-green)] font-semibold">${skill.name}</span>
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
