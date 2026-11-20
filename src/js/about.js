import { content } from '../data/content.js';
import { Icons } from './icons.js';

function renderEducation(list) {
  return list
    .map((edu) => {
      if (edu.type === 'university') {
        return `
          <div class="p-4 rounded-xl border border-pink-100 bg-[var(--color-pink-pale)]/70 shadow-xs flex flex-col justify-between">
            <div>
              <p class="font-semibold text-sm text-[var(--color-year-green)] leading-snug">${edu.institution}</p>
              <p class="text-xs text-[var(--color-body-green)] mt-1">${edu.faculty ? `${edu.faculty} — ` : ''}${edu.degree}</p>
            </div>
            <div class="flex items-center justify-between mt-3 pt-2.5 border-t border-pink-200/50">
              <span class="text-xs text-[var(--color-body-green)] opacity-80">${edu.period}</span>
              ${edu.gpa ? `<span class="pill-yellow !text-[0.65rem] !px-2.5 !py-0.5 font-bold">${edu.gpa}</span>` : ''}
            </div>
          </div>`;
      }
      return `
        <div class="p-4 rounded-xl border border-pink-100 bg-[var(--color-pink-pale)]/70 shadow-xs flex flex-col justify-between">
          <div>
            <p class="font-semibold text-sm text-[var(--color-year-green)] leading-snug">${edu.institution}</p>
            <p class="text-xs text-[var(--color-body-green)] mt-1">${edu.major}</p>
          </div>
          <div class="flex items-center justify-between mt-3 pt-2.5 border-t border-pink-200/50">
            <span class="text-xs text-[var(--color-body-green)] opacity-80">${edu.period}</span>
          </div>
        </div>`;
    })
    .join('');
}

function renderQuickFacts(quickFacts) {
  if (!quickFacts) return '';
  return `
    <div class="p-3.5 rounded-xl border border-pink-200 bg-white shadow-xs space-y-2 text-xs text-[var(--color-body-green)]">
      <p class="font-pixel text-[var(--color-magenta)] font-bold text-xs flex items-center gap-1.5">
        <span>✨</span> Quick Facts
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-0.5">
        <div class="bg-[var(--color-pink-pale)]/50 rounded-lg p-2.5 border border-pink-100/60">
          <span class="text-[0.65rem] text-[var(--color-year-green)] font-bold block uppercase tracking-wider">Based in</span>
          <span class="font-medium text-xs mt-0.5 block">${quickFacts.basedIn}</span>
        </div>
        <div class="bg-[var(--color-pink-pale)]/50 rounded-lg p-2.5 border border-pink-100/60">
          <span class="text-[0.65rem] text-[var(--color-year-green)] font-bold block uppercase tracking-wider">Interested in</span>
          <span class="font-medium text-xs mt-0.5 block">${quickFacts.interestedIn}</span>
        </div>
        <div class="bg-[var(--color-pink-pale)]/50 rounded-lg p-2.5 border border-pink-100/60">
          <span class="text-[0.65rem] text-[var(--color-year-green)] font-bold block uppercase tracking-wider">Exploring</span>
          <span class="font-medium text-xs mt-0.5 block">${quickFacts.exploring}</span>
        </div>
      </div>
    </div>`;
}

function renderOrganizations(list) {
  return list
    .map(
      (org) => `
      <div class="org-card flex items-center gap-3 p-3 rounded-xl border border-pink-100 bg-[var(--color-pink-pale)]/70 shadow-xs">
        <img
          src="${org.logo}"
          alt="${org.name} logo"
          class="w-11 h-11 rounded-lg object-cover border border-pink-200 bg-white shrink-0"
          loading="lazy"
          width="44" height="44"
        />
        <div class="min-w-0 flex-1">
          <p class="font-semibold text-sm text-[var(--color-year-green)] leading-snug truncate">${org.name}</p>
          <p class="text-xs text-[var(--color-body-green)] mt-0.5 truncate">${org.role}</p>
        </div>
        <div class="flex items-center gap-1.5 shrink-0">
          ${org.website ? `
          <a href="${org.website}" target="_blank" rel="noopener noreferrer" aria-label="${org.name} website" class="org-link" title="Website">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          </a>` : ''}
          ${org.instagram ? `
          <a href="${org.instagram}" target="_blank" rel="noopener noreferrer" aria-label="${org.name} Instagram" class="org-link" title="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>` : ''}
        </div>
      </div>`,
    )
    .join('');
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
  const { profile, education, organizations, socialLinks } = content;

  const avatarEl = document.getElementById('about-avatar');
  if (avatarEl) {
    avatarEl.src = profile.avatar;
    avatarEl.alt = `Foto ${profile.fullName}`;
    avatarEl.style.objectPosition = 'center top';
  }

  const stickerEl = document.getElementById('about-name-sticker');
  if (stickerEl) stickerEl.textContent = `I'm ${profile.nickname ?? 'Caca'}`;

  const bioEl = document.getElementById('about-bio');
  if (bioEl) {
    bioEl.innerHTML = profile.bio
      .map((p) => `<p class="leading-relaxed">${p}</p>`)
      .join('');
  }

  const quickFactsEl = document.getElementById('about-quick-facts');
  if (quickFactsEl) {
    quickFactsEl.innerHTML = renderQuickFacts(profile.quickFacts);
  }

  const eduEl = document.getElementById('about-education');
  if (eduEl) {
    eduEl.innerHTML = renderEducation(education);
  }

  const orgEl = document.getElementById('about-organizations');
  if (orgEl && organizations?.length) {
    orgEl.innerHTML = renderOrganizations(organizations);
  }

  const linksEl = document.getElementById('contact-links');
  if (linksEl) {
    linksEl.innerHTML = renderSocialLinks(socialLinks);
  }
}
