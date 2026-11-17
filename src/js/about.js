import { content } from '../data/content.js';
import { Icons } from './icons.js';

function renderEducation(list, quickFacts) {
  const eduCards = list
    .map((edu) => {
      if (edu.type === 'university') {
        return `
          <div class="p-3 rounded-xl border border-pink-100 bg-[var(--color-pink-pale)]">
            <p class="font-semibold text-sm text-[var(--color-year-green)] leading-snug">${edu.institution}</p>
            <p class="text-xs text-[var(--color-body-green)] mt-0.5">${edu.faculty ? `${edu.faculty} — ` : ''}${edu.degree}</p>
            <div class="flex items-center justify-between mt-1">
              <span class="text-xs text-[var(--color-body-green)] opacity-80">${edu.period}</span>
              ${edu.gpa ? `<span class="pill-yellow !text-[0.65rem] !px-2 !py-0.5">${edu.gpa}</span>` : ''}
            </div>
          </div>`;
      }
      return `
        <div class="p-3 rounded-xl border border-pink-100 bg-[var(--color-pink-pale)]">
          <p class="font-semibold text-sm text-[var(--color-year-green)] leading-snug">${edu.institution}</p>
          <p class="text-xs text-[var(--color-body-green)] mt-0.5">${edu.major}</p>
          <span class="text-xs text-[var(--color-body-green)] opacity-80">${edu.period}</span>
        </div>`;
    })
    .join('');

  let quickFactsCard = '';
  if (quickFacts) {
    quickFactsCard = `
      <div class="p-3.5 rounded-xl border border-pink-200 bg-white/80 shadow-xs space-y-2 text-xs text-[var(--color-body-green)]">
        <p class="font-pixel text-[var(--color-magenta)] font-bold text-xs">✨ Quick Facts</p>
        <p><strong class="text-[var(--color-year-green)]">Based in:</strong> ${quickFacts.basedIn}</p>
        <p><strong class="text-[var(--color-year-green)]">Interested in:</strong> ${quickFacts.interestedIn}</p>
        <p><strong class="text-[var(--color-year-green)]">Exploring:</strong> ${quickFacts.exploring}</p>
      </div>`;
  }

  return eduCards + quickFactsCard;
}

function renderSocialLinks(links) {
  return links
    .filter((l) => l.url)
    .map(
      (link) => `
      <li>
        <a
          href="${link.url}"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="${link.label}"
          class="flex flex-col items-center gap-1 text-white hover:scale-110 transition-transform focus:outline-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded"
        >
          ${Icons[link.icon]('w-6 h-6')}
          <span class="text-xs font-pixel font-medium">${link.label}</span>
        </a>
      </li>`,
    )
    .join('');
}

export function init() {
  const { profile, education, socialLinks } = content;

  const avatarEl = document.getElementById('about-avatar');
  if (avatarEl) {
    avatarEl.src = profile.avatar;
    avatarEl.alt = `Foto ${profile.fullName}`;
  }

  const stickerEl = document.getElementById('about-name-sticker');
  if (stickerEl) stickerEl.textContent = `I'm ${profile.nickname ?? 'Caca'}`;

  const bioEl = document.getElementById('about-bio');
  if (bioEl) {
    bioEl.innerHTML = profile.bio
      .map((p) => `<p class="text-sm md:text-base leading-relaxed">${p}</p>`)
      .join('');
  }

  const eduEl = document.getElementById('about-education');
  if (eduEl) eduEl.innerHTML = renderEducation(education, profile.quickFacts);

  const linksEl = document.getElementById('contact-links');
  if (linksEl) linksEl.innerHTML = renderSocialLinks(socialLinks);
}
